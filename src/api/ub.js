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
    throw error;
  }
}

export async function addAddress (baseUrl, authenticationToken, data) {
  try {
    data.province = 'Belgium';
    const { body } = await requestUb.post(authenticationToken, `${baseUrl}/address/add`, data);
    return body;
  } catch (error) {
    throw new SubmissionError({ _error: error.body.error });
  }
}

export async function getUserAddresses (baseUrl, authenticationToken) {
  try {
    const { body } = await requestUb.get(authenticationToken, `${baseUrl}/address/list`);
    return body;
  } catch (error) {
    throw error;
  }
}

export async function addPaymentCard (baseUrl, authenticationToken, data) {
  try {
    const { body } = await requestUb.post(authenticationToken, `${baseUrl}/card/add`, data);
    return body;
  } catch (error) {
    throw new SubmissionError({ _error: error.body.error });
  }
}

export async function getPaymentCards (baseUrl, authenticationToken) {
  try {
    const { body } = await requestUb.get(authenticationToken, `${baseUrl}/card/list`);
    return body;
  } catch (error) {
    throw error;
  }
}

export async function updateBasket (baseUrl, authenticationToken, data) {
  try {
    const { body } = await requestUb.put(authenticationToken, `${baseUrl}/basket/update`, data);
    return body;
  } catch (error) {
    throw new SubmissionError({ _error: error.body.error });
  }
}

export async function postOrder (baseUrl, authenticationToken, data) {
  try {
    const { body } = await requestUb.post(authenticationToken, `${baseUrl}/basket/checkout`, data);
    return body;
  } catch (error) {
    throw new SubmissionError({ _error: error.body.error });
  }
}

export async function updateBasketLine (baseUrl, authenticationToken, { lineId, data }) {
  try {
    const { body } = await requestUb.put(authenticationToken, `${baseUrl}/basket/update/${lineId}`, data);
    return body;
  } catch (error) {
    throw new SubmissionError({ _error: error.body.error });
  }
}

export async function updateShipping (baseUrl, authenticationToken, data) {
  try {
    const { body } = await requestUb.post(authenticationToken, `${baseUrl}/basket/shippingOption`, data);
    return body;
  } catch (error) {
    throw new SubmissionError({ _error: error.body.error });
  }
}

export async function updateAddress (baseUrl, authenticationToken, data) {
  try {
    const { body } = await requestUb.put(authenticationToken, `${baseUrl}/address/update`, data);
    return body;
  } catch (error) {
    throw new SubmissionError({ _error: error.body.error });
  }
}

export async function removeAddress (baseUrl, authenticationToken, data) {
  try {
    const { body } = await requestUb.del(authenticationToken, `${baseUrl}/address/delete`, data);
    return body;
  } catch (error) {
    throw new SubmissionError({ _error: error.body.error });
  }
}

export async function removeCard (baseUrl, authenticationToken, data) {
  try {
    const { body } = await requestUb.del(authenticationToken, `${baseUrl}/card/delete`, data);
    return body;
  } catch (error) {
    throw new SubmissionError({ _error: error.body.error });
  }
}
