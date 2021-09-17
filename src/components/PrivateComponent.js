import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Auth from '../lib/services/auth';
import { ACCESS_DENIED } from '../lib/config';

/**
 * @name - Private Route
 * @summary - Redirects users from private pages if not logged in to @consensys.net 
 * @description - Not the same as a route with different content for public vs mesg
 * @prop - 
 */

export default class PrivateComponent extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      authorized: false
    }
  }

  componentDidMount() {
    const {
      location: { pathname },
      accessLevel = "meshian" // default to lowest private access level
    } = this.props;
    const userAccessRights = Auth.isAuthorizedForRoute(pathname, accessLevel);
    if ( ! userAccessRights ) {
      Auth.onAuthError({
        type: ACCESS_DENIED,
        description: `You must be logged in to an authorized account to view this page - ${pathname}` 
      })
      return null;
    }
    return this.setState({ authorized: true });
  }



  render() {
    const { component: Component, ...props } = this.props;
    return this.state.authorized ? <Component {...props} /> : null;
  }
}

export const privatizeComponent = (component) => (props) => (
  <PrivateComponent component={component} {...props} />
);

PrivateComponent.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element
  ]).isRequired
};
