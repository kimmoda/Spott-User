import * as request from './requestUB';
import { transformUbProduct } from './transformers';

export async function crawlProduct (baseUrl, authenticationToken, { productUrl }) {
  try {
    const { body } = await request.post(null, `${baseUrl}/products/crawl`, { url: productUrl, country: 'BE', wait: true });
    return transformUbProduct({ body, productUrl });
  } catch (error) {
    throw '_common.unknown';
  }
}

export async function getToken (baseUrl, authenticationToken) {
  try {
    const { access_token: { token } } = await request.post(authenticationToken, `${baseUrl}/oauth/issue`, null);
    console.log(token);
    return token;
  } catch (error) {
    throw '_common.unknown';
  }
}

export async function addProductToBasket (baseUrl, authenticationToken, { productId }) {
  try {
    const { body } = await request.post(authenticationToken, `${baseUrl}/basket/add/${productId}`, { affiliateUrl: 'https://spott.it/' });
    return body;
  } catch (error) {
    throw '_common.unknown';
  }
}

export async function loadBasket (baseUrl, authenticationToken) {
  try {
    const { body } = await request.get(authenticationToken, `${baseUrl}/basket/get`);
    return body;
  } catch (error) {
    throw '_common.unknown';
  }
}

