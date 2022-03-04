import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nodeId:null,
    shopInfo:null,
  },
  mutations: {
    setNodeId(state, id){
      state.nodeId = id
    },
    setShop(state,shop){
      state.shopInfo = shop
    }
  },
  actions: {
  },
  modules: {
  }
})
