import api from '@/api';
const state = {
  todos: [],
  isSubmited: {
    showAlert: false,
    type: '',
    message: '',
  },
  isDeleted: {
    showAlert: false,
    type: '',
    message: '',
  },
};
const getters = {
  todoList: state => state.todos,
  isSubmited: state => state.isSubmited,
  isDeleted: state => state.isDeleted,
};
// mutations is synchronous 
const mutations = {
  setTodos(state, todos) {
      state.todos = todos
  },
  saveUpdatedTodo(state, todo) {
    let index = state.todos.findIndex((c) => c.todo_id == todo.todo_id);
    if (index > -1) {
      state.todos[index] = todo;
    }
  },
  saveNewTodo(state, todo){
    // UNSHIFT AKAN memasukan data baru pada urutan pertama
    // state.todos.unshift(todo)
    // PUSH AKAN memasukan data baru pada urutan terakhir
    state.todos.push(todo);
  },
  deleteTodo(state, todo_id) {
    let index = state.todos.findIndex((c) => c.todo_id == todo_id);
    if (index > -1) {
      state.todos.splice(index, 1);
    }
  },
  setIsSubmited(state, isSubmited) {
    state.isSubmited = isSubmited
  },
  setIsDeleted(state, isDeleted) {
    state.isDeleted = isDeleted
  },
}
// actions is asynchronous 
const actions = {
  async getTodoLists({ commit },todo_flow) {
      await api.get(`todo/get_data`,{params: {'todo_flow':todo_flow}})
            .then(response => {
              commit('setTodos', response.data.result)
      }).catch(err => {
        if (err.code != "ERR_NETWORK") {
          console.log('error', err);
        }
        console.log('IndexedDB run')
      });
  },
  async storeTodo({ commit }, todo) {
      await api.post(`todo/act_insert`, todo)
        .then((response) => {
          if (response.data.result.rs === true) {
            commit('saveNewTodo', response.data.result.detail);
            commit('setIsSubmited', {showAlert:true,type:'success',message:response.data.message});
          }else{
            commit('setIsSubmited', {showAlert:true,type:'danger',message:response.data.message});
          }
        }).catch(err => {
          if (err.code != 'ERR_NETWORK') {
            console.log('error', err);
            commit('setIsSubmited', {showAlert:true,type:'danger',message:'Data gagal disimpan.'});
          }
          console.log('IndexedDB run')
        });
  },
  async updateTodo({ commit }, todo) {
      await api.put(`todo/act_update`, todo)
        .then(response => {
          if (response.data.result.rs === true) {
            commit('saveUpdatedTodo', response.data.result.detail);
            commit('setIsSubmited', {showAlert:true,type:'success',message:response.data.message});
          }else{
            commit('setIsSubmited', {showAlert:true,type:'danger',message:response.data.message});
          }
        }).catch(err => {
          if (err.code != 'ERR_NETWORK') {
            console.log('error', err);
            commit('setIsSubmited', {showAlert:true,type:'danger',message:'Data gagal diupdate.'});
          }
        });
  },
  async deleteTodo({ commit }, todo_id) {
      await api.delete(`todo/act_delete`,{data: {'todo_id':todo_id}})
        .then(response => {
          if (response.data.result === true) {
            commit('deleteTodo', todo_id);
            commit('setIsDeleted', {showAlert:true,type:'success',message:response.data.message});
          }else{
            commit('setIsDeleted', {showAlert:true,type:'danger',message:response.data.message});
          }
        }).catch(err => {
          if (err.code != 'ERR_NETWORK') {
            console.log('error', err);
            commit('setIsDeleted', {showAlert:true,type:'danger',message:'Data gagal dihapus.'});
          }
        });
  },

};
const m_todo = {
    state,getters,mutations,actions,
    namespaced: true
}
export default m_todo
