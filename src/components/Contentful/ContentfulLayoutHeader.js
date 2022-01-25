import React from 'react'
import PropTypes from 'prop-types'

import Header from '../Header'

const ContentfulLayoutHeader = props => {
  const {
    moduleConfig: { logo, menuItems, downloadButton, previewMode },
  } = props
  if(previewMode){
    logo.logo = {...logo?.logo,file:{url: logo?.logo?.assetUrl}}
  }

  return (
    <Header logo={logo} menus={menuItems} downloadButton={downloadButton} />
  )
}

export default ContentfulLayoutHeader

ContentfulLayoutHeader.propTypes = {
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
    downloadButton: PropTypes.object,
  }),
}
