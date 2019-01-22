import ObjectUtils from './../../utils/ObjectUtils';

import roleService from './../../services/system/RoleService';
import roleAuthorizationService from './../../services/system/RoleAuthorizationService';

export default {
  namespace: 'system/role',

  state: {
    formType: 'ADD',
    formVisible: false,
    currentRole: null,
    params: {},
    authorizationFormVisible: false,
    permissionData: [],
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *addRoleAsync({ payload }, { call, put }) {
      yield call(roleService.addRole, payload);

      yield put({
        type: 'mergeState',
      });

      yield put({
        type: 'queryRolePageAsync',
      });

      yield put({
        type: 'mergeState',
        payload: {
          formType: undefined,
          formVisible: false,
          currentRole: null,
        },
      });
    },

    *editRoleAction({ payload }, { call, put }) {
      const result = yield call(roleService.findRoleById, payload);

      yield put({
        type: 'mergeState',
        payload: {
          formType: 'EDIT',
          formVisible: true,
          currentRole: result,
        },
      });
    },

    *editRoleAsync({ payload }, { select, call, put }) {
      const currentRole = yield select(state => state['system/role'].currentRole);

      yield call(roleService.editRole, { id: currentRole.id, ...payload });

      yield put({
        type: 'mergeState',
        payload: {
          formType: undefined,
          formVisible: false,
          currentRole: null,
        },
      });

      yield put({
        type: 'queryRolePageAsync',
      });
    },

    *deleteRoleByIdAsync({ payload }, { call, put }) {
      yield call(roleService.deleteRoleById, payload);

      yield put({
        type: 'mergeState',
      });

      yield put({
        type: 'queryRolePageAsync',
      });
    },

    *doRoleAuthorizeAction({ payload }, { call, put }) {
      const permissionTree = yield call(roleAuthorizationService.findRolePermissions, payload);
      const role = yield call(roleService.findRoleById, { id: payload.roleId });

      yield put({
        type: 'updateState',
        payload: {
          currentRole: role,
          permissionData: permissionTree,
          authorizationFormVisible: true,
        },
      });
    },

    *doRoleAuthorizeAsync({ payload }, { call, put }) {
      yield call(roleAuthorizationService.editRolePermission, payload);

      yield put({
        type: 'updateState',
        payload: {
          permissionData: [],
          authorizationFormVisible: false,
        },
      });
    },

    *queryRolePageAsync({ payload }, { select, call, put }) {
      const params = yield select(state => state['system/role'].params);
      const pageInfo = yield call(roleService.findRolePage, {
        ...params,
        ...payload,
        deletedFlag:false,
      });

      pageInfo.list.forEach((item, index)=>{
        item.rowNo = index + 1 + (pageInfo.pageNum-1)*pageInfo.pageSize;
      });

      yield put({
        type: 'mergeState',
        payload: {
          data: {
            list: pageInfo.list,
            pagination: {
              total: pageInfo.total,
              current: pageInfo.pageNum,
              pageSize: pageInfo.pageSize,
            },
          },
        },
      });
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },

    mergeState(state, { payload }) {
      return ObjectUtils.mergeDeep(state, payload);
    },
  },
};
