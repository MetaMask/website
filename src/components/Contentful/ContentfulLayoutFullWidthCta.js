import React from 'react'
import PropTypes from 'prop-types'
import FullwidthCta from '../FullWidthCta'
import withProcessPreviewData from '../../lib/utils/withProcessPreviewData'

const ContentfulLayoutFullWidthCta = props => {
  const {
    moduleConfig: {
      headline,
      showLogoAnimation,
      backgroundColor,
      description,
      hubSpotForm,
      embedHtml,
      marginBottom = '',
      ctas,
      logoType,
      sectionPadding,
      noPaddingBottom,
      noPaddingTop,
      customClass,
      previewMode = false,
      contentful_id,
      bordered,
      backgroundImage,
      backgroundImageMobile,
      backgroundImageDarkMode,
      backgroundImageMobileDarkMode,
      fullWidthBackground,
    },
  } = props
  const { childMarkdownRemark: { html } = {} } = description || {}
  return (
    <FullwidthCta
      description={previewMode ? description : html}
      showLogoAnimation={showLogoAnimation}
      backgroundColor={backgroundColor}
      headline={headline}
      hubSpotForm={hubSpotForm}
      embedHtml={embedHtml}
      marginBottom={marginBottom}
      ctas={ctas}
      logoType={logoType}
      sectionPadding={sectionPadding}
      noPaddingTop={noPaddingTop}
      noPaddingBottom={noPaddingBottom}
      customClass={customClass}
      previewMode={previewMode}
      contentfulId={contentful_id}
      bordered={bordered}
      backgroundImage={backgroundImage}
      backgroundImageMobile={backgroundImageMobile}
      backgroundImageDarkMode={backgroundImageDarkMode}
      backgroundImageMobileDarkMode={backgroundImageMobileDarkMode}
      fullWidthBackground={fullWidthBackground}
    />
  )
}

const parsePreviewData = data => {
  data = data.moduleConfig.previewContent || data.moduleConfig
  const { ctasCollection } = data

  const dataUpdate = {
    moduleConfig: {
      previewMode: true,
      ctas: ctasCollection?.items,
      ...data,
    },
  }
  return dataUpdate
}

export default withProcessPreviewData(parsePreviewData)(
  ContentfulLayoutFullWidthCta
)

ContentfulLayoutFullWidthCta.propTypes = {
  moduleConfig: PropTypes.shape({
    description: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    headline: PropTypes.string,
    hubSpotForm: PropTypes.object,
    embedHtml: PropTypes.object,
    ctaLink: PropTypes.string,
    ctaText: PropTypes.string,
    backgroundColor: PropTypes.string,
    showLogoAnimation: PropTypes.bool,
    marginBottom: PropTypes.string,
    ctas: PropTypes.array,
    sectionPadding: PropTypes.string,
    customClass: PropTypes.string,
  }),
}
