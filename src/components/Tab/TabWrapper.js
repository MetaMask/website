import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import TabHeader from './TabHeader'
import TabContent from './TabContent'

const TabWrapper = props => {
  const { tabs, activeTabDefault, centerAlign = true, typeLayout } = props
  const [activeId, setActiveId] = React.useState(activeTabDefault)
  return (
    <Wrapper>
      <TabHeader
        items={tabs}
        activeId={activeId}
        setActiveId={setActiveId}
        centerAlign={centerAlign}
        typeLayout={typeLayout}
      />
      <TabContent
        items={tabs}
        activeId={activeId}
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
