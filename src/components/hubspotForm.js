import React from 'react'
import PropTypes from 'prop-types'
import ReactHubspotForm from 'react-hubspot-form'
import classnames from 'classnames'
import styled, { withTheme } from 'styled-components'

const HubspotForm = props => {
  const { portalId, formId, campaignId, title, displayTitle } = props

  return (
    <Wrapper>
      {title ? (
        <Title
          className={classnames({
            hidden: !displayTitle,
          })}
        >
          {title}
        </Title>
      ) : null}
      <Form>
        <ReactHubspotForm
          portalId={portalId}
          formId={formId}
          sfdcCampaignId={campaignId}
        />
      </Form>
    </Wrapper>
  )
}

HubspotForm.propTypes = {
  portalId: PropTypes.string.isRequired,
  formId: PropTypes.string.isRequired,
  campaignId: PropTypes.string,
  title: PropTypes.string,
  displayTitle: PropTypes.bool,
}

export default withTheme(HubspotForm)

const Title = styled.h2`
  display: block;
  margin-bottom: 40px;
`

const Wrapper = styled.div`
  display: block;
`

const Form = styled.div`
  display: block;
`
