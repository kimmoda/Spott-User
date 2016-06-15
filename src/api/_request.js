import RequestError from './_requestError';

export const apiKey = 'EbQzeWS7VzRTYd8ZhhB5nwwZZGpC6BruJpWQDC3Ynd3TwFCtfe6MJMFNu9';

// Errors
// //////

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
    super(message || originalError.message || 'An unexpected error occurred while processing your request.', body, originalError);
  }
}

// httpinvoke, our father
// ----------------------

function tryToParseJson (text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    return text;
  }
}

// Hooking a finished hook into httpinvoke creates a new httpinvoke. The given callback is executed
// upon each processed request. The callback has the power to manipulate the arguments seen by the
// rest of the appication.
const wrappedFetch = async function () {
  // Try to perform the request
  let responseBody;
  let statusCode;
  try {
    const response = await Reflect.apply(fetch, null, arguments);
    // Store status code
    statusCode = response.statusCode;
    // Try parse body text as JSON, but don't fail if we do not succeed.
    responseBody = tryToParseJson(await response.text());
  } catch (e) {
    // Was there a network error?
    if (typeof e === 'object' && e.message === 'network error') {
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
        return console.log('403');
        //  return window.location.reload();
      case 404:
        throw new NotFoundError(responseBody);
      default:
        throw new UnexpectedError(null, responseBody);
    }
  }
  return { statusCode, body: responseBody };
};

// Internal helpers
// ----------------

function optionsWithoutBody (method, authenticationToken) {
  const headers = new Headers({ // Request headers
    Accept: 'application/json, text/javascript, */*; q=0.01',
    api_key: 'apiKey' // eslint-disable-line camelcase
  });
  if (authenticationToken) {
    headers.append('authtoken', authenticationToken);
  }
  return {
    method: 'GET',
    headers,
    mode: 'cors'
  };
}

function optionsWithBody (method, authenticationToken, body) {
  const headers = new Headers({ // Request headers
    'Content-Type': 'application/json; charset=UTF-8',
    Accept: 'application/json, text/javascript, */*; q=0.01',
    api_key: 'apiKey' // eslint-disable-line camelcase
  });
  if (authenticationToken) {
    headers.append('authtoken', authenticationToken);
  }
  return {
    body: JSON.stringify(body),
    method: 'GET',
    headers,
    mode: 'cors'
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
 * @param {string} authenticationToken The authentication token to send in the header.
 * @param {string} url The URL of the resource to get.
 * @return {Promise<Response, Object}>} The server response or resulting error.
 */
export function get (authenticationToken, url) {
  return wrappedFetch(url, optionsWithoutBody('GET', authenticationToken));
}

/**
 * Perform a POST request to the given URL.
 * @param {string} authenticationToken The authentication token to send in the header.
 * @param {string} url The URL to which the POST request will be sent.
 * @param {object} body The body of the POST request.
 * @return {Promise<Response, Object}>} The server response or resulting error.
 */
export function post (authenticationToken, url, body) {
  return wrappedFetch(url, optionsWithBody('POST', authenticationToken, body));
}

/**
 * Perform a PUT request to the given URL.
 * @param {string} authenticationToken The authentication token to send in the header.
 * @param {string} url The URL to which the PUT request will be sent.
 * @param {object} body The body of the PUT request.
 * @return {Promise<Response, Object}>} The server response or resulting error.
 */
export function put (authenticationToken, url, body) {
  return wrappedFetch(url, optionsWithBody('PUT', authenticationToken, body));
}

/**
 * Perform a DELETE request to the given URL.
 * @param {string} authenticationToken The authentication token to send in the header.
 * @param {string} url The URL of the resource to delete.
 * @return {Promise<Response, Object}>} The server response or resulting error.
 */
export function del (authenticationToken, url) {
  return wrappedFetch(url, optionsWithoutBody('DELETE', authenticationToken));
}
