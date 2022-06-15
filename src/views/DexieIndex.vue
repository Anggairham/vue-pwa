<template>
<div>
    <fieldset>
        <legend>Add new friend</legend>
        <label>
        Name:
        <input v-model="friendName" type="text" />
        </label>
        <br />
        <label>
        Age:
        <input v-model="friendAge" type="number" />
        </label>
        <br />
        <button @click="addFriend">Add Friend</button>
        <p>{{ status }}</p>
        <button @click="getAll">getAll</button>
    </fieldset>
    <ul>
        <li v-for="friend in friends" :key="friend.id">
        Name = {{ friend.name }}, Age = {{ friend.age }}, Id = {{ friend.id }}
        </li>
    </ul>
</div>
</template>

<script>
import { db } from '@/utils/db';
export default {
  name: 'DexieIndex',
  data() {
    return {
      db,
      status: '',
      friendName: '',
      friendAge: 21,
      friends: [],
    };
  },
  computed: {

  },
  methods: {
    async addFriend() {
      try {
        // Add the new friend!
        const id = await db.friends.add({
          name: this.friendName,
          age: this.friendAge,
        });

        this.status = `Friend ${this.friendName}
          successfully added. Got id ${id}`;

        // Reset form:
        this.friendName = '';
        this.friendAge = 21;
      } catch (error) {
        this.status = `Failed to add
          ${this.friendName}: ${error}`;
      }
    },
    async getAll() {
        // let res = {}
        // await db.friends.toCollection().each(d => {
        //   console.log(d)
        //   // friends[d] = d.name
        // })
        this.friends = await db.friends.toArray();
    }
  },
};
</script>