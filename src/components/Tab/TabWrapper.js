import PropTypes from 'prop-types'
import React from 'react'
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

  const [searchState, setSearchState] = React.useState('')
  const [category, setCategory] = React.useState('')

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const search = window.location?.search
      if (search) {
        const params = queryString.parse(search)
        const newsCategory = params.category
        if (newsCategory) {
          setCategory(newsCategory)
        }
      }
      setSearchState(window.location?.pathname)
    }
  }, [])

  const tabDefaultFromParam = React.useMemo(() => {
    if (category && isTabParam) {
      const tabActive = tabs.find(
        ({ label }) => encodeURIComponent(lowerCase(label)) === category
      )
      return tabActive?.id
    }
    if (searchState && isTabParam) {
      const newsCategory = searchState.match('/news/([^/]*)/?')
      if (newsCategory) {
        const tabActive = tabs.find(
          ({ label }) =>
            encodeURIComponent(lowerCase(label)) === newsCategory[1]
        )
        return tabActive?.id
      }
    }
    return ''
  }, [searchState, category])

  React.useEffect(() => {
    setActiveStateId(tabDefaultFromParam || activeTabDefault)
  }, [tabDefaultFromParam])

  const [activeStateId, setActiveStateId] = React.useState(
    isTabParam ? tabDefaultFromParam : activeTabDefault
  )
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
