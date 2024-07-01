import ApiService from "@/core/services/api.service";

const support = {
  state: {
    support: [],
  },
  getters: {
    supportByTrackingId: state => id => state.support.find(value => value.trackingId === id),
  },
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
          .then(({data}) => {
            commit('SUPPORT_MODIFY', data.data);
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
    // Fetches a single support item by TrackingID and commits it to the state.
    SINGLE_SUPPORT({commit}, id) {
      return new Promise((resolve, reject) => {
        ApiService.get("support/" + id)
          .then(({data}) => {
            commit('SET_SINGLE_SUPPORT_LIST', data.data);
            resolve(data);
          })
          .catch(error => {
            reject(error)
          })
      });
    },
  },
  mutations: {
    SET_SINGLE_SUPPORT_LIST: (state, data) => {
      state.support.unshift(data);
    },
    SUPPORT_MODIFY: (state, data) => {
      Object.assign(state.support.find(element => element.id === data.id), data);
    },
    SUPPORT_ATTACHMENT_ADD: (state, data) => {
      state.support.find(element => element.id === data.id).AttachmentUploads.push(data.value);
    },
    SUPPORT_ATTACHMENT_REMOVE: (state, data) => {

    },
  }
}

export default support
