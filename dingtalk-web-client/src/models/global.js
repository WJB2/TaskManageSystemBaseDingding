import {routerRedux} from 'dva/router';

import {message} from 'antd';

import ObjectUtils from './../utils/ObjectUtils';
import {DEFAULT_HOME_PATH} from './../utils/GlobalConst';
import DingTalkCorpService from "../services/dingtalk/DingTalkCorpService";

import DingTalkPC from 'dingtalk-jsapi';

export default {
  namespace: 'global',

  state: {
    corpId:null,
    position: {},
    routerData: [],
    componentsMap: {},
    currentActivePath: DEFAULT_HOME_PATH,
    taskFormVisible: false,
  },



  effects: {

    * login({payload}, {call, select, put}) {

      const handleRequestAuthCode = (params) =>{
        return new Promise(function(resolve, reject){
          DingTalkPC.runtime.permission.requestAuthCode({
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

      const config = yield call(DingTalkCorpService.getConfig, {...params, ...result});
      config.agentid=config.agentId;

      config.jsApiList = ['device.notification.alert', 'device.notification.confirm', 'biz.ding.post'];

      DingTalkPC.config(config);

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

    * addOrReplaceComponent({payload}, {select, put}) {
      const {componentsMap} = yield select(state => {
        return state.global;
      });

      const {component, path, props} = payload;

      if (!componentsMap[payload.path]) {
        componentsMap[payload.path] = {component, path, props};

        yield put({
          type: 'updateState',
          payload: {
            componentsMap,
            currentActivePath: path
          },
        });
      }
    },

    * componentChanged({payload}, {select, put}) {

      yield put(routerRedux.replace(payload.path));

    },
  },

  reducers: {
    updateState(state, {payload}) {
      return {...state, ...payload};
    },

    mergeState(state, {payload}) {
      return ObjectUtils.mergeDeep(state, payload);
    },
  },

  subscriptions: {
    setup({history, dispatch}) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({pathname}) => {


      });
    },
  },
};
