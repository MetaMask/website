const { createWriteStream, stat, mkdir } = require('fs')
const path = require('path')
const { pipeline } = require('stream')
const { promisify } = require('util')
const fetch = require('node-fetch')

const streamPipeline = promisify(pipeline)

/**
 * Download file from url
 *
 * @param {string} url
 * @param {string} dest
 *
 * @returns Promise
 */
const download = async (url, dest) => {
  // Check for valid dest
  const dir = path.parse(dest).dir
  let isDir = true
  try {
    if (!(await promisify(stat)(dir)).isDirectory()) {
      isDir = false
    }
  } catch (_) {
    isDir = false
  }
  if (!isDir) {
    await promisify(mkdir)(dir, { recursive: true })
  }

  const response = await fetch(url)
  if (!response.ok)
    throw new Error(`Unexpected response ${response.statusText}`)
  await streamPipeline(response.body, createWriteStream(dest))
}

module.exports = {
  download,
}
