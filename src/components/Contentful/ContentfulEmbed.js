import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SectionTitle } from '../StyledGeneral'
import Embed from '../Embed';

const ContentfulEmbed = props => {
  const {
    moduleConfig: {
      embed: { embed },
      title,
      displayTitle,
      moduleId,
      previewMode,
    },
  } = props

  return (
    <Wrapper id={moduleId}>
      {title && displayTitle ? <Title>{title}</Title> : null}
      <Embed html={previewMode ? props.moduleConfig.embed : embed} />
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
  }),
}

const Wrapper = styled.div`
  display: block;
  width: 100%;
`

const Title = styled(SectionTitle)`
  text-align: center;
  margin-bottom: 32px;
`
