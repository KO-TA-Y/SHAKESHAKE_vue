import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nodeId:null,
  },
  mutations: {
    setNodeId(state, id){
      state.nodeId = id
    },
  },
  actions: {
  },
  modules: {
  }
})
