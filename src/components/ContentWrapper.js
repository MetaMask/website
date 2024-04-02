import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ContentWrapper = props => {
  const { children, columns, styleOverride, customClass, size, ...rest } = props
  return (
    <Container className={customClass} styleOverride={styleOverride} {...rest}>
      <ContainerInner size={size}>{children}</ContainerInner>
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
  &.sideImageOverflowRight,
  &.sideImageOverflowAll {
    @media (min-width: ${({ theme }) =>
        theme.device.tablet}) and (max-width: ${({ theme }) =>
        theme.device.twoKResolutionMax}) {
      padding-left: 0;
      padding-right: 0;
    }
  }

  &.overflowHidden {
    overflow: hidden;
  }

  &.addMoreDesktopPb56 {
    @media (min-width: ${({ theme }) => theme.device.tablet}) {
      padding-bottom: 56px;
    }
  }

  ${({ styleOverride }) => styleOverride}

  &.feature-meet-flask, &.feature-api-playground {
    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      padding: 0;
    }
  }

  &.feature-infura-gas {
    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      padding: 0;
      background-color: #24292e;
      h2,
      p {
        color: #fff;
      }
    }
  }
`

const ContainerInner = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: var(--container-width);
  width: 100%;

  .normalContainer & {
    max-width: 992px;
  }

  .scrolled.custom-newsHero & {
    max-width: calc(992px + 200px);
  }

  ${({ size }) => size === 'wide' && 'max-width: 1200px;'}

  @media (max-width: ${({ theme }) => theme.device.miniDesktopMediaMax}) {
    max-width: var(--container-width-miniDesktop);

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
      padding-left: max(calc((100vw - var(--container-width)) / 2), 20px);
    }

    @media (min-width: ${({ theme }) =>
      theme.device.tablet}) and (max-width: ${({ theme }) =>
  theme.device.miniDesktopMediaMax}) {
      max-width: 100% !important;
      padding-left: max(
        calc((100vw - var(--container-width-miniDesktop)) / 2),
        20px
      );
    }
  }

  .sideImageOverflowAll & {
    @media (min-width: ${({ theme }) =>
      theme.device.miniDesktop}) and (max-width: ${({ theme }) =>
  theme.device.twoKResolutionMax}) {
      max-width: 100% !important;
    }

    @media (min-width: ${({ theme }) =>
      theme.device.tablet}) and (max-width: ${({ theme }) =>
  theme.device.miniDesktopMediaMax}) {
      max-width: 100% !important;
    }
  }

  .metaMaskUninstalled & {
    max-width: 800px;
    border: 1px solid #d6d9dc;
    border-radius: 10px;
    padding: 40px 48px;
    margin-bottom: 48px;

    @media (min-width: 1600px) {
      max-width: 980px;
      padding: 40px 102px;
      margin-bottom: 80px;
    }

    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      max-width: 416px;
      padding: 24px;
      margin-bottom: 8px;
    }
  }

  .feature-meet-flask &,
  .feature-api-playground & {
    background-color: #24292e;
    overflow: hidden;

    @media (min-width: ${({ theme }) => theme.device.tablet}) {
      border-radius: 12px;
    }
  }
`
