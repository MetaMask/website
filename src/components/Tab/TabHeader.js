import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import TabHeaderItem from './TabHeaderItem'

const TabHeader = props => {
  const { items, activeId, setActiveId, centerAlign } = props
  return (
    <Header centerAlign={centerAlign}>
      {items.map(item => (
        <TabHeaderItem
          {...item}
          activeId={activeId}
          setActiveId={setActiveId}
        />
      ))}
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
