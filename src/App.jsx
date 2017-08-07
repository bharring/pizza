import React from 'react';
import { render } from 'react-dom';
import createMuiTheme from 'material-ui/styles/theme';
import { MuiThemeProvider } from 'material-ui/styles';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';

import pizzaReducer from './pizza';
import Home from './Home';

const networkInterface = createNetworkInterface({
  uri: 'https://core-graphql.dev.waldo.photos/pizza',
});

const client = new ApolloClient({
  networkInterface,
});

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

const theme = createMuiTheme();

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={createStoreWithMiddleware(pizzaReducer)}>
        <ApolloProvider client={client}>
          <Home />
        </ApolloProvider>
      </Provider>
    </MuiThemeProvider>
  );
}

render(<App />, document.querySelector('#app'));
