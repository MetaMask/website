import React from 'react';

import Footer from './Footer';

import { publicFooterLinks } from '../lib/config';

/**
 * @name PublicPageFooter
 * @summary - 
 * @description - 
 */
const PublicPageFooter = (props) => {

  return (
    <Footer columns={publicFooterLinks} />
  )
};

export default PublicPageFooter;
