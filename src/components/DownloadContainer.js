import PropTypes from 'prop-types'
import {isAndroid, isIOS, isMobile} from 'react-device-detect'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import { Section } from './StyledGeneral'
import ContentWrapper from './ContentWrapper'
import Loading from './Loading'
import isEmpty from 'lodash/isEmpty'
const TabWrapper = React.lazy(() => import('./Tab/TabWrapper'))
const TabContentDownload = React.lazy(() => import('./DownloadTab'))

const DownloadContainer = props => {
  const [device, setDevice] = React.useState('');
  const { appExtensions } = props
  React.useEffect(() => {
    if (isMobile){
      if(isAndroid) {
        setDevice('android')
      }else if (isIOS) {
        setDevice('ios')
      } else {
        setDevice('browser')
      }
    } else {
      setDevice('browser')
    }
  }, [])
  if (isEmpty(appExtensions)) return null
  const isSSR = typeof window === 'undefined'
  const tabs = Object.keys(appExtensions).map(item => ({
    label: appExtensions[item]['label'],
    id: item,
    content: !isSSR && (
      <React.Suspense fallback={<Loading />}>
        <TabContentDownload {...appExtensions[item]} id={item} />
      </React.Suspense>
    ),
  }))

 

  return (
    <Container>
      <ContentWrapper>
        {!isSSR && device ? (
          <React.Suspense fallback={<div />}>
            <TabWrapper tabs={tabs} activeTabDefault={device}></TabWrapper>
          </React.Suspense>
        ) : null}
      </ContentWrapper>
    </Container>
  )
}

export default withTheme(DownloadContainer)

DownloadContainer.propTypes = {
  appExtensions: PropTypes.object,
}

const Container = styled(Section)``
