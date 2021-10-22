import React from 'react';
import PropTypes from 'prop-types';
import CTA from '../CTA';

const ContentfulLayoutFullWidthCta = (props) => {
  const {
    moduleConfig: {
      ctaLink,
      ctaText,
    }
  } = props;

  return (
    <CTA
      text={ctaText}
      link={ctaLink}
    />
  );
};

export default ContentfulLayoutFullWidthCta;


ContentfulLayoutFullWidthCta.propTypes = {
  moduleConfig: PropTypes.shape({
    description: PropTypes.string,
    headline: PropTypes.string,
    ctaLink: PropTypes.string,
    ctaText: PropTypes.string,
    backgroundColor: PropTypes.string,
    layout: PropTypes.string,
  }),
}
