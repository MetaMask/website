import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'

import Link from './Link'
import ResponsiveLabsLogo from './ResponsiveLabslogo'
import NewsletterForm from './NewsletterForm'
import Wrapper from './ContentWrapper'
import { FooterTitle } from './StyledGeneral'

const StyledFooter = props => {
  const { columns } = props

  const renderLinks = links =>
    links.map(link => (
      <div key={link.to}>
        <FooterLink to={link.to} newTab={link.newTab}>
          {link.text}
        </FooterLink>
      </div>
    ))

  const renderLinkColumns = () =>
    columns.map(c => (
      <Column key={c.title}>
        {c.title && <FooterTitle> {c.title} </FooterTitle>}
        {renderLinks(c.links)}
      </Column>
    ))

  return (
    <FooterContainer>
      <Wrapper
        size={'wide'}
        styleOverride={`margin-top: 0 !important;margin-bottom: 0!important;`}
      >
        <FooterInner>
          <ColumnContainer cols={(columns.length || 0) + 1}>
            <Column>
              <ResponsiveLabsLogo logoType="icon" forceColor="white" />
            </Column>
            <LinkContainer cols={columns.length}>
              {renderLinkColumns()}
            </LinkContainer>
            <Column>
              <NewsletterForm
                alignSelf="left"
                backgroundColor="dark"
                location={'footer'}
              />
            </Column>
          </ColumnContainer>

          <SubFooterContainer>
            <PolicyCopy>
              <PolicyCopyLink as="span">
                @{new Date().getFullYear()} MetaMask
              </PolicyCopyLink>
            </PolicyCopy>
            <PolicyCopy>
              <PolicyCopyLink to="https://consensys.net/privacy-policy/">
                Privacy Policy
              </PolicyCopyLink>
              <PolicyCopyLink to="https://consensys.net/terms-of-use/">
                Terms of use
              </PolicyCopyLink>
            </PolicyCopy>
          </SubFooterContainer>
        </FooterInner>
      </Wrapper>
    </FooterContainer>
  )
}

export default StyledFooter

StyledFooter.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      links: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
          to: PropTypes.string,
        })
      ).isRequired,
    })
  ).isRequired,
}

const FooterContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.footerBg};
  margin: 5rem 0 0 0;
`

const FooterInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 90px 0 25px 0;
  min-height: 400px;
`

const ColumnContainer = styled.div`
  display: flex;
  flex: 4;
  flex-direction: column;
  justify-content: space-around;
  max-width: ${({ theme }) => theme.container.wide};

  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    display: grid;
    grid-column-gap: 80px;
    grid-template-columns: 120px 1fr 270px;
  }
  @media (min-width: ${({ theme }) => theme.device.desktop}) {
    grid-column-gap: 80px;
    grid-template-columns: 215px 1fr 392px;
  }
`

const LinkContainer = styled.div`
  display: grid;
  grid-column-gap: ${({ cols }) => 130 / cols}px;
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: ${({ theme }) => theme.device.desktop}) {
    grid-template-columns: repeat(${({ cols }) => cols}, 1fr);
  }
`

const Column = styled.div`
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.font.size.lg}rem;
`

const linkStyles = css`
  transition: all 0.15s ease;
  color: #6c6c70;
  font-size: ${({ theme }) => theme.font.size.xxs}rem;
  text-decoration: none;
  &:hover {
    color: #fff;
  }
`

const FooterLink = styled(Link)`
  display: block;
  ${linkStyles}
  line-height: 2.5;
  font-weight: 400;
`

const SubFooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: auto;
  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    flex-direction: row;
  }
`

const PolicyCopyLink = styled(Link)`
  ${linkStyles}
  display: block;
  margin: 5px 0;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-size: 10px;
  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    display: inline-block;
    margin: 0;
  }
`

const PolicyCopy = styled.div`
  margin: 0;
  color: ${({ theme }) => theme.white};
  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    & ${PolicyCopyLink}:nth-child(2) {
      margin-left: 15px;
      padding-left: 15px;
      border-left: 1px solid gray;
    }
  }
`
