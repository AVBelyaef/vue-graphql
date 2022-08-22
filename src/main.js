import { createApp, provide, h } from 'vue';
import App from './App.vue';
import router from './router';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core';
import { DefaultApolloClient } from "@vue/apollo-composable"

const httpLink = createHttpLink({
  uri: 'https://api.spacex.land/graphql/',
});

const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.use(router).mount('#app');
