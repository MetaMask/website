/**
 * Remove the language codes from the start of the pathnames
 * @param {string} pathname
 * @returns A path string without language code prefixes
 */
export const removeLanguageCode = pathname =>
  pathname.replace(/^\/([a-z]{2}(-[A-Z]{2})?)(?=\/)/, '')
