import React from 'react'

const LogoPortfolio = props => {
  const { lookAtCenter } = props

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
      const ModelViewer = require('./logo')
      if (
        window.innerWidth < 768 &&
        document.getElementsByClassName('metaMaskUninstalled').length === 1
      ) {
        viewer = ModelViewer({
          pxNotRatio: true,
          width: 45,
          height: 45,
          followMouse: true,
          lookAtCenter: lookAtCenter,
        })
      } else {
        viewer = ModelViewer({
          pxNotRatio: true,
          width: 55,
          height: 55,
          followMouse: true,
          lookAtCenter: lookAtCenter,
        })
      }

      const container = document.getElementById('logo-container')
      container.replaceChildren('')
      container.appendChild(viewer.container)
    }

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [isSmallScreen])
  return <div id="logo-container"></div>
}

export default LogoPortfolio
