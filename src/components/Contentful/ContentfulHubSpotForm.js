import PropTypes from 'prop-types'
import HubspotForm from '../hubspotForm'
import React from 'react'
const ContentfulHubSpotForm = props => {
  const {
    moduleConfig: { portalId, formId, campaignId, title, displayTitle },
  } = props

  return (
    <HubspotForm
      portalId={portalId}
      formId={formId}
      sfdcCampaignId={campaignId}
      title={title}
      displayTitle={displayTitle}
    />
  )
}

export default ContentfulHubSpotForm

ContentfulHubSpotForm.propTypes = {
  portalId: PropTypes.string.isRequired,
  formId: PropTypes.string.isRequired,
  campaignId: PropTypes.string,
  title: PropTypes.string,
  displayTitle: PropTypes.bool,
}
