import { routerRedux } from 'dva/router';

import ObjectUtils from './../utils/ObjectUtils';
import TreeUtils from './../utils/TreeUtils';
import { DEFAULT_HOME_PATH } from './../utils/GlobalConst';

import authenticationService from './../services/user/AuthenticationService';
import StaffAuthorizationService from './../services/system/StaffAuthorizationService';
import userService from "../services/user/UserService";

export default {
  namespace: 'global',

  state: {
    routerData: [],
    initialized: false, // 是否初始化完成
    authenticated: true, // 是否授权
    loginErrorText: null, //
    sidebarCollapsed: false, // 菜单栏是否展开
    currentUser: null, // 当前用户
    currentPosition: null, // 当前人员岗位
    currentModule: null, // 当前活跃模块
    modules: [], // 模块列表
    menus: [], // 当前菜单
    favoriteMenus: [], // 当前收藏菜单
    currentMenus: [], // 当前活跃菜单
    authorizedPermissions: [], // 用户权限列表
    currentActivePath: DEFAULT_HOME_PATH, // 当前活跃Path
    componentsWrapperList: [], // 组件列表
    componentTitleList: [],
    componentsMap: {},
    passwordFormVisible:false, //密码修改器是否可见
  },

  effects: {
    *initialize({ payload }, { call, put, select }) {
      try {
        const user = yield call(authenticationService.getCurrentUser, {});
        const position = yield call(StaffAuthorizationService.getCurrentPosition, {});
        const menus = yield call(StaffAuthorizationService.findAuthorizedMenuTree, payload);
        const permissions = []; yield call(StaffAuthorizationService.findAuthorizedPermissionList);
        const modules = yield call(StaffAuthorizationService.findAuthorizedModuleList);

        yield put({
          type: 'updateState',
          payload: {
            initialized: true,
            authenticated: true,
            currentUser: user,
            currentPosition: position,
            modules,
            menus,
            authorizedPermissions: permissions.map((item)=>{
              return item.wildcard;
            }),
          },
        });
      } catch (ex) {
        const { initialized } = yield select(state => {
          return state.global;
        });

        if (ex.httpStatus === 401) {
          if (initialized) {
            yield put({
              type: 'updateState',
              payload: {
                authenticated: false,
              },
            });
          } else {
            sessionStorage.clear();
            yield put(routerRedux.push('/user/login'));
          }
        }
      }
    },

    *addOrReplaceTab({ payload }, { select, put }) {
      const { currentActivePath, componentTitleList } = yield select(state => {
        return state.global;
      });

      if (payload.path === currentActivePath) {
        return;
      }

      const oldTitleInfo = componentTitleList.find(item => {
        return item.path === payload.path;
      });

      const newState = {};

      if (!oldTitleInfo) {
        componentTitleList.push(payload);
        newState.componentTitleList = componentTitleList;
      }

      yield put({
        type: 'updateState',
        payload: {
          componentTitleList,
          currentActivePath: payload.path,
        },
      });

      if (payload.path !== currentActivePath) {
        yield put(routerRedux.push(payload.path));
      }
    },

    *replaceActiveTab({ payload }, { select, put }) {
      const { currentActivePath } = yield select(state => {
        return state.global;
      });

      if (DEFAULT_HOME_PATH !== currentActivePath) {
        yield put({
          type: 'removeTab',
          payload: {
            path: currentActivePath,
          },
        });
      }

      yield put({
        type: 'addOrReplaceTab',
        payload,
      });
    },

    *updateComponent({ payload }, { select, put }) {
      const { componentsMap } = yield select(state => {
        return state.global;
      });

      const { component, path, props } = payload;

      if (!componentsMap[payload.path]) {
        componentsMap[payload.path] = { component, path, props };

        yield put({
          type: 'updateState',
          payload: {
            componentsMap,
          },
        });
      }
    },

    *login({ payload }, { select, call, put }) {
      try {
        const user = yield call(authenticationService.login, payload);

        const { currentUser } = yield select(state => {
          return state.global;
        });

        if (user.username !== currentUser.username) {
          window.location.reload(true);
          return;
        }

        yield put({
          type: 'updateState',
          payload: {
            loginErrorText: null,
            authenticated: true,
          },
        });
      } catch (e) {
        yield put({
          type: 'updateState',
          payload: {
            loginErrorText: e.errorText,
            authenticated: false,
          },
        });
      }
    },

    *changeModule({ payload }, { select, put }) {
      const { module } = payload;

      const { currentModule, menus } = yield select(state => {
        return state.global;
      });

      if (currentModule && currentModule.id === module.id) {
        return;
      }

      const newState = {};

      if (module.menuId) {
        const root = TreeUtils.findFirst(menus, 'children', node => {
          return node.id === module.menuId;
        });

        TreeUtils.forEach(root.children, 'children', node => {
          node.module = module; // eslint-disable-line
        });

        newState.currentMenus = root ? root.children : [];
      }

      yield put({
        type: 'updateState',
        payload: {
          ...newState,
          currentModule: module,
          sidebarCollapsed: false,
        },
      });
    },

    *componentUpdated({ payload }, { select, put }) {
      const { componentsWrapperList } = yield select(state => {
        return state.global;
      });

      const oldWrapper = componentsWrapperList.find(wrapper => {
        return payload.path === wrapper.path;
      });

      if (oldWrapper === undefined) {
        componentsWrapperList.push({
          path: payload.path,
          title: payload.title,
          component: payload.router.component(),
        });

        yield put(routerRedux.replace(payload.path));

        yield put({
          type: 'updateState',
          payload: {
            componentsWrapperList,
            currentActivePath: payload.path,
          },
        });
      } else {
        yield put({
          type: 'tabChanged',
          payload: {
            path: payload.path,
          },
        });
      }
    },

    *tabChanged({ payload }, { select, put }) {
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

    *removeTab({ payload }, { select, put }) {
      const { componentsMap, componentTitleList } = yield select(state => {
        return state.global;
      });

      const oldTitleIdx = componentTitleList.findIndex(titleInfo => {
        return payload.path === titleInfo.path;
      });

      const newComponentsTitleList = componentTitleList.filter(item => {
        return item.path !== payload.path;
      });

      delete componentsMap[payload.path];

      yield put({
        type: 'updateState',
        payload: {
          componentTitleList: newComponentsTitleList,
          componentsMap,
          currentActivePath:
            oldTitleIdx > 0 ? componentTitleList[oldTitleIdx - 1].path : DEFAULT_HOME_PATH,
        },
      });

      yield put(
        routerRedux.replace(
          oldTitleIdx > 0 ? componentTitleList[oldTitleIdx - 1].path : DEFAULT_HOME_PATH
        )
      );
    },

    *goHome({ payload }, { put }) {
      yield put({
        type: 'updateState',
        payload: {
          ...payload,
          currentActivePath: DEFAULT_HOME_PATH,
        },
      });
      yield put(routerRedux.push(DEFAULT_HOME_PATH));
    },

    *changePassword({ payload }, { put, call, select }){
      const global = yield select((state)=>{
        return state['global'];
      });

      delete payload.confirmPassword;

      yield call(userService.editUserPassword, {
        ...payload,
        userId : global.currentUser.id
      });

      yield put({
        type: 'user/authentication/logout',
      });
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
    initialize({ dispatch }) {
      dispatch({
        type: 'initialize',
      });
    },
  },
};
