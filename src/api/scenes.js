import { get, NotFoundError, UnauthorizedError, UnexpectedError } from './request';
import { transformScene } from './transformers';

export async function getNewScenesForYou (baseUrl, authenticationToken, locale, { userId }) {
  const { body: { data } } = await get(authenticationToken, locale, `${baseUrl}/v003/user/users/${userId}/scenes?pageSize=30`);
  return data.map(transformScene);
}

export async function getSavedScenesOfUser (baseUrl, authenticationToken, locale, { userId }) {
  const { body: { data } } = await get(authenticationToken, locale, `${baseUrl}/v003/user/users/${userId}/savedScenes?pageSize=30`);
  return { data: data.map(transformScene) };
}

export function getMediumNewScenesForYou () {
  return []; // TODO: implement this
}

export async function getScene (baseUrl, authenticationToken, locale, { sceneId }) {
  try {
    const { body } = await get(authenticationToken, locale, `${baseUrl}/v003/video/scenes/${sceneId}`);
    const scene = transformScene(body);
    console.warn(scene);
    return scene;
  } catch (error) {
    switch (error.statusCode) {
      case 403:
        throw new UnauthorizedError();
      case 404:
        throw new NotFoundError('scene', error);
    }
    throw new UnexpectedError(error);
  }
}
