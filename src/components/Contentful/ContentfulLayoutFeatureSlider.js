import React from 'react'
import PropTypes from 'prop-types'
import FeatureSlider from '../FeatureSlider'
import withProcessPreviewData from '../../lib/utils/withProcessPreviewData'

const ContentfulLayoutFeatureSlider = props => {
  const {
    moduleConfig: {
      headline,
      description,
      featureSliderItems,
      layoutType,
      sectionPadding,
      slideShow,
      animation,
      cta,
      backgroundColor,
      customClass,
      previewMode = false,
    },
  } = props

  const { childMarkdownRemark: { html } = {} } = description || {}

  return (
    <FeatureSlider
      headline={headline}
      description={previewMode ? description : html}
      featureSliderItems={featureSliderItems}
      layoutType={layoutType}
      sectionPadding={sectionPadding}
      slideShow={slideShow}
      animation={animation}
      cta={cta}
      backgroundColor={backgroundColor}
      customClass={customClass}
      previewMode={previewMode}
    />
  )
}

const parsePreviewData = data => {
  data = data.moduleConfig.previewContent || data.moduleConfig
  const { featureItemsCollection } = data
  const dataUpdate = {
    moduleConfig: {
      previewMode: true,
      featureItems: featureItemsCollection?.items,
      ...data,
    },
  }
  return dataUpdate
}

export default withProcessPreviewData(parsePreviewData)(
  ContentfulLayoutFeatureSlider
)

ContentfulLayoutFeatureSlider.propTypes = {
  moduleConfig: PropTypes.shape({
    headline: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    cta: PropTypes.object,
    noPaddingBottom: PropTypes.bool,
    removeSectionPaddingBottomOnDesktop: PropTypes.bool,
    imageShadow: PropTypes.bool,
  }),
}
