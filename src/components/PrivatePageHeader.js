import React from 'react';
import Auth from '../lib/services/auth';
import { privateHeaderLinks } from '../lib/config';

import Header from './Header';

/**
 * @name PrivatePageHeader
 * @summary - 
 * @description - 
 */
const PrivatePageHeader = (props) => {
  const meshButton = {
    text: "Logout",
    onClick: Auth.logout,
    active: true
  };
  
  return (
    <Header
      links={privateHeaderLinks}
      meshButton={meshButton}
      shadow
    />
  );
};

export default PrivatePageHeader;
