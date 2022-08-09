import React from 'react'
const LogoAnimation = props => {
  const { logoType } = props

  const [isMobile, setIsMobile] = React.useState(false)
  const handleWindowSizeChange = () => {
    if (
      window.innerWidth < 768 &&
      document.getElementsByClassName('metaMaskUninstalled').length == 1
    ) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }
  React.useEffect(() => {
    // This runs the script logo
    window.addEventListener('resize', handleWindowSizeChange)
    console.log(isMobile)
    if (typeof window !== 'undefined' && window.document) {
      var ModelViewer = require('@metamask/logo')
      let meshJson
      switch (logoType) {
        case 'flask':
          meshJson = require('./flask.json')
          break
        default:
        // code block
      }

      if (
        window.innerWidth < 768 &&
        document.getElementsByClassName('metaMaskUninstalled').length == 1
      ) {
        var viewer = ModelViewer({
          pxNotRatio: true,
          width: 130,
          height: 130,
          followMouse: true,
          meshJson,
        })
      } else {
        var viewer = ModelViewer({
          pxNotRatio: true,
          width: 230,
          height: 230,
          followMouse: true,
          meshJson,
        })
      }

      var container = document.getElementById('logo-container')
      container.replaceChildren('')
      container.appendChild(viewer.container)
    }

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [logoType, isMobile])
  return <div id="logo-container"></div>
}

export default LogoAnimation
