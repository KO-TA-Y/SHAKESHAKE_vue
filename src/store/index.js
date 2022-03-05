import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nodeId:null,
    shopInfo:null,
    motionPermission:false,
    winLose:null,
  },
  getters:{
    getWinLose:state => {
      return state.winLose
    }
  },
  mutations: {
    setNodeId(state, id){
      state.nodeId = id
    },
    setShop(state,shop){
      state.shopInfo = shop
    },
    setPermission(state,permission){
      state.motionPermission = permission
    },
    setWinLose(state,winLose){
      state.winLose = winLose
    }
  },
  actions: {
  },
  modules: {
  }
})
