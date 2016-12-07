import { get } from './request';
import { transformSuggestions } from './transformers';

export async function getSearchSuggestions (baseUrl, authenticationToken, locale, { searchString }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v003/search/suggest?searchString=${searchString}&locale=${locale}`);
  return transformSuggestions(body.data);
}
