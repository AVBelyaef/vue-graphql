<template>
  <form @submit.prevent="submit">
    <fieldset>
      <input type="text" placeholder="Name" v-model="name" required />
      <input type="text" placeholder="Twitter" v-model="twitter" required />
      <select v-model="rocket" required>
        <option :selected="true" :value="null">Choose Rocket</option>
        <option
          v-for="name in ['Falcon 1', 'Falcon 9', 'Falcon Heavy']"
          :key="name"
          :value="name"
        >
          {{ name }}
        </option>
      </select>
      <input type="submit" value="Send" />
    </fieldset>
  </form>
</template>
<script>
import { v4 as uuidv4 } from 'uuid';
import { ref } from 'vue';
import { INSERT_USER } from '@/mutations';
import { GET_USERS } from '@/queries';

import { useMutation } from '@vue/apollo-composable';

export default {
  setup() {
    const name = ref('');
    const twitter = ref('');
    const rocket = ref('');
    const { mutate } = useMutation(INSERT_USER, {
      // refetchQueries: ['getUsers'],
      update: (cache, { data: { insert_users } }) => {
        const [newUser] = insert_users.returning;
        let data = cache.readQuery({
          query: GET_USERS,
        });
        data = { ...data, users: [newUser, ...data.users] };
        cache.writeQuery({
          query: GET_USERS,
          data,
        });
      },
    });

    const submit = () => {
      const id = uuidv4();
      mutate({
        id: id,
        name: name.value,
        twitter: twitter.value,
        rocket: rocket.value,
      });
    };

    return {
      submit,
      rocket,
      name,
      twitter,
    };
  },
};
</script>
