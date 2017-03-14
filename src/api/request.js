import { getLocalStorage } from '../utils';

export const apiKey = 'EbQzeWS7VzRTYd8ZhhB5nwwZZGpC6BruJpWQDC3Ynd3TwFCtfe6MJMFNu9';

const storage = getLocalStorage();

// Errors
// //////

/**
 * Lowest-level error.
 * Based upon: http://stackoverflow.com/questions/31089801/extending-error-in-javascript-with-es6-syntax
 */
export class RequestError extends Error {
  constructor (message, body, originalError) {
    super(message || 'An error occurred while processing your request.');
    this.name = this.constructor.name;
    this.stack = (originalError || new Error()).stack;
    this.body = body;
    this.originalError = originalError;
  }
}

/**
 * Constructs a network error wrapper.
 */
export class NetworkError extends RequestError {
  constructor (originalError) {
    super('Network error. Please check your internet connection.', null, originalError);
  }
}

/**
 * Constructs a Unauthorized error wrapper.
 */
export class UnauthorizedError extends RequestError {
  constructor (body) {
    super('Unauthorized. Authentication required.', body, null);
    this.statusCode = 401;
  }
}

/**
 * Constructs a Bad Request error wrapper.
 */
export class BadRequestError extends RequestError {
  constructor (body) {
    super('Invalid request.', body, null);
    this.statusCode = 400;
  }
}

/**
 * Constructs a Not Found error wrapper.
 */
export class NotFoundError extends RequestError {
  constructor (message, body) {
    super('Could not find the requested resource.', body, null);
    this.statusCode = 404;
  }
}

/**
 * Constructs a Unexpected error wrapper.
 */
export class UnexpectedError extends RequestError {
  constructor (message, body, originalError) {
    super(message || (originalError && originalError.message) || 'An unexpected error occurred while processing your request.', body, originalError);
  }
}

// httpinvoke, our father
// ----------------------

export function tryToParseJson (text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    return text;
  }
}

// Hooking a finished hook into httpinvoke creates a new httpinvoke. The given callback is executed
// upon each processed request. The callback has the power to manipulate the arguments seen by the
// rest of the appication.
export const wrappedFetch = async function () {
  // Try to perform the request
  let responseBody;
  let statusCode;
  try {
    const response = await Reflect.apply(fetch, null, arguments);
    // Store status code
    statusCode = response.status;
    // Try parse body text as JSON, but don't fail if we do not succeed.
    responseBody = tryToParseJson(await response.text());
  } catch (e) {
    // Was there a network error?
    if (typeof e === 'object' && e.name === 'TypeError') {
      throw new NetworkError(e);
    }
    throw e;
  }
  // Process response
  if (statusCode >= 400 && statusCode <= 599) { // Convert 400's and 500's to error
    // Construct correct low-level error
    switch (statusCode) {
      case 400:
        throw new BadRequestError(responseBody);
      case 401:
        throw new UnauthorizedError(responseBody);
      case 403:
        // We received 403 Forbidden. We are not authorized. This can be due to an invalid
        // expired authentication token. We do a hard reload of the application, which will
        // redirect us to login. Ugly, but effective!
        storage.removeItem('session');
        return window.location.reload();
      case 404:
        throw new NotFoundError('entity', responseBody);
      default:
        throw new UnexpectedError(null, responseBody);
    }
  }
  return { statusCode, body: responseBody };
};

// Internal helpers
// ----------------

function optionsWithoutBody (method, authenticationToken, locale = 'en') {
  const headers = new Headers({ // Request headers
    Accept: 'application/json, text/javascript, */*; q=0.01',
    'Accept-Language': locale,
    api_key: apiKey // eslint-disable-line camelcase
  });
  if (authenticationToken) {
    headers.append('authtoken', authenticationToken);
  }
  return {
    cache: 'no-cache',
    method,
    headers,
    mode: 'cors',
    credentials: 'same-origin'
  };
}

function optionsWithBody (method, authenticationToken, locale = 'en', body) {
  const headers = new Headers({ // Request headers
    'Content-Type': 'application/json; charset=UTF-8',
    Accept: 'application/json, text/javascript, */*; q=0.01',
    'Accept-Language': locale,
    api_key: apiKey // eslint-disable-line camelcase
  });
  if (authenticationToken) {
    headers.append('authtoken', authenticationToken);
  }
  return {
    body: JSON.stringify(body),
    cache: 'no-cache',
    method,
    headers,
    mode: 'cors',
    credentials: 'same-origin'
  };
}

// Public functions
// ----------------

/**
 *
 * @typedef {Object} Response.
 * @return {number} statusCode The returned status code.
 * @return {Object} body The parsed JSON response.
 */

/**
 * Perform a GET request to the given URL.
 * @param {string} [authenticationToken] The authentication token to send in the header.
 * @param {string} [locale] The Accept-Language to send in the header.
 * @param {string} url The URL of the resource to get.
 * @return {Promise<Response, Object}>} The server response or resulting error.
 */
export function get (authenticationToken, locale, url) {
  return wrappedFetch(url, optionsWithoutBody('GET', authenticationToken, locale));
}

/**
 * Perform a POST request to the given URL.
 * @param {string} [authenticationToken] The authentication token to send in the header.
 * @param {string} [locale] The Accept-Language to send in the header.
 * @param {string} url The URL to which the POST request will be sent.
 * @param {object} body The body of the POST request.
 * @return {Promise<Response, Object}>} The server response or resulting error.
 */
export function post (authenticationToken, locale, url, body) {
  return wrappedFetch(url, optionsWithBody('POST', authenticationToken, locale, body));
}

/**
 * Perform a PUT request to the given URL.
 * @param {string} [authenticationToken] The authentication token to send in the header.
 * @param {string} [locale] The Accept-Language to send in the header.
 * @param {string} url The URL to which the PUT request will be sent.
 * @param {object} body The body of the PUT request.
 * @return {Promise<Response, Object}>} The server response or resulting error.
 */
export function put (authenticationToken, locale, url, body) {
  return wrappedFetch(url, optionsWithBody('PUT', authenticationToken, locale, body));
}

/**
 * Perform a DELETE request to the given URL.
 * @param {string} [authenticationToken] The authentication token to send in the header.
 * @param {string} [locale] The Accept-Language to send in the header.
 * @param {string} url The URL of the resource to delete.
 * @param {object} body The body of the DELETE request.
 * @return {Promise<Response, Object}>} The server response or resulting error.
 */
export function del (authenticationToken, locale, url, body) {
  return wrappedFetch(url, optionsWithBody('DELETE', authenticationToken, locale, body));
}
