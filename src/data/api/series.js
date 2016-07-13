import { get, NotFoundError, UnauthorizedError, UnexpectedError } from './request';
import { transformProduct } from './transformers';

/* TODO Temporarily removed, out of scope

/**
  * @returnExample
  * {
  *   id: '123'
  *   posterImage: 'https://spott-ios-rest-tst.appiness.mobi:443/spott/rest/v003/image/images/cdf4a649-9ac2-4a1a-8e3f-9658d55eea47',
  *   profileImage: 'https://spott-ios-rest-tst.appiness.mobi:443/spott/rest/v003/image/images/33f830fb-ac02-4e95-a074-c3ecfbd6db90',
  *   subscribed: true,
  *   subscriberCount: 111
  * }
  *
function transformSeries ({ posterImage, profileImage, subscribed, subscriberCount, title, uuid: id }) {
  return {
    id,
    posterImage: posterImage && posterImage.url,
    profileImage: profileImage && profileImage.url,
    subscribed,
    subscriberCount,
    title
  };
}

function transformSeason ({ title, uuid: id }) {
  return {
    id,
    title
  };
}

function transformEpisode ({ title, uuid: id }) {
  return {
    id,
    title
  };
}
*/

export async function getRecentlyAdded () {

}

/* TODO Temporarily removed, out of scope

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
 *
export async function getSeries (baseUrl, authenticationToken, { seriesId }) {
  try {
    const { body } = await get(authenticationToken, `${baseUrl}/v003/media/series/${seriesId}`);
    return transformSeries(body);
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

export async function getSeasons (baseUrl, authenticationToken, { seriesId }) {
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

export async function getEpisodes (baseUrl, authenticationToken, { seasonId }) {
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

export async function getEpisodeProducts (baseUrl, authenticationToken, { episodeId }) {
  try {
    const { body } = await get(authenticationToken, `${baseUrl}/v003/media/media/${episodeId}/products`);
    return body.data.map(transformProduct);
  } catch (error) {
    switch (error.statusCode) {
      case 403:
        throw new UnauthorizedError();
      case 404:
        throw new NotFoundError('episode', error);
    }
    throw new UnexpectedError(error);
  }
}

*/
