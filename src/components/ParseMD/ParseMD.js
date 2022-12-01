import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

const ParseMD = ({ children, rehypePlugins, ...props }) => {
  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw, ...rehypePlugins]} {...props}>
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
