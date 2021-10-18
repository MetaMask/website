import React from 'react';
import PropTypes from 'prop-types';

import ContentWrapper from '../ContentWrapper';
import RichText from '../RichText'

const ContentfulRichText = (props) => {
  const {
    containerWidth,
    moduleConfig: {
      richTextBody,
      richTextTitle: title,
      hasModuleContainer,
      displayTitle,
      fontWeightManual,
      childHeroContainer,
    }
  } = props;

  const size = containerWidth || "wide";
  const El = !hasModuleContainer ? ({children, ...props}) => (
    <ContentWrapper
      size={size}
      styleOverride={`@media(min-width: 992px) {margin: 5rem auto;}`}
      {...props}
    >
      {children}
    </ContentWrapper>
  ) : React.Fragment;

  let bodyConfig;
  // handle different data formats in preview vs graphql mode
  if(richTextBody && richTextBody.content)
    bodyConfig = richTextBody.content;

  if(richTextBody && richTextBody.internal)
    bodyConfig = JSON.parse(richTextBody.internal.content).content;

  return (
    <El>
      <RichText
        title={title}
        content={bodyConfig}
        displayTitle={displayTitle}
        fontWeightManual={fontWeightManual}
        childHeroContainer={childHeroContainer}
      />
    </El>
  );
};

export default ContentfulRichText;


ContentfulRichText.propTypes = {
  moduleConfig: PropTypes.shape({
    moduleConfig: PropTypes.shape({
      richTextTitle: PropTypes.string,
      richTextBody: PropTypes.shape({
        internal: PropTypes.shape({
          content: PropTypes.string
        })
      }),
      hasModuleContainer: PropTypes.bool,
      displayTitle: PropTypes.bool,
      fontWeightManual: PropTypes.bool,
    })
  }),
}
