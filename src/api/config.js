import * as request from './_request';

/**
 * GET /config.json (local)
 * GET /version.json (local)
 * GET /rest/version
 *
 * Get the configuration, like the root url of the API.
 */
export async function getConfiguration () {
  const { body: configuration } = await request.get(null, 'config.json');
  const { body: version } = await request.get(null, 'version.json');
  const { body: { apptvateVersion, spottVersion } } = await request.get(null, `${configuration.urls.api}/version`);
  return { apptvateVersion, spottVersion, version, ...configuration };
}
