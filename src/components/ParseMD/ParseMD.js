import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'

const ParseMD = ({ children, ...props }) => {
  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSlug]} {...props}>
      {children}
    </ReactMarkdown>
  )
}

ParseMD.propTypes = {
  children: PropTypes.node.isRequired,
}

ParseMD.defaultProps = {
  children: null,
}

export default ParseMD
