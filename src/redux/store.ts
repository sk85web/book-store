import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import { watcherBooks } from './actionCreators/bookActionCreator';
import { watcherUser } from './actionCreators/userActionCreator';
import { bookReducer } from './reducers/bookReducer';
import { userReducer } from './reducers/userReducer';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([watcherBooks(), watcherUser()]);
}

const store = createStore(
  combineReducers({
    books: bookReducer,
    user: userReducer,
  }),
  {},
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export default store;
