// gatsby-browser.js
// Import the component at the top of the file
import React from 'react'
import ClientSideWrapper from './src/components/ClientSideWrapper'
require("prismjs/themes/prism.css")

export const wrapPageElement = ({ element, props }) => (
  <ClientSideWrapper {...props}>{element}</ClientSideWrapper>
)
