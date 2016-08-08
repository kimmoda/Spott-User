import { get, UnauthorizedError, UnexpectedError } from './request';
import { transformScene } from './transformers';

export async function getNewScenesForYou (baseUrl, authenticationToken, locale, { userId }) {
  try {
    const { body: { data } } = await get(authenticationToken, locale, `${baseUrl}/v003/user/users/${userId}/scenes?pageSize=30`);
    return data.map(transformScene);
  } catch (error) {
    switch (error.statusCode) {
      case 403:
        throw new UnauthorizedError();
    }
    throw new UnexpectedError(error);
  }
}

export function getMediumNewScenesForYou () {
  return []; // TODO: implement this
}
