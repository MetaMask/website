import React from 'react'
import PropTypes from 'prop-types'
import ContentWrapper from '../ContentWrapper'
import Countdown from 'react-countdown'
import styled, { keyframes, css } from 'styled-components'

const ContentfulHtmlEmbed = props => {
  const {
    moduleConfig: {
      hasModuleContainer,
      embedTag: { embedTag },
      htmlPublishDate,
      htmlBackground,
    },
  } = props
  const El = !hasModuleContainer
    ? ({ children, ...props }) => (
        <ContentWrapper htmlEmbed {...props}>
          {children}
        </ContentWrapper>
      )
    : React.Fragment
  if (htmlPublishDate) {
    const dateNowMs = Date.now()
    const publishDate = new Date(htmlPublishDate)
    const countdownMs = publishDate.getTime()
    const url = htmlBackground?.file?.url || ''
    if (countdownMs > dateNowMs) {
      const renderer = ({ days, hours, minutes, seconds, completed }) => {
        return (
          <El>
            <WrapperCountDown>
              <WrapperInner completed={completed}>
                {completed ? (
                  <EmbedHtml dangerouslySetInnerHTML={{ __html: embedTag }} />
                ) : (
                  <TimeWrapper>
                    <TimeCountDown>
                      <TimeItem>
                        <TimeNumber>{days}</TimeNumber>
                        <TimeText>Day</TimeText>
                      </TimeItem>
                      <TimeItem>
                        <TimeNumber>{hours}</TimeNumber>
                        <TimeText>Hours</TimeText>
                      </TimeItem>
                      <TimeItem>
                        <TimeNumber>{minutes}</TimeNumber>
                        <TimeText>Minutes</TimeText>
                      </TimeItem>
                      <TimeItem>
                        <TimeNumber>{seconds}</TimeNumber>
                        <TimeText>Seconds</TimeText>
                      </TimeItem>
                    </TimeCountDown>
                  </TimeWrapper>
                )}
                {url ? (
                  <BackgroundImage
                    completed={completed}
                    style={{ backgroundImage: `url(${url})` }}
                  />
                ) : null}
              </WrapperInner>
            </WrapperCountDown>
          </El>
        )
      }
      return <Countdown date={countdownMs} renderer={renderer} />
    }
  }

  return (
    <El>
      <EmbedHtml dangerouslySetInnerHTML={{ __html: embedTag }} />
    </El>
  )
}

export default ContentfulHtmlEmbed

ContentfulHtmlEmbed.propTypes = {
  moduleConfig: PropTypes.shape({
    embedTag: PropTypes.shape({
      embedTag: PropTypes.string.isRequired,
    }).isRequired,
  }),
}

const backgroundAnimation = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`

const WrapperCountDown = styled.div`
  display: block;
`

const BackgroundImage = styled.div`
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 3;
  pointer-events: none;
  animation: ${props =>
    props.completed
      ? css`
          ${backgroundAnimation} 2s ease-in-out forwards;
        `
      : ''};
  animation-delay: 1s;
`
const WrapperInner = styled.div`
  position: relative;
  &:before {
    content: '';
    display: block;
    padding-bottom: 56.25%;
    ${({ completed }) =>
      completed
        ? ` padding-bottom: 0;
   `
        : ''}
  }
`
const TimeWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 4;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const TimeNumber = styled.span`
  font-size: 96px;
  line-height: 106px;
  height: 106px;
  font-weight: bold;
  color: #ffffff;
  display: inline-flex;
  position: relative;
  min-width: 200px;
  padding: 0 1rem;
  justify-content: center;
  align-items: center;
  &:before {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 4rem;
    width: 1px;
    background: #595959;
  }
  @media (max-width: ${({theme}) => theme.device.miniDesktopMediaMax}) {
    font-size: 80px;
    min-width: 160px;
    line-height: 90px;
    height: 90px;
    &:before {
      height: 3.5rem;
    }
  }
  @media (max-width: ${({theme}) => theme.device.tabletMediaMax}) {
    font-size: 50px;
    min-width: 100px;
    line-height: 60px;
    height: 60px;
    &:before {
      height: 2.5rem;
    }
  }
  
  @media (max-width: ${({theme}) => theme.device.mobileMediaMax}) {
    font-size: 24px;
    min-width: 64px;
    line-height: 40px;
    height: 40px;
    &:before {
      height: 2rem;
    }
  }
  
`

const TimeItem = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  text-align: center;
  &:last-child {
    ${TimeNumber} {
      &:before {
        display: none;
      }
    }
  }
`

const TimeText = styled.span`
  font-size: 18px;
  line-height: 20px;
  color: #595959;

  @media (max-width: ${({theme}) => theme.device.mobileMediaMax}) {
    font-size: 14px;
  }
`

const TimeCountDown = styled.div`
  display: flex;
`
const EmbedHtml = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 2;
  position: relative;
  @media (max-width: ${({theme}) => theme.device.desktopMediaMax}) {
    &:before {
      content: "";
      display: block;
      padding-bottom: 56.25%;
    }

    iframe {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      margin: 0 !important;
    }
  }
`
