import {createRouter, createWebHistory} from 'vue-router'
import store from "@/store";

const isAdminLoggedIn = (to, from, next) => store.getters.isAuthenticated ? next() : next({name: "Login"});
const isAdminLoggedOut = (to, from, next) => store.getters.isAuthenticated ? next({name: "Dashboard"}) : next();

const routes = [
  {
    path: '/',
    name: 'Home',
    beforeEnter: isAdminLoggedIn,
    component: () => import("../layouts/Default.vue"),
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue')
      },
      {
        path: '/user/list',
        name: 'All User',
        component: () => import('@/views/Users/UserList.vue')
      },
      {
        path: '/user/role',
        name: 'User Permission',
        component: () => import('@/views/Users/Role/Role.vue')
      },
      {
        path: '/user/role/create',
        name: 'New Role',
        component: () => import('@/views/Users/Role/AddRole.vue')
      },
      {
        path: '/user/:id/edit',
        name: 'Edit Role',
        component: () => import('@/views/Users/Role/EditRole.vue')
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    beforeEnter: isAdminLoggedOut,
    component: () => import("@/views/Login"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return {top: 0}
  },
})

router.beforeEach((to, from, next) => {
  store.getters.isLoadProfile ? next() : store.dispatch('VERIFY_AUTH').finally(next)
})

export default router
