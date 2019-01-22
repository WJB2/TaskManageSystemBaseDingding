export default [
  {
    path: '/home',
    models: ['global', 'tm/home'],
    component: () => import('../routes/tm/home/HomeIndex'),
  },
  {
    path: '/profile',
    models: ['global', 'tm/profile'],
    component: () => import('../routes/tm/profile/ProfileIndex'),
  },
  {
    path: '/project',
    models: ['global', 'tm/project'],
    component: () => import('../routes/tm/project/ProjectIndex'),
  },
  {
    path: '/project/task',
    models: ['global', 'tm/project'],
    component: () => import('../routes/tm/project/TaskList'),
  },
  {
    path: '/statistics',
    models: ['global', 'tm/statistics'],
    component: () => import('../routes/tm/statistics/StatisticsIndex'),
  },
  {
    path: '/task',
    models: ['global', 'tm/task'],
    component: () => import('../routes/tm/task/TaskIndex'),
  },
  {
    path: '/bonus-points',
    models: ['global', 'tm/bonusPoints'],
    component: () => import('../routes/tm/bonuspoints/BonusPointsIndex'),
  },
];
