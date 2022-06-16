import React from 'react'
import PaginationBar from './PaginattionBar'
import PropTypes from 'prop-types'
import { useLocation } from '@reach/router'
import queryString from 'query-string'

const PaginationWrapper = props => {
  const { data, itemPerPage, listingComponent } = props
  let paramPage = 1,
    params = {}
  const location = useLocation()
  const { search } = location
  if (search) {
    params = queryString.parse(search)
    const { page = 1 } = params
    paramPage = parseInt(page, 10)
  }
  const itemPage = itemPerPage || 4
  const total = Math.ceil(data.length / itemPage)
  const indexOfLast = paramPage * itemPage
  const indexOfFirst = indexOfLast - itemPage
  const dataShow = data.slice(indexOfFirst, indexOfLast)
  const Listing = listingComponent

  if (!Listing) return null
  return (
    <>
      <Listing data={dataShow} />
      {total > 1 ? (
        <PaginationBar
          active={paramPage}
          isFirst={paramPage === 1}
          isLast={paramPage === total}
          total={total}
          params={params}
        />
      ) : null}
    </>
  )
}

export default PaginationWrapper

PaginationWrapper.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  itemPerPage: PropTypes.number,
  listingComponent: PropTypes.elementType,
}
