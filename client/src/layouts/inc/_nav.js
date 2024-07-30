export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/',
    icon: 'cil-speedometer',
  },
  {
    component: 'CNavGroup',
    name: 'HRM',
    to: '/hrm',
    icon: 'cil-user',
    items: [
      {
        component: 'CNavItem',
        name: 'My Details',
        to: '/hrm/details',
      },
      {
        component: 'CNavItem',
        name: 'HRM Configuration',
        to: '/hrm/configure',
      },
    ]
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
    permissionId: [1, 5],
    items: [
      {
        component: 'CNavItem',
        name: 'All Staffs',
        to: '/staffs/list',
        permissionId: [1],
      },
      {
        component: 'CNavItem',
        name: 'Staffs Permissions',
        to: '/staffs/role',
        permissionId: [5]
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
