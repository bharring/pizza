import React from 'react';
import { render } from 'react-dom';
import createMuiTheme from 'material-ui/styles/theme';
import { MuiThemeProvider } from 'material-ui/styles';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import pizzaReducer from './modules/pizza';
import Home from './Home';

const loggerMiddleware = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, loggerMiddleware)(createStore);

const theme = createMuiTheme();

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={createStoreWithMiddleware(pizzaReducer)}>
        <Home />
      </Provider>
    </MuiThemeProvider>
  );
}

render(<App />, document.querySelector('#app'));
