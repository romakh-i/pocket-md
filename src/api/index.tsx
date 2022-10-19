import { ApolloClient, InMemoryCache } from '@apollo/client';

export interface Article {
  author: string;
  createdAt: string;
  id: string;
  score: number;
  text: string;
  title: string;
  type: string;
  updatedAt: string;
  url: string;
}

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          retrievePageArticles: {
            keyArgs: false,
            merge(existing: Article[] = [], incoming: Article[] = []) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});

export default client;
