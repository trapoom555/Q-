import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store =  new Vuex.Store({
  state: {
      LinkID: ''
  },
  mutations: {
      IDMutation(state, message){
        state.LinkID = message
      }
  },
  getters: {
      LinkID: state => state.LinkID
  },
})