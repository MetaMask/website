import React from 'react'
import styled, { withTheme } from 'styled-components'

const DownloadContainer = props => {
  const { setActiveId, activeId, label, id, typeLayout } = props
  return (
    <Item typeLayout={typeLayout} active={activeId === id} onClick={() => setActiveId(id)}>
      {label}
    </Item>
  )
}

export default withTheme(DownloadContainer)

const Item = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  padding: 8px 24px;
  color: ${({ theme }) => theme.darkBlue};
  border: 1px solid ${({ theme }) => theme.darkBlue};
  &:not(:first-child) {
    border-left: 0;
  }

  &:first-child {
    border-top-left-radius: 24px;
    border-bottom-left-radius: 24px;
  }

  &:last-child {
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;
  }

  ${({ active, theme }) =>
    active
      ? `
  background-color: ${theme.primaryColor};
  color: #fff;
  `
      : ''}

  ${({typeLayout, active, theme}) => typeLayout === 'module' ? `
    border-radius: 999px !important;
    height: 40px;
    border: none !important;
    background-color: ${active ? theme.primaryColor : 'transparent'};
    color: ${active ? theme.white : theme.text.dark};
    @media (min-width: ${theme.device.miniDesktop}){
      min-width: 200px;
    }
  ` : null}
`
