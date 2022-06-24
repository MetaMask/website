import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import TabHeader from './TabHeader'
import TabContent from './TabContent'
import queryString from 'query-string'
import lowerCase from 'lodash/lowerCase'

const TabWrapper = props => {
  const {
    tabs,
    activeTabDefault,
    centerAlign = true,
    typeLayout,
    isTabParam,
  } = props

  const [searchState, setSearchState] = React.useState('')
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setSearchState(window.location?.search)
    }
  }, [])

  const tabDefaultFromParam = React.useMemo(() => {
    if (searchState && isTabParam) {
      const param = queryString.parse(searchState)
      const { category } = param
      if (category) {
        const tabActive = tabs.find(
          ({ label }) => encodeURIComponent(lowerCase(label)) === category
        )
        return tabActive?.id
      }
    }
    return ''
  }, [searchState])

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
