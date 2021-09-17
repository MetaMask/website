import React from 'react';
import PropTypes from 'prop-types';

import SEO from '../Seo';


const ContentfulSeo = (props) => {
  const {
    moduleConfig: {
      seoPageTitle,
      seoPageDescription,
      seoMetaTags,
      seoLinkTags,
      seoFeaturedImage,
      seoPagePath
    }
  } = props;

  const extractTags = (list) => list ? list.map(tag => JSON.parse(tag.internal.content)) : null;
  const [metaTags, linkTags] = [seoMetaTags, seoLinkTags].map(extractTags);

  return (
    <SEO
      title={seoPageTitle}
      description={seoPageDescription}
      pagePath={seoPagePath}
      image={seoFeaturedImage}
      metaTags={metaTags}
      linkTags={linkTags}
    />
  )
};

ContentfulSeo.propTypes = {
  seoPage: PropTypes.object,
  seoPageTitle: PropTypes.string,
  seoPageDescription: PropTypes.string,
  seoMetaTags: PropTypes.arrayOf(PropTypes.object),
  seoLinkTags: PropTypes.arrayOf(PropTypes.object),
  seoFeaturedImage: PropTypes.object,
  seoPagePath: PropTypes.string
};

export default ContentfulSeo;
