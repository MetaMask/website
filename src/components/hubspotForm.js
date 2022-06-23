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
  ${({ width }) => (width ? `width: ${width};` : 'min-width: 300px;')}
  &.newsletterOnNewsDetail {
    height: 300px;
    position: relative;
  }
`

const Content = styled.div`
  .newsletterOnNewsDetail & {
    background: ${({ theme }) => theme.background.white};
    box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 29px 0px;
    border-radius: 24px;
    padding: 32px;
    position: absolute;
    z-index: 1;
    width: 100%;
    max-height: 450px;
    overflow: auto;
    .dark-mode & {
      box-shadow: 0 10px 30px 0 rgba(255, 255, 255, 0.2);
    }
  }
`

const Form = styled.div`
  display: block;
`
