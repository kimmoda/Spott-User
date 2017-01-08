import * as request from './requestUB';
import { transformUbProduct } from './transformers';

export async function crawlProduct (baseUrl, authenticationToken, { productUrl }) {
  try {
    const { body } = await request.post(authenticationToken, `${baseUrl}/products/crawl`, { url: productUrl, country: 'BE', wait: true });
    return transformUbProduct({ body, productUrl });
  } catch (error) {
    throw '_common.unknown';
  }
}
