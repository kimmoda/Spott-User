import httpinvoke from 'httpinvoke';
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
const hookedHttpinvoke = httpinvoke.hook('finished', (err, output, statusCode, headers) => {
  // httpinvoke failed?
  if (err) {
    // Was there a network error?
    if (typeof err === 'object' && err.message === 'network error') {
      return [ new NetworkError(err), output, statusCode, headers ];
    }
    // We do not know the exact reason, throw a general error
    return [ new UnexpectedError(null, null, err), output, statusCode, headers ];
  }
  // Convert 400's and 500's to error
  if (statusCode >= 400 && statusCode <= 599) {
    let responseError;
    // Try parse body text as JSON, but don't fail if we do not succeed.
    const newOutput = tryToParseJson(output);
    // Construct correct low-level error
    switch (statusCode) {
      case 400:
        responseError = new BadRequestError(newOutput); break;
      case 401:
        responseError = new UnauthorizedError(newOutput); break;
      case 403:
        return console.log('403');
        //  return window.location.reload();
      case 404:
        responseError = new NotFoundError(newOutput); break;
      default:
        responseError = new UnexpectedError(null, newOutput);
    }
    return [ responseError, newOutput, statusCode, headers ];
  }
  return [ null, tryToParseJson(output), statusCode, headers ];
});

// Internal helpers
// ----------------

const CONVERTERS = {
  'json text': JSON.stringify,
  'text json': (identity) => identity
};

function optionsWithoutBody (authenticationToken) {
  const options = {
    converters: CONVERTERS,
    headers: { // Request headers
      Accept: 'application/json, text/javascript, */*; q=0.01',
      api_key: apiKey // eslint-disable-line camelcase
    },
    outputType: 'json'
  };
  if (authenticationToken) {
    options.headers.authtoken = authenticationToken;
  }
  return options;
}

function optionsWithBody (authenticationToken, body) {
  const options = {
    converters: CONVERTERS,
    headers: { // Request headers
      'Content-Type': 'application/json; charset=UTF-8',
      Accept: 'application/json, text/javascript, */*; q=0.01',
      api_key: apiKey // eslint-disable-line camelcase
    },
    input: body || {},
    inputType: 'json', // Type of request data
    outputType: 'json' // Type of response body
  };
  if (authenticationToken) {
    options.headers.authtoken = authenticationToken;
  }
  return options;
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
  return hookedHttpinvoke(url, 'GET', optionsWithoutBody(authenticationToken));
}

/**
 * Perform a POST request to the given URL.
 * @param {string} authenticationToken The authentication token to send in the header.
 * @param {string} url The URL to which the POST request will be sent.
 * @param {object} body The body of the POST request.
 * @return {Promise<Response, Object}>} The server response or resulting error.
 */
export function post (authenticationToken, url, body) {
  return hookedHttpinvoke(url, 'POST', optionsWithBody(authenticationToken, body));
}

/**
 * Perform a PUT request to the given URL.
 * @param {string} authenticationToken The authentication token to send in the header.
 * @param {string} url The URL to which the PUT request will be sent.
 * @param {object} body The body of the PUT request.
 * @return {Promise<Response, Object}>} The server response or resulting error.
 */
export function put (authenticationToken, url, body) {
  return hookedHttpinvoke(url, 'PUT', optionsWithBody(authenticationToken, body));
}

/**
 * Perform a DELETE request to the given URL.
 * @param {string} authenticationToken The authentication token to send in the header.
 * @param {string} url The URL of the resource to delete.
 * @return {Promise<Response, Object}>} The server response or resulting error.
 */
export function del (authenticationToken, url) {
  return hookedHttpinvoke(url, 'DELETE', optionsWithoutBody(authenticationToken));
}
