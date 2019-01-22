import { stringify } from 'qs';
import request from './../../utils/HttpInvoker';

async function addOrganization(params) {
  return request('/api/system/organization', {
    method: 'POST',
    body: params,
  });
}

async function editOrganization(params) {
  return request(`/api/system/organization/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

async function deleteOrganizationById(params) {
  return request(`/api/system/organization/${params.id}`, {
    method: 'DELETE',
  });
}

async function findOrganizationById(params) {
  return request(`/api/system/organization/${params.id}`, {
    method: 'GET',
  });
}

async function findOrganizationList(params) {
  return request(`/api/system/organization/list?${stringify(params)}`, {
    method: 'GET',
  });
}

async function findOrganizationPage(params) {
  return request(`/api/system/organization/page?${stringify(params)}`, {
    method: 'GET',
  });
}

async function findOrganizationTree(params) {
  return request(`/api/system/organization/tree?${stringify(params)}`, {
    method: 'GET',
  });
}

export default {
  addOrganization,
  editOrganization,
  deleteOrganizationById,
  findOrganizationById,
  findOrganizationList,
  findOrganizationPage,
  findOrganizationTree,
};
