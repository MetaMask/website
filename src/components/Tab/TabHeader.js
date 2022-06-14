import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import TabHeaderItem from './TabHeaderItem'

const TabHeader = props => {
  const {
    items,
    activeId,
    centerAlign,
    typeLayout,
    setActiveStateId,
    isTabParam,
  } = props
  return (
    <Header centerAlign={centerAlign} typeLayout={typeLayout}>
      <HeaderInner typeLayout={typeLayout}>
        {items.map(item => (
          <TabHeaderItem
            {...item}
            activeId={activeId}
            setActiveStateId={setActiveStateId}
            typeLayout={typeLayout}
            isTabParam={isTabParam}
          />
        ))}
      </HeaderInner>
    </Header>
  )
}

export default withTheme(TabHeader)

TabHeader.propTypes = {
  items: PropTypes.array,
}

const Header = styled.div`
  display: flex;
  padding-top: 6px;
  padding-bottom: 6px;

  ${({ centerAlign }) =>
    centerAlign
      ? `
    justify-content: center;
  `
      : ''}
`
const HeaderInner = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  ${({ typeLayout, theme }) =>
    typeLayout === 'module'
      ? `
    padding: 5px 8px;
    background: ${theme.background.tabModuleOuter};
    border-radius: 999px;

    @media (max-width: ${theme.device.mobileMediaMax}){
      width: 100%;
      flex-direction: column;
      border-radius: 8px;
      padding: 8px;
    }
  `
      : ''}
`
