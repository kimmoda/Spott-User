import { takeEvery } from 'redux-saga';
import { call } from 'redux-saga/effects';
import { INIT } from '../actions';
import { getConfiguration } from '../api/config';

function* init () {
  const configuration = yield call(getConfiguration);
  console.warn(configuration);
}

function* watchInit () {
  yield* takeEvery(INIT, init);
}

export default function* () {
  return yield [
    watchInit()
  ];
}
