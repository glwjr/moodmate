/* eslint-disable import/no-extraneous-dependencies */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import auth from './auth';
import entries from './entries';
import moods from './moods';
import activities from './activities';
import data from './data';

const reducer = combineReducers({
  auth, entries, moods, activities, data,
});
const middleware = applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }));
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
export * from './entries';
export * from './moods';
export * from './activities';
export * from './data';
