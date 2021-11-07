import { bookReducer } from './bookReducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  bookModule: bookReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
