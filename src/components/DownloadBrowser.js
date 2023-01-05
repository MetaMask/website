import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import { Section } from './StyledGeneral'
import ContentWrapper from './ContentWrapper'
import Image from './Image'
import Link from './Link'

const DownloadBrowser = props => {
  const { browsers } = props

  return (
    <Container className={'bg-gray'} sectionPadding={'88px'}>
      <ContentWrapper>
        <Heading>Supported Browsers</Heading>
        {browsers && browsers.length ? (
          <BrowserWrapper>
            <BrowserList>
              {browsers.map(browser => {
                const { cta, image, label } = browser
                return (
                  <BrowserItem
                    key={label}
                    to={cta?.ctaLink}
                    newTab={cta?.newTab}
                  >
                    <Image image={image} />
                    <BrowserName>{label}</BrowserName>
                  </BrowserItem>
                )
              })}
            </BrowserList>
          </BrowserWrapper>
        ) : null}
      </ContentWrapper>
    </Container>
  )
}

export default withTheme(DownloadBrowser)

DownloadBrowser.propTypes = {
  browsers: PropTypes.arrayOf(
    PropTypes.shape({
      cta: PropTypes.object,
      image: PropTypes.object,
      label: PropTypes.string,
    })
  ).isRequired,
}

const Container = styled(Section)`
  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    padding-top: 88px !important;
    padding-bottom: 88px !important;
  }
`
const BrowserWrapper = styled.div`
  display: block;
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
    padding: 20px;

    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      width: 33.33%;
    }

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
`
const Heading = styled.h2`
  margin-bottom: 32px;
  font-size: 35px;
  line-height: 40px;
  font-weight: 700;
  text-align: center;
  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    padding-right: 10px;
    padding-left: 10px;
  }
`
