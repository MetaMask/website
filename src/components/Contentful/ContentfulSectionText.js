import React from 'react';
import PropTypes from 'prop-types';

import ContentWrapper from '../ContentWrapper';
import Section from '../Section'


const ContentfulSectionText = (props) => {
  const {
    containerWidth,
    moduleConfig: {
      sectionBody,
      sectionTitle: title,
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
  if(sectionBody && sectionBody.content)
    bodyConfig = sectionBody.content;

  if(sectionBody && sectionBody.internal)
    bodyConfig = JSON.parse(sectionBody.internal.content).content;

  return (
    <El>
      <Section
        title={title}
        content={bodyConfig}
        displayTitle={displayTitle}
        fontWeightManual={fontWeightManual}
        childHeroContainer={childHeroContainer}
      />
    </El>
  );
};

export default ContentfulSectionText;


ContentfulSectionText.propTypes = {
  moduleConfig: PropTypes.shape({
    moduleConfig: PropTypes.shape({
      sectionTitle: PropTypes.string,
      sectionBody: PropTypes.shape({
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
