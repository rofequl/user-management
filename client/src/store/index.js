import {createStore} from 'vuex'
import auth from "@/store/modules/Auth";
import role from "@/store/modules/Role";
import user from "@/store/modules/User";

export default createStore({
  state: {
    sidebarVisible: true,
    sidebarUnfoldable: false,
    theme: 'light',
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
  },
  actions: {},
  modules: {
    auth,
    role,
    user
  },
})
