import React from 'react'
import styled, { withTheme } from 'styled-components'

const TabContentItem = props => {
  const {activeId, content, id} = props;
  return (
    <Item active={activeId === id} >
      {content}
    </Item>
  )
}

export default withTheme(TabContentItem)

const Item = styled.div`
  display: none;

  ${({active, theme}) => active ? `
  display: block
  ` : ''}
`;
