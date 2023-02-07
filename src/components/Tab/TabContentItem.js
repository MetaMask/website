import React from 'react'
import styled, { withTheme } from 'styled-components'

const TabContentItem = props => {
  const { activeId, content, id } = props
  if (activeId !== id) return null
  return <Item>{content}</Item>
}

export default withTheme(TabContentItem)

const Item = styled.div``
