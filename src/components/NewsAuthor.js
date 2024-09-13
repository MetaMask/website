import React from 'react'
import Link from '../components/Link'
import isEmpty from 'lodash/isEmpty'

function NewsAuthor({ listAuthors }) {
  const generateAuthor = authors =>
    authors.reduce((acc, cur, index) => {
      if (acc.length) {
        acc.push(<span key={`comma ${index}`}>{', '}</span>)
      }
      if (cur.createProfilePage) {
        acc.push(
          <Link key={index} rel="nofollow" to={`/author/${cur.profileUrl}/`}>
            {cur.name}
          </Link>
        )
      } else {
        acc.push(<span key={index}>{cur.name}</span>)
      }
      return acc
    }, [])

  return (
    <span className="author">
      {!isEmpty(listAuthors) ? generateAuthor(listAuthors) : 'MetaMask'}
    </span>
  )
}

export default NewsAuthor
