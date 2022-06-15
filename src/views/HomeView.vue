<template>
  <div>
    <h1 class="text-primary">TODOS</h1>
    <b-form-input v-model="text" placeholder="Todo?" autocomplete="off" autofocus @keyup.enter="addTodo"></b-form-input>
    <div class="mt-2">Value: {{ text }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import TodoItem from "@/components/TodoItem.vue";

export default {
  name: 'HomeView',
  props: {
    filter: String,
  },
  // components: {
  //   TodoItem,
  // },
  data() {
    return {
      text: '',
    }
    
  },
  computed: {
    ...mapGetters({
      todos: "m_todo/todoList",
    }),
  },
  mounted() {
    this.$store.dispatch("m_todo/getTodoLists").then(() => {
      // this.totalRows = this.categories.length;
    });
  },
  methods: {
    addTodo(e) {
      const text = e.target.value.trim();
      if (text) {
        e.target.value = "";
        this.$store.dispatch("m_todo/storeTodo", text).then(() => {

        });
      }
    },
  },
}
</script>

<style>
.form-check-input {
  cursor: pointer;
}
</style>
