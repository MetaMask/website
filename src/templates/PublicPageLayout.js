import React from 'react';

import Layout from '../components/layout';

import {
  ToastContainer as Notifications,
  toast
} from 'react-toastify';

import { darkTheme } from '../lib/theme'
import 'react-toastify/dist/ReactToastify.css';

/**
 * @name PublicPageLayout
 * @summary - Wrapper container to hold all public pages
 * @description - 
 */
const PublicPageLayout= (props) => {
  const {
    location,
    children,
    theme,
    ...rest
  } = props
  const renderNotification = (state = {}) => {
    if( state.error ) {
      const { type, description } = state.error;
      const errorMessage = `
        ${type.split("_").join(" ").toUpperCase()} -
        ${decodeURIComponent(description)}`;

      toast.error(errorMessage);
    }
  };

  const navigationState = (location && location.state) || {};
  if(navigationState.notification) {
    renderNotification(navigationState.notification);
  }

  return (
    <Layout theme={theme || darkTheme} {...rest}>
      <Notifications />
      {children}
    </Layout>
  )
};

export default PublicPageLayout;
