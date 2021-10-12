import cookies from 'react-cookies';
import { NODE_ENV } from '../config';


const defaultCookieOptions = {
  secure: (NODE_ENV === "production" && true) || false,
  path: "/",
  // domain: process.env.subdomain + process.env.domain
};

/**
 * @function
 * @name getInStorage
 * 
 * @description returns data in cookies at provided field
 * 
 * @param {String} [ field = "" ] field value where data is stored in cookies
 * 
 * @returns {Object | undefined} undefined if cookies[field] does not exist
*/
export const getInStorage = (field = "") => cookies.load(field);

/**
 * @function
 * @name getAllInStorage
 * 
 * @description returns data in cookies at provided field
 * 
 * @returns {Objecut | Undefined} returns all cookies available in the browser set in our application
*/
export const getAllInStorage = () => cookies.loadAll();


/**
 * @function
 * @name setInStorage
 * 
 * @description returns data in cookies at provided field
 * 
 * @param {String} field field value where data is stored in cookies
 * @param {String} value value to be stored
 * @param {Object} [ options = {} ] options to cookies 
 * 
 * @returns {Boolean} true or false value if user was sucessfully saved
*/
export const setInStorage = (field, value, options = {}) => {

  if(!field || typeof field === "object") {
    const error =  new Error("`field` argument for setInStorage must be a string or integer");
    console.error(error);
    return false;
  }

  if(!value) {
    const error =  new Error("You must pass a `value` argument to setInStorage");
    console.error(error);
    return false;
  }

  try {
    cookies.save(
      field,
      JSON.stringify(value),
      {...defaultCookieOptions, ...options}
    );
    return true;
  } catch (e) {
    console.error("Error saving to local storage", e);
    return false;
  }
};



/**
 * @function
 * @name removeFromStorage
 * 
 * @description removes data in cookies at provided field
 * 
 * @param {String} field field value where data is stored in cookies
 * 
 * @returns {Undefined}
*/
export const removeFromStorage = (field, options) => {
  cookies.remove(field, {...defaultCookieOptions, ...options});
  return;
};