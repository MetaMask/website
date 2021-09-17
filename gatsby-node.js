const path = require('path')
const kebabCase = require('lodash').kebabCase

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  /* Blog Post Pages */
  const articlePages = graphql(`{
    articles: allContentfulArticlePage(sort: {order: DESC, fields: articlePublishDate}) {
      edges {
        node {
          contentful_id
          articleTitle
          seo {
            contentful_id
          }
          primaryCategory {
            categoryName
          }
          articleCategories {
            categoryName
          }
          isPrivate
        }
      }
    }
  }`).then((result) => {
    if (result.data && result.data.articles) {
      const parseBlogPath = (article) => {
        const {
          articleTitle,
          primaryCategory,
          articleCategories: categories,
        } = article

        const category = (primaryCategory || {}).categoryName ?
          primaryCategory.categoryName :
          (categories && categories.length) ?
            // if no primary and other categories listed then return first name
            categories[0].categoryName :
            'Uncategorized' // else no categories exist

        const categorySlug = kebabCase(category)
        const titleSlug = kebabCase(articleTitle)
        return `/blog/${ categorySlug }/${ titleSlug }/`;
      }
      const blogs = result.data.articles.edges.filter((item) => !item.node.isPrivate );
      return blogs.map(({ node: article }, index) => {
        const {
          contentful_id,
          seo,
          primaryCategory,
          articleCategories: categories,
        } = article

        const category = (primaryCategory || {}).categoryName ?
          primaryCategory.categoryName :
          (categories && categories.length) ?
            // if no primary and other categories listed then return first name
            categories[0].categoryName :
            'Uncategorized' // else no categories exist

        const seoId = seo ? seo.contentful_id : '' // can remove this conditional once Labs team has back filled this required field
        createPage({
          path: parseBlogPath(blogs[index].node),
          component: path.resolve(`./src/templates/ArticlePage.js`),
          context: {
            article_content_id: contentful_id,
            seoId,
            category,
            pathBuild: parseBlogPath(blogs[index].node),
            prev: index === 0 ? false : parseBlogPath(blogs[index - 1].node),
            next: index === blogs.length - 1 ? false : parseBlogPath(blogs[index + 1].node),
          },
        })
      })
    }
  }).catch((error) => {
    console.log(' Error generating Article Page: ', error)
  })

  /* Blog Category Index Pages */
  const blogCategoryPages = graphql(`{
    categories: allContentfulArticleCategory {
      nodes {
        contentful_id
        categoryName
      }
    }
  }`).then((result) => {
    if (result.data && result.data.categories) {
      return result.data.categories.nodes.map((category) => {
        const {
          contentful_id,
          categoryName,
        } = category

        createPage({
          path: `/blog/${ kebabCase(categoryName) }/`,
          component: path.resolve(`./src/templates/CategoryPage.js`),
          context: {
            category_content_id: contentful_id,
            categoryName,
            pathBuild: `/blog/${ kebabCase(categoryName) }/`,
          },
        })
      })
    }
  }).catch((err) => {
    console.log('Error generating blog category page: ', err)
  })

  /* Customized Pages Built Inside Contentful CMS */
  const contentfulPages = graphql(`{
    pages: allContentfulPage {
      edges {
        node {
          slug
          themeColor
          isPrivate
          pageAccessLevel
          headerNavMenu {
            contentful_id
          }
          footerNavMenu {
            contentful_id
          }
          seo {
            contentful_id
          }
          modules {
            ...on ContentfulHero {
              contentful_id
            }
            ...on ContentfulSectionText {
              contentful_id
            }
            ...on ContentfulModuleContainer {
              contentful_id
            }
            ...on ContentfulCard {
              contentful_id
            }
            ...on ContentfulCta {
              contentful_id
            }
            ...on ContentfulHtmlEmbed {
              contentful_id
            }
            ...on ContentfulSplitText {
              contentful_id
            }
            ...on ContentfulPageSubHeader {
              contentful_id
            }
            ...on ContentfulArticleList {
              contentful_id
            }
          }
        }
      }
    }
  }`).then((result) => {
    if (result.data) {
      const { data: { pages } } = result
      if (!pages || !pages.edges[0]) return null
      const pageData = pages.edges
      pageData.map(p => {
        const {
          modules,
          isPrivate,
          pageAccessLevel: accessLevel,
          themeColor,
          slug,
          seo,
          footerNavMenu: {
            contentful_id: footerId,
          },
          headerNavMenu: {
            contentful_id: headerId,
          },
        } = p.node
        const moduleIds = modules.map(m => m.contentful_id)
        const seoId = seo ? seo.contentful_id : '' // can remove this conditional once Labs team has back filled this required field

        createPage({
          path: slug, // slug validation in Contentful CMS
          component: path.resolve(`./src/templates/ContentfulPage.js`),
          context: { // pass data to page template for configuration and populating modules
            headerId,
            footerId,
            seoId,
            modules: moduleIds,
            isPrivate,
            accessLevel,
            themeColor,
            pathBuild: slug,
          },
        })
      })
    } else {
      console.log('Error generating Contentful page:', result)
    }
  }).catch((err) => {
    console.log('Error generating Contentful page:', err)
  })

  const autoGeneratedPages = [
    articlePages,
    contentfulPages,
    blogCategoryPages,
  ]

  return Promise.all(autoGeneratedPages)

}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type ContentfulArticleList implements Node {
      articles: [ContentfulArticlePage] @link(by: "id", from: "articles___NODE")
    }
  `;
  createTypes(typeDefs);
};
