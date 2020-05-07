import pkg from '../package.json';
import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';

const baseURI = process.env.NODE_ENV === 'production'
  ? pkg.proxy
  : 'http://localhost:5000';

const httpLink = createHttpLink({
  uri: baseURI
});

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return  {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default (
  <ApolloProvider client={client}>
    {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode> */}
  </ApolloProvider>
);
