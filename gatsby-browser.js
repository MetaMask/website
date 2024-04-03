// gatsby-browser.js
import React from 'react'
import ClientSideWrapper from './src/components/ClientSideWrapper'
import { persistDeveloper } from './src/lib/utils/localStorage'

require('prismjs/themes/prism.css')
require('prismjs/plugins/line-numbers/prism-line-numbers.css')

export const wrapPageElement = ({ element, props }) => (
  <ClientSideWrapper {...props}>{element}</ClientSideWrapper>
)

export const onRouteUpdate = ({ location }) => {
  if (location.pathname === '/developer/') {
    persistDeveloper()
  }
}
