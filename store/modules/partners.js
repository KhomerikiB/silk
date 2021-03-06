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
  async GET_SLIDES({ commit }) {
    try {
      const { data } = await this.$axios.get('Partner')
      commit('SET_DATA', data.data)
    } catch (e) {
      throw e.response
    }
  },
  async GET_BY_ID({ commit }, id) {
    try {
      const { data } = await this.$axios.get(`Partner/${id}`)
      commit('SET_EDITABLE_ITEM', data)
    } catch (e) {
      throw e.response
    }
  },
  async ADD_SLIDER({ commit, dispatch }, data) {
    try {
      await this.$axios.post('Partner', data)
      await dispatch('GET_SLIDES')
    } catch (e) {
      throw e.response
    }
  },
  async DELETE_SLIDE({ commit, state }, id) {
    try {
      await this.$axios.delete(`Partner/${id}`)
      const newSlides = state.items.filter((item) => item.id !== id)
      commit('SET_DATA', newSlides)
    } catch (e) {
      throw e.response
    }
  },
  async UPDATE_SLIDER({ commit, dispatch }, data) {
    try {
      await this.$axios.put(`Partner/${data.id}`, data.body)
      await dispatch('GET_SLIDES')
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
