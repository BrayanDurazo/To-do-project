import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

// Set `RestLink` with your endpoint
const restLink = new RestLink({ 
  uri: 'http://127.0.0.1:8000/',
  endpoints: { v1: 'http://127.0.0.1:8000/api/v1/todo/' }
});

// Setup Apollo client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: restLink,
});

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </ApolloProvider>,
);
