import { del, get, post, NotFoundError, UnauthorizedError, UnexpectedError } from './request';
import { transformMedium, transformSeason, transformEpisode } from './transformers';
import { COMMERCIAL, MOVIE, SERIES } from '../data/mediumTypes';

// A user can't follow a commercial.
const mapMediumTypeToUrlPartsPlural = {
  [MOVIE]: 'movies',
  [SERIES]: 'series'
};

export async function getRecentlyAdded (baseUrl, authenticationToken, locale) {
  const { body: { data } } = await get(authenticationToken, locale, `${baseUrl}/v003/media/media/searches/recent?pageSize=20`);
  return { data: data.map(transformMedium) };
}

/**
 * GET /media/series/:seriesId
 * Get a series.
 * @param {string} authenticationToken
 * @param {string} seriesId
 * @returnExample
 * {
 *   id: '123'
 *   posterImage: 'https://spott-ios-rest-tst.appiness.mobi:443/spott/rest/v003/image/images/cdf4a649-9ac2-4a1a-8e3f-9658d55eea47',
 *   profileImage: 'https://spott-ios-rest-tst.appiness.mobi:443/spott/rest/v003/image/images/33f830fb-ac02-4e95-a074-c3ecfbd6db90',
 *   subscribed: true,
 *   subscriberCount: 111
 * }
 * @throws NotFoundError
 * @throws UnauthorizedError
 * @throws UnexpectedError
 */
export async function getMedium (baseUrl, authenticationToken, locale, { mediumId, mediumType }) {
  try {
    switch (mediumType) {
      case COMMERCIAL: {
        const { body } = await get(authenticationToken, locale, `${baseUrl}/v003/media/commercials/${mediumId}`);
        return transformMedium(body);
      }
      case MOVIE: {
        const { body } = await get(authenticationToken, locale, `${baseUrl}/v003/media/movies/${mediumId}`);
        return transformMedium(body);
      }
      case SERIES: {
        const { body } = await get(authenticationToken, locale, `${baseUrl}/v003/media/series/${mediumId}`);
        return transformMedium(body);
      }
      default:
        throw { statusCode: 404 };
    }
  } catch (error) {
    switch (error.statusCode) {
      case 403:
        throw new UnauthorizedError();
      case 404:
        throw new NotFoundError('medium', error);
    }
    throw new UnexpectedError(error);
  }
}

export async function addMediumSubscriber (baseUrl, authenticationToken, locale, { mediumId, mediumType, userId }) {
  await post(authenticationToken, locale, `${baseUrl}/v003/media/${mapMediumTypeToUrlPartsPlural[mediumType]}/${mediumId}/subscribers`, { uuid: userId });
}

export async function removeMediumSubscriber (baseUrl, authenticationToken, locale, { mediumId, mediumType, userId }) {
  await del(authenticationToken, locale, `${baseUrl}/v003/media/${mapMediumTypeToUrlPartsPlural[mediumType]}/${mediumId}/subscribers`, { uuid: userId });
}

export async function getMediumSeasons (baseUrl, authenticationToken, locale, { mediumId }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v003/media/series/${mediumId}/seasons`);
  return body.data.map(transformSeason);
}

export async function getMediumEpisodes (baseUrl, authenticationToken, locale, { mediumId }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v003/media/serieSeasons/${mediumId}/episodes?sortField=NUMBER&sortDirection=DESC`);
  return body.data.map(transformEpisode);
}

export async function getNewEpisodes (baseUrl, authenticationToken, locale) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v003/media/serieEpisodes/searches/recent?pageSize=20`);
  return body.data.map(transformEpisode);
}

export async function getPopularMedia (baseUrl, authenticationToken, locale) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v003/media/media?pageSize=20`);
  return body.data.map(transformMedium);
}

export async function getMediumRecentEpisodes (baseUrl, authenticationToken, locale, { mediumId }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v003/media/series/${mediumId}/episodes?pageSize=10`);
  return body.data.map(transformEpisode);
}

