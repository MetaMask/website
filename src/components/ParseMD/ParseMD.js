import React, { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

const ParseMD = ({ children, ...props }) => {
  useEffect(() => {
    const element = document.getElementById('reportBugFn')
    if (!element) return

    const mailtoReportBugFn = () => {
      const mail = document.createElement('a')
      mail.href = 'mailto:bugbounty@consensys.net'
      mail.click()
    }

    element.addEventListener('click', mailtoReportBugFn)
    return () => {
      element.removeEventListener('click', mailtoReportBugFn)
    }
  }, [])

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSlug]}
      {...props}
    >
      {children}
    </ReactMarkdown>
  )
}

ParseMD.defaultProps = {
  children: null,
}

export default ParseMD
