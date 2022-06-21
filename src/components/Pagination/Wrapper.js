import React from 'react'
import PaginationBar from './PaginattionBar'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import Context from '../../Context/ContextPage'

const PaginationWrapper = props => {
  const { data, itemPerPage, listingComponent, setActivePage } = props
  const location = window.location
  const { search } = location
  const params = queryString.parse(search)
  const category = React.useRef(params?.category)
  const { pagination: paginationContextValue } = React.useContext(Context)
  const { paginationPage: pageState, setPaginationPage: setPageState } =
    paginationContextValue || {}

  const itemPage = itemPerPage || 4
  const total = Math.ceil(data.length / itemPage)
  const indexOfLast = pageState * itemPage
  const indexOfFirst = indexOfLast - itemPage
  const dataShow = data.slice(indexOfFirst, indexOfLast)
  const Listing = listingComponent
  if (!Listing) return null
  return (
    <>
      <Listing data={dataShow} />
      {total > 1 ? (
        <PaginationBar
          active={pageState}
          isFirst={pageState === 1}
          isLast={pageState === total}
          total={total}
          setPageState={setPageState}
          setActivePage={setActivePage}
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
