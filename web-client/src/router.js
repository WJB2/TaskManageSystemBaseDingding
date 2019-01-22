import React from 'react';
import { routerRedux, Switch, Route } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { getRouterData } from './common/router';
import styles from './index.less';
import { AuthenticatedRoute } from './router/index';

const { ConnectedRouter } = routerRedux;
dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);

  const UserLoginLayout = routerData['/user/login'].component;
  const MainLayout = routerData['/'].component;

  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/user/login" exact render={props => <UserLoginLayout {...props} />} />
          <AuthenticatedRoute
            path="/"
            render={props => <MainLayout routerData={routerData} {...props} />}
            redirectPath="/user/login"
          />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;
