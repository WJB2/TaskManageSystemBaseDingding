import { stringify } from 'qs';
import request from './../../utils/HttpInvoker';

async function addPermission(params) {
  return request('/api/global/permission', {
    method: 'POST',
    body: params,
  });
}

async function editPermission(params) {
  return request('/api/global/permission', {
    method: 'PUT',
    body: params,
  });
}

async function deletePermissionById(id) {
  return request(`/api/global/permission${id}`, {
    method: 'DELETE',
  });
}

async function findPermissionList(params) {
  return request(`/api/global/permission/list${stringify(params)}`, {
    method: 'GET',
  });
}

async function findPermissionPage(params) {
  return request(`/api/global/permission/page${stringify(params)}`, {
    method: 'GET',
  });
}

async function findPermissionTree(params) {
  return request(`/api/global/permission/tree${stringify(params)}`, {
    method: 'GET',
  });
}

export default {
  addPermission,
  editPermission,
  deletePermissionById,
  findPermissionList,
  findPermissionPage,
  findPermissionTree,
};
