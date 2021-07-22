import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import {
  ApolloClient,
  InMemoryCache,
  gql,
  ApolloProvider,
} from '@apollo/client';

//component/ page imports
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </ApolloProvider>
  );
};

export default App;
