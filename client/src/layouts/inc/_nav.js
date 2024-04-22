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
  }
]
