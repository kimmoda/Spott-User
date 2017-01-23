import * as requestUb from './requestUB';
import * as request from './request';
import { transformUbProduct } from './transformers';
import { SubmissionError } from 'redux-form/immutable';

export async function crawlProduct (baseUrl, authenticationToken, { productUrl }) {
  try {
    const { body } = await requestUb.post(null, `${baseUrl}/products/crawl`, { url: productUrl, country: 'BE', wait: true });
    return transformUbProduct({ body, productUrl });
  } catch (error) {
    throw error;
  }
}

export async function getNewUbToken (baseUrl, authenticationToken) {
  try {
    const { body: { access_token: { token } } } = await requestUb.post(authenticationToken, `${baseUrl}/oauth/issue`);
    return token;
  } catch (error) {
    throw error;
  }
}

export async function geUbToken (baseUrl, authenticationToken, locale, { userId }) {
  try {
    const { body: { token } } = await request.get(authenticationToken, locale, `${baseUrl}/v003/user/users/${userId}/universalBasketAccessToken`);
    return token;
  } catch (error) {
    throw error;
  }
}

export async function setUbToken (baseUrl, authenticationToken, locale, { userId, ubToken }) {
  try {
    const { body: { token } } = await request.post(authenticationToken, locale, `${baseUrl}/v003/user/users/${userId}/universalBasketAccessToken`, { token: ubToken });
    return token;
  } catch (error) {
    throw error;
  }
}

export async function addProductToBasket (baseUrl, authenticationToken, { productId }) {
  try {
    const { body } = await requestUb.post(authenticationToken, `${baseUrl}/basket/add/${productId}`, { affiliateUrl: 'https://spott.it/' });
    return body;
  } catch (error) {
    throw error;
  }
}

export async function removeProductFromBasket (baseUrl, authenticationToken, { lineId }) {
  try {
    const { body } = await requestUb.del(authenticationToken, `${baseUrl}/basket/remove/${lineId}`);
    return body;
  } catch (error) {
    throw error;
  }
}

export async function loadBasket (baseUrl, authenticationToken) {
  try {
    const { body } = await requestUb.get(authenticationToken, `${baseUrl}/basket/get`);
    return body;
  } catch (error) {
    throw error;
  }
}

export async function submitMobileNumber (baseUrl, authenticationToken, { number }) {
  try {
    const { body } = await requestUb.post(authenticationToken, `${baseUrl}/oauth/mobileverify`, { number });
    return body;
  } catch (error) {
    throw new SubmissionError({ _error: error.body.error });
  }
}

export async function verifyMobileNumber (baseUrl, authenticationToken, { code, number }) {
  try {
    const { body } = await requestUb.post(authenticationToken, `${baseUrl}/oauth/mobileverify/complete`, { code, number });
    return body;
  } catch (error) {
    throw new SubmissionError({ _error: error.body.error });
  }
}

export async function updateInfo (baseUrl, authenticationToken, { number, email }) {
  try {
    const { body } = await requestUb.put(authenticationToken, `${baseUrl}/user/update`, { number, email });
    return body;
  } catch (error) {
    throw new SubmissionError({ _error: error.body.error });
  }
}

export async function retrieveUser (baseUrl, authenticationToken) {
  try {
    const { body } = await requestUb.get(authenticationToken, `${baseUrl}/user/me`);
    return body;
  } catch (error) {
    throw new SubmissionError({ _error: error.body.error });
  }
}
