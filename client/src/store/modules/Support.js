import ApiService from "@/core/services/api.service";

const support = {
  actions: {
    // eslint-disable-next-line no-unused-vars
    SUPPORT_ENTRY({commit}, params) {
      return new Promise((resolve, reject) => {
        ApiService.post("support", params)
          .then(() => {
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // eslint-disable-next-line no-unused-vars
    SUPPORT_UPDATE({commit}, params) {
      return new Promise((resolve, reject) => {
        ApiService.put("support/" + params.id, params.data)
          .then(() => {
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // eslint-disable-next-line no-unused-vars
    SUPPORT_DELETE({commit}, id) {
      return new Promise((resolve, reject) => {
        ApiService.delete("support/" + id)
          .then((e) => {
            resolve(e)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
  }
}

export default support
