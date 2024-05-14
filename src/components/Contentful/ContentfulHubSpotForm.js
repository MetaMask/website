import PropTypes from 'prop-types'
import HubspotForm from '../hubspotForm'
import withProcessPreviewData from '../../lib/utils/withProcessPreviewData'
import React from 'react'

const ContentfulHubSpotForm = props => {
  const {
    moduleConfig: {
      portalId,
      formId,
      campaignId,
      title,
      description,
      displayTitle,
      width,
      customClass,
      customId,
      previewMode,
    },
  } = props

  const { childMarkdownRemark: { html } = {} } = description || {}

  return (
    <HubspotForm
      portalId={portalId}
      formId={formId}
      campaignId={campaignId}
      title={title}
      displayTitle={displayTitle}
      description={previewMode ? description : html}
      width={width}
      customClass={customClass}
      customId={customId}
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

export default withProcessPreviewData(parsePreviewData)(ContentfulHubSpotForm)

ContentfulHubSpotForm.propTypes = {
  moduleConfig: PropTypes.shape({
    portalId: PropTypes.string.isRequired,
    formId: PropTypes.string.isRequired,
    campaignId: PropTypes.string,
    title: PropTypes.string,
    displayTitle: PropTypes.bool,
    width: PropTypes.string,
    customClass: PropTypes.string,
    customId: PropTypes.string,
  }),
}
