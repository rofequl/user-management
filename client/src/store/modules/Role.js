import ApiService from "@/core/services/api.service";

const role = {
  state: {
    role: [],
    role_details: [],
    permission: []
  },
  getters: {
    roleList: state => state.role,
    roleDetails: state => state.role_details,
    permissionList: state => state.permission,
  },
  actions: {
    ROLE_LIST({commit}) {
      return new Promise((resolve, reject) => {
        ApiService.get("role")
          .then(({data}) => {
            commit('SET_ROLE_LIST', data);
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    PERMISSION_LIST({commit}) {
      return new Promise((resolve, reject) => {
        ApiService.get("permission/list")
          .then(({data}) => {
            commit('SET_PERMISSION_LIST', data);
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    ROLE_CREATE({commit}, params) {
      return new Promise((resolve, reject) => {
        ApiService.post("role", params)
          .then(({data}) => {
            commit('ROLE_ADD', data);
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    ROLE_DELETE({commit}, id) {
      return new Promise((resolve, reject) => {
        ApiService.delete("role/" + id)
          .then((e) => {
            commit('ROLE_REMOVE', id);
            resolve(e)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    ROLE_DETAILS({commit}, id) {
      return new Promise((resolve, reject) => {
        ApiService.get("role/" + id)
          .then(({data}) => {
            commit('ROLE_Details_ADD', data);
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  },
  mutations: {
    SET_ROLE_LIST: (state, data) => {
      state.role = data.data;
    },
    SET_PERMISSION_LIST: (state, data) => {
      state.permission = data.data;
    },
    ROLE_ADD: (state, data) => {
      state.role.unshift(data.data);
    },
    ROLE_REMOVE: (state, key) => {
      state.role = state.role.filter(item => item.id !== key);
    },
    ROLE_Details_ADD: (state, data) => {
      state.role_details = data.data;
    },
  }
}

export default role
