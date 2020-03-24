const state = () => ({})

const mutations = {}

const actions = {
  async UPLOAD_FILE({ commit }, file) {
    try {
      const result = await this.$axios.post('Upload/File', file)
      return result
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
