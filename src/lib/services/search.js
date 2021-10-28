// Docs - https://fusejs.io/
import Fuse from 'fuse.js'

export const initSearch = data => options => {
  return new Fuse(data, options)
}
