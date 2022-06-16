import PropTypes from 'prop-types'
import HubspotForm from '../hubspotForm'
import React from 'react'
const ContentfulHubSpotForm = props => {
  const {
    moduleConfig: {
      portalId,
      formId,
      campaignId,
      title,
      displayTitle,
      width,
      customClass,
    },
  } = props

  return (
    <HubspotForm
      portalId={portalId}
      formId={formId}
      campaignId={campaignId}
      title={title}
      displayTitle={displayTitle}
      width={width}
      customClass={customClass}
    />
  )
}

export default ContentfulHubSpotForm

ContentfulHubSpotForm.propTypes = {
  moduleConfig: PropTypes.shape({
    portalId: PropTypes.string.isRequired,
    formId: PropTypes.string.isRequired,
    campaignId: PropTypes.string,
    title: PropTypes.string,
    displayTitle: PropTypes.bool,
    width: PropTypes.string,
    customClass: PropTypes.string,
  }),
}
