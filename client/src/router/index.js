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
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/Auth/Profile.vue')
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
      },
      {
        path: "/404",
        name: "NotFound",
        component: () => import("@/views/error/Error-404"),
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    beforeEnter: isAdminLoggedOut,
    component: () => import("@/views/Login"),
  },
  {
    path: "/error",
    component: () => import("../layouts/Default.vue"),
    children: [
      {
        meta: {title: 'Error 500'},
        path: "/error",
        name: "error-500",
        component: () => import("@/views/error/Error-500"),
      }
    ]
  },
  {
    path: "/:pathMatch(.*)", // Define a catch-all route using a param with a custom regexp
    redirect: "/404" // Redirect all unknown paths to 404 page
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return {top: 0}
  },
})
// router.beforeEach((to, from, next) => {
//   // Redirect unauthenticated users to login page
//   if (!store.getters.isAuthenticated && to.name !== 'Login') next({ name: 'Login' });
//   else {
//     // Check if the route requires authentication and the user is logged in
//     if (!store.getters.isAuthenticated) next({ name: 'Login' });
//     else next();
//   }
// });
router.beforeEach((to, from, next) => {
  store.getters.isLoadProfile ? next() : store.dispatch('VERIFY_AUTH').finally(next)
})

export default router
