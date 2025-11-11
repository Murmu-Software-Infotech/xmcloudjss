// lib/apolloClient.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const uri = process.env.NEXT_PUBLIC_DISCONNECTED_GRAPHQL || 'http://localhost:3042/sitecore/api/graph/disconnected';

const client = new ApolloClient({
  link: new HttpLink({ uri, fetch: fetch as any }),
  cache: new InMemoryCache(),
});

export default client;
