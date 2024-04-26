import React from 'react'
import PaginationBar from './PaginationBar'
import PropTypes from 'prop-types'

const PaginationWrapper = props => {
  const {
    data,
    itemPerPage,
    listingComponent,
    totalItems,
    currentPage = 1,
  } = props

  const itemPage = itemPerPage || 4
  const totalPage = Math.ceil(totalItems / itemPage) || 1
  const Listing = listingComponent
  if (!Listing) return null

  return (
    <>
      <Listing data={data} />
      {totalPage > 1 ? (
        <PaginationBar
          active={currentPage}
          isFirst={currentPage === 1}
          isLast={currentPage === totalPage}
          total={totalPage}
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
  setActivePage: PropTypes.string,
}
