import { SubmissionError } from 'redux-form';
import { get, post, del } from './request';
import { transformUser, transformNewSuggestions, transformSpottsList, transformPersonsList, transformFollowersList } from './transformers';

export async function getTrendingTopics (baseUrl, authenticationToken, locale) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/data/topics/searches/trending?page=0&pageSize=20`);
  return body;
}

export async function getTopic (baseUrl, authenticationToken, locale, { uuid, dc = '' }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/data/topics/${uuid}?dc=${dc}`);
  return body;
}

export async function getTopicSpotts (baseUrl, authenticationToken, locale, { uuid, page = 0 }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/data/topics/${uuid}/posts?page=${page}&pageSize=10`);
  return transformSpottsList(body);
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
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/post/posts/searches/feed?page=${page}&pageSize=10&subscriptionBased=false`);
  return transformSpottsList(body);
}

export async function getSpottsSubscribedList (baseUrl, authenticationToken, locale, page = 0) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/post/posts/searches/feed?page=${page}&pageSize=10&subscriptionBased=true`);
  return transformSpottsList(body);
}

export async function getSpottsPromotedList (baseUrl, authenticationToken, locale, page = 0) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/post/posts/searches/promoted?page=${page}&pageSize=5`);
  return transformSpottsList(body);
}

export async function getSpott (baseUrl, authenticationToken, locale, { uuid, dc = '' }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/post/posts/${uuid}?dc=${dc}`);
  const { body: shareBody } = await get(authenticationToken, locale, `${baseUrl}/v004/post/posts/${uuid}/share`);
  if (shareBody) {
    body.share = shareBody;
  }
  if (dc) {
    body.dc = dc;
  }
  return body;
}

export async function getSpottRelatedTopics (baseUrl, authenticationToken, locale, { uuid }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/post/posts/${uuid}/relatedTopics?page=0&pageSize=20`);
  return body;
}

export async function getSpottLovers (baseUrl, authenticationToken, locale, { uuid }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/post/posts/${uuid}/lovers?pageSize=20`);
  return transformFollowersList(body);
}

export async function getSpottSimilar (baseUrl, authenticationToken, locale, { uuid, page = 0 }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/post/posts/${uuid}/searches/similar?page=${page}&pageSize=20`);
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

export async function getProduct (baseUrl, authenticationToken, locale, { uuid, relevance, dc }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/product/products/${uuid}?dc=${dc}`);
  const { body: shareBody } = await get(authenticationToken, locale, `${baseUrl}/v004/product/products/${uuid}/share`);
  if (relevance) {
    body.relevance = relevance;
  }
  if (dc) {
    body.dc = dc;
  }
  if (shareBody) {
    body.share = shareBody;
  }
  return body;
}

export async function getProductSimilar (baseUrl, authenticationToken, locale, { uuid }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/product/products/${uuid}/similar`);
  return body;
}

export async function getProductSpotts (baseUrl, authenticationToken, locale, { uuid }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/product/products/${uuid}/posts`);
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

export async function getUserProfileAccount (baseUrl, authenticationToken, locale, { uuid }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/user/users/${uuid}`);
  return transformUser(body);
}

export async function getUserLovesPosts (baseUrl, authenticationToken, locale, { uuid, page }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/user/users/${uuid}/lovedPosts?page=${page}&pageSize=20`);
  return transformSpottsList(body);
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

export async function resetUserPassword (baseUrl, authenticationToken, locale, data) {
  try {
    const { body } = await post(authenticationToken, locale, `${baseUrl}/v004/user/users/register/resetpassword`, data);
    return body;
  } catch (error) {
    throw new SubmissionError({ _error: error.body.message });
  }
}

export async function setUserFollowing (baseUrl, authenticationToken, locale, { uuid, data }) {
  const { body } = await post(authenticationToken, locale, `${baseUrl}/v004/user/users/${uuid}/following`, data);
  return body;
}

export async function removeUserFollowing (baseUrl, authenticationToken, locale, { uuid, data }) {
  const { body } = await del(authenticationToken, locale, `${baseUrl}/v004/user/users/${uuid}/following`, data);
  return body;
}

export async function getUserFollowers (baseUrl, authenticationToken, locale, { uuid }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/user/users/${uuid}/followedBy`);
  return transformFollowersList(body);
}

export async function getUserFollowing (baseUrl, authenticationToken, locale, { uuid }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/user/users/${uuid}/following`);
  return transformFollowersList(body);
}

export async function getSearchSuggestions (baseUrl, authenticationToken, locale, { searchString }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/search/suggest?searchString=${searchString}&locale=${locale}`);
  return transformNewSuggestions(body.data);
}

export async function getSearchPosts (baseUrl, authenticationToken, locale, { searchString, page = 0 }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/search/posts?searchString=${searchString}&locale=${locale}&page=${page}&pageSize=20`);
  return transformSpottsList(body);
}

export async function getSearchPersons (baseUrl, authenticationToken, locale, { searchString }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/search/persons?searchString=${searchString}&locale=${locale}`);
  return transformPersonsList(body);
}

export async function getSearchTopics (baseUrl, authenticationToken, locale, { searchString }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/search/topics?searchString=${searchString}&locale=${locale}`);
  return body;
}

export async function getSearchHistory (baseUrl, authenticationToken, locale) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/search/history`);
  return body;
}

export async function removeSearchHistory (baseUrl, authenticationToken, locale) {
  const { body } = await del(authenticationToken, locale, `${baseUrl}/v004/search/history`);
  return body;
}

export async function getDefaultCountry (baseUrl, authenticationToken, locale) {
  try {
    const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/system/countries/default`);
    return body;
  } catch (error) {
    return null;
  }
}

export async function getCountries (baseUrl, authenticationToken, locale) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/system/countries`);
  return body;
}

export async function getDefaultCurrency (baseUrl, authenticationToken, locale) {
  try {
    const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/system/currencies/default`);
    return body;
  } catch (error) {
    return null;
  }
}

export async function getCurrencies (baseUrl, authenticationToken, locale) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/system/currencies`);
  return body;
}

export async function getDefaultLanguage (baseUrl, authenticationToken, locale) {
  try {
    const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/system/languages/default`);
    return body;
  } catch (error) {
    return null;
  }
}

export async function getLanguages (baseUrl, authenticationToken, locale) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/system/languages`);
  return body;
}

export async function getDefaultContentRegion (baseUrl, authenticationToken, locale) {
  try {
    const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/system/contentRegions/default`);
    return body;
  } catch (error) {
    return null;
  }
}

export async function getContentRegions (baseUrl, authenticationToken, locale) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/system/contentRegions`);
  return body;
}

export async function trackTopicView (baseUrl, authenticationToken, locale, { uuid, dc = '' }) {
  const { body } = await post(authenticationToken, locale, `${baseUrl}/v004/data/topics/${uuid}/viewEvents?dc=${dc}`);
  return body;
}

export async function trackSpottView (baseUrl, authenticationToken, locale, { uuid, dc = '' }) {
  const { body } = await post(authenticationToken, locale, `${baseUrl}/v004/post/posts/${uuid}/viewEvents?dc=${dc}`);
  return body;
}

export async function trackProductImpression (baseUrl, authenticationToken, locale, { uuid, dc = '' }) {
  const { body } = await post(authenticationToken, locale, `${baseUrl}/v004/product/products/${uuid}/impressionEvents?dc=${dc}`);
  return body;
}

export async function trackProductView (baseUrl, authenticationToken, locale, { uuid, dc = '' }) {
  const { body } = await post(authenticationToken, locale, `${baseUrl}/v004/product/products/${uuid}/viewEvents?dc=${dc}`);
  return body;
}
