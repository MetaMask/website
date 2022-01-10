import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ContentWrapper = props => {
  const { children, columns, styleOverride, ...rest } = props

  return (
    <Container styleOverride={styleOverride} {...rest}>
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
  ${({ styleOverride }) => styleOverride}
`

const ContainerInner = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 940px;
  width: 100%;
  @media (max-width: ${({ theme }) => theme.device.miniDesktopMediaMax}) {
    max-width: 728px;
  }
`
