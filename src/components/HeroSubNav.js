import React, { useState } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import { useMediaQuery } from 'react-responsive'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'

function HeroSubNav({ headline, modules, previewMode }) {
  const isTablet = useMediaQuery({
    query: '(max-width: 767px)',
  })
  const [expanded, setExpanded] = useState(false)

  const handleHamburgerButton = () => {
    if (!isTablet) return
    setExpanded(!expanded)
  }

  return (
    <Container className={classnames({ 'menu-expanded': expanded })}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div className="title-wrapper" onClick={handleHamburgerButton}>
        <span>{headline}</span>
        <HamburgerButton className="w-icon w-icon-nav-menu" />
      </div>
      <div className="vertical-divider" />
      <div className="menu-list">
        {modules.map(m =>
          contentfulModuleToComponent({
            ...m,
            previewMode,
          })
        )}
      </div>
    </Container>
  )
}

export default HeroSubNav

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  column-gap: 32px;
  font-size: 18px;

  .title-wrapper {
    font-weight: 600;
    font-size: 22px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: padding 0.5s;
  }

  .menu-list {
    display: flex;
    flex-direction: column;
    column-gap: 32px;
    row-gap: 8px;
    max-height: 0;
    transition: max-height 0.5s;
    overflow-y: hidden;
  }
  .vertical-divider {
    display: none;
  }
  a {
    color: inherit;
    transition: color 0.15s;
    &:hover {
      color: #2196f3;
    }
  }
  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    flex-direction: row;
    row-gap: 8px;
    .menu-list {
      flex-direction: row;
      flex-wrap: wrap;
      max-height: unset;
    }
    .vertical-divider {
      border-right: 1px solid #fff;
      display: block;
    }
    .title-wrapper {
      padding-bottom: 0 !important;
      cursor: initial;
    }
  }
  &.menu-expanded {
    .menu-list {
      max-height: 400px;
    }
    .title-wrapper {
      padding-bottom: 16px;
    }
  }
`

const HamburgerButton = styled.div`
  display: none;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s;

  .menu-expanded & {
    background-color: #3b4046;
  }

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    display: inline-flex;
  }
`
