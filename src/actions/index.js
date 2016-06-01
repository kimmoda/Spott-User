import { getConfiguration } from '../api/config';

export const CONFIGURE = 'CONFIGURE';
export function doInit () {
  return async (dispatch) => {
    const configuration = await getConfiguration();
    dispatch({ type: CONFIGURE, configuration });
  };
}
