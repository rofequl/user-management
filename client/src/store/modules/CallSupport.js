import ApiService from "@/core/services/api.service";

const call_support = {
  state: {},
  getters: {},
  actions: {
    // eslint-disable-next-line no-unused-vars
    CALL_SUPPORT_ENTRY({commit}, params) {
      return new Promise((resolve, reject) => {
        ApiService.post("call-support", params)
          .then(() => {
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // eslint-disable-next-line no-unused-vars
    CALL_SUPPORT_UPDATE({commit}, params) {
      return new Promise((resolve, reject) => {
        ApiService.put("call-support/" + params.id, params.data)
          .then(() => {
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // eslint-disable-next-line no-unused-vars
    CALL_SUPPORT_DELETE({commit}, id) {
      return new Promise((resolve, reject) => {
        ApiService.delete("call-support/" + id)
          .then((e) => {
            resolve(e)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
  },
  mutations: {}
}

export default call_support
