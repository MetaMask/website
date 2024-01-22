const path = require('path')
const { exists, writeFile, ensureDir } = require('fs-extra')

module.exports = {
  writeRedirectsFile,
}

function getMetaRedirect(toPath) {
  let url = toPath.trim()
  const hasProtocol = url.includes('://')
  if (!hasProtocol) {
    const hasLeadingSlash = url.startsWith('/')
    if (!hasLeadingSlash) {
      url = `/${url}`
    }
    const resemblesFile = url.includes('.')
    if (!resemblesFile) {
      url = `${url}`.replace(/\/\/+/g, '/')
    }
  }
  return `<script>window.location.href="${url}"</script>`
}

async function writeRedirectsFile(redirects, folder, pathPrefix) {
  if (!redirects.length) return
  for (const redirect of redirects) {
    const { fromPath, toPath } = redirect
    const FILE_PATH = path.join(
      folder,
      fromPath.replace(pathPrefix, ''),
      'index.html'
    )
    const fileExists = await exists(FILE_PATH)
    if (!fileExists) {
      try {
        await ensureDir(path.dirname(FILE_PATH))
      } catch (err) {}
      const data = getMetaRedirect(toPath)
      await writeFile(FILE_PATH, data)
    }
  }
}
