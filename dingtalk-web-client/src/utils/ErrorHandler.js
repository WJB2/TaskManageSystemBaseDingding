import { routerRedux } from 'dva/router';
import { notification } from 'antd';

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
 * 处理401异常
 */
const handleStatus401 = (error, dispatch) => {
  dispatch({
    type: 'global/login',
    payload: {
      relogin:true
    }
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

  notification.error({
    message: error.message,
    description: error.errorText,
  });
};
