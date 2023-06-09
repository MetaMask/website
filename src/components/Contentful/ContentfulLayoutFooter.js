import React from 'react'
import PropTypes from 'prop-types'
import Footer from '../Footer'
import withProcessPreviewData from '../../lib/utils/withProcessPreviewData'
import cloneDeep from 'lodash/cloneDeep'

const ContentfulLayoutFooter = props => {
  const {
    moduleConfig: {
      logo,
      menuItems,
      copyright,
      previewMode = false,
      contentful_id,
    },
  } = props
  return (
    <Footer
      logo={logo}
      logoTitle={logo.title}
      logoUrl={logo.logo.file.url}
      logoSvg={logo.logo.svg}
      menus={menuItems}
      copyright={copyright}
      previewMode={previewMode}
      contentfulId={contentful_id}
    />
  )
}

const parsePreviewData = data => {
  data = data.moduleConfig.previewContent || data.moduleConfig
  const { menuItemsCollection, copyright, contentful_id } = data

  const menuItems = cloneDeep(menuItemsCollection.items)
  menuItems.forEach((item, index) => {
    if (item.modulesCollection?.items.length > 0) {
      menuItems[index].modules = item.modulesCollection.items
      delete item.modulesCollection
    }
  })
  const dataUpdate = {
    moduleConfig: {
      previewMode: true,
      copyright,
      menuItems,
      contentful_id,
      logo: data.logo
        ? {
            title: data.logo.title,
            logo: {
              file: {
                url: data.logo.logo?.url,
              },
            },
          }
        : undefined,
    },
  }
  return dataUpdate
}

export default withProcessPreviewData(parsePreviewData)(ContentfulLayoutFooter)

ContentfulLayoutFooter.propTypes = {
  moduleConfig: PropTypes.shape({
    logo: PropTypes.object,
    menuItems: PropTypes.arrayOf(
      PropTypes.shape({
        // top level columns
        title: PropTypes.string,
        modules: PropTypes.arrayOf(
          PropTypes.shape({
            // list of links in column
            ctaLink: PropTypes.string.isRequired,
            displayText: PropTypes.string,
            newTab: PropTypes.bool,
          })
        ),
      })
    ),
    copyright: PropTypes.string,
    previewMode: PropTypes.bool,
  }),
}
