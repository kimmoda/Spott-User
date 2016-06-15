import * as request from './_request';

/**
 * GET /config.json (local)
 * GET /version.json (local)
 * GET /rest/version
 *
 * Get the configuration, like the root url of the API.
 */
export async function getConfiguration () {
  let configuration;
  let version;
  if (__SERVER__) {
    const fs = require('fs');
    const path = require('path');
    configuration = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../dev/config.json'))); // eslint-disable-line
    version = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../dev/version.json'))); // eslint-disable-line
  } else {
    configuration = (await request.get(null, 'config.json')).body;
    version = (await request.get(null, 'version.json')).body;
  }
  const { body: { apptvateVersion, spottVersion } } = await request.get(null, `${configuration.urls.api}/version`);
  return { apptvateVersion, spottVersion, version, ...configuration };
}
