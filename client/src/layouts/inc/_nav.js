export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/',
    icon: 'cil-speedometer',
  },
  {
    component: 'CNavGroup',
    name: 'Manage User',
    to: '/user',
    icon: 'cil-user',
    items: [
      {
        component: 'CNavItem',
        name: 'All User',
        to: '/user/list'
      },
      {
        component: 'CNavItem',
        name: 'User Permission',
        to: '/user/role'
      }
    ]
  },
  {
    component: 'CNavGroup',
    name: 'Call Support',
    to: '/call',
    icon: 'cil-user',
    items: [
      {
        component: 'CNavItem',
        name: 'Call Support Category',
        to: '/call/category'
      },
      {
        component: 'CNavItem',
        name: 'Call Support Manage',
        to: '/call/support'
      }
    ]
  }
]
