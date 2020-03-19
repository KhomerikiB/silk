const state = () => ({
  items: [],
  editableItem: {},
  editable: false
})

const mutations = {
  SET_DATA(state, data) {
    state.items = data
  },
  SET_EDITABLE_ITEM(state, data) {
    state.editableItem = data
    state.editable = true
  },
  RESET_EDITABLE_ITEM(state) {
    state.editable = false
    state.editableItem = {}
  }
}

const actions = {
  async GET_TEAM_SLIDES({ commit }) {
    try {
      const { data } = await this.$axios.get('Team')
      commit('SET_DATA', data.data)
    } catch (e) {
      return e.response
    }
  },
  async GET_BY_ID({ commit }, id) {
    try {
      const { data } = await this.$axios.get(`Team/${id}`)
      commit('SET_EDITABLE_ITEM', data)
    } catch (e) {
      return e.response
    }
  },
  async ADD_SLIDER({ commit, dispatch }, data) {
    try {
      await this.$axios.post('Team', data)
      await dispatch('GET_TEAM_SLIDES')
    } catch (e) {
      return e.response
    }
  },
  async DELETE_SLIDE({ commit, state }, id) {
    try {
      await this.$axios.delete(`Team/${id}`)
      const newSlides = state.items.filter((item) => item.id !== id)
      commit('SET_DATA', newSlides)
    } catch (e) {
      return e.response
    }
  },
  async UPDATE_SLIDER({ commit, dispatch }, data) {
    try {
      await this.$axios.put(`Team/${data.id}`, data.body)
      await dispatch('GET_TEAM_SLIDES')
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
