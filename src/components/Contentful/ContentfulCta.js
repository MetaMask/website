import React from 'react'
import PropTypes from 'prop-types'

import CTA from '../CTA'
import ContentWrapper from '../ContentWrapper'

const ContentfulCta = props => {
  const {
    moduleConfig: {
      ctaLink,
      ctaText,
      newTab,
      buttonDisplay,
      ctaAlignment,
      hasModuleContainer,
      displayText,
      typeLayout = '',
      isHideArrow = true,
    },
  } = props

  const El = !hasModuleContainer
    ? ({ children, ...props }) => (
        <ContentWrapper {...props}>{children}</ContentWrapper>
      )
    : React.Fragment

  return (
    <El>
      <CTA
        link={ctaLink}
        text={displayText || ctaText}
        newTab={newTab}
        button={buttonDisplay}
        align={ctaAlignment}
        color="black"
        typeLayout={typeLayout}
        isHideArrow={isHideArrow}
      />
    </El>
  )
}

export default ContentfulCta

ContentfulCta.propTypes = {
  moduleConfig: PropTypes.shape({
    ctaAlignment: PropTypes.string,
    ctaLink: PropTypes.string,
    newTab: PropTypes.bool,
    ctaText: PropTypes.string,
    isButton: PropTypes.bool,
    typeLayout: PropTypes.string,
    isHideArrow: PropTypes.bool,
  }),
}
