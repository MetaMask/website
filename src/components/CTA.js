import PropTypes from 'prop-types'
import React from 'react'
import Arrow from './ArrowIcon'
import Button from './Button'
import isEmpty from 'lodash/isEmpty'
import lowerCase from 'lodash/lowerCase'
import { isAndroid, isIOS, isMobile, browserName } from 'react-device-detect'
import Link from './Link'
import SocialIcon from './SocialIcon'
import styled from 'styled-components'
import { trackCustomEvent } from 'gatsby-plugin-google-analytics'
import Popup from './Popup'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import Image from './Image'
import classnames from 'classnames'

const CTA = props => {
  const {
    link: linkDefault,
    text: textDefault,
    align = 'left',
    newTab,
    iconConfig,
    color,
    button = false,
    showRightArrow = false,
    showLeftArrow = false,
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
    socialLink,
  } = props
  const [keyBrowser, setKeyBrowser] = React.useState('chrome')
  const isButton = buttonDisplay || button
  const defaultIconConfig = { width: '1.5em', height: '0.5em', fill: 'black' }
  const icon = { ...defaultIconConfig, fill: color, ...iconConfig }
  const isDownloadBrowser = !isEmpty(downloadBrowsers)
  const [delayShow, setDelayShow] = React.useState(isDownloadBrowser)
  const [showPopup, setShowPopup] = React.useState(false)
  let text = textDefault,
    link = linkDefault,
    label = eventLabel,
    lowerBrowserName = lowerCase(browserName),
    iconBrowser = ''
  if (isDownloadBrowser && keyBrowser && downloadBrowsers[keyBrowser]) {
    label = eventLabel.replace('$browser', downloadBrowsers[keyBrowser].text)
    text = textDefault.replace('$browser', downloadBrowsers[keyBrowser].text)
    if (['ios', 'android'].includes(keyBrowser)) {
      text = downloadBrowsers[keyBrowser].text
    }
    link = downloadBrowsers[keyBrowser]?.link
    iconBrowser = downloadBrowsers[keyBrowser].icon
  }
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
        label: label,
      })
    }
  }
  React.useEffect(() => {
    if (isDownloadBrowser) {
      if (typeof navigator?.brave !== 'undefined') {
        setKeyBrowser('brave')
      } else if (isMobile) {
        if (isAndroid && downloadBrowsers['android']) {
          setKeyBrowser('android')
        } else if (isIOS && downloadBrowsers['ios']) {
          setKeyBrowser('ios')
        } else {
          setKeyBrowser('chrome')
        }
      } else {
        if (downloadBrowsers[lowerBrowserName]) {
          setKeyBrowser(lowerBrowserName)
        } else {
          setKeyBrowser('chrome')
        }
      }
      setDelayShow(false)
    }
  }, [downloadBrowsers, isDownloadBrowser, lowerBrowserName])
  let ele = (
    <CTAContainer
      className={classnames('ctaModuleContainer', {
        socialLink: socialLink,
      })}
      align={align}
    >
      <ContentWrapper
        to={link}
        newTab={newTab || isDownloadBrowser}
        color={color}
        typeLayout={typeLayout}
        onClick={handleCustomClick}
      >
        {socialLink ? <SocialIcon name={socialLink} /> : null}
        <LinkTitle
          className={classnames({
            [`leftArrow`]: showLeftArrow,
            [`rightArrow`]: showRightArrow || socialLink,
          })}
        >
          {showLeftArrow ? <Arrow {...icon} transform={'rotate(180)'} /> : null}
          {text}
          {showRightArrow || socialLink ? <Arrow {...icon} /> : null}
        </LinkTitle>
      </ContentWrapper>
    </CTAContainer>
  )
  if (isButton) {
    ele = (
      <Button
        size={buttonSize}
        link={link}
        text={text}
        className={keyBrowser}
        newTab={newTab || isDownloadBrowser}
        color={buttonSecondary ? 'secondary' : color}
        customClick={handleCustomClick}
        fontSize={fontSize}
        buttonGradient={buttonGradient}
        eventCategory={eventCategory}
        eventLabel={eventLabel}
        iconUrl={!delayShow ? iconBrowser : ''}
        iconPosition={['ios', 'android'].includes(keyBrowser) ? 'start' : 'end'}
        hide={delayShow}
      />
    )
  }

  if (isDownloadBrowser && keyBrowser === 'safari') {
    ele = (
      <BrowserWrapper>
        <BrowserInfo>
          <BrowserInfoTitle>
            {downloadBrowsers[keyBrowser].text}
          </BrowserInfoTitle>
          <BrowserInfoDesc>
            {downloadBrowsers[keyBrowser].description}
          </BrowserInfoDesc>
        </BrowserInfo>
        <BrowserList>
          {Object.keys(downloadBrowsers).map(key => {
            const { link, icon, text } = downloadBrowsers[key]
            if (['chrome', 'firefox', 'brave', 'edge'].includes(key)) {
              return (
                <BrowserItem key={text} to={link} newTab>
                  <Image src={icon} />
                  <BrowserName>{text}</BrowserName>
                </BrowserItem>
              )
            }
            return null
          })}
        </BrowserList>
      </BrowserWrapper>
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
  showRightArrow: PropTypes.bool,
  showLeftArrow: PropTypes.bool,
  newTab: PropTypes.bool,
  eventCategory: PropTypes.string,
  eventLabel: PropTypes.string,
  socialLink: PropTypes.string,
}

const CTAContainer = styled.div`
  ${({ align }) =>
    align
      ? `
    display: flex;
    justify-content: ${alignMapping(align)}
  `
      : ''}
  &.socialLink {
    > a {
      display: flex;
      justify-items: center;
      align-items: center;
      color: ${({ theme }) => theme.text.default};
    }
  }
  .storiesOnNewsDetail & {
    padding-left: 0;
    @media (min-width: ${({ theme }) => theme.device.miniDesktop}) {
      position: absolute;
      top: -110px;
    }
  }
`
const LinkTitle = styled.span`
  display: flex;
  align-items: center;
  svg {
    width: 20px;
    margin-left: 8px;
    overflow: initial;
    path {
      fill: ${({ theme }) => theme.text.default};
    }
  }
  &.leftArrow {
    svg {
      margin: 2px 12px 0 0;
    }
  }
`
const ContentWrapper = styled(Link)`
  transition: all 0.15s ease;
  text-decoration: none;
  position: relative;
  .news-content &,
  .storiesOnNewsDetail &{
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.text.default};
  }
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

  &:hover {
    .news-content &,
    .storiesOnNewsDetail &{
      path{
        fill: ${({ theme }) => theme.darkBlue};
      }
    }
  }
`

const alignMapping = align => {
  if (align === 'right') return 'flex-end'
  if (align === 'middle' || align === 'center') return 'center'
  return 'flex-start'
}

const BrowserWrapper = styled.div`
  display: block;
  padding: 24px;
  background: rgba(215, 58, 73, 0.1);
  border-radius: 12px;
`

const BrowserInfo = styled.div`
  color: ${({ theme }) => theme.danger};
  margin-bottom: 16px;
`

const BrowserInfoTitle = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  margin-bottom: 8px;
`

const BrowserInfoDesc = styled.div`
  font-size: 16px;
  line-height: 24px;
`

const BrowserList = styled.div`
  display: flex;
  flex-flow: wrap;
  margin: -20px;

  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    margin: -12px;
  }

  & > * {
    width: 25%;
    padding: 20px;
    @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
      width: 100%;
      padding: 12px;
    }
  }
`

const BrowserItem = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  color: ${({ theme }) => theme.text.body};

  img {
    width: 50px;
    height: 50px;
  }
`

const BrowserName = styled.div`
  display: block;
  margin-top: 16px;
  color: ${({ theme }) => theme.text.body};
`
