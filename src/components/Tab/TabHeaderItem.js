import React from 'react'
import styled, { withTheme } from 'styled-components'
import Link from '../Link'
import lowerCase from 'lodash/lowerCase'

const TabHeaderItem = props => {
  const {
    activeId,
    label,
    slug,
    id,
    typeLayout,
    setActiveStateId,
    isTabParam,
  } = props

  const changeTab = () => {
    setActiveStateId(id)
  }

  if (isTabParam) {
    const newsCategory = encodeURIComponent(lowerCase(slug))
    let newsCategoryUrl = `/news/${newsCategory}/`
    if (newsCategory === 'latest') {
      newsCategoryUrl = '/news/'
    }
    return (
      <Link to={newsCategoryUrl}>
        <Item typeLayout={typeLayout} active={activeId === id}>
          {label}
        </Item>
      </Link>
    )
  }
  return (
    <Item typeLayout={typeLayout} active={activeId === id} onClick={changeTab}>
      {label}
    </Item>
  )
}

export default withTheme(TabHeaderItem)

const Item = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  padding: 8px 24px;
  color: ${({ theme }) => theme.primaryColor};
  border: 1px solid ${({ theme }) => theme.primaryColor};

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
    background-color: ${theme.button.primary.bg};
    color: ${theme.button.primary.text};
  `
      : ''}

  ${({ typeLayout, active, theme }) =>
    typeLayout === 'module'
      ? `
    border-radius: 999px !important;
    height: 40px;
    border: none !important;
    background-color: ${active ? theme.button.primary.bg : 'transparent'};
    color: ${active ? theme.button.primary.text : theme.text.darkGray};
    box-shadow: ${active ? '0 4px 9px rgba(196, 196, 196, 0.1)' : ''};
    min-width: 190px;
    white-space: nowrap;
    
    &:hover {
      color: ${!active ? theme.text.dark : ''};
    }
    
    @media (max-width: ${theme.device.miniDesktopMediaMax}){
      min-width: 100px;
    }
    @media (max-width: ${theme.device.tabletMediaMax}){
      padding: 8px 104px;
    }
    @media (max-width: ${theme.device.mobileMediaMax}){
      padding: 8px 12px;
      width: 100%;
      font-size: 14px;
    }
  `
      : null}
`
