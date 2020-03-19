import Vue from 'vue'

Vue.mixin({
  computed: {
    staticUrl() {
      return process.env.staticUrl
    }
  }
})
