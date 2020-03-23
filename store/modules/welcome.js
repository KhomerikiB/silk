const state = () => ({
  items: [],
  editableItem: {}
})

const mutations = {
  SET_DATA(state, data) {
    state.items = data
  },
  SET_EDITABLE_ITEM(state, id) {
    const slide = state.items.filter((item) => item.id === id)[0]
    state.editableItem = slide
  },
  REMOVE_EDITABLE_ITEM(state) {
    state.editableItem = {}
  }
}

const actions = {
  async GET_WELCOME_SLIDES({ commit }) {
    try {
      const { data } = await this.$axios.get('coverSlider')
      commit('SET_DATA', data.data)
    } catch (e) {
      console.log(e)
      return e.response
    }
  },
  async ADD_SLIDER({ commit, state, dispatch }, newData) {
    let items = []
    if (Object.keys(state.editableItem).length > 0) {
      const filteredItems = state.items.filter(
        (item) => item.id !== state.editableItem.id
      )
      items = [...filteredItems, newData]
    } else {
      items = [...state.items, newData]
    }
    try {
      const result = await this.$axios.post('CoverSlider', items)
      await dispatch('GET_WELCOME_SLIDES')
      console.log(result)
    } catch (e) {
      return e.response
    }
  },
  async REMOVE_SLIDER({ commit, state }, id) {
    const filteredItems = state.items.filter((item) => item.id !== id)
    try {
      await this.$axios.post('CoverSlider', filteredItems)
      commit('SET_DATA', filteredItems)
    } catch (e) {
      return e.response
    }
  },
  async UPDATE_SORT({ commit, dispatch }, idArray) {
    try {
      await this.$axios.post('CoverSlider/UpdateOrdering', idArray)
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
