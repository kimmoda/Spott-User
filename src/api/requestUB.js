import { wrappedFetch } from './request';

export const apiKey = 'ecf23bf442efa948b7d01d2a9da38b032097d40f5030c002cd663e91c64ee2227a84c49d9f0a22f50cca862e2a6b2a015f75d75846a5850e3e11517b5daae92f';

// Internal helpers
// ----------------

function optionsWithoutBody (method, authenticationToken) {
  const headers = new Headers({ // Request headers
    Accept: 'application/json, text/javascript, */*; q=0.01'
  });
  if (authenticationToken) {
    headers.append('token', authenticationToken);
  }
  return {
    cache: 'no-cache',
    method,
    headers,
    mode: 'cors'
  };
}

function optionsWithBody (method, authenticationToken, body) {
  const headers = new Headers({ // Request headers
    'Content-Type': 'application/json; charset=UTF-8',
    Accept: 'application/json, text/javascript, */*; q=0.01'
  });
  body.apiKey = apiKey;
  body.key = apiKey;
  if (authenticationToken) {
    headers.append('token', authenticationToken);
  }
  return {
    body: JSON.stringify(body),
    cache: 'no-cache',
    method,
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
 * @param {string} [authenticationToken] The authentication token to send in the header.
 * @param {string} url The URL of the resource to get.
 * @return {Promise<Response, Object}>} The server response or resulting error.
 */
export function get (authenticationToken, url) {
  return wrappedFetch(url, optionsWithoutBody('GET', authenticationToken));
}

/**
 * Perform a POST request to the given URL.
 * @param {string} [authenticationToken] The authentication token to send in the header.
 * @param {string} url The URL to which the POST request will be sent.
 * @param {object} body The body of the POST request.
 * @return {Promise<Response, Object}>} The server response or resulting error.
 */
export function post (authenticationToken, url, body) {
  return wrappedFetch(url, optionsWithBody('POST', authenticationToken, body));
}

/**
 * Perform a PUT request to the given URL.
 * @param {string} [authenticationToken] The authentication token to send in the header.
 * @param {string} url The URL to which the PUT request will be sent.
 * @param {object} body The body of the PUT request.
 * @return {Promise<Response, Object}>} The server response or resulting error.
 */
export function put (authenticationToken, url, body) {
  return wrappedFetch(url, optionsWithBody('PUT', authenticationToken, body));
}

/**
 * Perform a DELETE request to the given URL.
 * @param {string} [authenticationToken] The authentication token to send in the header.
 * @param {string} url The URL of the resource to delete.
 * @param {object} body The body of the DELETE request.
 * @return {Promise<Response, Object}>} The server response or resulting error.
 */
export function del (authenticationToken, url, body) {
  return wrappedFetch(url, optionsWithBody('DELETE', authenticationToken, body));
}
