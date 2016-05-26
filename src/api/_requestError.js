/**
 * Based upon: http://stackoverflow.com/questions/31089801/extending-error-in-javascript-with-es6-syntax
 */
export default class RequestError extends Error {
  constructor (message, body, originalError) {
    super(message || 'An error occurred while processing your request.');
    this.name = this.constructor.name;
    this.stack = (originalError || new Error()).stack;
    this.body = body;
    this.originalError = originalError;
  }
}
