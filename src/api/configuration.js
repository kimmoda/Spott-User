import * as request from './request';
import { transformUser } from './transformers';

/**
 * GET /config/config.json (local)
 * GET /version.json (local)
 * GET /rest/version
 *
 * Get the configuration, like the root url of the API.
 */
export async function getConfiguration () {
  const configuration = (await request.get(null, null, '/config/config.json')).body;
  const version = (await request.get(null, null, '/version.json')).body;
  const { body: { apptvateVersion, spottVersion } } = await request.get(null, null, `${configuration.urls.api}/version`);
  return { apptvateVersion, spottVersion, version, ...configuration };
}

export async function login (baseUrl, { email: emailIn, password }) {
  try {
    // TODO: localize! Server should return proper error message to display to the user.
    const { body } = await request.post(null, 'nl', `${baseUrl}/v004/security/login`, { userName: emailIn, password });
    const transformedUser = transformUser(body.user);
    return {
      authenticationToken: body.authenticationToken,
      user: transformedUser.profile,
      initialValues: transformedUser.initialValues
    };
  } catch (error) {
    if (error.body.message === 'verkeerde gebruikersnaam/password combinatie') {
      throw 'login.invalid';
    }
    throw '_common.unknown';
  }
}

export async function loginFacebook (baseUrl, { facebookAccessToken }) {
  try {
    // TODO: localize! Server should return proper error message to display to the user.
    const { body } = await request.post(null, 'nl', `${baseUrl}/v003/security/login`, { facebookAccessToken });
    const transformedUser = transformUser(body.user);
    return {
      authenticationToken: body.authenticationToken,
      user: transformedUser.profile,
      initialValues: transformedUser.initialValues
    };
  } catch (error) {
    if (error.body.message === 'verkeerde gebruikersnaam/password combinatie') {
      throw 'login.invalidFacebook';
    }
    throw '_common.unknown';
  }
}

export function register (baseUrl, { email, firstname, lastname, password }) {
  return request.post(null, null, `${baseUrl}/v003/user/users/register/username`, { email, firstName: firstname, lastName: lastname, password });
}
