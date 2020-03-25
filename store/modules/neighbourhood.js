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
      const { data } = await this.$axios.get('Neighbourhood/All')
      commit('SET_DATA', data.data.translations)
    } catch (e) {
      throw e.response
    }
  },
  async UPDATE_DATA({ commit, dispatch }, data) {
    try {
      console.log('data', data)
      await this.$axios.post('Neighbourhood', { translations: data })
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
