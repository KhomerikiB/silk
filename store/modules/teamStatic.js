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
      const { data } = await this.$axios.get('Team/GetStaticTeam')
      commit('SET_DATA', data.translations)
    } catch (e) {
      return e.response
    }
  },
  async UPDATE_DATA({ commit, dispatch }, data) {
    try {
      console.log(data)
      await this.$axios.post('Team/UpdateStaticTeam', { translations: data })
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
