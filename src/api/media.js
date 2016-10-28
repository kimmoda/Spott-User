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

/* eslint-disable quote-props */
export function getPopularSeries (baseUrl, authenticationToken, locale) {
  // const { body } = await get(authenticationToken, locale, `${baseUrl}/v003/media/series/searches/popular?pageSize=20`);
  // return body.data.map(transformMedium);
  return [ { 'id': '968d5bbe-d9f2-4abe-8875-28e8f3572502', 'posterImage': { 'id': 'a5435f5c-3366-4bd3-b826-9f1b5089daef', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/a5435f5c-3366-4bd3-b826-9f1b5089daef' }, 'profileImage': { 'id': 'f9bbe82c-fe44-4ea3-8a06-51fe771bf812', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/f9bbe82c-fe44-4ea3-8a06-51fe771bf812' }, 'shareUrl': '/nl/series/dagelijkse-kost/968d5bbe-d9f2-4abe-8875-28e8f3572502', 'title': 'Dagelijkse kost', 'type': 'TV_SERIE' }, { 'id': 'b8d4dacb-6f12-4dbe-a7a2-f3b5803b9bfa', 'posterImage': { 'id': '131988c7-ebfb-4618-b2e8-1dd69f5d72a8', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/131988c7-ebfb-4618-b2e8-1dd69f5d72a8' }, 'profileImage': { 'id': 'e07cd97f-0252-4dd4-a79b-498253d0bd7c', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/e07cd97f-0252-4dd4-a79b-498253d0bd7c' }, 'shareUrl': '/nl/series/bones/b8d4dacb-6f12-4dbe-a7a2-f3b5803b9bfa', 'title': 'Bones', 'type': 'TV_SERIE' }, { 'id': 'd8deb92b-cad8-4ac7-ac51-9ff3d33a53b9', 'posterImage': { 'id': '1afacfa5-18d1-4a57-ada0-0e39250c3ed0', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/1afacfa5-18d1-4a57-ada0-0e39250c3ed0' }, 'profileImage': { 'id': '3c35c7ec-d0b4-421d-b733-445c1dcf0289', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/3c35c7ec-d0b4-421d-b733-445c1dcf0289' }, 'shareUrl': '/nl/series/martin-bonheur/d8deb92b-cad8-4ac7-ac51-9ff3d33a53b9', 'title': 'Martin Bonheur', 'type': 'TV_SERIE' }, { 'id': 'e6b37cc0-89c2-4ff9-b4b8-0aae2dc5889c', 'posterImage': { 'id': 'cc8572cb-c731-4849-8387-be73913a83fb', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/cc8572cb-c731-4849-8387-be73913a83fb' }, 'profileImage': { 'id': '59609ff0-2c2c-4a7d-9a38-4d365b1f32cf', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/59609ff0-2c2c-4a7d-9a38-4d365b1f32cf' }, 'shareUrl': '/nl/series/the-farm/e6b37cc0-89c2-4ff9-b4b8-0aae2dc5889c', 'title': 'The Farm', 'type': 'TV_SERIE' }, { 'id': '39b09f12-7c8a-4629-ad8b-22b9624f8ce9', 'posterImage': { 'id': '0052272f-d0fc-4941-b858-a1cdb31e778a', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/0052272f-d0fc-4941-b858-a1cdb31e778a' }, 'profileImage': { 'id': '9cba9a1d-35b7-448b-86fc-d4c900d46ed7', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/9cba9a1d-35b7-448b-86fc-d4c900d46ed7' }, 'shareUrl': '/nl/series/thuis/39b09f12-7c8a-4629-ad8b-22b9624f8ce9', 'title': 'Thuis', 'type': 'TV_SERIE' }, { 'id': '618dd390-4f5a-4f4e-a482-c3c1a73caee7', 'posterImage': { 'id': 'cdf4a649-9ac2-4a1a-8e3f-9658d55eea47', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/cdf4a649-9ac2-4a1a-8e3f-9658d55eea47' }, 'profileImage': { 'id': '33f830fb-ac02-4e95-a074-c3ecfbd6db90', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/33f830fb-ac02-4e95-a074-c3ecfbd6db90' }, 'shareUrl': '/nl/series/de-keuken-van-sofie/618dd390-4f5a-4f4e-a482-c3c1a73caee7', 'title': 'De Keuken van Sofie', 'type': 'TV_SERIE' }, { 'id': 'da0a8e7e-ab7a-4d98-8c45-802aad4358e6', 'posterImage': { 'id': '3c9a8714-652e-4c09-b730-d17ad1f1dba6', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/3c9a8714-652e-4c09-b730-d17ad1f1dba6' }, 'profileImage': { 'id': '84de3e5e-ee1a-4247-934e-17777711fdbe', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/84de3e5e-ee1a-4247-934e-17777711fdbe' }, 'shareUrl': '/nl/series/les-reines-du-shopping/da0a8e7e-ab7a-4d98-8c45-802aad4358e6', 'title': 'Les Reines du Shopping', 'type': 'TV_SERIE' }, { 'id': 'b43c513f-419b-4068-9282-e62b9afed29e', 'posterImage': { 'id': 'ccc5326b-01f5-49ee-b053-49e5f92d2a06', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/ccc5326b-01f5-49ee-b053-49e5f92d2a06' }, 'profileImage': { 'id': 'fd964c3d-c987-4c8c-9a17-ac8aaee4dfd9', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/fd964c3d-c987-4c8c-9a17-ac8aaee4dfd9' }, 'shareUrl': '/nl/series/cousu-main/b43c513f-419b-4068-9282-e62b9afed29e', 'title': 'Cousu Main', 'type': 'TV_SERIE' }, { 'id': 'c8921250-6f78-4b2a-8a51-bdf8cbc01603', 'posterImage': { 'id': '2d0e91d7-fa4d-4c36-863d-588e53c9f906', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/2d0e91d7-fa4d-4c36-863d-588e53c9f906' }, 'profileImage': { 'id': '8525687c-76f3-4443-8f19-b5043ea50bd2', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/8525687c-76f3-4443-8f19-b5043ea50bd2' }, 'shareUrl': '/nl/series/de-makkelijke-maaltijd/c8921250-6f78-4b2a-8a51-bdf8cbc01603', 'title': 'De Makkelijke Maaltijd ', 'type': 'TV_SERIE' }, { 'id': '4add8fcf-d8e3-486a-ab7f-d49141c27cc1', 'posterImage': { 'id': '4e6647f5-b1f0-4da7-a185-253369eea8a6', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/4e6647f5-b1f0-4da7-a185-253369eea8a6' }, 'profileImage': { 'id': '6d2845f5-735c-404a-94a3-9017e38e48dc', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/6d2845f5-735c-404a-94a3-9017e38e48dc' }, 'shareUrl': '/nl/series/familie/4add8fcf-d8e3-486a-ab7f-d49141c27cc1', 'title': 'Familie', 'type': 'TV_SERIE' }, { 'id': 'c80e2418-fc17-4134-bd2f-8ea00b526714', 'posterImage': { 'id': 'f6e41dea-05ae-434b-9013-62f5425466cf', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/f6e41dea-05ae-434b-9013-62f5425466cf' }, 'profileImage': { 'id': 'c5d53788-b916-400c-8a2f-32e1c6105a35', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/c5d53788-b916-400c-8a2f-32e1c6105a35' }, 'shareUrl': '/nl/series/la-grande-balade/c80e2418-fc17-4134-bd2f-8ea00b526714', 'title': 'La Grande Balade', 'type': 'TV_SERIE' }, { 'id': '9ab05cc0-1a97-4d1f-9b49-a71af0b5493d', 'posterImage': { 'id': 'b8c5e4c6-13ce-4335-932d-c5abc3b81128', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/b8c5e4c6-13ce-4335-932d-c5abc3b81128' }, 'profileImage': { 'id': 'b4785050-2f31-487a-b4f6-2400cbc19ac3', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/b4785050-2f31-487a-b4f6-2400cbc19ac3' }, 'shareUrl': '/nl/series/modern-family/9ab05cc0-1a97-4d1f-9b49-a71af0b5493d', 'title': 'Modern Family', 'type': 'TV_SERIE' }, { 'id': '993df9fa-7b13-41bb-941e-37511aba25e3', 'posterImage': { 'id': 'efc27ee3-c6c8-484c-ba03-a45349b5478d', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/efc27ee3-c6c8-484c-ba03-a45349b5478d' }, 'profileImage': { 'id': 'aa2edc63-8b9a-404a-8a8d-63221e171af0', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/aa2edc63-8b9a-404a-8a8d-63221e171af0' }, 'shareUrl': '/nl/series/new-girl/993df9fa-7b13-41bb-941e-37511aba25e3', 'title': 'New Girl', 'type': 'TV_SERIE' }, { 'id': 'a9e6569d-bfd6-48ba-a1d5-af01577b1636', 'posterImage': { 'id': '499256a9-9782-489b-af1d-6a680ad305c8', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/499256a9-9782-489b-af1d-6a680ad305c8' }, 'profileImage': { 'id': '898f945b-19b1-4280-b19a-6af529a68de5', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/898f945b-19b1-4280-b19a-6af529a68de5' }, 'shareUrl': '/nl/series/cordon/a9e6569d-bfd6-48ba-a1d5-af01577b1636', 'title': 'Cordon ', 'type': 'TV_SERIE' }, { 'id': 'a25f18e3-0859-46c4-a028-ab03fda033b4', 'posterImage': { 'id': 'f0822ffc-e52d-42ee-8a70-6bd543472775', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/f0822ffc-e52d-42ee-8a70-6bd543472775' }, 'profileImage': { 'id': '9df77232-85ba-4dfd-9f5d-dd79cf270853', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/9df77232-85ba-4dfd-9f5d-dd79cf270853' }, 'shareUrl': '/nl/series/el-torito/a25f18e3-0859-46c4-a028-ab03fda033b4', 'title': 'El Torito', 'type': 'TV_SERIE' }, { 'id': '2ed8221e-740a-41cd-b44c-f50a6ce27084', 'posterImage': { 'id': 'a2ec217c-8418-4ba3-925e-0bc9f278704f', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/a2ec217c-8418-4ba3-925e-0bc9f278704f' }, 'profileImage': { 'id': '2dce090a-6e48-4317-a7fd-975a44b464a8', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/2dce090a-6e48-4317-a7fd-975a44b464a8' }, 'shareUrl': '/nl/series/royal-pains/2ed8221e-740a-41cd-b44c-f50a6ce27084', 'title': 'Royal Pains', 'type': 'TV_SERIE' }, { 'id': 'cd5ce874-69ab-4f39-ac33-d9b87a6e1bc2', 'posterImage': { 'id': '1f813751-64f7-461a-92e2-7a36ece01cef', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/1f813751-64f7-461a-92e2-7a36ece01cef' }, 'profileImage': { 'id': 'f514b586-967d-43e3-ae24-418230c29783', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/f514b586-967d-43e3-ae24-418230c29783' }, 'shareUrl': '/nl/series/revenge/cd5ce874-69ab-4f39-ac33-d9b87a6e1bc2', 'title': 'Revenge', 'type': 'TV_SERIE' }, { 'id': 'b9001758-e1dd-4afc-8158-62cbfb4fd97e', 'posterImage': { 'id': '54998261-24d4-4cba-88a5-5e36b4c0e2a7', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/54998261-24d4-4cba-88a5-5e36b4c0e2a7' }, 'profileImage': { 'id': 'd51c6449-c5ba-4fa5-b766-54775907406f', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/d51c6449-c5ba-4fa5-b766-54775907406f' }, 'shareUrl': '/nl/series/devious-maids/b9001758-e1dd-4afc-8158-62cbfb4fd97e', 'title': 'Devious Maids', 'type': 'TV_SERIE' }, { 'id': 'cd3448cf-a0f5-4b6d-bfd6-75cc2ef36c44', 'posterImage': { 'id': '42ac62e5-610c-4fcc-a88c-3ea2fd1f7591', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/42ac62e5-610c-4fcc-a88c-3ea2fd1f7591' }, 'profileImage': { 'id': 'ddc87871-49db-4026-a9d8-d0bbc2c81632', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/ddc87871-49db-4026-a9d8-d0bbc2c81632' }, 'shareUrl': '/nl/series/the-big-bang-theory/cd3448cf-a0f5-4b6d-bfd6-75cc2ef36c44', 'title': 'The Big Bang Theory', 'type': 'TV_SERIE' }, { 'id': 'a73aa34d-b703-493d-a35b-448b20d1597e', 'posterImage': { 'id': '1351ca7a-fb4e-46ee-828a-2bddb7b39426', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/1351ca7a-fb4e-46ee-828a-2bddb7b39426' }, 'profileImage': { 'id': 'b92ab6b4-1bf6-4acc-b217-4b611317c811', 'url': 'https://spott-ios-rest-prd.appiness.mobi:443/spott/rest/v003/image/images/b92ab6b4-1bf6-4acc-b217-4b611317c811' }, 'shareUrl': '/nl/series/jonas-van-geel/a73aa34d-b703-493d-a35b-448b20d1597e', 'title': 'Jonas & Van Geel', 'type': 'TV_SERIE' } ];
}
