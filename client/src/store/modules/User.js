import ApiService from "@/core/services/api.service";

const user = {
  state: {},
  getters: {},
  actions: {
    // eslint-disable-next-line no-unused-vars
    USER_CREATE({commit}, params) {
      return new Promise((resolve, reject) => {
        ApiService.post("user", params)
          .then(() => {
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
  },
  mutations: {}
}

export default user
