import ApiService from "@/core/services/api.service";

const support_category = {
  state: {
    supportCategory: []
  },
  getters: {
    supportCategoryList: state => state.supportCategory,
  },
  actions: {
    SUPPORT_CATEGORY_LIST({commit}) {
      return new Promise((resolve, reject) => {
        ApiService.get("support/category")
          .then(({data}) => {
            commit('SET_SUPPORT_CATEGORY_LIST', data);
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    SUPPORT_CATEGORY_CREATE({commit}, params) {
      return new Promise((resolve, reject) => {
        ApiService.post("support/category", params)
          .then(({data}) => {
            commit('SUPPORT_CATEGORY_ADD', data);
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    SUPPORT_CATEGORY_UPDATE({commit}, params) {
      return new Promise((resolve, reject) => {
        ApiService.put("support/category/" + params.id, params.data)
          .then(({data}) => {
            commit('SUPPORT_CATEGORY_MODIFY', data.data);
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    SUPPORT_CATEGORY_DELETE({commit}, id) {
      return new Promise((resolve, reject) => {
        ApiService.delete("support/category/" + id)
          .then((e) => {
            commit('SUPPORT_CATEGORY_REMOVE', id);
            resolve(e)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
  },
  mutations: {
    SET_SUPPORT_CATEGORY_LIST: (state, data) => {
      state.supportCategory = data.data;
    },
    SUPPORT_CATEGORY_ADD: (state, data) => {
      state.supportCategory.unshift(data.data);
    },
    SUPPORT_CATEGORY_REMOVE: (state, key) => {
      state.supportCategory = state.supportCategory.filter(item => item.id !== key);
    },
    SUPPORT_CATEGORY_MODIFY: (state, data) => {
      Object.assign(state.supportCategory.find(element => element.id === data.id), data);
    },
  }
}

export default support_category
