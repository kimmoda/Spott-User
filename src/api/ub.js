import * as request from './requestUB';

export async function crawlProduct (baseUrl, authenticationToken, { productUrl }) {
  try {
    const { body: { product } } = await request.post(authenticationToken, `${baseUrl}/products/crawl`, { url: productUrl, country: 'BE', wait: true });
    return product;
  } catch (error) {
    throw '_common.unknown';
  }
}
