import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SectionTitle } from '../StyledGeneral'
import Embed from '../Embed'

const ContentfulEmbed = props => {
  const {
    moduleConfig: {
      embed: { embed },
      title,
      displayTitle,
      moduleId,
      previewMode,
      layoutType,
      playOnPopup,
    },
  } = props
  return (
    <Wrapper id={moduleId} layoutType={layoutType}>
      {title && displayTitle ? <Title>{title}</Title> : null}
      <Embed playOnPopup={playOnPopup} html={previewMode ? props.moduleConfig.embed : embed} />
    </Wrapper>
  )
}

export default ContentfulEmbed

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

const Wrapper = styled.div`
  display: block;
  width: 100%;

  ${({ layoutType,theme }) =>
  layoutType === 'horizontal'
      ? `
      @media (min-width: ${theme.device.miniDesktop}){
        display: flex;
        align-items: center;
        & > * {
          flex: 1;
          min-width: 0;
        }
      }
  `
      : ``}
`

const Title = styled(SectionTitle)`
  text-align: center;
  margin-bottom: 32px;
`
