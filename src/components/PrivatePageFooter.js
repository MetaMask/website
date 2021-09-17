import React from 'react';

import Footer from './Footer';

import { privateFooterLinks } from '../lib/config';

/**
 * @name PrivatePageFooter
 * @summary - 
 * @description - 
 */
const PrivatePageFooter = (props) => {

  return (
    <Footer columns={privateFooterLinks} />
  )
};

export default PrivatePageFooter;
