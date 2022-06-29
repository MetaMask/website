import React from 'react'
import PropTypes from 'prop-types'
import CTA from '../CTA'

const ContentfulCta = props => {
  const {
    moduleConfig: {
      ctaLink,
      ctaText,
      newTab,
      buttonDisplay,
      ctaAlignment,
      displayText,
      typeLayout = '',
      showRightArrow = false,
      showLeftArrow = false,
      color = 'primary',
      buttonSize,
      customClick,
      fontSize,
      buttonGradient,
      downloadBrowsers,
      eventCategory,
      eventLabel,
      hubSpotForm,
      buttonSecondary,
      socialLink,
    },
  } = props
  // check work with preview
  const extractBrowsers = item =>
    item?.internal?.content ? JSON.parse(item.internal.content) : item
  const arrayBrowsers = downloadBrowsers
    ? downloadBrowsers.map(extractBrowsers)
    : []
  const browsers = arrayBrowsers.reduce(
    (obj, cur) => ({ ...obj, [cur.name]: cur }),
    {}
  )
  return (
    <CTA
      link={ctaLink}
      text={displayText || ctaText}
      newTab={newTab}
      button={buttonDisplay}
      align={ctaAlignment}
      color={color}
      typeLayout={typeLayout}
      showRightArrow={showRightArrow}
      showLeftArrow={showLeftArrow}
      buttonSize={buttonSize}
      customClick={customClick}
      fontSize={fontSize}
      buttonGradient={buttonGradient}
      downloadBrowsers={browsers}
      eventCategory={eventCategory}
      eventLabel={eventLabel}
      hubSpotForm={hubSpotForm}
      buttonSecondary={buttonSecondary}
      socialLink={socialLink}
    />
  )
}

export default ContentfulCta

ContentfulCta.propTypes = {
  moduleConfig: PropTypes.shape({
    ctaAlignment: PropTypes.string,
    ctaLink: PropTypes.string,
    newTab: PropTypes.bool,
    ctaText: PropTypes.string,
    socialLink: PropTypes.string,
    isButton: PropTypes.bool,
    eventCategory: PropTypes.string,
    eventLabel: PropTypes.string,
    hubSpotForm: PropTypes.object,
    buttonSecondary: PropTypes.bool,
  }),
}
