import React from 'react';
import PropTypes from 'prop-types';

import CTA from '../CTA';
import ContentWrapper from '../ContentWrapper';

const ContentfulFaq = (props) => {
  const {
    containerWidth,
    moduleConfig: {
      ctaLink,
      ctaText,
      ctaNewTab,
      isButton,
      ctaAlignment,
      hasModuleContainer,
    },
  } = props;

  const size = containerWidth || "wide";
  const El = !hasModuleContainer ? ({children, ...props}) => (
    <ContentWrapper
      size={size}
      {...props}
    >
      {children}
    </ContentWrapper>
  ) : React.Fragment;

  return (
    <El>
      <CTA
        link={ctaLink}
        text={ctaText}
        newTab={ctaNewTab}
        button={isButton}
        align={ctaAlignment}
        color="black"
        containerWidth={containerWidth}
      />
    </El>
  );
};

export default ContentfulFaq;

ContentfulFaq.propTypes = {
  moduleConfig: PropTypes.shape({
    ctaAlignment: PropTypes.string,
    ctaLink: PropTypes.string,
    ctaNewTab: PropTypes.bool,
    ctaText: PropTypes.string,
    isButton: PropTypes.bool,
  }),
}
