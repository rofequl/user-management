export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/',
    icon: 'cil-speedometer',
  },
  {
    component: 'CNavItem',
    name: 'Support & Training',
    to: '/support-manager',
    icon: 'cil-life-ring',
  },
  {
    component: 'CNavItem',
    name: 'Help Desk',
    to: '/help-desk',
    icon: 'cil-headphones',
  },
  {
    component: 'CNavGroup',
    name: 'Staffs',
    to: '/staffs',
    icon: 'cil-user',
    items: [
      {
        component: 'CNavItem',
        name: 'All Staffs',
        to: '/staffs/list'
      },
      {
        component: 'CNavItem',
        name: 'Staffs Permissions',
        to: '/staffs/role'
      }
    ]
  },
  {
    component: 'CNavGroup',
    name: 'Site Directory',
    to: '/',
    icon: 'cil-puzzle',
    items: [
      {
        component: 'CNavItem',
        name: 'Support Category',
        to: '/support-category'
      },
    ]
  }
]
