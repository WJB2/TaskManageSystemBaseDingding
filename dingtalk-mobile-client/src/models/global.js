import { routerRedux } from 'dva/router';

import { DEFAULT_HOME_PATH } from './../utils/GlobalConst';

import ObjectUtils from '../utils/ObjectUtils';

import DingTalkCorpService from "../services/dingtalk/DingTalkCorpService";

import DingTalkMobile from 'dingtalk-jsapi';

export default {
  namespace: 'global',

  state: {
    corpId:null,
    routerData:[],//所有组件
    componentsMap:{},//所有组件和对应的属性props
    currentActivePath: DEFAULT_HOME_PATH,//对应路径
    test:'aa',
    position: {},
  },

  effects: {

    * login({payload}, {call, select, put}) {

      const handleRequestAuthCode = (params) =>{
        return new Promise(function(resolve, reject){
          DingTalkMobile.runtime.permission.requestAuthCode({
            ...params,
            onSuccess: (result) => {
              resolve(result);
            },
            onFail: () => {
              reject();
            }
          });
        });
      }

      console.log(handleRequestAuthCode)

      let searchStr = window.location.search;

      if (searchStr.startsWith("?")) {
        searchStr = searchStr.substr(1);
      }

      if (searchStr.endsWith("\\")) {
        searchStr = searchStr.substr(0, searchStr.length - 1);
      }

      const params = {};
      const strs = searchStr.split("&");
      strs.forEach((item) => {
        const parts = item.split("=");
        params[parts[0]] = parts[1];
      });
      params.url=window.location.href.substring(0, window.location.href.lastIndexOf('#'));

      const result = yield handleRequestAuthCode(params);

      console.log(result)

      const config = yield call(DingTalkCorpService.getConfig, {...params, ...result});
      config.agentid=config.agentId;

      console.log(config)

      config.jsApiList = ['device.notification.alert', 'device.notification.confirm', 'biz.ding.post','biz.contact.choose','biz.contact.complexPicker','biz.contact.externalComplexPicker','biz.contact.complexChoose','biz.contact.departmentsPicker'];

      DingTalkMobile.config(config);

      const position = yield call(DingTalkCorpService.login, {...params, ...result});

      yield put({
        type : 'updateState',
        payload : {
          ...payload,
          position:position
        }
      });

      if(payload.relogin){
        message.success("登入成功，请重试当前操作！")
      }
    },

    *componentChanged({ payload }, { select, put }) {//将页面存进model 替换路由
      const { currentActivePath } = yield select(state => {
        return state.global;
      });

      if (payload.path !== currentActivePath) {
        yield put(routerRedux.replace(payload.path));

        yield put({
          type: 'updateState',
          payload: {
            currentActivePath: payload.path,
          },
        });
      }
    },

    *removeComponent({ payload }, { select, put }){

      const {componentsMap,currentActivePath} = yield select((state)=>{
        return state['global'];
      });

      console.log(componentsMap);

      delete componentsMap[payload.path];

      console.log(componentsMap);

      if (payload.path !== currentActivePath) {
        yield put(routerRedux.push(payload.path));

        yield put({
          type: 'updateState',
          payload: {
            componentsMap: componentsMap,
          },
        });
      }
    },

    *forwardDestroy({ payload }, { select, put }){//不需要保存的路由跳转

      const {currentActivePath}=yield select((state)=>{//current:home
        return state['global']
      })

      const {path}={...payload};

      if(currentActivePath===path){
        return;
      }
      if (path) {
        yield put({
          type:'removeComponent',
          payload:{
            path,
          }
        })
      }
    }

  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },

    mergeState(state, { payload }) {
      return ObjectUtils.mergeDeep(state, payload);
    },
  },

  subscriptions: {
    setup({ history, dispatch }) {

    },
  },
};
