import { find, kebabCase, last } from 'lodash'

export const prettifyURL = url =>
  // strips protocol, www., and trailing slashes returing all domains names
  url ? /^(?:https?:\/\/)?(?:www\.)?([^/]*).*$/.exec(url)[1] : ''

export const findFileInListByName = list => name =>
  find(list, file => {
    // extracts file's filename in /src/images from gatsby's generated static file path
    const filename = last(file.src.split('.')[0].split('/'))
    return filename === kebabCase(name)
  })

export const parseContentfulAssetUrl = asset => {
  if (!asset) return false

  // url path can take to forms depending on where module data is called
  // `assetUrl` is from function `fetchContentfulData` for previews
  // `asset.fluid|fluid.src` is from GraphQL during production page building
  // `asset.fixed|fixed.src` is from GraphQL during production page building
  // `asset.file|file.src` is from GraphQL during production page building
  const url =
    asset.assetUrl ||
    (asset.fluid && asset.fluid.src) ||
    (asset.fixed && asset.fixed.src) ||
    (asset.file && asset.file.url)

  if (!url || typeof url !== 'string') return false

  // Contentful returns a same protocol uri starting with '//' which is improperly handled by Gatsby
  if (url.startsWith('//')) return `https://${url.slice(2)}`
  // if it is already http protocol then return
  if (url.startsWith('http')) return url
  // specify https if no protocol added
  return `https://${url}`
}
