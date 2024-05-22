import withProcessPreviewData from '../../lib/utils/withProcessPreviewData'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import Header from '../Header'
import React from 'react'

const ContentfulLayoutHeader = props => {
  const {
    moduleConfig: {
      logo,
      logoMobile,
      menuItems,
      downloadButton,
      previewMode = false,
      popupAnnouncement,
      isSticky,
      contentful_id,
      translation,
    },
    hideDownloadBtn,
  } = props

  return (
    <Header
      logo={logo}
      logoMobile={logoMobile}
      menus={menuItems}
      downloadButton={downloadButton}
      hideDownloadBtn={hideDownloadBtn}
      popupAnnouncement={popupAnnouncement}
      isSticky={isSticky}
      previewMode={previewMode}
      contentfulId={contentful_id}
      translation={translation}
    />
  )
}

const parsePreviewData = data => {
  data = data.moduleConfig.previewContent || data.moduleConfig
  const {
    downloadButton,
    menuItemsCollection,
    popupAnnouncement,
    isSticky,
  } = data

  let menuItems = menuItemsCollection
    ? cloneDeep(menuItemsCollection.items)
    : []
  menuItems.forEach((item, index) => {
    if (item.modulesCollection?.items.length > 0) {
      menuItems[index].modules = item.modulesCollection.items
      delete item.modulesCollection
    }
  })
  menuItems = !isEmpty(menuItems) ? menuItems : undefined
  const dataUpdate = {
    moduleConfig: {
      previewMode: true,
      logo: data.logo
        ? {
            title: data.logo.title,
            logo: {
              file: {
                url: data.logo.logo.url,
              },
            },
          }
        : undefined,
      logoMobile: data.logoMobile
        ? {
            title: data.logoMobile.title,
            logo: {
              file: {
                url: data.logoMobile.logo?.url,
              },
            },
          }
        : undefined,
      menuItems,
      downloadButton,
      popupAnnouncement,
      isSticky,
    },
  }
  return dataUpdate
}

export default withProcessPreviewData(parsePreviewData)(ContentfulLayoutHeader)

ContentfulLayoutHeader.propTypes = {
  moduleConfig: PropTypes.shape({
    logo: PropTypes.object,
    logoMobile: PropTypes.object,
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
    downloadButton: PropTypes.object,
    announcement: PropTypes.object,
    isSticky: PropTypes.bool,
    previewMode: PropTypes.bool,
  }),
}
