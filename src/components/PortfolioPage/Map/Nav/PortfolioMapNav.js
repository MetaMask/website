import React, { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { useMediaQuery } from 'react-responsive'
import classnames from 'classnames'
import styled, { useTheme } from 'styled-components'
import PortfolioMapNavButton from './PortfolioMapNavButton'
import withProcessPreviewData from '../../../../lib/utils/withProcessPreviewData'
import ButtonShadow from '../../Shared/ButtonShadow'

/**
 * @name PortfolioMapNav
 * @summary -
 * @description - Portfolio page - Map nav
 */

const PortfolioMapNav = props => {
  const {
    canvas,
    activeFeature,
    setActiveFeature,
    featuresList,
    portfolioCta,
    previewMode,
  } = props

  const el = useRef(null)
  const q = gsap.utils.selector(el)

  const [activeLastFeature, setActiveLastFeature] = useState(activeFeature)

  const theme = useTheme()

  const isDesktop = useMediaQuery({
    query: `(min-width: ${theme.device.tablet})`,
  })

  const handleClick = index => {
    canvas.current.focusHotspot({ name: featuresList[index].title })
  }

  const handleWindowSizeChange = useCallback(() => {
    if (isDesktop) {
      const items = q(`li`)
      const Texts = q(`li span`)

      items.forEach((item, id) => {
        gsap.set(item, { '--width': `${Texts[id].offsetWidth}px` })
      })
    }
  }, [q, isDesktop])

  useEffect(() => {
    if (el.current) {
      handleWindowSizeChange()
      window.addEventListener('resize', handleWindowSizeChange)

      return () => {
        window.removeEventListener('resize', handleWindowSizeChange)
      }
    }
  }, [el, handleWindowSizeChange])

  const animationInit = () => {
    const cta = q(`.${CtaWrapper.styledComponentId}`)
    const nav = q(`.${Nav.styledComponentId}`)
    const item = q(`.${Item.styledComponentId}`)

    gsap
      .timeline({
        defaults: {
          ease: 'mm-ease-1', //ease-lb
        },
      })
      .addLabel('start')
      .fromTo(
        cta,
        {
          yPercent: 200,
          autoAlpha: 0,
        },
        {
          delay: 0.55,
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.5,
        },
        'start'
      )
      .fromTo(
        nav,
        {
          yPercent: 200,
          autoAlpha: 0,
        },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.5,
        },
        'start'
      )
      .fromTo(
        nav,
        {
          width: 52,
        },
        {
          width: 268,
          delay: 0.5,
          duration: 0.5,
          onComplete: () => {
            gsap.set(nav, { width: '' })
          },
        },
        'start'
      )
      .fromTo(
        item,
        {
          scale: 0,
        },
        {
          scale: 1,
          delay: 0.55,
          duration: 0.35,
          stagger: {
            from: 'center',
            amount: 0.2,
          },
          onComplete: () => setActiveFeature(activeLastFeature),
        },
        'start'
      )
  }

  useEffect(() => {
    if (isDesktop) {
      const items = q(`li`)
      const Texts = q(`li span`)

      items.forEach((item, id) => {
        gsap.set(item, { '--width': `${Texts[id].offsetWidth}px` })
      })
    }
  }, [isDesktop, q])

  useEffect(() => {
    setActiveLastFeature(activeFeature)
    setActiveFeature(null)
    animationInit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Wrapper ref={el}>
      <Nav>
        <List>
          {featuresList?.map(({ title, themeColor, icon }, index) => {
            return (
              <Item
                key={index}
                style={{
                  '--color': themeColor,
                }}
                className={classnames({
                  active: activeFeature === index,
                })}
              >
                <PortfolioMapNavButton
                  name={title}
                  riveIcon={previewMode ? icon?.url : icon?.file.url}
                  onClick={() => handleClick(index)}
                />
              </Item>
            )
          })}
        </List>
      </Nav>
      {portfolioCta && (
        <CtaWrapper>
          <ButtonShadow
            as="a"
            href={portfolioCta.ctaLink}
            target="_blank"
            rel='"noopener noreferrer'
            short
            hoverCircle
          >
            {portfolioCta.displayText}
          </ButtonShadow>
        </CtaWrapper>
      )}
    </Wrapper>
  )
}

const parsePreviewData = data => {
  const dataUpdate = {
    previewMode: true,
    ...data,
  }
  return dataUpdate
}

export default withProcessPreviewData(parsePreviewData)(PortfolioMapNav)

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: 30px;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  row-gap: 24px;
  justify-content: center;
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    bottom: 27.5px;
  }
`

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  position: relative;
  pointer-events: all;
  opacity: 0;
  border-radius: 100px;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    //opacity: 1;
  }
`

const List = styled.ul`
  display: flex;
  align-items: center;
  gap: 14px;
  list-style: none;
  margin: 0;
  padding: 6px;
  background: #ffffff;
  border-radius: 100px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  width: fit-content;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    gap: 10px;
    padding: 8px 10px;
  }
`

const Item = styled.li`
  display: flex;
  justify-content: center;
  background: #1e1f25;
  border-radius: 23px;
  height: 40px;
  margin: 0;
  max-width: 40px;
  overflow: hidden;
  color: white;
  /* opacity: 0; */
  transition: 0.25s cubic-bezier(0.5, 0.14, 0, 1.01) max-width,
    0.25s cubic-bezier(0.5, 0.14, 0, 1.01) background,
    0.25s cubic-bezier(0.5, 0.14, 0, 1.01) color;

  canvas {
    transition: 0.25s cubic-bezier(0.5, 0.14, 0, 1.01) filter;
  }

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    height: 35px;
    /* opacity: 1; */
  }

  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    &:hover,
    &.active {
      max-width: calc(var(--width) + 40px);

      .navButtonText {
        max-width: var(--width);
      }
    }
  }

  &.active {
    color: #000000;
    background: var(--color);
    pointer-events: none;

    canvas {
      filter: invert(1);
    }
  }
`

const CtaWrapper = styled.div`
  display: none;
  pointer-events: all;
  z-index: 30;
  opacity: 0;

  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    display: inline-flex;
  }
`
