import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
// import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import createLogger from 'redux-logger';

import rootReducer from './reducer';
import rootSaga from './sagas';

// Initialize the Saga middleware to run sagas
const sagaMiddleware = createSagaMiddleware();

function configureStoreProd(initialState) {
  const middlewares = [
    // Add other middleware on this line...

    // Bind react-router with redux
    routerMiddleware(browserHistory),

    // Sagas
    sagaMiddleware,

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    // thunk,
  ];

  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares),
    // Save state to localStorage
    persistState('auth', {
      slicer: () => {
        return (state) => {
          const subset = {
            auth: {
              isLoggedIn: state.auth.isLoggedIn,
              user: state.auth.user
            }
          };
          return subset;
        };
      }
    }),
    )
  );

  // Run all sagas
  sagaMiddleware.run(rootSaga);

  return store;
}

function configureStoreDev(initialState) {
  const middlewares = [
    // Add other middleware on this line...

    // Bind react-router with redux
    routerMiddleware(browserHistory),

    // Sagas
    sagaMiddleware,

    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    reduxImmutableStateInvariant(),

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    // thunk,

    // redux-logger console.logs all redux actions
    createLogger(),
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares),

    // Save state to localStorage
    persistState('auth', {
      slicer: () => {
        return (state) => {
          const subset = {
            auth: {
              isLoggedIn: state.auth.isLoggedIn,
              user: state.auth.user
            }
          };
          return subset;
        };
      }
    }),
    )
  );

  // Run all sagas
  sagaMiddleware.run(rootSaga);


  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      const nextReducer = require('./reducer').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
