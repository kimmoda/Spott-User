import * as requestUb from './requestUB';
import * as request from './request';
import { transformUbProduct } from './transformers';

export async function crawlProduct (baseUrl, authenticationToken, { productUrl }) {
  try {
    const { body } = await requestUb.post(null, `${baseUrl}/products/crawl`, { url: productUrl, country: 'BE', wait: true });
    return transformUbProduct({ body, productUrl });
  } catch (error) {
    throw '_common.unknown';
  }
}

export async function getNewUbToken (baseUrl, authenticationToken) {
  try {
    const { access_token: { token } } = await requestUb.post(authenticationToken, `${baseUrl}/oauth/issue`, null);
    return token;
  } catch (error) {
    throw '_common.unknown';
  }
}

export async function geUbToken (baseUrl, authenticationToken, { userId }) {
  try {
    const { body: { token } } = await request.get(authenticationToken, `${baseUrl}/v003/user/users/${userId}/universalBasketAccessToken`);
    return token;
  } catch (error) {
    console.log(error);
    throw '_common.unknown';
  }
}

export async function setUbToken (baseUrl, authenticationToken, { userId, ubToken }) {
  try {
    const result = await request.post(authenticationToken, `${baseUrl}/v003/user/users/${userId}/universalBasketAccessToken`, { token: ubToken });
    return result;
  } catch (error) {
    throw '_common.unknown';
  }
}

export async function addProductToBasket (baseUrl, authenticationToken, { productId }) {
  try {
    const { body } = await requestUb.post(authenticationToken, `${baseUrl}/basket/add/${productId}`, { affiliateUrl: 'https://spott.it/' });
    return body;
  } catch (error) {
    throw '_common.unknown';
  }
}

export async function removeProductFromBasket (baseUrl, authenticationToken, { lineId }) {
  try {
    const { body } = await requestUb.del(authenticationToken, `${baseUrl}/basket/remove/${lineId}`);
    return body;
  } catch (error) {
    throw '_common.unknown';
  }
}

export async function loadBasket (baseUrl, authenticationToken) {
  try {
    const { body } = await requestUb.get(authenticationToken, `${baseUrl}/basket/get`);
    return body;
  } catch (error) {
    throw '_common.unknown';
  }
}

