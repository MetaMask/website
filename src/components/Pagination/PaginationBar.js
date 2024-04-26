import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { useLocation } from '@reach/router'
import { useMediaQuery } from 'react-responsive'

function range(end) {
  return Array(end)
    .fill()
    .map((_, idx) => 1 + idx)
}

const PaginationBar = props => {
  const location = useLocation()
  const { pathname } = location
  const { active, isFirst, isLast, total } = props
  const list = range(total)
  const baseUrl = pathname.replace(`${active}/`, '')

  const isMobile = useMediaQuery({
    query: '(max-width: 768px)',
  })

  const offsetHide = isMobile ? 2 : 3

  const renderPagination = () => {
    return (
      <>
        <Link key={1} to={baseUrl}>
          <Item active={active === 1}>1</Item>
        </Link>
        {list.map((item, index) => {
          if (
            item === 1 ||
            item === list.length ||
            Math.abs(item - active) > offsetHide
          ) {
            return null
          } else if (Math.abs(item - active) === offsetHide) {
            return <span key={index}>...</span>
          } else {
            return (
              <Link
                key={index}
                to={`${baseUrl}${item === 1 ? '' : item + '/'}`}
              >
                <Item active={active === item}>{item}</Item>
              </Link>
            )
          }
        })}
        <Link key={list.length} to={`${baseUrl}${list.length}`}>
          <Item active={active === list.length}>{list.length}</Item>
        </Link>
      </>
    )
  }

  return (
    <Wrapper>
      {!isFirst ? (
        <Link to={`${baseUrl}${active > 2 ? active - 1 + '/' : ''}`}>
          <ArrowIcon className="n-icon icon-arrow-left-thin" />
        </Link>
      ) : null}
      {renderPagination()}
      {!isLast ? (
        <Link to={`${baseUrl}${active < total ? active + 1 + '/' : ''}`}>
          <ArrowIcon className="n-icon icon-arrow-right-thin" />
        </Link>
      ) : null}
    </Wrapper>
  )
}

export default PaginationBar

const Item = styled.div`
  color: ${({ theme }) => theme.text.default};
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
    color: #535a61;
    background: #f2f4f6;
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
