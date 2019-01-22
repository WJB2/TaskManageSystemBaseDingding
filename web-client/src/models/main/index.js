import ObjectUtils from './../../utils/ObjectUtils';

export default {
  namespace: 'main/index',

  state: {},

  effects: {},

  reducers: {
    updateState(state, { payload }) {
      if (!payload) {
        return state;
      }

      return { ...state, ...payload };
    },

    mergeState(state, { payload }) {
      if (!payload) {
        return state;
      }

      return ObjectUtils.mergeDeep(state, payload);
    },
  },
};
