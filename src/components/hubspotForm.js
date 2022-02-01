import React from 'react'
import PropTypes from 'prop-types'
import ReactHubspotForm from 'react-hubspot-form'
import classnames from 'classnames'
import styled, { withTheme } from 'styled-components'
import Loading from './Loading'

const HubspotForm = props => {
  const { portalId, formId, campaignId, title, displayTitle, width } = props

  return (
    <Wrapper width={width}>
      {title && displayTitle ? (
        <Title className={classnames('popupTitle')}>{title}</Title>
      ) : null}
      <Form>
        <ReactHubspotForm
          portalId={portalId}
          formId={formId}
          campaignId={campaignId}
          loading={<Loading />}
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
  max-width: 100%;

  ${({ width }) => (width ? `width: ${width}` : 'min-width: 300px')}
`

const Form = styled.div`
  display: block;
`
