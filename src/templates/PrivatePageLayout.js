import { privatizeComponent } from '../components/PrivateComponent';
import React from 'react';

import Layout from '../components/layout';

import { lightTheme } from '../lib/theme';

/**
 * @name PrivatePageLayout
 * @summary - Wraps page in private component HOC and private portal navigation
 * @description -
 * must destructure components props into Layout when applied
 * else throws 'pathname undefined' in privatizeComponent
 * 
 * const exampleComponent = (props) => (
 *  <PrivatePageLayout {...props}>
 *  // component things
 * </PrivatePageLayout {...props}>
 * );
 * 
*/
const PrivatePageLayout= (props) => {
  const {
    children,
    theme,
    ...rest
  } = props
  return (
    <Layout theme={theme || lightTheme} {...rest}>
      {children}
    </Layout>
  );
};

export default privatizeComponent(PrivatePageLayout);
