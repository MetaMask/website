import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import styled from 'styled-components'
import classnames from 'classnames'
import { useMediaQuery } from 'react-responsive'

import ButtonShadow from '../Shared/ButtonShadow'
import Link from '../../Link'
import withProcessPreviewData from '../../../lib/utils/withProcessPreviewData'

/**
 * @name PortfolioFooter
 * @summary -
 * @description - Portfolio page - Footer
 */

const PortfolioFooter = props => {
  const { showFooter, setShowFooter, footerData, previewMode } = props
  const { logo, copyright, menuItems } = footerData

  const el = useRef(null)
  const q = gsap.utils.selector(el)

  const [wrapperVisibility, setWrapperVisibility] = useState(false)
  const [show, setShow] = useState(false)
  const [hide, setHide] = useState(false)

  const isDesktop = useMediaQuery({
    query: `(min-width: 993px)`,
  })

  const handleClickClose = () => {
    setHide(true)
    setShow(false)
    animationOut(onCompleteFn)
    setShowFooter(false)
  }

  const onCompleteFn = () => {
    setWrapperVisibility(false)
    setHide(false)
  }

  const animationIn = () => {
    const content = q(`.${Content.styledComponentId}`)
    const contentInner = q(`.${ContentInner.styledComponentId}`)
    const bgOverlay = q(`.${BgOverlay.styledComponentId}`)

    gsap
      .timeline({
        defaults: {
          ease: 'expo.out',
        },
      })
      .addLabel('start')
      .fromTo(
        content,
        {
          yPercent: () => (isDesktop ? 100 : 125),
        },
        {
          yPercent: 0,
          duration: 0.75,
        },
        'start'
      )
      .fromTo(
        contentInner,
        {
          autoAlpha: 0.25,
        },
        {
          delay: 0.25,
          autoAlpha: 1,
          duration: 0.5,
        },
        'start'
      )
      .fromTo(
        bgOverlay,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 0.75,
        },
        'start'
      )
  }

  const animationOut = onCompleteFn => {
    const content = q(`.${Content.styledComponentId}`)
    const bgOverlay = q(`.${BgOverlay.styledComponentId}`)

    gsap
      .timeline({
        defaults: {
          ease: 'expo.out',
        },
      })
      .addLabel('start')
      .fromTo(
        content,
        {
          yPercent: 0,
        },
        {
          yPercent: () => (isDesktop ? 100 : 125),
          duration: 0.75,
          onComplete: () => onCompleteFn && onCompleteFn(),
        },
        'start'
      )
      .fromTo(
        bgOverlay,
        {
          autoAlpha: 1,
        },
        {
          autoAlpha: 0,
          duration: 0.75,
        },
        'start'
      )
  }

  useEffect(() => {
    if (showFooter) {
      setShow(true)
      setWrapperVisibility(true)
      animationIn()
    } else {
      setShow(false)
    }
  }, [showFooter])

  return (
    <Wrapper
      ref={el}
      $isVisible={wrapperVisibility}
      className={classnames({ show: show, hide: hide })}
    >
      <BgOverlay onClick={handleClickClose}></BgOverlay>

      <CloseBtn iconClose isCircular={true} onClick={handleClickClose} />
      <Content>
        <ContentOuter>
          <ContentInner>
            <LeftColumn>
              <LeftColumnInner>
                {logo ? (
                  <img
                    src={previewMode ? logo.logo?.url : logo.logo?.file?.url}
                    alt={logo.title}
                  />
                ) : null}
                <PortfolioLinkWrapper>
                  <PortfolioLink to={logo.link} newTab={logo.newTab}>
                    {logo.title}
                  </PortfolioLink>
                </PortfolioLinkWrapper>
              </LeftColumnInner>
              <Copyright>{copyright}</Copyright>
            </LeftColumn>
            <RightColumn>
              {menuItems?.map((items, i) => {
                return (
                  <Nav key={i}>
                    <ListHeading>{items.title}</ListHeading>
                    <List>
                      {items?.modules?.map(
                        ({ displayText, ctaLink, newTab }, i) => {
                          return (
                            <Item key={i}>
                              <ItemLink to={ctaLink} newTab={newTab}>
                                {displayText}
                              </ItemLink>
                            </Item>
                          )
                        }
                      )}
                    </List>
                  </Nav>
                )
              })}
            </RightColumn>
            {copyright && <CopyrightBottom>{copyright}</CopyrightBottom>}
          </ContentInner>
        </ContentOuter>
      </Content>
    </Wrapper>
  )
}

const parsePreviewData = data => {
  let menuItems = data?.footerData?.menuItemsCollection?.items
  menuItems = menuItems?.map(m => ({
    ...m,
    modules: m?.modulesCollection?.items,
  }))

  const dataUpdate = {
    previewMode: true,
    ...data,
    footerData: {
      ...data.footerData,
      menuItems,
    },
  }
  return dataUpdate
}

export default withProcessPreviewData(parsePreviewData)(PortfolioFooter)

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')};

  @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
    display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    height: 100svh;
  }

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    flex-direction: column-reverse;
    justify-content: flex-start;
  }

  @media only screen and (max-device-width: 1024px) and (orientation: portrait) {
    height: 100svh;
  }

  @media only screen and (max-device-width: 1366px) and (orientation: landscape) {
    height: 100svh;
  }
`

const BgOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(30, 31, 37, 0.4);
`

const Content = styled.div`
  position: absolute;
  width: 100%;
  height: 360px;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  padding: 100px 150px;

  @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
    position: relative;
    height: fit-content;
    margin: 15px;
    border-radius: 8px;
    width: calc(100% - 30px);
  }

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    padding: 45px 72px;
  }
`

const ContentOuter = styled.div`
  display: flex;
  justify-content: center;
`

const ContentInner = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  gap: 30px;

  @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
    flex-direction: column;
    align-items: center;
    gap: normal;
  }
`

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
    justify-content: center;
  }
`

const LeftColumnInner = styled.div`
  @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img,
  svg {
    height: 27px;
  }
`

const RightColumn = styled.div`
  display: flex;
  column-gap: 35px;

  @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
    margin-top: 70px;
  }

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    row-gap: 35px;
    flex-wrap: wrap;
    margin-top: 55px;
    max-width: 300px;
  }
`

const PortfolioLinkWrapper = styled.div`
  margin-top: 15px;

  @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
`

const PortfolioLink = styled(Link)`
  position: relative;
  display: inline-block;
  padding: 0 0 9px 0;
  font-weight: 600;
  font-size: 16px;
  line-height: 1;
  color: #000000;

  &:before {
    content: '';
    position: absolute;
    width: calc(100% + 2px);
    height: 2px;
    right: -1px;
    bottom: 4px;
    background-color: #000000;
    transform-origin: right;
    /* transition: width 0.35s ease-out 0.1s; */
  }

  &:after {
    content: '';
    position: absolute;
    width: 0%;
    height: 2px;
    left: -1px;
    bottom: 4px;
    background-color: #000000;
    transform-origin: left;
    /* transition: width 0.35s ease-out; */
  }

  &:hover {
    color: #626262;
    transition: color 0.35s ease-out;

    ::before {
      background-color: #626262;
      width: 0%;
      transition: width 0.35s ease-out;
    }

    ::after {
      background-color: #626262;
      width: 100%;
      transition: width 0.35s ease-out 0.1s;
    }
  }
`

const Copyright = styled.div`
  font-weight: 500;
  font-size: 10px;
  line-height: 13px;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: #626262;

  @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
    display: none;
  }
`
const Nav = styled.nav`
  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    width: calc((100% / 2) - (35px / 2));
  }
`

const List = styled.ul`
  padding: 0;
  margin: 46px 0 0;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    margin: 10px 0 0;
  }
`

const Item = styled.li`
  min-width: 100px;
  margin: 0 0 5px 0;
  list-style: none;
`

const ListHeading = styled.h2`
  font-weight: 600;
  font-size: 12px;
  line-height: 1;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #f6851b !important;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    font-size: 10px;
  }
`

const ItemLink = styled(Link)`
  display: inline-block;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #161616;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    font-size: 12px;
    line-height: 1.8;
  }

  &:hover {
    text-decoration-line: underline !important;
    text-underline-offset: 3px !important;
  }
`

const CloseBtn = styled(ButtonShadow)`
  position: absolute;
  bottom: 390px;
  left: 50%;
  transform: scale(1);
  opacity: 0;
  z-index: 20;
  //transition: all 0.3s;

  @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
    position: relative;
    bottom: auto;
    left: auto;
    margin: 15px;
  }

  @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
    margin: 0 0 30px;
  }
`

const CopyrightBottom = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
    display: block;
    font-weight: 500;
    font-size: 10px;
    line-height: 13px;
    letter-spacing: 0.01em;
    text-transform: uppercase;
    color: #626262;
    margin-top: 60px;
  }

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    font-size: 8px;
    line-height: 10.14px;
    margin-top: 45px;
  }
`
