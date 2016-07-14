import { getSeries, getSeasons, getEpisodes, getEpisodeProducts } from '../../api/series';
import { getRecentlyAddedToWishlist, getPopularProducts } from '../../api/products';
import { getMediumCharacters, getMediumProducts } from '../../api/medium';
import { apiBaseUrlSelector, authenticationTokenSelector, currentUserIdSelector } from '../app/selector';

// 4adb58ee-0801-45fa-b6f6-e1dc628e5d48 userId
export function toggleFollow () {
  return async (dispatch, getState) => {
    const state = getState();
    //  // seasonId: '05f90d72-cf44-4686-82be-d0df3ea5a4ed'
    // const episodes = await getEpisodes(apiBaseUrlSelector(state), authenticationTokenSelector(state), { seasonId: '05f90d72-cf44-4686-82be-d0df3ea5a4ed' });
    // const products = await getEpisodeProducts(apiBaseUrlSelector(state), authenticationTokenSelector(state), { episodeId: '83292a01-e3f8-42dd-95dc-f899407c1544' });
    // const products = await getRecentlyAddedToWishlist(apiBaseUrlSelector(state), authenticationTokenSelector(state), { userId: currentUserIdSelector(state) });
    // const products = await getPopularProducts(apiBaseUrlSelector(state), authenticationTokenSelector(state));
    // const products = await getMediumProducts(apiBaseUrlSelector(state), authenticationTokenSelector(state), { mediumId: '618dd390-4f5a-4f4e-a482-c3c1a73caee7' });
    const products = await getMediumCharacters(apiBaseUrlSelector(state), authenticationTokenSelector(state), { mediumId: '618dd390-4f5a-4f4e-a482-c3c1a73caee7' });
    dispatch({ products, type: 'test' });
  };
}
