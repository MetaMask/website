import React from 'react'
const LogoAnimation = props => {
  const { logoType } = props

  const [isSmallScreen, setIsSmallScreen] = React.useState(false)
  const handleWindowSizeChange = () => {
    if (
      window.innerWidth < 768 &&
      document.getElementsByClassName('metaMaskUninstalled').length === 1
    ) {
      setIsSmallScreen(true)
    } else {
      setIsSmallScreen(false)
    }
  }
  React.useEffect(() => {
    let viewer
    // This runs the script logo
    window.addEventListener('resize', handleWindowSizeChange)
    if (typeof window !== 'undefined' && window.document) {
      const ModelViewer = require('@metamask/logo')
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
        document.getElementsByClassName('metaMaskUninstalled').length === 1
      ) {
        viewer = ModelViewer({
          pxNotRatio: true,
          width: 130,
          height: 130,
          followMouse: true,
          meshJson,
        })
      } else {
        viewer = ModelViewer({
          pxNotRatio: true,
          width: 230,
          height: 230,
          followMouse: true,
          meshJson,
        })
      }

      const container = document.getElementById('logo-container')
      container.replaceChildren('')
      container.appendChild(viewer.container)
    }

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [logoType, isSmallScreen])
  return <div id="logo-container"></div>
}

export default LogoAnimation
