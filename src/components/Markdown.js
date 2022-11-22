import hljs from 'highlight.js'
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import Prism from 'prismjs'
import 'prismjs/components/prism-typescript'
import 'prismjs/plugins/line-numbers/prism-line-numbers.js'

const CopyButton = ({ content }) => {
  const [copying, setCopying] = useState(false)
  const onClick = () => {
    setCopying(true)
    navigator.clipboard.writeText(content)
    setTimeout(() => {
      setCopying(false)
    }, 1000)
  }
  return (
    <div className={`btn-copy ${copying ? 'copying' : ''}`}>
      <button onClick={onClick}>{copying ? 'Copied' : 'Copy'}</button>
    </div>
  )
}

const Markdown = ({ content }) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <ReactMarkdown
      children={content}
      rehypePlugins={[rehypeRaw]}
      components={{
        pre(props) {
          const element = props.children[0].props
          const { className, children } = element
          const codeScript = String(children).replace(/\n$/, '')
          let lineNumbers = false
          let langFromMd = className
          let langDetected;
          if (className?.includes('showLineNumbers')) {
            lineNumbers = true
          }
          if (className?.includes('{')) {
            langFromMd = className.match(/(.+)\{/)[1]
            if (langFromMd === 'language-') {
              langFromMd = undefined
            }
          }
          if(langFromMd) {
            langDetected = langFromMd
          } else {
            const langSubset = ['html', 'css', 'javascript', 'typescript']
            const { language: hlLang } = hljs.highlightAuto(codeScript, langSubset)
            langDetected = `language-${hlLang || 'text'}`
          }
          return (
            <>
              <CopyButton content={codeScript} />
              <pre className={lineNumbers ? 'line-numbers' : ''}>
                <code className={langDetected}>{codeScript}</code>
              </pre>
            </>
          )
        },
      }}
    />
  )
}

export default Markdown
