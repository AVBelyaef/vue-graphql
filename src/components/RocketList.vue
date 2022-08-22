<template>
  <div v-if="loading" class="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <ul v-else-if="rockets.length">
    <li v-for="rocket in rockets" :key="rocket.id">
      <router-link :to="{ name: 'rocket', params: { id: rocket.id } }">
        <h2>{{ rocket.name }}</h2>
      </router-link>
    </li>
  </ul>
</template>

<script>
import { useQuery } from '@vue/apollo-composable';
import { computed } from 'vue';
import { GET_ROCKETS } from '@/queries'

export default {
  setup() {
    const { result, loading, error } = useQuery(GET_ROCKETS);

    const rockets = computed(() => result.value?.rockets ?? []);

    return {
      rockets,
      loading,
      error,
    };
  },
};
</script>
