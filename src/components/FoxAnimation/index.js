import React from 'react'
import { MetamaskBoxAnimation } from './Logo/MetamaskBoxAnimation'
import styled, { withTheme } from 'styled-components'
const FoxAnimation = props => {
  const [shouldMount, setShouldMount] = React.useState(false)
  React.useEffect(() => {
    setShouldMount(true)
  }, [])
  return (
    <Wrapper id="fox-logo-container">
      {shouldMount && (
        <MetamaskBoxAnimation
          phi={0}
          theta={Math.PI / 2}
          distance={800}
          hemisphereAxis={[0.1, 1, 0.2]}
          hemisphereColor1={[1, 1, 1]}
          hemisphereColor0={[0.5, 0.5, 0.5]}
          fogColor={[1, 1, 1]}
          interiorColor0={[1, 0.5, 0]}
          interiorColor1={[0.5, 0.2, 0]}
          noGLFallback={<div>WebGL not supported :(</div>}
          enableZoom={false}
          followMouse={true}
        />
      )}
    </Wrapper>
  )
}

export default withTheme(FoxAnimation)
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 100%;
  background: ${({ theme }) => theme.background.tabModuleOuter};

  &:before {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`
