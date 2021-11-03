import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'

const FaqList = props => {
  const { list } = props
  const [activeId, setActiveId] = React.useState('');
  if (!list.length) return null
  return (
    <Wrapper>
      {list.map(m =>
        contentfulModuleToComponent({
          ...m,
          activeId,
          setActiveId
        })
      )}
    </Wrapper>
  )
}

export default withTheme(FaqList)

FaqList.propTypes = {
  list: PropTypes.array.isRequired,
}

const Wrapper = styled.div`
  display: block;
`;