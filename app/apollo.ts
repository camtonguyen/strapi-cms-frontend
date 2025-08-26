import { HttpLink, InMemoryCache } from '@apollo/client';
import {
  createApolloLoaderHandler,
  ApolloClient,
} from '@apollo/client-integration-react-router';

const API_URL = import.meta.env.VITE_API_URL;

// `request` will be available on the server during SSR or in loaders, but not in the browser
export const makeClient = (request?: Request) => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({ uri: API_URL }),
  });
};
export const apolloLoader = createApolloLoaderHandler(makeClient);
