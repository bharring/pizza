import React from 'react';
import { render } from 'react-dom';
import createMuiTheme from 'material-ui/styles/theme';
import { MuiThemeProvider } from 'material-ui/styles';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import pizzaReducer from '../modules/pizza';
import Home from './Home';

/* global window document */
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const loggerMiddleware = createLogger();
const store = createStore(
  pizzaReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware)),
);

function App() {
  return (
    <MuiThemeProvider theme={createMuiTheme()}>
      <Provider store={store}>
        <Home />
      </Provider>
    </MuiThemeProvider>
  );
}

render(<App />, document.querySelector('#app'));
