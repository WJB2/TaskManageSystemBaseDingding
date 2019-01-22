import { routerRedux } from 'dva/router';

import authenticationService from './../../services/user/AuthenticationService';

export default {
  namespace: 'user/authentication',

  state: {
    status: null,
    errorText: null,
    user: null,
  },

  effects: {
    *login({ payload }, { call, put }) {
      try {
        const user = yield call(authenticationService.login, payload);

        sessionStorage.setItem('AUTHENTICATED', true);

        yield put({
          type: 'updateSessionStatus',
          payload: {
            status: true,
            errorText: null,
            user,
          },
        });

        yield put(routerRedux.push('/'));
      } catch (e) {
        yield put({
          type: 'updateSessionStatus',
          payload: {
            status: true,
            errorText: e.errorText,
            user: null,
          },
        });
      }
    },

    *logout({ payload }, { call, put }) {
      try {
        yield call(authenticationService.logout, payload);

        sessionStorage.clear();

        yield put({
          type: 'updateSessionStatus',
          payload: {
            status: false,
            errorText: null,
            user: null,
          },
        });
      } finally {
        yield put(routerRedux.push('/user/login'));
        window.location.reload();
      }
    },
  },

  reducers: {
    updateSessionStatus(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
