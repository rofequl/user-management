import {createStore} from 'vuex'
import auth from "@/store/modules/Auth";
import role from "@/store/modules/Role";
import user from "@/store/modules/User";
import call_support from "@/store/modules/CallSupport";
import support_category from "@/store/modules/SupportCategory";
import support from "@/store/modules/Support";

export default createStore({
  state: {
    sidebarVisible: true,
    sidebarUnfoldable: false,
    theme: 'light',
    isMobile: false,
  },
  getters: {
    isMobile: (state) => state.isMobile,
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
    TOGGLE_MOBILE_TYPE: (state, isMobile) => {
      state.isMobile = isMobile
    },
  },
  actions: {},
  modules: {
    auth,
    role,
    user,
    support_category,
    call_support,
    support,
  },
})
