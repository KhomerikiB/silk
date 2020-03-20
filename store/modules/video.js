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
      const { data } = await this.$axios.get('Video/All')
      console.log(data.data)
      commit('SET_DATA', data.data)
    } catch (e) {
      return e.response
    }
  },
  async UPDATE_DATA({ commit, dispatch }, data) {
    try {
      await this.$axios.post('Video', data)
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
