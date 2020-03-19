const state = () => ({
  item: []
})

const mutations = {
  SET_DATA(state, data) {
    state.item = data
  }
}

const actions = {
  async GET_DATA({ commit }) {
    try {
      const { data } = await this.$axios.get('service/GetStaticService')
      commit('SET_DATA', data)
    } catch (e) {
      return e.response
    }
  },
  async UPDATE_SLIDER({ commit, dispatch }, data) {
    try {
      await this.$axios.post(`Service/UpdateStaticService`, data)
    } catch (e) {
      return e.response
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
