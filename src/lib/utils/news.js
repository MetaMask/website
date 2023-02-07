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
  if (news.categories && news.categories.length)
    category = news.categories[0].name
  return `/news/${kebabCase(category)}/${kebabCase(news.title.toLowerCase())}/`
}

module.exports.getNewsUrl = getNewsUrl
