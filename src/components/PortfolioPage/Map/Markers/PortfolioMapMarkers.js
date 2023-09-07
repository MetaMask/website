import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import PortfolioMapMarkersButton from './PortfolioMapMarkersButton'

/**
 * @name PortfolioMapMarkers
 * @summary -
 * @description - Portfolio page - Map Markers
 */

const PortfolioMapMarkers = props => {
  const { canvas, activeFeature, setDetailPage, featuresList } = props
  const rafRef = useRef()
  const [mapCoordX, setMapCoordX] = useState(0)
  const [mapCoordY, setMapCoordY] = useState(0)

  const handleClick = index => {
    setDetailPage(index)
  }

  const startRaf = () => {
    const pos = canvas.current.getActiveHotspotPinPosition()
    setMapCoordX(Math.round(pos.x))
    setMapCoordY(Math.round(pos.y))
    if (activeFeature !== null) rafRef.current = requestAnimationFrame(startRaf)
  }

  useEffect(() => {
    if (activeFeature !== null) {
      rafRef.current = requestAnimationFrame(startRaf)
    } else {
      cancelAnimationFrame(rafRef.current)
    }
  }, [activeFeature])

  return (
    <Wrapper>
      <List>
        {featuresList?.map(
          ({ markerLabel, themeColor, icon, markerMobileAlignment }, index) => {
            const isActive = activeFeature === index

            return (
              <Marker
                key={index}
                $top={mapCoordY}
                $left={mapCoordX}
                style={
                  isActive
                    ? {
                        '--color': themeColor,
                        '--x-pos': `${mapCoordX}px`,
                        '--y-pos': `${mapCoordY}px`,
                      }
                    : {}
                }
              >
                <PortfolioMapMarkersButton
                  name={markerLabel}
                  riveIcon={icon?.file.url}
                  active={isActive}
                  onClick={() => handleClick(index)}
                  markerMobileAlignment={markerMobileAlignment}
                />
              </Marker>
            )
          }
        )}
      </List>
    </Wrapper>
  )
}

export default PortfolioMapMarkers

const Wrapper = styled.nav`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 0;
`

const List = styled.ul`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin: 0;
  pointer-events: none;
  z-index: 0;
`

const Marker = styled.li`
  position: absolute;
  //top: ${({ $top }) => ($top ? `calc( 50% - ${$top}px )` : '50%')};
  //left: ${({ $left }) => ($left ? `calc( 50% + ${$left}px )` : '50%')};
  top: calc( 50% - var(--y-pos) );
  left: calc( 50% + var(--x-pos) );
  list-style: none;
  margin: 0;
`
