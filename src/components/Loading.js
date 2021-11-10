import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme, keyframes } from 'styled-components'

const Loading = props => {
  const { mini } = props
  return (
    <LoadingWrapper>
      <LoadingIcon mini={mini}></LoadingIcon>
    </LoadingWrapper>
  )
}

export default withTheme(Loading)

Loading.propTypes = {
  mini: PropTypes.bool,
}

const spinLoading = keyframes`
 0% { transform: rotate(0deg) }
 100% { transform: rotate(359deg) }
`
const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;
const LoadingIcon = styled.div`
  display: block;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 8px solid;
  border-color: #3b99d9 rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1);
  animation: ${spinLoading} 1s linear infinite;

  ${({ mini }) =>
    mini
      ? `
  width: 32px;
  height: 32px;
  `
      : ''}
`
