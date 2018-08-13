import Vue from 'vue'
import Vuex from 'vuex'
import constain from '@/global-const'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blackList: [],
  },
  mutations: {
    getBlackList(state, blackList) {
      state.blackList = blackList;
    }
  },
  actions: {
    getBlackList(context) {
      const api = `${constain.SERVER_URL}black-lists`;
      Vue.axios.get(api).then((response) => {
        context.commit('getBlackList', response.data)
      })
    }
  },
  getters: {
    blackList: state => {
      return state.blackList;
    }
  },
})
