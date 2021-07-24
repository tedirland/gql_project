import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

//component/ page imports
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CompleteRegistration from './pages/auth/CompleteRegistration';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';

const App = () => {
  const { state } = useContext(AuthContext);
  const { user } = state;

  const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql',
    cache: new InMemoryCache(),
    request: operation => {
      operation.setContext({
        headers: {
          authtoken: user ? user.token : '',
        },
      });
    },
  });
  return (
    <ApolloProvider client={client}>
      <Nav />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route
          exact
          path="/complete-registration"
          component={CompleteRegistration}
        />
        <Route exact path="/login" component={Login} />
      </Switch>
    </ApolloProvider>
  );
};

export default App;
