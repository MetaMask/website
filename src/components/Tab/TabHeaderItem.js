import React from 'react'
import styled, { withTheme } from 'styled-components'
import lowerCase from 'lodash/lowerCase'
import Context from '../../Context/ContextPage'
const DownloadContainer = props => {
  const {
    activeId,
    label,
    id,
    typeLayout,
    setActiveStateId,
    isTabParam,
  } = props
  const { pagination: paginationContextValue } = React.useContext(Context)
  const { setPaginationPage } = paginationContextValue || {}
  const changeTab = () => {
    setActiveStateId(id)
    if (setPaginationPage) {
      setPaginationPage(1)
    }
    if (isTabParam) {
      window.history.pushState(
        '',
        '',
        `?category=${encodeURIComponent(lowerCase(label))}`
      )
    }
  }
  return (
    <Item typeLayout={typeLayout} active={activeId === id} onClick={changeTab}>
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

  ${({ typeLayout, active, theme }) =>
    typeLayout === 'module'
      ? `
    border-radius: 999px !important;
    height: 40px;
    border: none !important;
    background-color: ${active ? theme.primaryColor : 'transparent'};
    color: ${active ? theme.white : theme.text.dark};
    min-width: 200px;
    white-space: nowrap;

    @media (max-width: ${theme.device.miniDesktopMediaMax}){
      min-width: 100px;
    }
    @media (max-width: ${theme.device.tabletMediaMax}){
      padding: 8px 16px;
    }
    @media (max-width: ${theme.device.mobileMediaMax}){
      padding: 8px 12px;
      width: 100%;
      font-size: 14px;
    }
  `
      : null}
`
