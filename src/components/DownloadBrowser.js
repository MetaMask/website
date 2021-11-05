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
        <Heading>
          Supported Browsers
        </Heading>
        {browsers && browsers.length ? (
          <BrowserWrapper>
            <BrowserList>
              {browsers.map(browser => (
                <BrowserItem>
                  <Image image={browser.image} />
                  <BrowserName>{browser.label}</BrowserName>
                </BrowserItem>
              ))}
            </BrowserList>
          </BrowserWrapper>
        ) : null}
      </ContentWrapper>
    </Container>
  )
}

export default withTheme(DownloadBrowser)

DownloadBrowser.propTypes = {
  appExtensions: PropTypes.object,
}

const Container = styled(Section)`
  display: block;
`
const BrowserWrapper = styled.div`
  display: block;
`

const BrowserList = styled.div`
  display: flex;
  flex-flow: wrap;
  margin: -20px;

  & > * {
    width: 25%;
    padding: 20px;
    @media (max-width: ${({theme}) => theme.device.mobileMediaMax}){
      width: 100%;
    }
  }
`

const BrowserItem = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  color: #333;

  
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
  font-weight: 700;
  text-align: center;
`;