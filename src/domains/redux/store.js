import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

export default function configureStore(initialState) {
  const enhancer = composeEnhancers(applyMiddleware(thunk));

  return createStore(rootReducer, initialState, enhancer);
}
