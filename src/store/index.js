import Vue from 'vue'
import Vuex from 'vuex'
import m_todo from './m_todo'
Vue.use(Vuex)
const state = {};
// mutations is synchronous 
const mutations = {}
// actions is asynchronous 
const actions = {};
const modules = {
  m_todo,
};
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules
})
