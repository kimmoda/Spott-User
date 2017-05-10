import { get, post, del } from './request';
import { transformUser, transformNewSuggestions, transformSpottsList } from './transformers';

export async function getTrendingTopics (baseUrl, authenticationToken, locale) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/data/topics/searches/trending?page=0&pageSize=10`);
  return body;
}

export async function getTopic (baseUrl, authenticationToken, locale, { uuid }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/data/topics/${uuid}`);
  return body;
}

export async function getTopicSpotts (baseUrl, authenticationToken, locale, { uuid }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/data/topics/${uuid}/posts`);
  return body;
}

export async function getTopicRelated (baseUrl, authenticationToken, locale, { uuid }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/data/topics/${uuid}/searches/related?page=0&pageSize=10`);
  return body;
}

export async function getTopicMediaSeasons (baseUrl, authenticationToken, locale, { uuid }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/media/series/${uuid}/seasons`);
  return body;
}

export async function getTopicMediaSeries (baseUrl, authenticationToken, locale, { uuid }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/media/series/${uuid}/seasons`);
  return body;
}

export async function setTopicSubscriber (baseUrl, authenticationToken, locale, { uuid }) {
  const { body } = await post(authenticationToken, locale, `${baseUrl}/v004/data/topics/${uuid}/subscribers`);
  return body;
}

export async function removeTopicSubscriber (baseUrl, authenticationToken, locale, { uuid }) {
  const { body } = await del(authenticationToken, locale, `${baseUrl}/v004/data/topics/${uuid}/subscribers`);
  return body;
}

export async function getSpottsList (baseUrl, authenticationToken, locale, page = 0) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/post/posts/searches/feed?page=${page}&pageSize=4&subscriptionBased=false`);
  return transformSpottsList(body);
}

export async function getSpottsSubscribedList (baseUrl, authenticationToken, locale) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/post/posts/searches/feed?page=0&pageSize=50&subscriptionBased=true`);
  return body;
}

export async function getSpottsPromotedList (baseUrl, authenticationToken, locale) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/post/posts/searches/promoted?page=0&pageSize=200`);
  return body;
}

export async function getSpott (baseUrl, authenticationToken, locale, { uuid }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/post/posts/${uuid}`);
  return body;
}

export async function getSpottRelatedTopics (baseUrl, authenticationToken, locale, { uuid }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/post/posts/${uuid}/relatedTopics?page=0&pageSize=10`);
  return body;
}

export async function getSpottLovers (baseUrl, authenticationToken, locale, { uuid }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/post/posts/${uuid}/lovers`);
  return body;
}

export async function getSpottSimilar (baseUrl, authenticationToken, locale, { uuid }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/post/posts/${uuid}/searches/similar`);
  return body;
}

export async function setSpottLover (baseUrl, authenticationToken, locale, { uuid }) {
  const { body } = await post(authenticationToken, locale, `${baseUrl}/v004/post/posts/${uuid}/lovers`);
  return body;
}

export async function removeSpottLover (baseUrl, authenticationToken, locale, { uuid }) {
  const { body } = await del(authenticationToken, locale, `${baseUrl}/v004/post/posts/${uuid}/lovers`);
  return body;
}

export async function getProduct (baseUrl, authenticationToken, locale, { uuid, relevance }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/product/products/${uuid}`);
  if (relevance) {
    body.relevance = relevance;
  }
  return body;
}

export async function getProductSimilar (baseUrl, authenticationToken, locale, { uuid }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/product/products/${uuid}/similar`);
  return body;
}

export async function getUserSubscriptions (baseUrl, authenticationToken, locale, { uuid }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/user/users/${uuid}/subscriptions`);
  return body;
}

export async function getUserProfile (baseUrl, authenticationToken, locale, { uuid }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/user/users/${uuid}`);
  return body;
}

export async function getUserLovesPosts (baseUrl, authenticationToken, locale, { uuid }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/user/users/${uuid}/lovedPosts`);
  return body;
}

export async function getUserWishlist (baseUrl, authenticationToken, locale, { uuid }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/user/users/${uuid}/wishlists/products`);
  return body;
}

export async function addProductToWishlist (baseUrl, authenticationToken, locale, { uuid, productUuid }) {
  const { body } = await post(authenticationToken, locale, `${baseUrl}/v004/user/users/${uuid}/wishlists/products/${productUuid}`);
  return body;
}

export async function removeProductFromWishlist (baseUrl, authenticationToken, locale, { uuid, productUuid }) {
  const { body } = await del(authenticationToken, locale, `${baseUrl}/v004/user/users/${uuid}/wishlists/products/${productUuid}`);
  return body;
}

export async function updateUserProfile (baseUrl, authenticationToken, locale, { uuid, data }) {
  const { body } = await post(authenticationToken, locale, `${baseUrl}/v004/user/users/${uuid}`, data);
  return transformUser(body);
}

export async function updateUserAvatar (baseUrl, authenticationToken, locale, { uuid, data }) {
  const { body } = await post(authenticationToken, locale, `${baseUrl}/v004/user/users/${uuid}/avatar`, data);
  return transformUser(body);
}

export async function updateUserBackground (baseUrl, authenticationToken, locale, { uuid, data }) {
  const { body } = await post(authenticationToken, locale, `${baseUrl}/v004/user/users/${uuid}/background`, data);
  return transformUser(body);
}

export async function updateUserPassword (baseUrl, authenticationToken, locale, data) {
  const { body } = await post(authenticationToken, locale, `${baseUrl}/v004/user/users/register/changepassword`, data);
  return body;
}

export async function getSearchSuggestions (baseUrl, authenticationToken, locale, { searchString }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/search/suggest?searchString=${searchString}&locale=${locale}`);
  return transformNewSuggestions(body.data);
}
