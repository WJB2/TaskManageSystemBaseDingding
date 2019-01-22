export default [
  {
    path: '/',
    models: ['global'],
    component: () => import('../routes/main/layout/MainLayout'),
  },
];
