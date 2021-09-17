import React from 'react';
import PropTypes from 'prop-types';
import NewsletterForm from '../NewsletterForm';

const ContentfulNewsletterForm = (props) => {
  const {
    moduleConfig: {
      newsletterFormId,
      newsletterCtaText,
      newsletterRedirectUrl,
      newsletterAlignSelf,
      newsletterBackgroundColor
    }
  } = props;

  return (
    <NewsletterForm
      formId={newsletterFormId}
      ctaText={newsletterCtaText}
      redirectUrl={newsletterRedirectUrl}
      alignSelf={newsletterAlignSelf}
      backgroundColor={newsletterBackgroundColor}
    />
  );
};

export default ContentfulNewsletterForm;


ContentfulNewsletterForm.propTypes = {
  moduleConfig: PropTypes.shape({
    newsletterFormId: PropTypes.string,
    newsletterCtaText: PropTypes.string,
    newsletterRedirectUrl: PropTypes.string,
    newsletterAlignSelf: PropTypes.string.isRequired,
    newsletterBackgroundColor: PropTypes.string,
  }),
}
