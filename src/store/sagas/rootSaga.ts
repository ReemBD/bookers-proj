import { all, fork } from 'redux-saga/effects';
import { bookSagas } from './bookSagas';
export function* rootSaga() {
  yield all([fork(bookSagas)]);
}
