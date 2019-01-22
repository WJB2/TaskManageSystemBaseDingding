import fetch from 'dva/fetch';

import reqwest from 'reqwest';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = response.status;
  const error = new Error();
  error.name = errortext;
  error.response = response;
  throw error;
}


/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {

  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };

  if(newOptions.multipartForm){
    newOptions.headers = {
      ...newOptions.headers,
    };
  }else{
    if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    }
  }

  if(newOptions.multipartForm){
    return reqwest({
      url : url,
      method :newOptions.method?newOptions.method:'POST',
      processData: false,
      data: newOptions.body,
    })
  }else {
    return fetch(url, newOptions).then(checkStatus)
      .then(response => {
        return response.text();
      })
      .then(text => {
        if (text) {
          return JSON.parse(text);
        }
      })
      .catch(({ response }) => {
        try {
          return response.json().then(e => {
            let error = new Error();

            if (response.status === 502) {
              error = {
                error,
                ...{ errorText: '网关错误', httpStatus: 502 },
                message: '错误502',
              };
            } else if (response.status === 503) {
              error = {
                error,
                ...{
                  errorText: '服务不可用，服务器暂时过载或维护',
                  httpStatus: 503,
                },
                message: '错误503',
              };
            } else if (response.status === 504) {
              error = {
                error,
                ...{ errorText: '网关超时', httpStatus: 504 },
                message: '错误504',
              };
            } else {
              error = { error, ...e, message: `错误${e.httpStatus}` };
            }

            throw error;
          });
        } catch (ex) {
          return response.text().then(() => {
            let error = new Error();
            error = {
              error,
              ...{ errorText: '未知错误', httpStatus: 500 },
              message: '错误500',
            };
            throw error;
          });
        }
      });
  }

}
