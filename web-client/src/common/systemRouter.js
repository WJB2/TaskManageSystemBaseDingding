export default [
  {
    path: '/',
    models: ['global'],
    component: () => import('../routes/main/layout/MainLayout'),
  },
  {
    path: '/system/role',
    models: ['system/role'],
    isExact: true,
    component: () => import('../routes/system/role/RoleIndex'),
  },
  {
    path: '/system/staff',
    models: ['system/staff'],
    isExact: true,
    component: () => import('../routes/system/staff/StaffIndex'),
  },
  {
    path: '/system/organization',
    models: ['system/organization'],
    isExact: true,
    component: () => import('../routes/system/organization/OrganizationIndex'),
  },
  {
    path: '/system/post',
    models: ['system/post'],
    isExact: true,
    component: () => import('../routes/system/post/PostIndex'),
  },
  {
    path: '/system/position',
    models: ['system/position'],
    isExact: true,
    component: () => import('../routes/system/position/PositionIndex'),
  },
];
