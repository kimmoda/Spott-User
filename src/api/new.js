import { get } from './request';

export async function getTrendingTopics (baseUrl, authenticationToken, locale) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/data/topics/searches/trending?page=1&pageSize=10`);
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

export async function getTopicSubscribers (baseUrl, authenticationToken, locale, { uuid }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/data/topics/${uuid}/subscribers`);
  return body;
}

export async function getSpottsList (baseUrl, authenticationToken, locale) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/post/posts/searches/feed?page=0&pageSize=10`);
  return body;
}

export async function getSpott (baseUrl, authenticationToken, locale, { uuid }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/post/posts/${uuid}`);
  return body;
}

export async function getSpottLovers (baseUrl, authenticationToken, locale, { uuid }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/post/posts/${uuid}/lovers`);
  return body;
}

