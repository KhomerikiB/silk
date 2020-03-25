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
      const { data } = await this.$axios.get('Contact')

      commit('SET_DATA', data)
    } catch (e) {
      throw e.response
    }
  },
  async UPDATE_DATA({ commit, dispatch }, data) {
    try {
      await this.$axios.post('Contact', data)
    } catch (e) {
      throw e.response
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
