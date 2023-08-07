/**
 * source: https://github.com/Chefclub/gatsby-plugin-complex-sitemaps
 */

module.exports = {
  buildSitemap,
}

const path = require('node:path')
const fs = require('node:fs')

const defaultPluginOptions = {
  entryLimitPerFile: 45000,
  outputFolder: '',
  createLinkInHead: true,
}

const defaultSitemapOptions = {
  writeFile: true,
  xmlAnchorAttributes: 'version="1.0" encoding="UTF-8"',
  urlsetAnchorAttributes: 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  trailingSlash: 'auto',
}

function buildSitemap({ query, sitemapTree, pluginOptions = {} }) {
  return async ({ graphql, pathPrefix, reporter }) => {
    const timer = reporter.activityTimer(`Generating sitemaps`)
    timer.start()

    //Run query
    const queryData = (await graphql(query)).data

    //Reformat options and behavior
    pluginOptions.outputFolderURL = joinURL(
      'auto',
      queryData.site.siteMetadata.siteUrl,
      pluginOptions.outputFolder ?? ''
    )
    pluginOptions.outputURL = queryData.site.siteMetadata.siteUrl

    const basePath = path.join('./public', pathPrefix)
    const rootManager = new SitemapManager(
      sitemapTree,
      { ...defaultPluginOptions, ...pluginOptions },
      reporter
    )

    //Run query and populate all managers with query data and parent/children information
    reporter.verbose('Start populating sitemap')
    await rootManager.populate(queryData)
    reporter.verbose('Populating sitemap ended')

    //Generate the content of XML files and write the files recursively
    await rootManager.generateXML(basePath)

    timer.end()
    return
  }
}

class SitemapManager {
  sitemap
  pluginOptions
  children
  nodes
  reporter

  constructor(sitemap, pluginOptions, reporter) {
    this.sitemap = { ...defaultSitemapOptions, ...sitemap }
    this.pluginOptions = pluginOptions
    this.reporter = reporter
    this.nodes =
      this.sitemap.arbitraryNodes?.map(node => ({ ...node, type: 'url' })) ?? []

    //"Copy" sitemap.children to children attribute after init a new SitemapManager with it
    this.sitemap.children = this.sitemap?.children ?? []
    this.children = this.sitemap.children.map(child => {
      //Merge sitemap specific outputFolder (if exist) with child.outputFolder, pluginOptions.outputFolder and pluginOptions.outputFolderURL
      let childOutputFolder = child.outputFolder
      let pluginOutputFolder = pluginOptions.outputFolder
      let pluginOutputFolderURL = pluginOptions.outputFolderURL
      if (
        child.outputFolder ||
        this.sitemap.outputFolder ||
        this.pluginOptions.outputFolder
      ) {
        childOutputFolder = path.join(
          this.sitemap.outputFolder ?? this.pluginOptions.outputFolder ?? '',
          child.outputFolder ?? ''
        )
        pluginOutputFolder = path.join(
          this.pluginOptions.outputFolder ?? '',
          child.outputFolder ?? ''
        )
        pluginOutputFolderURL = joinURL(
          'auto',
          pluginOptions.outputFolderURL ?? '',
          child.outputFolder ?? ''
        )
      }

      //Create SitemapManager for every child and save it into "children" array
      return new SitemapManager(
        {
          ...child,
          xslPath: child.xslPath ?? pluginOptions.xslPath,
          outputFolder: childOutputFolder,
        },
        {
          ...this.pluginOptions,
          outputFolder: pluginOutputFolder,
          outputFolderURL: pluginOutputFolderURL,
        },
        reporter
      )
    })
  }

  getLocs() {
    const fileNumber = Math.ceil(
      this.nodes.length / this.pluginOptions.entryLimitPerFile
    )

    const urls = []
    if (fileNumber > 1) {
      for (let i = 1; i <= fileNumber; i++) {
        urls.push(
          joinURL(
            'remove',
            this.pluginOptions.outputFolderURL ??
              this.pluginOptions.outputFolder,
            this.sitemap.fileName.replace(/\.xml$/, `-${i}.xml`)
          )
        )
      }
    } else {
      urls.push(
        joinURL(
          'remove',
          this.pluginOptions.outputFolderURL ?? this.pluginOptions.outputFolder,
          this.sitemap.fileName
        )
      )
    }
    return urls
  }

  async populate(queryData) {
    await Promise.all([
      this.populateChildren(queryData),
      this.populateWithQuery(queryData),
    ])
    this.populateWithChildren()
  }

  populateWithChildren() {
    this.children?.forEach(child => {
      const childLocs = child.getLocs()
      this.reporter.verbose(
        `${this.sitemap.fileName} child : ${
          child.sitemap.fileName
        } => ${childLocs.join('&')}`
      )
      childLocs.forEach(loc =>
        this.nodes.unshift({
          type: 'sitemap',
          loc: loc,
          lastmod: child.sitemap.lastmod ?? new Date().toISOString(),
        })
      )
    })
  }

  async populateWithQuery(queryData) {
    //Parse query result
    if (queryData && this.sitemap?.resolvePages && this.sitemap?.serializer) {
      let edges = this.sitemap.resolvePages(queryData)
      const serializationFunction = this.sitemap.serializer

      //We run the filtering function if the user has passed one
      if (this.sitemap?.filterPages) {
        this.reporter.verbose(
          `Filtering function found for ${this.sitemap.fileName}, start filtering`
        )
        const filterFunction = this.sitemap?.filterPages
        const beforeFilteringLength = edges.length

        edges = edges.filter(edge => filterFunction(edge))

        this.reporter.verbose(
          `Filtering ended : ${beforeFilteringLength -
            edges.length} node removed`
        )
      }

      //We transform each edge from the query result to a SitemapNode
      edges = await Promise.all(
        edges.map(async edge => {
          const serializedNode = await serializationFunction(edge)
          return {
            ...serializedNode,
            loc: joinURL(
              this.sitemap.trailingSlash,
              this.pluginOptions.outputURL ?? this.pluginOptions.outputFolder,
              serializedNode.loc
            ),
            type: 'url',
          }
        })
      )

      this.nodes.push(...edges)
    } else {
      this.reporter.warn(`Missing property: 'resolvePages'`)
    }
  }

  async populateChildren(queryData) {
    await Promise.all(
      this.children?.map(async child => {
        await child.populate(queryData)
      })
    )
  }

  //This function generate the xml of each file of the tree from the leaves to the root
  async generateXML(pathPrefix) {
    await this.generateChildrenXML(pathPrefix)

    if (!this.sitemap.writeFile) {
      return
    }

    const writeFolderPath = path.join(
      pathPrefix,
      this.sitemap.outputFolder ?? this.pluginOptions.outputFolder ?? ''
    )

    const files = [{ sitemap: [], url: [] }]

    //Format every node attribute into xml field and add it to the xml string until it's full then add it to the next xml string
    this.nodes.sort(orderSitemapFirst).forEach((node, index) => {
      const fileIndex = parseInt(
        `${Math.floor(index / this.pluginOptions.entryLimitPerFile)}`
      )
      if (!files[fileIndex]) {
        files[fileIndex] = { sitemap: [], url: [] }
      }
      files[fileIndex][(node?.type)].push(
        `<${node.type}>${sitemapNodeToXML(node)}</${node.type}>`
      )
    })

    //For each file we add xml, xsl, urlset and/or sitemapindex, we process the file name and write it
    await Promise.all(
      files.map(async (file, index) => {
        const xmlContent =
          `<?xml ${this.sitemap.xmlAnchorAttributes ?? ''}?>\n` +
          (this.sitemap.xslPath
            ? `<?xml-stylesheet type="text/xsl" href="${this.sitemap.xslPath}"?>\n`
            : '') +
          (file.sitemap.length
            ? `<sitemapindex ${this.sitemap.urlsetAnchorAttributes ??
                ''}>\n${file.sitemap.join('\n')}\n</sitemapindex>`
            : '') +
          (file.url.length
            ? `<urlset ${this.sitemap.urlsetAnchorAttributes ??
                ''}>\n${file.url.join('\n')}\n</urlset>`
            : '')

        const finalFileName =
          files.length > 1
            ? this.sitemap.fileName.replace(/\.xml$/, `-${index + 1}.xml`)
            : this.sitemap.fileName

        this.reporter.verbose(`Writting ${finalFileName} in ${writeFolderPath}`)
        writeXML(xmlContent, writeFolderPath, finalFileName)
      })
    )
  }

  async generateChildrenXML(pathPrefix) {
    await Promise.all(
      this.children?.map(async child => {
        await child.generateXML(pathPrefix)
      })
    )
  }
}

const sitemapNodeToXML = node => {
  let xml = ''

  for (const tag in node) {
    if (tag === 'type') continue //We do not write the "type" attribute which is used in SitemapManager
    let content = ''
    const tagValue = node[tag]
    if (typeof tagValue === 'string') {
      content = encodeXML(tagValue)
    } else {
      content = sitemapNodeToXML(tagValue)
    }
    xml = `${xml}<${tag}>${content}</${tag}>`
  }

  return `${xml}`
}

const writeXML = (xml, folderPath, filename) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true })
  }
  const filePath = path.join(folderPath, filename)
  fs.writeFileSync(filePath, xml)
}

const joinURL = (trailingSlashMode, baseURL, ...parts) => {
  //Remove start/end slash on parts
  parts = parts.map((part, index) =>
    index + 1 !== parts.length || trailingSlashMode != 'auto'
      ? part.replace(/^\/*/, '').replace(/\/*$/, '')
      : part.replace(/^\/*/, '')
  )
  //Add / at the end of parts
  parts = parts.map(part => `${part}`)

  //Remove end slash of baseURL
  baseURL = baseURL.replace(/\/*$/, '')

  //Return https://www.example.com/part1/part2/part3/
  return `${baseURL}/${parts.join('/')}${
    trailingSlashMode === 'add' ? '/' : ''
  }`
}

const encodeXML = text =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

const orderSitemapFirst = (a, b) => {
  if (a.type === 'url' && b.type === 'sitemap') {
    return -1
  } else if (a.type === 'sitemap' && b.type === 'url') {
    return 1
  } else {
    return 0
  }
}
