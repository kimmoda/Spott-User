import { getSeries, getSeasons, getEpisodes, getEpisodeProducts } from '../../api/series';
import { apiBaseUrlSelector, authenticationTokenSelector } from '../app/selector';

export function toggleFollow () {
  return async (dispatch, getState) => {
    const state = getState();
    //  // seasonId: '05f90d72-cf44-4686-82be-d0df3ea5a4ed'
    // const episodes = await getEpisodes(apiBaseUrlSelector(state), authenticationTokenSelector(state), { seasonId: '05f90d72-cf44-4686-82be-d0df3ea5a4ed' });
    const products = await getEpisodeProducts(apiBaseUrlSelector(state), authenticationTokenSelector(state), { episodeId: '83292a01-e3f8-42dd-95dc-f899407c1544' });
    dispatch({ products, type: 'test' });
  };
}
