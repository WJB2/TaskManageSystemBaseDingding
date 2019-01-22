import { stringify } from 'qs';
import request from './../../utils/HttpInvoker';

async function addTenant(params) {
  return request('/api/global/tenant', {
    method: 'POST',
    body: params,
  });
}

async function editTenant(params) {
  return request('/api/global/tenant', {
    method: 'PUT',
    body: params,
  });
}

async function deleteTenantById(id) {
  return request(`/api/global/tenant${id}`, {
    method: 'DELETE',
  });
}

async function findTenantList(params) {
  return request(`/api/global/tenant/list${stringify(params)}`, {
    method: 'GET',
  });
}

async function findTenantPage(params) {
  return request(`/api/global/tenant/page${stringify(params)}`, {
    method: 'GET',
  });
}

export default {
  addTenant,
  editTenant,
  deleteTenantById,
  findTenantList,
  findTenantPage,
};
