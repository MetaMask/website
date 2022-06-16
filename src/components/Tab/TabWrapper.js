import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import TabHeader from './TabHeader'
import TabContent from './TabContent'
import { useLocation } from '@reach/router'
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
  let activeId = activeTabDefault
  const location = useLocation()
  const [activeStateId, setActiveStateId] = React.useState(activeTabDefault)
  const { search } = location
  if (search && isTabParam) {
    const param = queryString.parse(search)
    const { category } = param
    if (category) {
      const tabActive = tabs.find(
        ({ label }) => encodeURIComponent(lowerCase(label)) === category
      )
      activeId = tabActive?.id
    }
  }
  return (
    <Wrapper>
      <TabHeader
        items={tabs}
        activeId={isTabParam ? activeId : activeStateId}
        setActiveStateId={isTabParam ? null : setActiveStateId}
        centerAlign={centerAlign}
        typeLayout={typeLayout}
        isTabParam={isTabParam}
      />
      <TabContent
        items={tabs}
        activeId={isTabParam ? activeId : activeStateId}
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
