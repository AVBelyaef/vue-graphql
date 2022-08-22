<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else-if="rocket">
    <h2>{{ rocket.name }}</h2>
    <p>{{ rocket.description }}</p>
    <p>$ {{ rocket.costPerLaunch }}</p>
  </div>
</template>

<script>
import { useQuery } from '@vue/apollo-composable';
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router'
import gql from 'graphql-tag';

export default {
  setup() {
    const route = useRoute()
    const { result, loading, error } = useQuery(
      gql`
        query getRocket($id: ID!) {
          rocket(id: $id) {
            id
            name
            description
            costPerLaunch: cost_per_launch
          }
        }
      `,
      {
        id: route.params.id,
      }
    );

    const rocket = computed(() => result.value?.rocket);

    return {
      rocket, loading, error
    };
  },
};
</script>
