import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store =  new Vuex.Store({
  state: {
      LinkID: '',
      LinkBirthday: '',
      LinkName: ''
  },
  mutations: {
      IDMutation(state, message){
        state.LinkID = message
      },
      BirthdayMutation(state, message){
        state.LinkBirthday = message
      },
      NameMutation(state, message){
        state.LinkName = message
      }
  },
  getters: {
      LinkID: state => state.LinkID,
      LinkBirthday: state => state.LinkBirthday,
      LinkName: state => state.LinkName
  },
})