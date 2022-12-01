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
    embedHTML,
    buttonSecondary,
    socialLink,
    previewMode = false,
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
    label = eventLabel?.replace('$browser', downloadBrowsers[keyBrowser]?.text)
    text = textDefault?.replace('$browser', downloadBrowsers[keyBrowser]?.text)
    if (
      ['ios', 'android', 'not-supported'].includes(keyBrowser) &&
      downloadBrowsers[keyBrowser]?.text
    ) {
      text = downloadBrowsers[keyBrowser].text
    }
    link = downloadBrowsers[keyBrowser]?.link
    iconBrowser = downloadBrowsers[keyBrowser]?.icon
  }
  const onClosePopup = () => {
    setShowPopup(false)
  }
  const handleCustomClick = e => {
    if (hubSpotForm) {
      setShowPopup(true)
      return
    }
    if (embedHTML) {
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
      if (
        isMobile &&
        ((isAndroid && downloadBrowsers['android']) ||
          (isIOS && downloadBrowsers['ios']))
      ) {
        if (isAndroid && downloadBrowsers['android']) {
          setKeyBrowser('android')
        } else if (isIOS && downloadBrowsers['ios']) {
          setKeyBrowser('ios')
        }
      } else {
        if (
          typeof navigator?.brave !== 'undefined' &&
          downloadBrowsers['brave']
        ) {
          setKeyBrowser('brave')
        } else if (
          downloadBrowsers[lowerBrowserName] ||
          downloadBrowsers['browsers-supported']
        ) {
          setKeyBrowser(lowerBrowserName)
        } else if (downloadBrowsers['not-supported']) {
          setKeyBrowser('not-supported')
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
          <span dangerouslySetInnerHTML={{ __html: text }} />
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

  if (
    isDownloadBrowser &&
    !Object.keys(downloadBrowsers).includes(keyBrowser) &&
    downloadBrowsers['browsers-supported']
  ) {
    ele = (
      <BrowserWrapper>
        <BrowserInfo>
          <BrowserInfoTitle>
            {downloadBrowsers['browsers-supported'].text}
          </BrowserInfoTitle>
          <BrowserInfoDesc>
            {downloadBrowsers['browsers-supported'].description}
          </BrowserInfoDesc>
        </BrowserInfo>
        <BrowserList>
          {Object.keys(downloadBrowsers).map(key => {
            const { link, icon, text } = downloadBrowsers[key]
            if (['chrome', 'firefox', 'brave', 'edge', 'opera'].includes(key)) {
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
            previewMode,
          })}
        </Popup>
      ) : null}
      {embedHTML ? (
        <Popup
          width={'800px'}
          showPopup={showPopup}
          onClosePopup={onClosePopup}
          hideCloseIcon
        >
          <EmbedHtmlPopup
            dangerouslySetInnerHTML={{
              __html: embedHTML.embed.embed,
            }}
          ></EmbedHtmlPopup>
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
  previewMode: PropTypes.bool,
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
  .snapsLiveMetaMaskFlask & {
    justify-content: center;
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

  &:hover {
    .arrowAnimation:after {
      margin-left: 6px;
    }
  }

  .news-content &,
  .storiesOnNewsDetail & {
    svg {
      width: 24px;
      path {
        fill: none;
        stroke: ${({ theme }) => theme.text.default};
      }
    }
  }

  .snapsLiveMetaMaskFlask & {
    color: #222;
    background-color: #ffffffbf;
    padding: 6px;
    gap: 6px;
    border-radius: 32px;
    font-weight: 700;
    transition: ease 0.3s all;
    span > span:first-child {
      background: #bb2534;
      border-radius: 16px;
      color: #fff;
      padding: 2px 10px;
      margin-right: 4px;
    }
    &:hover {
      background-color: white;
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
        color: ${theme.primaryColor};
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
    .storiesOnNewsDetail & {
      path {
        fill: none;
        stroke: ${({ theme }) => theme.primaryColor};
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
    width: 20%;
    padding: 16px;

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

const EmbedHtmlPopup = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 2;
  overflow: hidden;

  &:before {
    content: '';
    display: block;
    padding-bottom: 56.25%;
  }

  iframe {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    margin: 0 !important;
  }
`
