import '@babel/polyfill';
import 'url-polyfill';
import dva from 'dva';
import createHistory from 'history/createHashHistory';
import createLoading from 'dva-loading';
import 'moment/locale/zh-cn';
import FastClick from 'fastclick';
import './rollbar';
import ErrorHandler from './utils/ErrorHandler';

import './index.less';

// 1. Initialize
const app = dva({
  history: createHistory(),
  onError: ErrorHandler,
});

// 2. Plugins
app.use(createLoading());

// 3. Register global model
app.model(require('./models/global').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

FastClick.attach(document.body);

window.store = app._store; // eslint-disable-line

export default app._store; // eslint-disable-line
