import React from 'react';
import { routerRedux, Switch, Route } from 'dva/router';
import { getRouterData } from './common/router';
import MainLayout from "./routes/main/layout/MainLayout";
const { ConnectedRouter } = routerRedux;

function RouterConfig({ history, app }) {

  const routerData = getRouterData(app);

  return (
      <ConnectedRouter history={history}>
        <Switch>
          <Route
            path="/"
            render={props => <MainLayout routerData={routerData} {...props} />}
          />
        </Switch>
      </ConnectedRouter>
  );
}

export default RouterConfig;
