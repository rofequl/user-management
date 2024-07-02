import JwtService from "@/core/services/jwt.service";
import apiService from "@/core/services/api.service";
import router from "@/router";

const auth = {
  state: {
    user: {},
    permission: {},
    isAuthenticated: !!JwtService.getToken(),
    isLoad: false
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    currentUser: (state) => state.user,
    isLoadProfile: (state) => state.isLoad,
    userPermissionCheck: (state) => id => id.some(value => state.permission.includes(value))
  },
  actions: {
    LOGIN({commit}, credentials) {
      return new Promise((resolve, reject) => {
        apiService.post("user/login", credentials)
          .then(({data}) => {
            commit("SET_AUTH", data);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    VERIFY_AUTH({commit, state}) {
      return new Promise((resolve, reject) => {
        if (JwtService.getToken()) {
          state.isLoad = true
          apiService.get("user/profile")
            .then(({data}) => {
              commit('SET_AUTH_USERS', data.user);
              resolve();
            })
            .catch((error) => {
              reject(error);
            })
        } else resolve();
      });
    },
    LOGOUT({commit, state}) {
      if (state.isAuthenticated) {
        return new Promise((resolve, reject) => {
          apiService.post("user/logout")
            .then(() => {
              commit('PURGE_AUTH');
              router.push({name: 'Login'}).then()
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        });
      }
    },
  },
  mutations: {
    PURGE_AUTH: (state) => {
      state.isAuthenticated = false;
      state.user = {};
      JwtService.destroyToken();
    },
    SET_AUTH: (state, user) => {
      state.isAuthenticated = true;
      JwtService.saveToken(user.token);
    },
    SET_AUTH_USERS: (state, user) => {
      state.permission = user.Role.Permissions;
      delete user.Role.Permissions
      state.user = user;
    },
  }
}

export default auth
