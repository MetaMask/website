import withProcessPreviewData from '../../lib/utils/withProcessPreviewData'
import { MetaMaskContext } from '../../Context/MetaMaskContextProvider'
import { useFeatureFlag } from '../../hooks/useFeatureFlag'
import React, { useContext } from 'react'
import { isMobile } from 'react-device-detect'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import CTA from '../CTA'

const ContentfulCta = props => {
  const { isMetaMaskInstalled } = useContext(MetaMaskContext)

  const headerAlwaysShowDownload = useFeatureFlag({
    componentName: props.moduleConfig?.internal?.type,
    componentId: props.moduleConfig?.contentful_id,
    flagName: props.moduleConfig?.launchDarklyFlag,
  })

  const selectedCta =
    !headerAlwaysShowDownload &&
    isMetaMaskInstalled &&
    !isEmpty(props.moduleConfig.alternativeCta)
      ? props.moduleConfig.alternativeCta
      : props.moduleConfig

  let activeCta = selectedCta
  if (isMobile && selectedCta.mobileCta) {
    activeCta = selectedCta.mobileCta
  }

  // check work with preview
  const extractBrowsers = item =>
    item?.internal?.content ? JSON.parse(item.internal.content) : item

  const arrayBrowsers = activeCta.downloadBrowsers
    ? activeCta.downloadBrowsers.map(extractBrowsers)
    : []

  const browsers = arrayBrowsers.reduce(
    (obj, cur) => ({ ...obj, [cur.name]: cur }),
    {}
  )

  return (
    // eslint-disable-next-line react/jsx-pascal-case
    <CTA
      link={activeCta.ctaLink || ''}
      text={activeCta.displayText || activeCta.ctaText}
      newTab={activeCta.newTab}
      iconConfig={activeCta.iconConfig}
      button={activeCta.buttonDisplay}
      align={activeCta.ctaAlignment}
      color={activeCta.color}
      typeLayout={activeCta.typeLayout}
      showRightArrow={activeCta.showRightArrow}
      showLeftArrow={activeCta.showLeftArrow}
      buttonSize={activeCta.buttonSize}
      customClick={activeCta.customClick}
      fontSize={activeCta.fontSize}
      buttonGradient={activeCta.buttonGradient}
      downloadBrowsers={browsers}
      eventCategory={activeCta.eventCategory}
      eventLabel={activeCta.eventLabel}
      hubSpotForm={activeCta.hubSpotForm}
      embedHTML={activeCta.embedHTML}
      buttonSecondary={activeCta.buttonSecondary}
      socialLink={activeCta.socialLink}
      showCaretRight={activeCta.showCaretRight}
      hideButtonIcon={activeCta.hideButtonIcon}
      customClassName={activeCta.customClassName}
      previewMode={activeCta.previewMode}
      isForDeveloper={activeCta.isForDeveloper}
      buttonCaretDown={activeCta.buttonCaretDown}
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
    hideButtonIcon: PropTypes.bool,
    previewMode: PropTypes.bool,
  }),
}
