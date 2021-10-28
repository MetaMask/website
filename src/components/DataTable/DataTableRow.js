import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledDataTableRow = props => {
  const { children, containerStyleOverride, rowStyleOverride } = props
  return (
    <DataTableRowContainer css={containerStyleOverride}>
      <DataTableRow css={rowStyleOverride}>{children}</DataTableRow>
    </DataTableRowContainer>
  )
}

export default StyledDataTableRow

StyledDataTableRow.propTypes = {
  containerStyleOverride: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  rowStyleOverride: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
}

const DataTableRowContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100px;

  ${({ styleOverride }) => (styleOverride ? styleOverride : '')}
`

const DataTableRow = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;

  ${({ styleOverride }) => (styleOverride ? styleOverride : '')}
`
