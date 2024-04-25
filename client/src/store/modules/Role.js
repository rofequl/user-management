import ApiService from "@/core/services/api.service";

const role = {
  state: {
    role: [],
    permission: []
  },
  getters: {
    permissionList: state => state.permission,
  },
  actions: {
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
    }
  },
  mutations: {
    SET_PERMISSION_LIST: (state, data) => {
      state.permission = data.data;
    },
    ROLE_ADD: (state, data) => {
      state.role = data.data;
    },
  }
}

export default role
