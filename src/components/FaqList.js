import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'

const FaqList = props => {
  const { list, containerBgColor } = props
  if (!list.length) return null
  return (
    <Wrapper>
      {list.map(m =>
        contentfulModuleToComponent({
          ...m,
          containerBgColor: containerBgColor,
        })
      )}
    </Wrapper>
  )
}

export default withTheme(FaqList)

FaqList.propTypes = {
  list: PropTypes.array.isRequired,
  containerBgColor: PropTypes.string,
}

const Wrapper = styled.div`
  display: block;
`
