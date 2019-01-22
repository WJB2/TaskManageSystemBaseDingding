import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import systemRouter from './systemRouter';
import taskRouter from './taskRouter';

let routerDataCache;

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => namespace === model);

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync

  if (models == null) {
    models = []; // eslint-disable-line
  }

  if (models.indexOf('global') < 0) {
    models.push('global');
  }

  if (component.toString().indexOf('.then(') < 0) {
    models.forEach(model => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () =>
      models.filter(model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
  });
};

export const getRouterData = app => {
  const routerConfig = {};

  systemRouter.forEach(item => {
    routerConfig[item.path] = {
      component: dynamicWrapper(app, item.models, item.component),
    };
  });

  taskRouter.forEach(item => {
    routerConfig[item.path] = {
      component: dynamicWrapper(app, item.models, item.component),
    };
  });

  return routerConfig;
};
