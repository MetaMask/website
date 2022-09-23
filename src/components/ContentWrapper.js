import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ContentWrapper = props => {
  const { children, columns, styleOverride, customClass, ...rest } = props
  return (
    <Container className={customClass} styleOverride={styleOverride} {...rest}>
      <ContainerInner>{children}</ContainerInner>
    </Container>
  )
}
export default ContentWrapper

ContentWrapper.propTypes = {
  columns: PropTypes.number,
  styleOverride: PropTypes.string,
}

const Container = styled.div`
  padding-right: 20px;
  padding-left: 20px;

  &.storiesOnNewsDetail {
    margin-bottom: 96px;
    margin-top: 96px;
  }

  &.overlap-bg-32 {
    transform: translateY(32px);
    margin-bottom: 64px;
    @media (min-width: ${({ theme }) => theme.device.miniDesktop}) {
      margin-top: -32px;
    }
  }

  &.sideImageOverflow,
  &.sideImageOverflowRight {
    @media (min-width: ${({ theme }) =>
        theme.device.tablet}) and (max-width: ${({ theme }) =>
        theme.device.twoKResolutionMax}) {
      padding-left: 0;
      padding-right: 0;
    }
  }

  ${({ styleOverride }) => styleOverride}
`

const ContainerInner = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 992px;
  width: 100%;

  .scrolled.custom-newsHero & {
    max-width: calc(992px + 200px);
  }

  @media (max-width: ${({ theme }) => theme.device.miniDesktopMediaMax}) {
    max-width: 728px;
    
    .news-page-content & {
      max-width: 784px;
    }
  }

  .sideImageOverflow &,
  .sideImageOverflowRight & {
    @media (min-width: ${({ theme }) =>
        theme.device.miniDesktop}) and (max-width: ${({ theme }) =>
        theme.device.twoKResolutionMax}) {
      max-width: 100% !important;
      padding-left: max(calc((100vw - 992px) / 2), 20px);
    }

    @media (min-width: ${({ theme }) =>
        theme.device.tablet}) and (max-width: ${({ theme }) =>
        theme.device.miniDesktopMediaMax}) {
      max-width: 100% !important;
      padding-left: max(calc((100vw - 728px) / 2), 20px);
    }
  }

  .metaMaskUninstalled & {
    max-width: 608px;
    border: 1px solid #d6d9dc;
    border-radius: 10px;
    padding: 48px;
    margin-bottom: 48px;

    @media (min-width: 1600px) {
      max-width: 800px;
      padding: 48px 64px;
      margin-bottom: 80px;
    }
    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      max-width: 416px;
      padding: 24px;
      margin-bottom: 8px;
    }
  }
`
