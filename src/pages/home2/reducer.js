import { fromJS, Map, List } from 'immutable';
import * as actions from './actions';
import { fetchStart, fetchSuccess, fetchError } from '../../utils';

export default function profileReducer (state = fromJS({}), action) {
  switch (action.type) {
    default:
      return state;
  }
}
