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
    },
    addToBlacklist(state, newBlacklist) {
      state.blackList.push(newBlacklist);
    },
    removeFromBlacklist(state, removedBlacklist) {
      state.blackList.splice(
        state.blackList.findIndex((i) => i._id === removedBlacklist._id),
        1,
      );
    },
  },
  actions: {
    getBlackList(context) {
      const api = `${constain.SERVER_URL}black-lists`;
      Vue.axios.get(api).then((response) => {
        context.commit('getBlackList', response.data)
      })
    },
    addToBlacklist(context, word) {
      const api = `${constain.SERVER_URL}black-lists`;
      Vue.axios.post(api, { text: word }).then((response) => {
        context.commit('addToBlacklist', response.data.data)
      })
    },
    removeFromBlacklist(context, id) {
      const api = `${constain.SERVER_URL}black-lists/${id}`;
      Vue.axios.delete(api).then((response) => {
        context.commit('removeFromBlacklist', response.data.data)
      })
    }
  },
  getters: {
    blackList: state => {
      return state.blackList;
    }
  },
})
