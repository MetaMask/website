import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import { browserName, isMobile } from 'react-device-detect'
import styled, { withTheme } from 'styled-components'
import useIsChromium from '../lib/utils/isChromium'
import React, { useEffect, useState } from 'react'
import ParseMD from './ParseMD'
import get from 'lodash/get'
import Image from './Image'

const TabContentDownload = props => {
  const { item, id, previewMode } = props
  const { image, description } = item
  const title = previewMode
    ? description
    : description?.childMarkdownRemark?.html

  const isChromium = useIsChromium()

  let ctas = previewMode
    ? get(item, 'ctaCollection.items[0].downloadBrowsers')
    : get(item, 'cta[0].downloadBrowsers')

  let ctaFirefox,
    ctaChrome,
    ctaOpera,
    ctaEdge,
    ctaChromeBrowser,
    ctaFirefoxBrowser

  if (ctas) {
    ctas = previewMode
      ? ctas
      : ctas.map(cta => JSON.parse(cta.internal.content))
    ctaFirefox = ctas.find(c => c.name === 'ctaFirefox')
    ctaChrome = ctas.find(c => c.name === 'ctaChrome')
    ctaOpera = ctas.find(c => c.name === 'ctaOpera')
    ctaEdge = ctas.find(c => c.name === 'ctaEdge')
    ctaChromeBrowser = ctas.find(c => c.name === 'ctaChromeBrowser')
    ctaFirefoxBrowser = ctas.find(c => c.name === 'ctaFirefoxBrowser')
  }

  const mobileCta = previewMode ? get(item, 'ctaCollection.items') : item.cta
  const [downloadForFirefox, setDownloadForFirefox] = useState(ctaFirefox)

  useEffect(() => {
    ;(async () => {
      if (id === 'browser' && browserName === 'Firefox') {
        try {
          const firefoxAddon = await fetch(
            'https://addons.mozilla.org/api/v5/addons/addon/ether-metamask/'
          )
          const data = await firefoxAddon.json()
          const latestVersion = get(data, 'current_version.file.url')

          if (latestVersion) {
            setDownloadForFirefox({
              ...downloadForFirefox,
              ctaLink: latestVersion,
              newTab: false,
            })
          }
        } catch (e) {}
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let ctasDownload, ctasHeading
  if (id === 'browser') {
    const isChrome = browserName === 'Chrome' || browserName === 'Brave'
    const isFirefox = browserName === 'Firefox'
    const isOpera = browserName === 'Opera'
    const isEdge = browserName === 'Edge'

    if (isChromium) {
      ctasDownload = [
        {
          ...ctaChrome,
          text: ctaChrome.text.replace(/Chrome/g, 'Chromium'),
        },
      ]
    } else if (isChrome || isMobile) {
      ctasDownload = [ctaChrome]
    } else if (isFirefox) {
      ctasDownload = [downloadForFirefox]
    } else if (isOpera) {
      ctasDownload = [ctaOpera]
    } else if (isEdge) {
      ctasDownload = [ctaEdge]
    } else {
      ctasHeading = `${browserName} is not supported. Please download a browser that supports MetaMask.`
      ctasDownload = [ctaChromeBrowser, ctaFirefoxBrowser]
    }

    ctasDownload = ctasDownload.map(c => ({
      displayText: c.text,
      internal: {
        type: 'ContentfulCta',
      },
      ctaLink: c.link,
      buttonDisplay: true,
      fontSize: '20px',
      newTab: true,
      __typename: 'Cta',
    }))
  } else {
    ctasDownload = mobileCta
  }

  return (
    <>
      {title ? (
        <Heading>
          <ParseMD>{title}</ParseMD>
        </Heading>
      ) : null}

      {image ? (
        <ImageWrapper>
          <Image image={image} previewMode={previewMode} />
        </ImageWrapper>
      ) : null}

      <DownLoadWrapper>
        {ctasHeading ? <HeadingCta>{ctasHeading}</HeadingCta> : null}
        <Buttons>
          {ctasDownload && ctasDownload.length
            ? ctasDownload.map(cta =>
                contentfulModuleToComponent({ ...cta, previewMode })
              )
            : null}
        </Buttons>
      </DownLoadWrapper>
    </>
  )
}

export default withTheme(TabContentDownload)

const Heading = styled.h2`
  font-size: 35px;
  line-height: 40px;
  font-weight: 700;
  text-align: center;
  padding: 20px 0;
`

const ImageWrapper = styled.div`
  width: 664px;
  max-width: 100%;
  margin: 20px auto 0;
`

const DownLoadWrapper = styled.div`
  display: flex;
  padding: 40px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.background.downloadCta};
  box-shadow: 1px 1px 8px 1px
    ${({ theme }) => theme.background.downloadCtaShadow};
  position: relative;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    margin: 0 -20px;
  }
`

const HeadingCta = styled.div`
  font-family: 'Arial', 'Helvetica Neue', 'Helvetica', sans-serif;
  font-size: 24px;
  margin-bottom: 40px;
  line-height: 1.3;
  max-width: 880px;
`

const Buttons = styled.div`
  display: flex;

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    display: block;
    text-align: center;
  }

  & > * {
    margin: 0 20px;
    height: auto !important;
    padding: 12px 20px !important;

    &:last-child:first-child {
      margin: 0 !important;
    }

    @media (min-width: ${({ theme }) => theme.device.miniDesktop}) {
      margin: 0 60px;
    }

    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      margin: 10px;
    }

    @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
      width: 100%;
    }
  }
`
