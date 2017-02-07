import { post } from './request';

export async function postCharacterView (baseUrl, authenticationToken, locale, { characterId }) {
  await post(authenticationToken, locale, `${baseUrl}/v003/media/characters/${characterId}/viewEvents`, {});
}

export async function postMediumView (baseUrl, authenticationToken, locale, { mediumId }) {
  await post(authenticationToken, locale, `${baseUrl}/v003/media/media/${mediumId}/viewEvents`, {});
}

export async function postProductView (baseUrl, authenticationToken, locale, { productId }) {
  await post(authenticationToken, locale, `${baseUrl}/v003/product/products/${productId}/viewEvents`, {});
}

export async function postSceneView (baseUrl, authenticationToken, locale, { sceneId }) {
  await post(authenticationToken, locale, `${baseUrl}/v003/video/scenes/${sceneId}/viewEvents`, {});
}

export async function postUserView (baseUrl, authenticationToken, locale, { userId }) {
  await post(authenticationToken, locale, `${baseUrl}/v003/user/users/${userId}/viewEvents`, {});
}

export async function postProductImpression (baseUrl, authenticationToken, locale, { productId }) {
  await post(authenticationToken, locale, `${baseUrl}/v003/product/products/${productId}/impressionEvents`, {});
}
