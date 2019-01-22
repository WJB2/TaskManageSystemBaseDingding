export default [
  {
    path: '/user/login',
    models: ['user/authentication'],
    isExact: true,
    component: () => import('../routes/user/login/LoginLayout'),
  },
];
