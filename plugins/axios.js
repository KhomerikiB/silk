export default function({ $axios, store, route, app }) {
  $axios.interceptors.request.use(
    function(config) {
      config.headers.common['Accept-Language'] = 'ka'

      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2ZjFkMmZkMi0wYjkxLTRjZjUtOTM4YS01ZDdiZjBiNjRhYzYiLCJlbWFpbCI6InNpbGt0b3dlckBnbWFpbC5jb20iLCJ1bmlxdWVfbmFtZSI6ImQ4ODIyZjIwLWI0MjktNDM2Ny05MTRlLWRmYzEwYmJkZDM3YiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJhZG1pbiIsImVkaXRvciJdLCJleHAiOjE1ODQ5ODAxMDd9.pu-K1m0UGp9Ct-xg5wOOMW7SpssAWMESpEHqSQ_NhI8'
      config.headers.Authorization = `Bearer ${token}`
      config.headers.Authorization = `Bearer ${token}`

      return config
    },
    function(err) {
      return Promise.reject(err)
    }
  )
  $axios.interceptors.response.use(
    function(config) {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2ZjFkMmZkMi0wYjkxLTRjZjUtOTM4YS01ZDdiZjBiNjRhYzYiLCJlbWFpbCI6InNpbGt0b3dlckBnbWFpbC5jb20iLCJ1bmlxdWVfbmFtZSI6ImQ4ODIyZjIwLWI0MjktNDM2Ny05MTRlLWRmYzEwYmJkZDM3YiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJhZG1pbiIsImVkaXRvciJdLCJleHAiOjE1ODQ5ODAxMDd9.pu-K1m0UGp9Ct-xg5wOOMW7SpssAWMESpEHqSQ_NhI8'
      config.headers.Authorization = `Bearer ${token}`
      config.headers.Authorization = `Bearer ${token}`

      return config
    },
    function(err) {
      console.log(err)
      // store.dispatch('user/resetSocialUserState')
      // app.$cookies.remove('gnccUser')
    }
  )
}
