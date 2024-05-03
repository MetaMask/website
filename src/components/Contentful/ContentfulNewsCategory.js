import React from 'react'
import PropTypes from 'prop-types'
import NewsList from '../NewsList'
import PaginationWrapper from '../Pagination'

function ContentfulNewsCategory(props) {
  const {
    moduleConfig: { storiesData },
  } = props

  const { stories, totalItems, currentPage } = storiesData || {}

  return (
    <PaginationWrapper
      data={stories}
      totalItems={totalItems}
      itemPerPage={4}
      currentPage={currentPage}
      listingComponent={NewsList}
    />
  )
}

export default ContentfulNewsCategory

ContentfulNewsCategory.propTypes = {
  moduleConfig: PropTypes.shape({}).isRequired,
}
