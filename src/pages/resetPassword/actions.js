import * as userApi from '../../api/users';
import { apiBaseUrlSelector } from '../app/selector';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

export function resetPassword ({ email }) {
  return async (dispatch, getState) => {
    const baseUrl = apiBaseUrlSelector(getState());
    dispatch({ type: RESET_PASSWORD_REQUEST });
    try {
      const data = await userApi.resetPassword(baseUrl, { email });
      dispatch({ data, type: RESET_PASSWORD_SUCCESS });
    } catch (error) {
      dispatch({ error, type: RESET_PASSWORD_FAILURE });
      throw error;
    }
  };
}
