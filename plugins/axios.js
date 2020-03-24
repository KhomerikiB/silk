export default function({ $axios, store, route, app }) {
  $axios.interceptors.request.use(
    function(config) {
      config.headers.common['Accept-Language'] = 'ka'

      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhYzg0YjIxOS1lZTI0LTRjODMtYjFhZS0wZjY4NDQ3MDA5ZjMiLCJlbWFpbCI6InNpbGt0b3dlckBnbWFpbC5jb20iLCJ1bmlxdWVfbmFtZSI6ImQ4ODIyZjIwLWI0MjktNDM2Ny05MTRlLWRmYzEwYmJkZDM3YiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJhZG1pbiIsImVkaXRvciJdLCJleHAiOjE1ODUwNjk4MjJ9.WbKyABfrN-3Qwf32e1woqdu3FVdRcp7OOopWd0khZxk'
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
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhYzg0YjIxOS1lZTI0LTRjODMtYjFhZS0wZjY4NDQ3MDA5ZjMiLCJlbWFpbCI6InNpbGt0b3dlckBnbWFpbC5jb20iLCJ1bmlxdWVfbmFtZSI6ImQ4ODIyZjIwLWI0MjktNDM2Ny05MTRlLWRmYzEwYmJkZDM3YiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJhZG1pbiIsImVkaXRvciJdLCJleHAiOjE1ODUwNjk4MjJ9.WbKyABfrN-3Qwf32e1woqdu3FVdRcp7OOopWd0khZxk'
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
