import React from 'react';
import PropTypes from 'prop-types';
import { parseContentfulAssetUrl } from '../../lib/utils/urlParser';
import Hero from '../HeroContainer';
import CTA from '../CTA';


const ContentfulLayoutFeature = (props) => {
  const {
    moduleConfig: {
      eyebrowLogo,
      backgroundImage,
      ctaLink,
      ctaText,
      heroEyebrow,
      heroSubtitle,
      heroTheme = {},
      heroTitle,
      modules
    }
  } = props;
  const bgUrl = parseContentfulAssetUrl(backgroundImage);

  let HeroCTA;
  if(ctaLink) {
    HeroCTA = (
      <CTA
        text={ctaText}
        link={ctaLink}
      />
    )
  }

  return (
    <Hero
      title={heroTitle}
      subtitle={heroSubtitle}
      header={heroEyebrow}
      backgroundImage={bgUrl}
      CTA={HeroCTA}
      themeOverride={heroTheme}
      modules={modules}
    />
  );
};

export default ContentfulLayoutFeature;


ContentfulLayoutFeature.propTypes = {
  moduleConfig: PropTypes.shape({
    eyebrowLogo: PropTypes.object,
    sideImage: PropTypes.object,
    backgroundImage: PropTypes.object,
    ctaLink: PropTypes.string,
    ctaText: PropTypes.string,
    heroEyebrow: PropTypes.string,
    description: PropTypes.string,
    headline: PropTypes.string,
    backgroundColor: PropTypes.string,
    layout: PropTypes.string,
  }),
}
