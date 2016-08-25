import { del, get, post, NotFoundError, UnauthorizedError, UnexpectedError } from './request';
import { transformMedium, transformSeason, transformEpisode } from './transformers';
import { MOVIE, SERIES } from '../data/mediumTypes';
import { slugify } from '../utils';

const mapMediumTypeToUrlParts = {
  [MOVIE]: 'movie',
  [SERIES]: 'series'
};

const mapMediumTypeToUrlPartsPlural = {
  [MOVIE]: 'movies',
  [SERIES]: 'series'
};

export async function getRecentlyAdded (baseUrl, authenticationToken, locale) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v003/media/media/searches/recent?pageSize=100`);
  const data = body.data.map(transformMedium);
  // TODO: Important! Remove this if the server returns the new url.
  for (const medium of data) {
    medium.shareUrl = `/${locale}/${mapMediumTypeToUrlParts[medium.type]}/${slugify(medium.title)}/${medium.id}`;
  }
  return { data };
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
      case MOVIE: {
        const { body } = await get(authenticationToken, locale, `${baseUrl}/v003/media/movies/${mediumId}`);
        // TODO: temp server fix
        const medium = transformMedium(body);
        medium.shareUrl = `/${locale}/${mapMediumTypeToUrlParts[medium.type]}/${slugify(medium.title)}/${medium.id}`;
        return medium;
      }
      case SERIES: {
        const { body } = await get(authenticationToken, locale, `${baseUrl}/v003/media/series/${mediumId}`);
        const medium = transformMedium(body);
        medium.shareUrl = `/${locale}/${mapMediumTypeToUrlParts[medium.type]}/${slugify(medium.title)}/${medium.id}`;
        return medium;
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
