import { browserName, isAndroid, isIOS, isMobile } from 'react-device-detect'
import React, { Suspense, lazy, useEffect, useState } from 'react'
import styled, { withTheme } from 'styled-components'
import { Section } from './StyledGeneral'
import ContentWrapper from './ContentWrapper'
import Loading from './Loading'
import get from 'lodash/get'
import useIsChromium from '../lib/utils/isChromium'
const TabWrapper = lazy(() => import('./Tab/TabWrapper'))
const TabContentDownload = lazy(() => import('./DownloadTab'))

const DownloadContainer = ({ data, previewMode }) => {
  const [device, setDevice] = useState('')
  const isChromium = useIsChromium()

  useEffect(() => {
    if (isMobile) {
      if (isAndroid) {
        setDevice('android')
      } else if (isIOS) {
        setDevice('ios')
      } else {
        setDevice('browser')
      }
    } else {
      setDevice('browser')
    }
  }, [])

  const isSSR = typeof window === 'undefined'
  const appExtensions = previewMode
    ? get(data, 'modulesCollection.items[0].modulesCollection.items')
    : get(data, 'modules[0].modules')

  if (!appExtensions) return null

  const defaultTitle = isMobile
    ? 'Chrome'
    : isChromium
    ? 'Chromium'
    : browserName
  const tabs = appExtensions.map(item => ({
    label: item.title || defaultTitle,
    id: item.title?.toLowerCase() || 'browser',
    content: !isSSR && (
      <Suspense fallback={<Loading />}>
        <TabContentDownload
          item={item}
          id={item.title || 'browser'}
          previewMode={previewMode}
        />
      </Suspense>
    ),
  }))

  return (
    <Container>
      <ContentWrapper>
        {!isSSR && device ? (
          <Suspense fallback={<div />}>
            <TabWrapper tabs={tabs} activeTabDefault={device} />
          </Suspense>
        ) : null}
      </ContentWrapper>
    </Container>
  )
}

export default withTheme(DownloadContainer)

const Container = styled(Section)``
