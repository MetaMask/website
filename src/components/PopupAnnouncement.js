import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import ArrowIcon from '../images/icons/icon-arrow-right.svg'
import Link from './Link'

const PopupAnnouncement = props => {
  const { title, ctaText, ctaLink, backgroundColor } = props

  const [isHidden, setIsHidden] = React.useState(false)

  const onClosePopup = () => {
    setIsHidden(true)
  }
  if (isHidden) {
    return null
  }

  return (
    <Wrapper backgroundColor={backgroundColor}>
      <WrapperInner>
        <WrapperInnerLink>
          {ctaLink && (
            <ClickArea to={ctaLink} newTab aria-label={title || ctaText} />
          )}
          <Content>
            {title && <Title>{title}</Title>}
            {ctaText && (
              <Cta>
                <CtaTitle>{ctaText}</CtaTitle>
                <ArrowIcon />
              </Cta>
            )}
          </Content>
        </WrapperInnerLink>
        <CloseBtn role="button" onClick={onClosePopup} aria-label="close">
          <span className="w-icon w-icon-close"></span>
        </CloseBtn>
      </WrapperInner>
    </Wrapper>
  )
}

export default withTheme(PopupAnnouncement)

PopupAnnouncement.propTypes = {
  title: PropTypes.string,
  ctaText: PropTypes.string,
  ctaLink: PropTypes.string,
  backgroundColor: PropTypes.string,
}

const Wrapper = styled.div`
  display: block;
  ${({ backgroundColor }) =>
    backgroundColor ? ` background: ${backgroundColor};` : ''}
`

const WrapperInner = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`

const WrapperInnerLink = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
  min-height: 40px;
  min-width: 0;
  padding: 8px;
  position: relative;
`

const Content = styled.div`
  align-items: center;
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  color: #ffffff;
  text-align: center;
`

const ClickArea = styled(Link)`
  bottom: 0;
  color: transparent;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
`

const Title = styled.div`
  font-size: 14px;
  line-height: 150%;
  margin-right: 4px;
`

const Cta = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  line-height: 120%;
  color: #ffffff;
  font-weight: 700;

  svg {
    width: 12px;
    height: auto;
    margin-left: 4px;
    flex-shrink: 0;
    path {
      fill: #fff;
    }
  }
`

const CtaTitle = styled.span`
  border-bottom: 1px solid #fff;

  @media (max-width: 767px) {
    border-bottom: none;
    text-decoration: underline;
  }
`

const CloseBtn = styled.span`
  display: inline-flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 8px 16px;
  font-size: 10px;
  position: relative;

  &:hover {
    opacity: 0.5;
  }
`
