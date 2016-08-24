import { get } from './request';
import { transformCharacter } from './transformers';

export async function getCharacter (baseUrl, authenticationToken, locale, { characterId }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v003/media/characters/${characterId}`);
  return transformCharacter(body);
}

export async function getMediumCharacters (baseUrl, authenticationToken, locale, { mediumId, page = 0 }) {
  const { body: { data } } = await get(authenticationToken, locale, `${baseUrl}/v003/media/media/${mediumId}/cast?pageSize=50&page=${page}`);
  // TODO: Add pagination
  return { data: data.map(transformCharacter) };
}
