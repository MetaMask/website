import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import styled, { withTheme } from 'styled-components'
import TabHeader from './TabHeader'
import TabContent from './TabContent'
import lowerCase from 'lodash/lowerCase'
import queryString from 'query-string'

const TabWrapper = props => {
  const {
    tabs,
    activeTabDefault,
    centerAlign = true,
    typeLayout,
    isTabParam,
  } = props

  const [activeStateId, setActiveStateId] = useState(
    isTabParam ? '' : activeTabDefault
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    const { search, pathname } = window.location
    if (search) {
      const params = queryString.parse(search)
      const newsCategory = params.category

      if (newsCategory && isTabParam) {
        const tabActive = tabs.find(
          ({ slug }) => encodeURIComponent(lowerCase(slug)) === newsCategory
        )
        setActiveStateId(tabActive?.id)
        return
      }
    }
    if (pathname && isTabParam) {
      const newsCategory = pathname.match('/news/([^/]*)/?')
      if (newsCategory) {
        const tabActive = tabs.find(
          ({ slug }) => encodeURIComponent(lowerCase(slug)) === newsCategory[1]
        )
        setActiveStateId(tabActive?.id || activeTabDefault)
        return
      }
    }
  }, [])

  return (
    <Wrapper>
      <TabHeader
        items={tabs}
        activeId={activeStateId}
        setActiveStateId={setActiveStateId}
        centerAlign={centerAlign}
        typeLayout={typeLayout}
        isTabParam={isTabParam}
      />
      <TabContent
        items={tabs}
        activeId={activeStateId}
        centerAlign={centerAlign}
        typeLayout={typeLayout}
      />
    </Wrapper>
  )
}

TabWrapper.propTypes = {
  tabs: PropTypes.array,
}

export default withTheme(TabWrapper)

const Wrapper = styled.div`
  display: block;
`
