const state = () => ({
  items: [],
  editable: false,
  editableItem: {}
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
  async GET_DATA({ commit }) {
    try {
      const { data } = await this.$axios.get('Press')
      commit('SET_DATA', data.data)
    } catch (e) {
      throw e.response
    }
  },
  async GET_BY_ID({ commit }, id) {
    try {
      const { data } = await this.$axios.get(`Press/${id}`)
      commit('SET_EDITABLE_ITEM', data)
    } catch (e) {
      throw e.response
    }
  },
  async ADD_ITEM({ commit, dispatch }, data) {
    try {
      await this.$axios.post(`Press`, data)
      await dispatch('GET_DATA')
    } catch (e) {
      throw e.response
    }
  },
  async UPDATE_ITEM({ commit, dispatch }, data) {
    try {
      await this.$axios.put(`Press/${data.id}`, data.body)
      await dispatch('GET_DATA')
    } catch (e) {
      throw e.response
    }
  },
  async REMOVE_ITEM({ commit, state }, id) {
    try {
      await this.$axios.delete(`Press/${id}`)
      const newData = state.items.filter((item) => item.id !== id)
      commit('SET_DATA', newData)
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
