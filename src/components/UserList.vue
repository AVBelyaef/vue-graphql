<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <ul v-else-if="users.length">
    <li v-for="user in users" :key="user.id">
      <div
        class="user"
        :style="{ opacity: user.id === -1 ? '0.5' : 'initial' }"
      >
        <p class="name">👤 {{ user.name }}</p>
        <p v-if="user.twitter" class="twitter">
          🐦
          <a :href="`https://twitter.com/${user.twitter}`" target="_blank"
            >@{{ user.twitter }}</a
          >
        </p>
        <p v-if="user.rocket" class="rocket">🚀 {{ user.rocket }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
import { useQuery } from '@vue/apollo-composable';
import { computed } from '@vue/reactivity';
import { GET_USERS } from '../queries';

export default {
  setup() {
    const { result, loading, error } = useQuery(GET_USERS);
    const users = computed(() => result.value?.users ?? []);

    return {
      users,
      loading,
      error,
    };
  },
};
</script>
<style scoped>
.user {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.name {
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
}
.twitter {
  font-weight: bold;
  margin-right: 20px;
}
.twitter a {
  text-decoration: none;
}
.twitter a:hover {
  text-decoration: underline;
}
.rocket {
  font-weight: bold;
}
</style>
