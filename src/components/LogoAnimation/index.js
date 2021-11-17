import React from 'react'
const LogoAnimation = props => {
  const {logoType} = props;
  React.useEffect(() => {
    // This runs the script logo
    if (typeof window !== 'undefined' && window.document) {
      var ModelViewer = require('@metamask/logo')
      let meshJson;
      switch(logoType) {
        case 'flask':
          meshJson = require('./flask.json');
          break;
        default:
          // code block
      }
      var viewer = ModelViewer({
        pxNotRatio: true,
        width: 230,
        height: 230,
        followMouse: true,
        meshJson,
      })

      var container = document.getElementById('logo-container')
      container.appendChild(viewer.container)
    }
  }, [])
  return <div id="logo-container"></div>
}

export default LogoAnimation
