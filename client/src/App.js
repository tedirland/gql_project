import { useState } from 'react';

import {
  ApolloClient,
  InMemoryCache,
  gql,
  ApolloProvider,
} from '@apollo/client';

import Home from './pages/Home';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
};

export default App;
