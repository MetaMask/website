import React from 'react'
import { useLocation } from '@reach/router'

export default function withProcessPreviewData(parser) {
  return function(Component) {
    return props => {
      const { pathname } = useLocation()
      if (pathname === '/preview/') {
        const passProps = parser(props)
        return <Component {...passProps} />
      } else {
        return <Component {...props} />
      }
    }
  }
}
