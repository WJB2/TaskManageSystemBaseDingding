import '@babel/polyfill';
import 'url-polyfill';
import dva from 'dva';
import createHistory from 'history/createHashHistory';
import createLoading from 'dva-loading';
import 'moment/locale/zh-cn';
import FastClick from 'fastclick';
// import * as dd from 'dingtalk-jsapi';
// import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
// let vConsole = new VConsole() // 初始化

import ErrorHandler from './utils/ErrorHandler';

import './index.less';

const htmlWidth=document.documentElement.clientWidth||document.body.clientWidth;

const htmlDom=document.getElementsByTagName('html')[0];

htmlDom.style.fontSize=htmlWidth/10+'px';


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
