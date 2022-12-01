import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

const ParseMD = ({ children, rehypePlugins, ...props }) => {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw, ...rehypePlugins]}
      remarkPlugins={[remarkGfm]}
      {...props}
    >
      {children}
    </ReactMarkdown>
  )
}

ParseMD.propTypes = {
  children: PropTypes.node.isRequired,
  rehypePlugins: PropTypes.array,
}

ParseMD.defaultProps = {
  children: null,
  rehypePlugins: [],
}

export default ParseMD
