import { routerRedux } from 'dva/router';

/**
 * 处理500异常
 */
const handleStatus500 = (error, dispatch) => {
  dispatch(routerRedux.push('/exception/500'));
};

/**
 * 处理404异常
 */
const handleStatus404 = (error, dispatch) => {
  dispatch(routerRedux.push('/exception/404'));
};

/**
 * 处理404异常
 */
const handleStatus401 = (error, dispatch) => {
  dispatch({
    type: 'global/updateState',
    payload: {
      authenticated: false,
    },
  });
};

const handlerMap = {
  500: handleStatus500,
  404: handleStatus404,
  401: handleStatus401,
};

export default (error, dispatch) => {
  if (error.httpStatus && handlerMap[error.httpStatus]) {
    const handler = handlerMap[error.httpStatus];
    handler(error, dispatch);

    return;
  }

  //todo 异常处理
};
