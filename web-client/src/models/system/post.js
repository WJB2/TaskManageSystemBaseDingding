import ObjectUtils from './../../utils/ObjectUtils';

import postService from './../../services/system/PostService';

export default {
  namespace: 'system/post',

  state: {
    formType: 'ADD',
    formVisible: false,
    currentPost: null,
    params: {},
    treeData: [],
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *addPostAsync({ payload }, { call, put }) {
      yield call(postService.addPost, payload);

      yield put({
        type: 'mergeState',
      });

      yield put({
        type: 'queryPostTreeAsync',
      });

      yield put({
        type: 'queryPostPageAsync',
      });

      yield put({
        type: 'mergeState',
        payload: {
          formType: undefined,
          formVisible: false,
          currentPost: null,
        },
      });
    },

    *editPostAction({ payload }, { call, put }) {
      const result = yield call(postService.findPostById, payload);

      yield put({
        type: 'mergeState',
        payload: {
          formType: 'EDIT',
          formVisible: true,
          currentPost: result,
        },
      });
    },

    *editPostAsync({ payload }, { select, call, put }) {
      const currentPost = yield select(state => state['system/post'].currentPost);

      yield call(postService.editPost, { id: currentPost.id, ...payload });

      yield put({
        type: 'mergeState',
        payload: {
          formType: undefined,
          formVisible: false,
          currentPost: null,
        },
      });

      yield put({
        type: 'queryPostPageAsync',
      });

      yield put({
        type: 'queryPostTreeAsync',
      });
    },

    *deletePostByIdAsync({ payload }, { call, put }) {
      yield call(postService.deletePostById, payload);

      yield put({
        type: 'queryPostTreeAsync',
      });

      yield put({
        type: 'queryPostPageAsync',
      });
    },

    *changePostRootNode({ payload }, { put }){
      yield put({
        type: 'updateState',
        payload: {
          rootId: payload.id,
        },
      });

      yield put({
        type: 'queryPostPageAsync',
        payload:{

        },
      });
    },

    *queryPostPageAsync({ payload }, { select, call, put }) {
      const {params, rootId} = yield select(state => state['system/post']);
      const pageInfo = yield call(postService.findPostPage, {
        ...payload,
        rootId,
        ...params,
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

    *queryPostTreeAsync({ payload }, { select, call, put }) {
      const params= yield select(state => state['system/post'].params);
      const treeData = yield call(postService.findPostTree, {
        ...params,
        ...payload,
      });

      yield put({
        type: 'mergeState',
        payload: {
          treeData,
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
