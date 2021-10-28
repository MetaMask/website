import React, { Component } from 'react'
import styled, { css } from 'styled-components'

export default class extends Component {
  renderBanner = () => (
    <center>
      <Banner id="gdpr-banner">
        <PolicyCopy>
          We use cookies to personalize content and to analyse our website
          traffic. Please review our{' '}
          <PrivacyLink href="https://consensys.net/privacy-policy/">
            {' '}
            Privacy Policy{' '}
          </PrivacyLink>{' '}
          before accepting.
        </PolicyCopy>
        <ButtonContainer>
          <DeclineButton className="gdpr-response" value="false">
            {' '}
            Decline{' '}
          </DeclineButton>
          <AcceptButton className="gdpr-response" value="true">
            {' '}
            Accept{' '}
          </AcceptButton>
        </ButtonContainer>
      </Banner>
    </center>
  )

  render() {
    return this.renderBanner()
  }
}

const Banner = styled.div`
  display: flex;
  visibility: hidden; /* made visible via gdpr-banner script */
  position: fixed;
  z-index: 999;
  bottom: 0;
  left: 0;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100vw;
  height: 150px;
  background-color: ${({ theme }) => theme.primaryColor};
  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    flex-direction: row;
    justify-content: center;
    height: 100px;
  }
`

const PolicyCopy = styled.p`
  width: 80%;
  margin-bottom: 0;
  color: ${({ theme }) => theme.white};
  font-size: ${({ theme }) => theme.font.size.sm}rem;
  text-align: center;
  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    width: 40%;
  }
`

const PrivacyLink = styled.a`
  color: white;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  cursor: pointer;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  margin: 3% 0;
  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    width: 30%;
    margin: 0;
  }
`

const buttonStyle = css`
  padding: 0.4em;
  border: none;
  cursor: pointer;
`

const AcceptButton = styled.button`
  ${buttonStyle}
  background-color: ${({ theme }) => theme.white};
  color:  ${({ theme }) => theme.black};
`

const DeclineButton = styled.button`
  ${buttonStyle}
  background-color: ${({ theme }) => theme.primaryColor};
  color:  ${({ theme }) => theme.white};
`
