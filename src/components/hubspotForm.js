import React from 'react'
import PropTypes from 'prop-types'
import ReactHubspotForm from 'react-hubspot-form'
import classnames from 'classnames'
import styled, { withTheme } from 'styled-components'
import Loading from './Loading'

const HubspotForm = props => {
  const {
    portalId,
    formId,
    campaignId,
    title,
    displayTitle,
    width,
    customClass,
  } = props

  return (
    <Wrapper width={width} className={customClass}>
      <Content>
        {title && displayTitle ? (
          <Title className={classnames('popupTitle')}>{title}</Title>
        ) : null}
        <Form>
          <ReactHubspotForm
            portalId={portalId}
            formId={formId}
            sfdcCampaignId={campaignId}
            loading={<Loading />}
          />
        </Form>
      </Content>
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

const Content = styled.div`
  .newsletterOnNewsDetail &{
    background: ${({ theme }) => theme.white};
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.1); 
    box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 29px 0px;
    border-radius: 24px;
    padding: 32px;
  }
`

const Form = styled.div`
  display: block;
`
