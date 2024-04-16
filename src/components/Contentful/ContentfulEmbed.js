import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SectionTitle } from '../StyledGeneral'
import Embed from '../Embed'
import { parseContentfulAssetUrl } from '../../lib/utils/urlParser'
import withProcessPreviewData from '../../lib/utils/withProcessPreviewData'

const ContentfulEmbed = props => {
  const {
    moduleConfig: {
      embed: { embed },
      title,
      displayTitle,
      moduleId,
      previewMode = false,
      layoutType,
      playOnPopup,
      thumbnail,
      clickToPlayOnWholeCard,
      hidePlayerIcon,
      duration,
    },
  } = props

  const cardRef = useRef(null)
  const thumbnailUrl = parseContentfulAssetUrl(thumbnail, previewMode)

  return (
    <Wrapper id={moduleId} layoutType={layoutType}>
      <WrapperInner
        $clickable={clickToPlayOnWholeCard}
        ref={clickToPlayOnWholeCard ? cardRef : null}
      >
        {title && displayTitle ? <Title>{title}</Title> : null}
        <div className="embed-wrapper">
          <Embed
            playOnPopup={playOnPopup}
            hidePlayerIcon={hidePlayerIcon}
            html={previewMode ? props.moduleConfig.embed : embed}
            thumbnailUrl={thumbnailUrl}
            cardRef={cardRef}
          />
          {duration ? <div className="duration">{duration}</div> : null}
        </div>
      </WrapperInner>
    </Wrapper>
  )
}

const parsePreviewData = data => {
  data = data.moduleConfig.previewContent || data.moduleConfig

  const dataUpdate = {
    moduleConfig: {
      previewMode: true,
      ...data,
    },
  }
  return dataUpdate
}

export default withProcessPreviewData(parsePreviewData)(ContentfulEmbed)

ContentfulEmbed.propTypes = {
  moduleConfig: PropTypes.shape({
    displayTitle: PropTypes.bool,
    title: PropTypes.string,
    embed: PropTypes.oneOfType([
      PropTypes.shape({
        embed: PropTypes.string.isRequired,
      }),
      PropTypes.string,
    ]),
    moduleId: PropTypes.string,
    playOnPopup: PropTypes.bool,
  }),
}

const Title = styled(SectionTitle)`
  text-align: center;
  margin-bottom: 32px;
  .developer-community-calls & {
    font-size: 16px;
    font-weight: 400;
    text-align: initial;
    margin-top: 8px;
    margin-bottom: 0;
    line-height: 1.2;
  }
`

const Wrapper = styled.div`
  display: block;
  width: 100%;

  ${({ layoutType, theme }) =>
    layoutType === 'horizontal'
      ? `
      @media (min-width: ${theme.device.miniDesktop}){
        display: flex;
        align-items: center;
        ${Title} {
          margin-right: 40px;
        }
        & > * {
          flex: 1;
          min-width: 0;
        }
      }
  `
      : ``}
  .embed-mb-20 & {
    margin-bottom: 20px;
  }
`

const WrapperInner = styled.div`
  ${({ $clickable }) => ($clickable ? `cursor: pointer;` : ``)}

  .embed-wrapper {
    position: relative;
    .duration {
      position: absolute;
      color: #fff;
      background-color: #000;
      padding: 4px 8px;
      border-radius: 6px;
      right: 4px;
      bottom: 4px;
      z-index: 10;
      font-size: 12px;
      line-height: 1;
    }
  }

  .developer-community-calls & {
    display: flex;
    flex-direction: column-reverse;
    align-self: flex-start;
  }
`
