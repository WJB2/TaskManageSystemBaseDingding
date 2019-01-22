import ObjectUtils from './../../utils/ObjectUtils';

import positionService from './../../services/system/PositionService';

export default {
  namespace: 'system/position',

  state: {
    formType: 'ADD',
    formVisible: false,
    currentPosition: null,
    params: {},
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *addPositionAsync({ payload }, { call, put }) {
      yield call(positionService.addPosition, payload);

      yield put({
        type: 'mergeState',
      });

      yield put({
        type: 'queryPositionPageAsync',
      });

      yield put({
        type: 'mergeState',
        payload: {
          formType: undefined,
          formVisible: false,
          currentPosition: null,
        },
      });
    },

    *editPositionAction({ payload }, { call, put }) {
      const result = yield call(positionService.findPositionById, payload);

      yield put({
        type: 'mergeState',
        payload: {
          formType: 'EDIT',
          formVisible: true,
          currentPosition: result,
        },
      });
    },

    *editPositionAsync({ payload }, { select, call, put }) {
      const currentPosition = yield select(state => state['system/position'].currentPosition);

      yield call(positionService.editPosition, {
        id: currentPosition.id,
        ...payload,
      });

      yield put({
        type: 'mergeState',
        payload: {
          formType: undefined,
          formVisible: false,
          currentPosition: null,
        },
      });

      yield put({
        type: 'queryPositionPageAsync',
      });
    },

    *deletePositionByIdAsync({ payload }, { call, put }) {
      yield call(positionService.deletePositionById, payload);

      yield put({
        type: 'mergeState',
      });

      yield put({
        type: 'queryPositionPageAsync',
      });
    },

    *queryPositionPageAsync({ payload }, { select, call, put }) {
      const params = yield select(state => state['system/position'].params);
      const pageInfo = yield call(positionService.findPositionPage, {
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
      return ObjectUtils.mergeDeep(state, payload);
    },

    mergeState(state, { payload }) {
      return ObjectUtils.mergeDeep(state, payload);
    },
  },
};
