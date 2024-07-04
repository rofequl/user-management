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
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/Account/Profile.vue')
      },
      {
        path: 'setting',
        name: 'Setting',
        component: () => import('@/views/Account/Setting/Index.vue'),
        children: [
          {
            path: 'basic',
            name: 'Basic Setting',
            component: () => import('@/views/Account/Setting/BasicSetting.vue')
          },
          {
            path: 'security',
            name: 'Security Setting',
            component: () => import('@/views/Account/Setting/Security.vue')
          }
        ]
      },
      {
        path: 'support-manager/:slug?',
        name: 'Support Manager',
        component: () => import('@/views/Addon/Support/index.vue')
      },
      {
        path: 'help-desk',
        name: 'Call Support',
        component: () => import('@/views/Addon/HelpDesk/index.vue')
      },
      {
        path: 'staffs/list',
        name: 'All Staffs',
        component: () => import('@/views/Staffs/StaffList.vue')
      },
      {
        path: 'staffs/role',
        name: 'Staffs Permission',
        component: () => import('@/views/Staffs/Role/Role.vue')
      },
      {
        path: 'staffs/role/create',
        name: 'New Role',
        component: () => import('@/views/Staffs/Role/AddRole.vue')
      },
      {
        path: 'staffs/:id/edit',
        name: 'Edit Role',
        component: () => import('@/views/Staffs/Role/EditRole.vue')
      },
      {
        path: 'support-category',
        name: 'Call Category',
        component: () => import('@/views/Directory/SupportCategory/index.vue')
      },
      {
        path: 'support-report',
        name: 'Support Report',
        component: () => import('@/views/Report/SupportReport.vue')
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
