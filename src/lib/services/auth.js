/**
 * Based on Auth0 and Gatsby examples:
 * @link https://auth0.com/blog/building-a-blog-with-gatsby-react-and-webtask/
 * @link https://www.gatsbyjs.org/docs/authentication-tutorial/
 */

//  import PrivateRoute from '../components/PrivateRoute';
//  export default (props)=> <PrivateRoute component={} {...props} />;
import { navigate } from 'gatsby';

import {
  getInStorage,
  setInStorage,
  removeFromStorage
 } from './storage';

 import {
  AUTH0_DOMAIN,
  AUTH0_CLIENT_ID,
  UNAUTHORIZED, 
  ACCESS_DENIED,
  AUTH0_NAMESPACE,
  AUTH0_USER_STORAGE,
  AUTH0_ACCESS_TOKEN_STORAGE,
  AUTH0_ID_TOKEN_STORAGE,
  AUTH0_EXPIRES_AT,
  DEFAULT_AUTH0_CONFIG
} from '../config';

 
let auth0;
if ( typeof window !== `undefined` ) {
 // auth0 has a dependcy on `window` and will cause errors on SSR during build proccess
 auth0 = require('auth0-js'); 
}


/**
 * @class Auth
 * 
 * @summary provides authentication services and identity management for the Labs website
 * 
 * @author Kiba Gateaux
 * 
 * @property {Object} auth0 - holds the instance of auth0 library
 * @property {Function} tokenRenewalTimeout - setTimeout() id for the function to start access token renewal process
 * @property {Boolean} userManualAccessTokenRenewFlow - If there is an problem with utilizing the Auth0 library manage tokens manually
 * 
 */
class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth(DEFAULT_AUTH0_CONFIG);
    this.loginRedirectPage = "/portal/";
  }

  expiresAt;
  tokenRenewalTimeout;
  useManualAccessTokenRenewFlow;

/**
 * @function
 * @name setSession
 * @memberof Auth
 * 
 * @param {Object} authResult The response from an authentication call to auth0
 * 
 * @returns undefined
 */
  setSession = ( authResult ) => {
    if( authResult && authResult.accessToken && authResult.idToken ) {
      const {
        accessToken,
        expiresIn
      } = authResult;
      const expiresAt = Date.now() + (expiresIn*1000);
      
      this.saveAuthTokenExpiration(expiresAt);
      this.saveUser(authResult);
      this.saveAuthAccessToken(accessToken);
      this.scheduleRenewal();
    } else {
      console.warn("no response from auth service. No user session created");
    }
  };

  /**
   * @function
   * @name saveUser
   * @memberof Auth
   * 
   * @description saves user info returned by auth0 to browser cookies
   * Redirects to homepage after session saved
   * 
   * @param {Object} authResult The response from an authentication call to auth0
   * 
   * @returns undefined
   */
  saveUser = ( authResult ) => {
    if( authResult && authResult.accessToken && authResult.idToken ) {
      this.auth0.client.userInfo(
        authResult.accessToken,
        (error, user) => {
          if(error) {
            // on Brave browser auth0.userInfo throws a CORS error
            // when calling AUTHO_DOMAIN/user-info to retriew data
            // This causes the data to not be saved within the auth0 library 
            // so we must manually refresh access tokens
            this.useManualAccessTokenRenewFlow = true;
            return;
          }
          
          const { aud, iss, } = authResult.idTokenPayload;
          if(aud === AUTH0_CLIENT_ID
            && iss === `https://${AUTH0_DOMAIN}/`) { // validate idToken comes from auth0
         
            const {
              name,
              picture,
            } = authResult.idTokenPayload;
            const roles = authResult.idTokenPayload[`${AUTH0_NAMESPACE}roles/`];
            const routes = authResult.idTokenPayload[`${AUTH0_NAMESPACE}routes/`];
            
            const authenticatedUser = {
              name,
              picture,
              roles,
              routes
            };
  
            this.saveUserToLocalStorage(authenticatedUser);
  
            const savedLoginPath = getInStorage('login-redirect');
            const redirecPath = savedLoginPath &&
              savedLoginPath.slice(1, savedLoginPath.length - 1); // slice off extra "" added by local storage to string
            removeFromStorage('login-redirect'); // clear storage so enter at default portal landing page on next login
            navigate(redirecPath || this.loginRedirectPage);
            return;
          }

          return;
        }
      );
    } else {
      console.warn("no response from auth service. No user session created");
      return;
    }
  };

  /**
   * @function
   * @name renewSession
   * @memberof Auth
   * 
   * @description initializes access token refresh ux flow
   * if using manual flow - does 
   * else uses auth0 library's internal token refresh flow
   * If the user's auth0 session has expired than we prompt them to login again
   * If all token refreshes and login attemps fail than logsout the user and deletes their stored data
   * 
   * @returns undefined
   */
  renewSession = () =>  {
    if( this.useManualAccessTokenRenewFlow ) { // if Brave is not throwing errors than this can be cut

      // when using `prompt: "none"` auto renew option  is not working
      // get Error_login_required, even right after logging in (try renew button on callback page)
     this.loginWithNoPrompt();
    } else {
      this.auth0.checkSession({}, ( err, authResult ) => {
        if ( authResult && authResult.accessToken ) {
          this.setSession(authResult);
          return;
        } else if ( err ) {
          console.warn(`Could not get a new auth token (${err.error}: ${err.error_description}).`, err);

          if(err.error === "login_required") {
            this.login();
            return;
          }
          
          this.logout();
          return;
        }
      });
    }
  };

  /**
   * @function
   * @name scheduleRenewal
   * @memberof Auth
   * 
   * @description adds setTimout call for renewSession() based on time till token expires 
   * 
   * @returns undefined
   */
  scheduleRenewal = () => {
    const expiresAt = getInStorage(AUTH0_EXPIRES_AT);
    const timeout = expiresAt - Date.now();
    if ( timeout > 0 ) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.renewSession();
      }, timeout);
    }
  };

  /**
   * @function
   * @name login
   * @memberof Auth
   * 
   * @description preconfigured wrapper for auth0 authorize() call
   * 
   * @returns undefined
   */
  login = (redirectRoute) => {
    const landingPage = redirectRoute || this.loginRedirectPage;
    if(this.isAuthorizedForRoute(landingPage)) {
      navigate(landingPage);
    }
    else
      this.auth0.authorize({
        connection: "google-oauth2"
      });
  }

  /**
   * @function
   * @name loginWithNoPrompt
   * @memberof Auth
   * 
   * @description preconfigured wrapper for auth0 authorize() call for refresh token flow
   * 
   * @returns undefined
   */
  loginWithNoPrompt = () =>
    this.auth0.authorize({
      connection: "google-oauth2",
      prompt: "none"
    });

  /**
   * @function
   * @name logout
   * @memberof Auth
   * 
   * @description removes all user data and token renewal call 
   * 
   * @returns undefined
   */
  logout = (redirectPath)=> {
    clearTimeout(this.tokenRenewalTimeout);
    removeFromStorage(AUTH0_USER_STORAGE);
    removeFromStorage(AUTH0_ID_TOKEN_STORAGE);
    removeFromStorage(AUTH0_ACCESS_TOKEN_STORAGE);
    removeFromStorage(AUTH0_EXPIRES_AT);
    navigate(redirectPath || "/")
  };

  /**
   * @function
   * @name onAuthResponse
   * @memberof Auth
   * 
   * @description 
   * 
   * @param {Object} err - error from auth0 login response
   * @param {Object} authResult - data and metadata from auth0 login response
   * 
   * @returns undefined
   */
  onAuthResponse = ( err, authResult ) => {
    if(err)  {
      // TODO : figure out login ux flow and update error response
      // err.error === "invalid_token" -> please try logging in again
    };

    if( authResult && authResult.accessToken ) {
      this.setSession(authResult);
    }
  };

  /**
   * @function
   * @name onAuthError
   * @memberof Auth
   * 
   * @description handles errors from auth0 login attempt
   * 
   * @param {Object} error - error from auth0 login response
   * @param {String} type - error code type
   * @param {String} description - error description
   * 
   * @returns undefined
   */
  onAuthError = ({ type, description }) => {
    if( type === UNAUTHORIZED|| type === ACCESS_DENIED ) {
      // send to new page, add error to props and display popup notifcations
      navigate("/", { state: { notification: { error: { type, description }}}});
    }
  };


  // HELPER FUNCTIONS

  /**
   * @function
   * @name parseErrorHash
   * @memberof Auth
   * 
   * @description handles hash in url from auth0 callback on failed logins
   * 
   * @param {String} hash - string with data about error type and description
   * hash takes the form of domain/path/#error=[type]]&error_description=[desc]&state=[state]
   * 
   * @returns {Object} { type: String, description: String }
   */
  parseErrorHash = (hash) => {
    // eslint-disable-next-line
    const [_, type, __, description ] = hash.split(/=(.*?)&/g);
    return { type, description };
  };
  
  /**
   * @function
   * @name getUser
   * @memberof Auth
   * 
   * @description gets user data from cookies
   * 
   * @returns {Object} { name: String, email: String, image: String, locale: String }
   */
  getUser = () => getInStorage(AUTH0_USER_STORAGE);

  /**
   * @function
   * @name saveUserToLocalStorage
   * @memberof Auth
   * 
   * @description saves user to cookies
   * 
   * @param {Object} { name: String, email: String, image: String, locale: String }
   * 
   * @returns {Boolean} { name: String, email: String, image: String, locale: String }
   */
  saveUserToLocalStorage = (user) => {
    if( user ) {
      setInStorage(AUTH0_USER_STORAGE, user);
      return true;
    } else {
      return false;
    }
  };

  saveAuthAccessToken = (token) =>
    setInStorage(AUTH0_ACCESS_TOKEN_STORAGE, token);

  saveAuthTokenExpiration = (date) =>
    setInStorage(AUTH0_EXPIRES_AT, date);
  
  isLoggedIn = () => {
    const expiresAt = getInStorage(AUTH0_EXPIRES_AT);

    if( !expiresAt || expiresAt < Date.now() ) {
      // UX - auto login flow or direct to "Private Route Warning"
      return false;
    } else {
      return !!this.getUser();
    }
  };


  isAuthorizedForRoute = (path, routeAccessLevel) => {
    const user = this.getUser();
    if( !user || !user.roles || !user.routes ) {
      // save the path for later so we can redirect the user once they login
      // exclude default portal path so it doesn't get override original option in OAuth login callback
      if (path !== "/portal/") setInStorage('login-redirect', path);
      return false;
    } else {
      // ordered left->right by lowest->highest access privileges
      const permissionLevels = ["public", "meshian", "labsAdmin"];
      // get highest available level for user
      const allUserPermissionLevels = user.roles.map(
        (role) => permissionLevels.indexOf(role)
      );
      const highestPermissionLevel = Math.max(...allUserPermissionLevels);
      const routePermissionLevel = permissionLevels.indexOf(routeAccessLevel);
      const isPermissed = highestPermissionLevel >= routePermissionLevel;
      return isPermissed;
    }
  };

};

const AuthService = auth0 ? new Auth() : {};
export default AuthService;


