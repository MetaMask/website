/* eslint-disable no-useless-computed-key */
import React from 'react'
import styled from 'styled-components'
import queryString from 'query-string'

function range(end) {
  return Array(end)
    .fill()
    .map((_, idx) => 1 + idx)
}

const PaginationWrapper = props => {
  const { active, isFirst, isLast, total, setPageState } = props
  const list = range(total)
  const handleClickPage = i => {
    if (setPageState) {
      setPageState(i)
    }
    const paramsDefault = queryString.parse(window.location.search)
    const params = { ...paramsDefault, page: i }
    window.history.pushState(
      window.location.search,
      '',
      `?${queryString.stringify(params)}`
    )
  }
  return (
    <Wrapper>
      {!isFirst ? (
        <ArrowIcon
          onClick={() => handleClickPage(active - 1)}
          className="n-icon icon-arrow-left-thin"
        />
      ) : null}
      {list.map(item => (
        <Item active={active === item} onClick={() => handleClickPage(item)}>
          {item}
        </Item>
      ))}
      {!isLast ? (
        <ArrowIcon
          onClick={() => handleClickPage(active + 1)}
          className="n-icon icon-arrow-right-thin"
        />
      ) : null}
    </Wrapper>
  )
}

export default PaginationWrapper

const Item = styled.div`
  color: color: ${({ theme }) => theme.text.default};
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 12px;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    margin: 0 4px;
    padding: 0 8px;
  }

  ${({ active }) =>
    active
      ? `
      border: 1px solid #BBC0C5;
      box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
      border-radius: 8px;
  `
      : ''}

  &:hover {
    color: #535A61;
    background: #F2F4F6;
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
  }
`

const Wrapper = styled.div`
  width: 100% !important;
  display: flex;
  align-items: center;
  justify-content: center;
  order: 1;
  
  .newsCategoriesTab & {
    margin: 24px 0;
  }
`
const ArrowIcon = styled.span`
  font-size: 28px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.primaryColor};
  }
  &:first-child {
    margin-right: 32px;
    @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
      margin-right: 16px;
    }
  }
  &:last-child {
    margin-left: 32px;
    @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
      margin-left: 16px;
    }
  }
`
