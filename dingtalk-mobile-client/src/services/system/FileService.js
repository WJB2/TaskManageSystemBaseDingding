import { stringify } from 'qs';
import request from './../../utils/HttpInvoker';

async function addFile(params) {
  return request('/api/system/file', {
    method: 'POST',
    multipartForm :true,
    body: params,
  });
}

async function deleteFileById(params) {
  return request(`/api/system/file/${params.id}`, {
    method: 'DELETE',
  });
}

async function downloadFileById(params) {
  return request(`/api/system/file/${params.id}`, {
    method: 'GET',
  });
}


async function findFileList(params){
  return request(`/api/system/file/list?${stringify(params, { arrayFormat: 'repeat' })}`, {
    method: 'GET',
  });
}


export default {
  findFileList,
  addFile,
  deleteFileById,
  downloadFileById
}
