import React from 'react'
import { MetamaskBoxAnimation } from './Logo/MetamaskBoxAnimation'
import styled, { withTheme } from 'styled-components'
const FoxAnimation = props => {
  const [shouldMount, setShouldMount] = React.useState(false)
  const [distance, setDistance] = React.useState(1120)
  const handleWindowSizeChange = () => {
    if (window.innerWidth < 1120) {
      setDistance(window.innerWidth)
    } else {
      setDistance(1120)
    }
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    setShouldMount(true)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [distance])
  
  return (
    <Wrapper id="fox-logo-container">
      {shouldMount && (
        <MetamaskBoxAnimation
          phi={0}
          theta={Math.PI / 2}
          distance={distance}
          hemisphereAxis={[0.1, 1, 0.2]}
          hemisphereColor1={[1, 1, 1]}
          hemisphereColor0={[0.5, 0.5, 0.5]}
          fogColor={[1, 1, 1]}
          interiorColor0={[1, 0.5, 0]}
          interiorColor1={[0.5, 0.2, 0]}
          noGLFallback={<div>WebGL not supported :(</div>}
          enableZoom={false}
          followMouse={false}
        />
      )}
    </Wrapper>
  )
}

export default withTheme(FoxAnimation)
const Wrapper = styled.div`
  position: absolute;
  width: 100%;

  &:before {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`
