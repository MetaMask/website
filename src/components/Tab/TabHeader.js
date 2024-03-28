import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import TabHeaderItem from './TabHeaderItem'
import { useLocation } from '@reach/router'
import qs from 'query-string'
import Context from '../../Context/ContextPage'

const TabHeader = props => {
  const {
    items,
    activeId,
    centerAlign,
    typeLayout,
    setActiveStateId,
    isTabParam,
  } = props
  const { header: headerREF } = React.useContext(Context)
  const { headerRef } = headerREF || {}
  const { heroContainer: heroContainerREF } = React.useContext(Context)
  const { heroContainerRef } = heroContainerREF || {}

  const { pagination: paginationContextValue } = React.useContext(Context)
  const { paginationPage } = paginationContextValue || {}
  const ref = React.useRef(null)
  const location = useLocation()
  const params = qs.parse(location.search)

  React.useEffect(() => {
    if (ref && ref.current && (params.category || params.page)) {
      const y =
        headerRef.current.clientHeight +
        heroContainerRef.current.clientHeight -
        60
      if (
        headerRef.current.clientHeight + heroContainerRef.current.clientHeight >
        320
      ) {
        setTimeout(() => {
          window.scrollTo({ top: 180, behavior: 'smooth' })
        }, 100)
      } else {
        setTimeout(() => {
          window.scrollTo({ top: y, behavior: 'smooth' })
        }, 100)
      }
    }
  }, [params.category, params.page, paginationPage])

  return (
    <Header ref={ref} centerAlign={centerAlign} typeLayout={typeLayout}>
      <HeaderInner typeLayout={typeLayout}>
        {items.map((item, index) => (
          <TabHeaderItem
            key={index}
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

  html:lang(ar) & {
    direction: ltr;

    * {
      direction: ltr;
    }
  }

  ${({ typeLayout, theme }) =>
    typeLayout === 'module'
      ? `
    padding: 5px 8px;
    background: ${theme.background.tabModuleOuter};
    border-radius: 999px;

    @media (max-width: ${theme.device.tabletMediaMax}){
      width: 100%;
      flex-direction: column;
      border-radius: 8px;
      padding: 8px;
    }
  `
      : ''}
`
