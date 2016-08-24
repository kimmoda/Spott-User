import { addSubscriber, fetchCharacterProducts, fetchCharacter, removeSubscriber } from '../../data/actions';
// import { getMediumCharacters, getMediumProducts } from '../../api/medium';
import { currentUserIdSelector } from '../app/selector';
import { currentCharacterSelector } from './selector';

export const LOAD_CHARACTER = 'CHARACTER/LOAD_CHARACTER';
export const LOAD_CHARACTER_ERROR = 'CHARACTER/LOAD_CHARACTER_ERROR';

export const LOAD_CHARACTER_PRODUCTS = 'SERIES/LOAD_CHARACTER_PRODUCTS';
export const LOAD_CHARACTER_PRODUCTS_ERROR = 'SERIES/LOAD_CHARACTER_PRODUCTS_ERROR';

export function toggleFollow () {
  return async (dispatch, getState) => {
    const state = getState();
    const userId = currentUserIdSelector(state);
    const character = currentCharacterSelector(state);

    if (character.get('subscribed')) {
      await dispatch(removeSubscriber({ characterId: character.get('id'), userId }));
    } else {
      await dispatch(addSubscriber({ characterId: character.get('id'), userId }));
    }
    // Retrieve the character with the new followerscount and subscribed flag.
    // Note that the subscribed flag will be already set in the reducer (less delay),
    // before the character is refetched.
    return await dispatch(fetchCharacter({ characterId: character.get('id') }));
  };
}

export function loadCharacter (characterId) {
  return async (dispatch, getState) => {
    try {
      dispatch({ characterId, type: LOAD_CHARACTER });
      return await dispatch(fetchCharacter({ characterId }));
    } catch (error) {
      return dispatch({ characterId, error, type: LOAD_CHARACTER_ERROR });
    }
  };
}

export function loadCharacterProducts (characterId) {
  return async (dispatch) => {
    try {
      dispatch({ characterId, type: LOAD_CHARACTER_PRODUCTS });
      return await dispatch(fetchCharacterProducts({ characterId }));
    } catch (error) {
      return dispatch({ characterId, error, type: LOAD_CHARACTER_PRODUCTS_ERROR });
    }
  };
}
