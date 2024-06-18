const { kebabCase } = require('lodash')
/**
 *
 * @function
 *
 * @name getNewsUrl
 *
 * @param {Object} news
 *
 * @return {String} final news url
 */
let getNewsUrl = news => {
  let category = 'Uncategorized'
  const slug = news?.slug
    ? kebabCase(news.slug)
    : kebabCase(news.title.toLowerCase())
  if (news.categories && news.categories.length)
    category = news.categories[0].slug
  return `/news/${kebabCase(category)}/${slug}/`
}

module.exports.getNewsUrl = getNewsUrl
