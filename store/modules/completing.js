const state = () => ({
  items: [],
  editableItem: {},
  editable: false,
  key: ''
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
    state.key = ''
  },
  UPDATE_KEY(state, key) {
    state.key = key
  }
}

const actions = {
  async GET_COMPLETING_ITEMS({ commit }) {
    try {
      const { data } = await this.$axios.get('Completing')
      commit('SET_DATA', data.data)
    } catch (e) {
      return e.response
    }
  },
  async GET_BY_ID({ commit }, key) {
    try {
      const { data } = await this.$axios.get(`Completing/GetByKey?key=${key}`)
      commit('SET_EDITABLE_ITEM', data.data)
      commit('UPDATE_KEY', key)
    } catch (e) {
      return e.response
    }
  },
  async UPDATE_ITEM({ commit, dispatch }, data) {
    try {
      await this.$axios.put(`Completing/${data.key}`, data.body)
      await dispatch('GET_COMPLETING_ITEMS')
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
