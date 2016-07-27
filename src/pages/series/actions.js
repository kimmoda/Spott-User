// import { getSeries, getSeasons, getEpisodes, getEpisodeProducts } from '../../api/series';
// import { getRecentlyAddedToWishlist, getPopularProducts } from '../../api/products';
import { addSubscriber, fetchMediumCharacters, fetchMediumProducts, fetchSeries, removeSubscriber } from '../../data/actions';
// import { getMediumCharacters, getMediumProducts } from '../../api/medium';
import { currentUserIdSelector } from '../app/selector';
import { currentSeriesSelector } from './selector';

export const LOAD_SERIES = 'SERIES/LOAD_SERIES';
export const LOAD_SERIES_ERROR = 'SERIES/LOAD_SERIES_ERROR';

export const LOAD_MEDIUM_CHARACTERS = 'SERIES/LOAD_MEDIUM_CHARACTERS';
export const LOAD_MEDIUM_CHARACTERS_ERROR = 'SERIES/LOAD_MEDIUM_CHARACTERS_ERROR';

export const LOAD_MEDIUM_TOP_PRODUCTS = 'SERIES/LOAD_MEDIUM_TOP_PRODUCTS';
export const LOAD_MEDIUM_TOP_PRODUCTS_ERROR = 'SERIES/LOAD_MEDIUM_TOP_PRODUCTS_ERROR';

// 4adb58ee-0801-45fa-b6f6-e1dc628e5d48 userId
export function toggleFollow () {
  return async (dispatch, getState) => {
    const state = getState();
    const userId = currentUserIdSelector(state);
    const series = currentSeriesSelector(state);

    if (series.get('subscribed')) {
      dispatch(removeSubscriber({ mediumId: series.get('id'), userId }));
    } else {
      dispatch(addSubscriber({ mediumId: series.get('id'), userId }));
    }
    //  // seasonId: '05f90d72-cf44-4686-82be-d0df3ea5a4ed'
    // const episodes = await getEpisodes(apiBaseUrlSelector(state), authenticationTokenSelector(state), { seasonId: '05f90d72-cf44-4686-82be-d0df3ea5a4ed' });
    // const products = await getEpisodeProducts(apiBaseUrlSelector(state), authenticationTokenSelector(state), { episodeId: '83292a01-e3f8-42dd-95dc-f899407c1544' });
    // const products = await getRecentlyAddedToWishlist(apiBaseUrlSelector(state), authenticationTokenSelector(state), { userId: currentUserIdSelector(state) });
    // const products = await getPopularProducts(apiBaseUrlSelector(state), authenticationTokenSelector(state));
    // const products = await getMediumProducts(apiBaseUrlSelector(state), authenticationTokenSelector(state), { mediumId: '618dd390-4f5a-4f4e-a482-c3c1a73caee7' });
    // const products = await getMediumCharacters(apiBaseUrlSelector(state), authenticationTokenSelector(state), { mediumId: '618dd390-4f5a-4f4e-a482-c3c1a73caee7' });
  };
}

export function loadSeries (seriesId) {
  return async (dispatch, getState) => {
    try {
      dispatch({ seriesId, type: LOAD_SERIES });
      return await dispatch(fetchSeries({ seriesId }));
    } catch (error) {
      return dispatch({ error, seriesId, type: LOAD_SERIES_ERROR });
    }
  };
}

export function loadCharacters (mediumId) {
  return async (dispatch, getState) => {
    try {
      dispatch({ mediumId, type: LOAD_MEDIUM_CHARACTERS });
      return await dispatch(fetchMediumCharacters({ mediumId }));
    } catch (error) {
      return dispatch({ error, mediumId, type: LOAD_MEDIUM_CHARACTERS_ERROR });
    }
  };
}

export function loadTopProducts (mediumId) {
  return async (dispatch, getState) => {
    try {
      dispatch({ mediumId, type: LOAD_MEDIUM_TOP_PRODUCTS });
      return await dispatch(fetchMediumProducts({ mediumId }));
    } catch (error) {
      return dispatch({ error, mediumId, type: LOAD_MEDIUM_TOP_PRODUCTS_ERROR });
    }
  };
}
