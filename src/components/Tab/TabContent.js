import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import TabContentItem from './TabContentItem'

const TabContent = props => {
  const { items, activeId } = props
  return (
    <Content>
      {items.map(item => (
        <TabContentItem {...item} activeId={activeId} />
      ))}
    </Content>
  )
}

export default withTheme(TabContent)

TabContent.propTypes = {
  items: PropTypes.array,
  activeId: PropTypes.string,
}

const Content = styled.div`
  display: block;
  margin-top: 20px;
`
