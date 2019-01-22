import { stringify } from 'qs';
import request from './../../utils/HttpInvoker';

async function findFileList(params){
  return request(`/api/system/file/list?${stringify(params, { arrayFormat: 'repeat' })}`, {
    method: 'GET',
  });
}

async function uploadFile(params) {
  return request(`/api/system/file`, {
    method : 'POST',
    body: params,
    multipartForm :true,
  });
}

async function uploadImageFromPaste(params) {
  return request(`/api/system/file/base64`, {
    method : 'POST',
    body: params,
    multipartForm :true,
  });
}

export default {
  findFileList,
  uploadFile,
  uploadImageFromPaste
}
