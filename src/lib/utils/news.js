const { kebabCase } = require('lodash')

/**
 * Custom kebab case function that preserves "web3"
 * @param {string} string
 * @returns {string}
 */
function customKebabCase(string) {
  // Apply lodash's kebabCase
  string = kebabCase(string)

  // Restore "web3"
  return string.replace(/web-3/gi, 'web3')
}

/**
 * @function
 * @name getNewsUrl
 * @param {Object} news
 * @return {String} final news url
 */
let getNewsUrl = news => {
  let category = 'Uncategorized'
  const slug = news?.slug
    ? customKebabCase(news.slug)
    : customKebabCase(news.title.toLowerCase())

  if (news.categories && news.categories.length)
    category = news.categories[0].slug

  return `/news/${customKebabCase(category)}/${slug}/`
}

module.exports.getNewsUrl = getNewsUrl
