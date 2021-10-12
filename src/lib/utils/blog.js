/**
 *
 * @function
 *
 * @name getArticleCategory
 * @desc takes all categories listed on an article and returns
 *       the most dominant one. Useful for keeping consistent category
 *       values across the app for urls and displaying
 *
 * @param {Object} primaryCategory
 * @param {Array} categories
 *
 * @return {String} final category name
*/
let getArticleCategory = (primaryCategory, categories = []) => {
  // resolve category name from available options
  if((primaryCategory || {}).categoryName)
    return primaryCategory.categoryName;
  else if (categories && categories.length)
    // if no primary and other categories listed then return first name
    return categories[0].categoryName;
  else return 'Uncategorized';
};

module.exports.getArticleCategory = getArticleCategory
