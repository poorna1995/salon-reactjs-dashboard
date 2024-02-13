/* eslint-disable import/no-anonymous-default-export */
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
// import thunk from "redux-thunk";
// import createSagaMiddle from "redux-saga";
import { persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
// import {
//   createStateSyncMiddleware,
//   initMessageListener,
// } from "redux-state-sync";
import rootReducer from "./rootReducer";
// import rootSaga from "./rootSaga";
// import blacklistedActions from "./blacklistedActions";

// const sagaMiddleware = createSagaMiddle();

// const config = {
//   blacklist: blacklistedActions,
// };
export const middlewares = [
  // thunk,
  // sagaMiddleware,
  // createStateSyncMiddleware(config),
];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);
// initMessageListener(store);
// sagaMiddleware.run(rootSaga);

export default {
  store,
  persistor,
};
