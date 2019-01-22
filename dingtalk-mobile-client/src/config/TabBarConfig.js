const tabBarMainList=[
  {
    title:'首页',
    key:'home',
    icon:'icon-shouye1',
    to:'/home'
  },
  {
    title:'任务',
    key:'task',
    icon:'icon-renwu1',
    to:'/task'
  },
  {
    title:'项目',
    key:'project',
    icon:'icon-02',
    to:'/project'
  },
  {
    title:'统计',
    key:'statis',
    icon:'icon-tongji1',
    to:'/statis'
  },
  {
    title:'我的',
    key:'profile',
    icon:'icon-tree-round-people',
    to:'/profile'
  }
];

const tabBarTaskList=[//创建任务后的tabbar
  // {
  //   title:'跟进讨论',
  //   key:'follow',
  //   icon:'icon-huihua',
  //   to:'/taskfollow'
  // },
  {
    title:'建子任务',
    key:'son',
    icon:'icon-goujianshu',
    to:'/taskcreateson'
  },
  {
    title:'挂起',
    key:'suspend',
    icon:'icon-guaqi1',
    to:'/tasksuspend'
  },
  {
    title:'标记完成',
    key:'completed',
    icon:'icon-wancheng',
    to:'/taskcompleted'
  },
  // {
  //   title:'发起会议',
  //   key:'taskmeeting',
  //   icon:'icon-dianhua4',
  //   to:'/taskmeeting'
  // },
  {
    title:'催办',
    key:'taskpress',
    icon:'icon-iconset0218',
    to:'/taskpress'
  },
  {
    title:'删除',
    key:'delete',
    icon:'icon-shanchu',
    to:'/taskdelete'
  }
];

const tabBarTaskSuspend=[//任务挂起
  {
    title:'恢复',
    key:'recover',
    icon:'icon-huifuzhixing',
    to:'/'
  },
  {
    title:'删除',
    key:'delete',
    icon:'icon-shanchu',
    to:'/taskdelete'
  }
];

const tabBarTaskCompletedList=[//任务已完成需要审核
  // {
  //   title:'跟进讨论',
  //   key:'follow',
  //   icon:'icon-huihua',
  // },
  {
    title:'重新开启',
    key:'restart',
    icon:'icon-huifuzhixing',
  },
  {
    title:'审核',
    key:'audit',
    icon:'icon-shenhe',
  },
  // {
  //   title:'发起会议',
  //   key:'meeting',
  //   icon:'icon-dianhua4'
  // }
  {
    title:'删除',
    key:'delete',
    icon:'icon-shanchu',
    to:'/taskdelete'
  }
];

const tabBarTaskAuditedList=[
  {
    title:'撤销审核',
    key:'rewokeaudit',
    icon:'icon-yewushenqingchexiao',
  },
  {
    title:'归档',
    key:'archived',
    icon:'icon-ic_droptohistory'
  },
  {
    title:'删除',
    key:'delete',
    icon:'icon-shanchu',
    to:'/taskdelete'
  }
]


const tabBarTaskArchivedList=[//已归档
  {
    title:'回档',
    key:'unarchived',
    icon:'icon-huidang',
  },
  {
    title:'删除',
    key:'delete',
    icon:'icon-shanchu',
    to:'/taskdelete'
  },
  // {
  //   title:'挂起',
  //   key:'suspend',
  //   icon:'icon-guaqi1',
  //   to:'/tasksuspend'
  // },
];

export default {
  tabBarMainList,
  tabBarTaskList,
  tabBarTaskSuspend,
  tabBarTaskCompletedList,
  tabBarTaskArchivedList,
  tabBarTaskAuditedList
};
