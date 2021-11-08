import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import { Section } from './StyledGeneral'
import ContentWrapper from './ContentWrapper'
// import Loadable from '@loadable/component'

// const { TabWrapper, TabContentDownload } = Loadable(() => import('./Tab'))
const TabWrapper = React.lazy(() => import('./Tab/TabWrapper'))
const TabContentDownload = React.lazy(() => import('./Tab/TabContentDownload'))

const DownloadContainer = props => {
  const { appExtensions } = props
  const isSSR = typeof window === 'undefined'
  const tabs = Object.keys(appExtensions).map((item) => ({
    label: appExtensions[item]['label'],
    id: item,
    content: !isSSR && (
      <React.Suspense fallback={<div />}>
        <TabContentDownload {...appExtensions[item]} id={item} />
      </React.Suspense>
    ),
  }))
  return (
    <Container>
      <ContentWrapper>
        {!isSSR && (
          <React.Suspense fallback={<div />}>
            <TabWrapper tabs={tabs} activeTabDefault={'browser'}></TabWrapper>
          </React.Suspense>
        )}
      </ContentWrapper>
    </Container>
  )
}

export default withTheme(DownloadContainer)

DownloadContainer.propTypes = {
  appExtensions: PropTypes.object,
}

const Container = styled(Section)`
  display: block;
`
