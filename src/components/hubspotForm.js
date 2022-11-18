import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import ReactHubspotForm from 'react-hubspot-form'
import classnames from 'classnames'
import styled, { withTheme } from 'styled-components'
import Loading from './Loading'
import ContextClientSide from '../Context/ContextClientSide'

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

  const { darkMode: darkModeContextValue } = useContext(ContextClientSide)
  const { isDarkMode } = darkModeContextValue || {}

  const changeTheme = () => {
    try {
      const iframes = document.getElementsByTagName('iframe')
      Array.from(iframes).forEach(f => {
        const oldStyles = f.contentDocument?.getElementsByClassName(
          'dark-mode-for-hs-form'
        )
        if (oldStyles && Array.from(oldStyles).length > 0) {
          Array.from(oldStyles).forEach(e => e.remove())
        }
        if (!isDarkMode) return
        const style = document.createElement('style')
        style.setAttribute('class', 'dark-mode-for-hs-form')
        const css = document.createTextNode(`
        .hs-form-field label:not(.hs-error-msg){ color: #fff !important; transition: color 0.3s ease; }
        .legal-consent-container .hs-richtext { color: #7c98b6 !important; transition: color 0.3s ease; }
      `)
        style.appendChild(css)
        f.contentDocument.head.appendChild(style)
      })
    } catch (error) {
      console.log('Form change theme error', error)
    }
  }

  const moveSubmit = () => {
    if (customClass === 'newsletterOnNewsDetail') {
      const hsEmail = document.querySelector(
        '.newsletterOnNewsDetail .hs-email'
      )
      const hsSubmit = document.querySelector(
        '.newsletterOnNewsDetail .hs-submit'
      )
      hsEmail.appendChild(hsSubmit)
    }

    if (customClass?.includes('newsletterOn')) {
      const hsEmailInput = document.querySelector('.hs-email input')
      if (hsEmailInput) {
        hsEmailInput.setAttribute('placeholder', 'Email address')
      }
    }
    return true
  }

  useEffect(() => {
    const handleCheckEvent = event => {
      if (
        event.data.type === 'hsFormCallback' &&
        event.data.eventName === 'onFormReady'
      ) {
        changeTheme()
      }
    }
    window.addEventListener('message', handleCheckEvent)
    return () => {
      window.removeEventListener('message', handleCheckEvent)
    }
  }, [])

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
            onReady={moveSubmit}
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
    margin-top: 56px;
    height: 410px;
    position: relative;
  }

  &.newsletterOnSnaps {
    min-width: auto;
    width: 460px;
    margin: 0 auto;
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
    width: calc(100% - 40px);
    .dark-mode & {
      box-shadow: 0 10px 30px 0 rgba(255, 255, 255, 0.2);
    }
  }
`

const Form = styled.div`
  display: block;
`
