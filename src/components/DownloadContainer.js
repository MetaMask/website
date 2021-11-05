import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import { TabWrapper, TabContentDownload } from './Tab'
import { Section } from './StyledGeneral'
import ContentWrapper from './ContentWrapper'

const DownloadContainer = props => {
  const { appExtensions } = props
  const tabs = Object.keys(appExtensions).map((item, index) => ({
    label: appExtensions[item]['label'],
    id: `t${index}`,
    content: (
      <TabContentDownload
        image={appExtensions[item]['image']}
        title={appExtensions[item]['heading']}
        ctas={appExtensions[item]['ctas']}
        ctaHeading={appExtensions[item]['ctaHeading']}
      />
    ),
  }))
  return (
    <Container>
      <ContentWrapper>
        <TabWrapper tabs={tabs} activeTabDefault={'t0'}></TabWrapper>
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
