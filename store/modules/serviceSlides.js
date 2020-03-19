const state = () => ({
  items: [],
  editableItem: {},
  editable: false
})

const mutations = {
  SET_SLIDES(state, data) {
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
  }
}

const actions = {
  async GET_SLIDES({ commit }) {
    try {
      const { data } = await this.$axios.get('Service')
      commit('SET_SLIDES', data.data)
    } catch (e) {
      return e.response
    }
  },
  async GET_SLIDE_BY_ID({ commit }, id) {
    try {
      const { data } = await this.$axios.get(`Service/${id}`)
      commit('SET_EDITABLE_ITEM', data)
    } catch (e) {
      return e.response
    }
  },
  async UPDATE_ITEM({ commit, dispatch }, data) {
    console.log(data)
    try {
      await this.$axios.put(`Service/${data.id}`, {
        translations: data.translations
      })
      await dispatch('GET_SLIDES')
    } catch (e) {
      return e.response
    }
  },
  async ADD_ITEM({ commit, dispatch }, translations) {
    try {
      await this.$axios.post(`Service`, { translations })
      await dispatch('GET_SLIDES')
    } catch (e) {
      return e.response
    }
  },
  async REMOVE_ITEM({ commit, state }, id) {
    try {
      await this.$axios.delete(`Service/${id}`)
      const newData = state.items.filter((item) => item.id !== id)
      commit('SET_SLIDES', newData)
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
