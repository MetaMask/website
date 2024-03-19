// gatsby-browser.js
import React from 'react'
import ClientSideWrapper from './src/components/ClientSideWrapper'

require('prismjs/themes/prism.css')
require('prismjs/plugins/line-numbers/prism-line-numbers.css')

export const wrapPageElement = ({ element, props }) => (
  <ClientSideWrapper {...props}>{element}</ClientSideWrapper>
)
