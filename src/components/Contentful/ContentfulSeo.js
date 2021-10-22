import React from 'react';
import PropTypes from 'prop-types';

import SEO from '../Seo';


const ContentfulSeo = (props) => {
  const {
    moduleConfig: {
      pageTitle,
      pageDescription,
      metaTags,
      linkTags,
      seoFeaturedImage,
      seoPagePath
    }
  } = props;

  const extractTags = (list) => list ? list.map(tag => JSON.parse(tag.internal.content)) : null;
  const [ex_metaTags, ex_linkTags] = [metaTags, linkTags].map(extractTags);

  return (
    <SEO
      title={pageTitle}
      description={pageDescription}
      pagePath={seoPagePath}
      image={seoFeaturedImage}
      metaTags={ex_metaTags}
      linkTags={ex_linkTags}
    />
  )
};

ContentfulSeo.propTypes = {
  seoPage: PropTypes.object,
  pageTitle: PropTypes.string,
  pageDescription: PropTypes.string,
  metaTags: PropTypes.arrayOf(PropTypes.object),
  linkTags: PropTypes.arrayOf(PropTypes.object),
  seoFeaturedImage: PropTypes.object,
  seoPagePath: PropTypes.string
};

export default ContentfulSeo;
