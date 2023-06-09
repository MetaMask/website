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
      ctaSecond,
      backgroundColor,
      customClass,
      previewMode = false,
      contentful_id,
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
      ctaSecond={ctaSecond}
      backgroundColor={backgroundColor}
      customClass={customClass}
      previewMode={previewMode}
      contentfulId={contentful_id}
    />
  )
}

const parsePreviewData = data => {
  data = data.moduleConfig.previewContent || data.moduleConfig
  const { featureSliderItemsCollection } = data

  const dataUpdate = {
    moduleConfig: {
      previewMode: true,
      featureSliderItems: featureSliderItemsCollection?.items,
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
