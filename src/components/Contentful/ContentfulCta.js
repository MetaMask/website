import withProcessPreviewData from '../../lib/utils/withProcessPreviewData'
import { useMetamaskDetect } from '../../hooks/useMetamaskDetect'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import React from 'react'
import CTA from '../CTA'

const ContentfulCta = ({
  moduleConfig: {
    ctaLink,
    ctaText,
    newTab,
    buttonDisplay,
    iconConfig,
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
    embedHTML,
    buttonSecondary,
    socialLink,
    showCaretRight,
    alternativeCta,
    previewMode = false,
  },
}) => {
  const isMetaMaskInstalled = useMetamaskDetect()

  if (isMetaMaskInstalled && !isEmpty(alternativeCta)) {
    var {
      ctaLink,
      ctaText,
      newTab,
      buttonDisplay,
      iconConfig,
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
      embedHTML,
      buttonSecondary,
      socialLink,
      showCaretRight,
      previewMode = false,
    } = alternativeCta
  }

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
    // eslint-disable-next-line react/jsx-pascal-case
    <CTA
      link={ctaLink}
      text={displayText || ctaText}
      newTab={newTab}
      iconConfig={iconConfig}
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
      embedHTML={embedHTML}
      buttonSecondary={buttonSecondary}
      socialLink={socialLink}
      showCaretRight={showCaretRight}
      previewMode={previewMode}
    />
  )
}

const parsePreviewData = data => {
  data = data.moduleConfig.previewContent || data.moduleConfig

  const dataUpdate = {
    moduleConfig: {
      previewMode: true,
      ...data,
    },
  }
  return dataUpdate
}

export default withProcessPreviewData(parsePreviewData)(ContentfulCta)

ContentfulCta.propTypes = {
  moduleConfig: PropTypes.shape({
    iconConfig: PropTypes.object,
    ctaAlignment: PropTypes.string,
    ctaLink: PropTypes.string,
    newTab: PropTypes.bool,
    ctaText: PropTypes.string,
    socialLink: PropTypes.string,
    isButton: PropTypes.bool,
    eventCategory: PropTypes.string,
    eventLabel: PropTypes.string,
    hubSpotForm: PropTypes.object,
    embedHTML: PropTypes.object,
    buttonSecondary: PropTypes.bool,
    previewMode: PropTypes.bool,
  }),
}
