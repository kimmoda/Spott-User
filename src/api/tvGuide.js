import { get } from './request';
import { transformTvGuideEntry } from './transformers';

export async function fetchTvGuideEntries (baseUrl, authenticationToken, locale) {
  const url = `${baseUrl}/v003/media/tvGuideEntries`;

  const { body } = await get(authenticationToken, locale, url);
  return body.data.map((tvGuideEntry) => transformTvGuideEntry(tvGuideEntry));
}
