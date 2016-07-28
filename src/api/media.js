import { del, get, post, NotFoundError, UnauthorizedError, UnexpectedError } from './request';
import { transformSeries /* , transformSeason, transformEpisode */ } from './transformers';
import recentlyAddedMediaMock from './mock/recentlyAddedMedia';
import { SERIES } from '../data/mediumTypes';

export async function getRecentlyAdded (baseUrl, authenticationToken, locale) {
  return await Promise.resolve(recentlyAddedMediaMock);
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
    if (mediumType === SERIES) {
      const { body } = await get(authenticationToken, locale, `${baseUrl}/v003/media/series/${mediumId}`);
      return transformSeries(body);
    }
    throw { statusCode: 404 };
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

export async function addSubscriber (baseUrl, authenticationToken, locale, { mediumId, userId }) {
  try {
    await post(authenticationToken, locale, `${baseUrl}/v003/media/series/${mediumId}/subscribers`, { uuid: userId });
  } catch (error) {
    switch (error.statusCode) {
      case 403:
        throw new UnauthorizedError();
      case 404:
        throw new NotFoundError('series', error);
    }
    throw new UnexpectedError(error);
  }
}

export async function removeSubscriber (baseUrl, authenticationToken, locale, { mediumId, userId }) {
  try {
    await del(authenticationToken, locale, `${baseUrl}/v003/media/series/${mediumId}/subscribers`, { uuid: userId });
  } catch (error) {
    switch (error.statusCode) {
      case 403:
        throw new UnauthorizedError();
      case 404:
        throw new NotFoundError('series', error);
    }
    throw new UnexpectedError(error);
  }
}

/*

export async function getSeasons (baseUrl, authenticationToken, locale, { seriesId }) {
  try {
    const { body } = await get(authenticationToken, `${baseUrl}/v003/media/series/${seriesId}/seasons`);
    return body.data.map(transformSeason);
  } catch (error) {
    switch (error.statusCode) {
      case 403:
        throw new UnauthorizedError();
      case 404:
        throw new NotFoundError('series', error);
    }
    throw new UnexpectedError(error);
  }
}

export async function getEpisodes (baseUrl, authenticationToken, locale, { seasonId }) {
  try {
    const { body } = await get(authenticationToken, `${baseUrl}/v003/media/serieSeasons/${seasonId}/episodes?sortField=NUMBER&sortDirection=DESC`);
    return body.data.map(transformEpisode);
  } catch (error) {
    switch (error.statusCode) {
      case 403:
        throw new UnauthorizedError();
      case 404:
        throw new NotFoundError('season', error);
    }
    throw new UnexpectedError(error);
  }
}
*/
