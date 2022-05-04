import PropTypes from 'prop-types'
import React from 'react'
import Arrow from './ArrowIcon'
import Button from './Button'
import isEmpty from 'lodash/isEmpty'
import lowerCase from 'lodash/lowerCase'
import { isAndroid, isIOS, isMobile, browserName } from 'react-device-detect'
import Link from './Link'
import styled from 'styled-components'
import { trackCustomEvent } from 'gatsby-plugin-google-analytics'
import Popup from './Popup'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'

const CTA = props => {
  const {
    link: linkDefault,
    text: textDefault,
    align = 'left',
    newTab,
    iconConfig,
    color,
    button = false,
    isHideArrow = true,
    typeLayout = '',
    buttonSize,
    customClick,
    buttonDisplay,
    fontSize,
    buttonGradient,
    downloadBrowsers,
    eventCategory,
    eventLabel,
    hubSpotForm,
    buttonSecondary,
  } = props
  const [keyBrowser, setKeyBrowser] = React.useState('chrome')
  const isButton = buttonDisplay || button
  const defaultIconConfig = { width: '1.5em', height: '0.5em', fill: 'black' }
  const icon = { ...defaultIconConfig, fill: color, ...iconConfig }
  const isDownloadBrowser = !isEmpty(downloadBrowsers)
  const [showPopup, setShowPopup] = React.useState(false)
  const onClosePopup = () => {
    setShowPopup(false)
  }
  const handleCustomClick = e => {
    if (hubSpotForm) {
      setShowPopup(true)
      return
    }
    if (customClick) {
      e.preventDefault()
      customClick()
    }
    if (eventCategory && eventLabel) {
      trackCustomEvent({
        category: eventCategory,
        action: 'Click',
        label: eventLabel,
      })
    }
  }
  let text = textDefault,
    link = linkDefault
  if (isDownloadBrowser && keyBrowser && downloadBrowsers[keyBrowser]) {
    text = textDefault.replace('$browser', downloadBrowsers[keyBrowser].text)
    link = downloadBrowsers[keyBrowser].link
  }
  React.useEffect(() => {
    if (isDownloadBrowser) {
      if (isMobile) {
        if (isAndroid && downloadBrowsers['android']) {
          setKeyBrowser('android')
        } else if (isIOS && downloadBrowsers['ios']) {
          setKeyBrowser('ios')
        } else {
          setKeyBrowser('chrome')
        }
      } else {
        const lowerBrowser = lowerCase(browserName)
        if (downloadBrowsers[lowerBrowser]) {
          setKeyBrowser(lowerBrowser)
        } else {
          setKeyBrowser('chrome')
        }
      }
    }
  }, [downloadBrowsers, isDownloadBrowser])
  let ele = (
    <CTAContainer className="ctaModuleContainer" align={align}>
      <ContentWrapper
        to={link}
        newTab={newTab || isDownloadBrowser}
        color={color}
        typeLayout={typeLayout}
        onClick={handleCustomClick}
      >
        {text} {!isHideArrow ? <Arrow {...icon} /> : null}
      </ContentWrapper>
    </CTAContainer>
  )
  if (isButton) {
    ele = (
      <Button
        size={buttonSize}
        link={link}
        text={text}
        newTab={newTab || isDownloadBrowser}
        color={buttonSecondary ? 'secondary' : color}
        customClick={handleCustomClick}
        fontSize={fontSize}
        buttonGradient={buttonGradient}
        eventCategory={eventCategory}
        eventLabel={eventLabel}
      />
    )
  }

  return (
    <>
      {ele}
      {hubSpotForm ? (
        <Popup showPopup={showPopup} onClosePopup={onClosePopup}>
          {contentfulModuleToComponent({
            ...hubSpotForm,
          })}
        </Popup>
      ) : null}
    </>
  )
}

export default CTA

CTA.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string,
  button: PropTypes.bool,
  align: PropTypes.string,
  iconConfig: PropTypes.object,
  isHideArrow: PropTypes.bool,
  newTab: PropTypes.bool,
  eventCategory: PropTypes.string,
  eventLabel: PropTypes.string,
}

const CTAContainer = styled.div`
  ${({ align }) =>
    align
      ? `
    display: flex;
    justify-content: ${alignMapping(align)}
  `
      : ''}
`

const ContentWrapper = styled(Link)`
  transition: all 0.15s ease;
  text-decoration: none;

  ${({ typeLayout, color, theme }) =>
    typeLayout === ''
      ? `
      color: ${color};
    &:hover {
      color: ${theme.darkBlue};
    }
  `
      : ``}
  ${({ typeLayout, theme }) =>
    typeLayout === 'header'
      ? `
    font-size: 16px;
    line-height: 22px;
    height: 56px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 4px;
    padding: 8px;
    border-radius: 4px;
    background-color: transparent;
    font-weight: 400;
    height: auto;
    color: ${theme.text.menu};
    &:hover {
      background-color: ${theme.text.menuBgHover};
      color: ${theme.text.menuHover};
    }
  `
      : ``}
  ${({ typeLayout, theme }) =>
    typeLayout === 'footer'
      ? `
    color: ${theme.text.menuFooter};
    font-size: 12px;
    line-height: 30px;
    font-weight: 400;
    &:hover {
      color: ${theme.text.menuFooterHover};
    }
    @media (max-width: ${theme.device.mobileMediaMax}) {
      font-size: 16px;
      line-height: 44px;
    }
  `
      : ``}
`

const alignMapping = align => {
  if (align === 'right') return 'flex-end'
  if (align === 'middle' || align === 'center') return 'center'
  return 'flex-start'
}
