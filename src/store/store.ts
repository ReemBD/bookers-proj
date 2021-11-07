import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { bookSagas } from './sagas/bookSagas';
import { all } from '@redux-saga/core/effects';
import { rootSaga } from './sagas/rootSaga';
import { rootReducer } from './reducers/rootReducer';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
