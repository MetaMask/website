import React from 'react'
const LogoAnimation = props => {
  React.useEffect(() => {
    // This runs the script logo
    if (typeof window !== 'undefined' && window.document) {
      var ModelViewer = require('@metamask/logo')
      var viewer = ModelViewer({
        pxNotRatio: true,
        width: 230,
        height: 230,
        followMouse: true,
      })

      var container = document.getElementById('logo-container')
      container.appendChild(viewer.container)
    }
  }, [])
  return <div id="logo-container"></div>
}

export default LogoAnimation
