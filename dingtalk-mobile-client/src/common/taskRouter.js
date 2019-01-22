

export default [
  {
    path: '/home',
    models: ['global', 'home/home'],
    component: () => import('../routes/home/HomeIndex'),
  },
  {
    path: '/task',
    models: ['global', 'task/task'],
    component: () => import('../routes/task/TaskIndex'),
  },
  {
    path: '/project',
    models: ['global', 'project/project'],
    component: () => import('../routes/project/ProjectIndex'),
  },
  {
    path: '/statis',
    models: ['global', 'statis/statis'],
    component: () => import('../routes/statis/StatisIndex'),
  },
  {
    path:'/profile',
    models:['global','profile/profile'],
    component:()=>import('../routes/profile/ProfileIndex'),
  },
  {
    path:'/filter',
    models:['global','task/task'],
    component:()=>import('../components/pane/FilterPane')
  }
  ];
