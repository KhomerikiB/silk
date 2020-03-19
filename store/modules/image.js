const state = () => ({})

const mutations = {}

const actions = {
  async CROP_IMAGE({ commit, dispatch }, formData) {
    try {
      const result = await this.$axios.post('Upload/CropImage', formData)
      return result
    } catch (e) {
      throw e.response
    }
  },
  async UPLOAD_IMAGE({ commit }, file) {
    try {
      const result = await this.$axios.post('Upload/Image', file)
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
