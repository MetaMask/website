/* eslint-disable no-useless-computed-key */
import React from 'react'
import { navigate } from '@reach/router'
import styled from 'styled-components'
import queryString from 'query-string'

function range(end) {
  return Array(end)
    .fill()
    .map((_, idx) => 1 + idx)
}

const PaginationWrapper = props => {
  const { active, isFirst, isLast, total, params: paramsDefault } = props
  const list = range(total)
  const handleClickPage = i => {
    const params = { ...paramsDefault, page: i }
    navigate(`?${queryString.stringify(params)}`)
  }
  return (
    <Wrapper>
      {!isFirst ? <ArrowIcon onClick={() => handleClickPage(active - 1)} className="n-icon icon-arrow-left-thin" /> : null}
      {list.map(item => (
        <Item active={active === item} onClick={() => handleClickPage(item)}>
          {item}
        </Item>
      ))}
      {!isLast ? <ArrowIcon onClick={() => handleClickPage(active + 1)} className="n-icon icon-arrow-right-thin" /> : null}
    </Wrapper>
  )
}

export default PaginationWrapper

const Item = styled.div`
  color: ${({ active, theme }) => (active ? theme.primaryColor : theme.text.default)};
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 12px;
  cursor: pointer ;
`

const Wrapper = styled.div`
  width: 100% !important;
  display: flex;
  align-items: center;
  justify-content: center;
`
const ArrowIcon = styled.span`
font-size: 24px;
cursor: pointer ;
  &:first-child {
    margin-right: 24px;
  }
  &:last-child {
    margin-left: 24px;
  }
`
