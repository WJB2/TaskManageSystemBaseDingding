import { stringify } from 'qs';
import request from './../../utils/HttpInvoker';

async function addRole(params) {
  return request('/api/system/role', {
    method: 'POST',
    body: params,
  });
}

async function editRole(params) {
  return request(`/api/system/role/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

async function deleteRoleById(params) {
  return request(`/api/system/role/${params.id}`, {
    method: 'DELETE',
  });
}

async function findRoleById(params) {
  return request(`/api/system/role/${params.id}`, {
    method: 'GET',
  });
}

async function findRoleList(params) {
  return request(`/api/system/role/list?${stringify(params)}`, {
    method: 'GET',
  });
}

async function findRolePage(params) {
  return request(`/api/system/role/page?${stringify(params)}`, {
    method: 'GET',
  });
}

export default {
  addRole,
  editRole,
  deleteRoleById,
  findRoleById,
  findRoleList,
  findRolePage,
};
