import React from 'react'
import PropTypes from 'prop-types'
import ContentWrapper from '../ContentWrapper'

const ContentfulHtmlEmbed = props => {
  const {
    moduleConfig: {
      hasModuleContainer,
      embedTag: { embedTag },
    },
  } = props
  
  const El = !hasModuleContainer ? (
    ({ children, ...props }) => (
      <ContentWrapper
        htmlEmbed
        dangerouslySetInnerHTML={{ __html: embedTag }}
        {...props}
      />
    )
  ) : React.Fragment

  return (
    <El>
      <div dangerouslySetInnerHTML={{ __html: embedTag }} />
    </El>
  );
}

export default ContentfulHtmlEmbed

ContentfulHtmlEmbed.propTypes = {
  moduleConfig: PropTypes.shape({
    embedTag: PropTypes.shape({
      embedTag: PropTypes.string.isRequired,
    }).isRequired,
  }),
}
