import React from 'react';
import PropTypes from 'prop-types';
import { parseContentfulAssetUrl } from '../../lib/utils/urlParser';
import Hero from '../HeroContainer';
import CTA from '../CTA';


const ContentfulHero = (props) => {
  const {
    moduleConfig: {
      heroBackgroundImage,
      heroCtaLink,
      heroCtaText,
      heroEyebrow,
      heroSubtitle,
      heroTheme = {},
      heroTitle,
      heroTextColor = "white",
      modules
    }
  } = props;
  const bgUrl = parseContentfulAssetUrl(heroBackgroundImage);

  let HeroCTA;
  if(heroCtaLink) {
    HeroCTA = (
      <CTA
        text={heroCtaText}
        link={heroCtaLink}
        color={heroTextColor}
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

export default ContentfulHero;


ContentfulHero.propTypes = {
  moduleConfig: PropTypes.shape({
    heroBackgroundImage: PropTypes.object,
    heroCtaLink: PropTypes.string,
    heroCtaText: PropTypes.string,
    heroEyebrow: PropTypes.string,
    heroSubtitle: PropTypes.string,
    heroTheme: PropTypes.object,
    heroTitle: PropTypes.string,
    heroTextColor: PropTypes.string,
  }),
}
