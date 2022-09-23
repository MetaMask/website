import React from 'react'
import { MetamaskBoxAnimation } from './Logo/MetamaskBoxAnimation'
import styled, { withTheme } from 'styled-components'
const FoxAnimation = props => {
  const [shouldMount, setShouldMount] = React.useState(false)
  const [left, setLeft] = React.useState(24)
  const [distance, setDistance] = React.useState(1200)
  const handleWindowSizeChange = () => {
    console.log(window.innerWidth)
    if (window.innerWidth < 480) {
      setLeft(0)
      setDistance(window.innerWidth * 1.5)
    } else if (window.innerWidth < 992) {
      setLeft(0)
      setDistance(window.innerWidth)
    } else if (window.innerWidth < 1400) {
      setDistance(window.innerWidth - 200)
    } else {
      setDistance(1200)
    }
  }

  React.useEffect(() => {
    handleWindowSizeChange()
    window.addEventListener('resize', handleWindowSizeChange)
    setShouldMount(true)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [left, distance])

  return (
    <Wrapper id="fox-logo-container">
      {shouldMount && (
        <MetamaskBoxAnimation
          left={left}
          phi={0}
          theta={Math.PI / 2}
          distance={distance}
          hemisphereAxis={[0.1, 0.5, 0.2]}
          hemisphereColor1={[1, 1, 1]}
          hemisphereColor0={[1, 1, 1]}
          fogColor={[0.5, 0.5, 0.5]}
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
  max-width: 1800px;

  @media (max-width: ${({ theme }) => theme.device.mobile}) {
    width: 150%;
  }

  &:before {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`
