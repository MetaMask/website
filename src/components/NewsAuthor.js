import React from 'react'
import Link from '../components/Link'

function NewsAuthor({ listAuthors }) {
  const generateAuthor = authors =>
    authors.reduce((acc, cur) => {
      if (acc.length) {
        acc.push(<span>{', '}</span>)
      }
      if (cur.createProfilePage) {
        acc.push(<Link to={`/author/${cur.profileUrl}/`}>{cur.name}</Link>)
      } else {
        acc.push(<span>{cur.name}</span>)
      }
      return acc
    }, [])

  return (
    <span className="author">
      {listAuthors ? generateAuthor(listAuthors) : 'MetaMask'}
    </span>
  )
}

export default NewsAuthor