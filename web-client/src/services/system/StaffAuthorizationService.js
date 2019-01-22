import { stringify } from 'qs';

import request from './../../utils/HttpInvoker';

async function getCurrentPosition() {
  return request('/api/authentication/session/position', {
    method: 'GET',
  });
}

async function findAuthorizedModuleList(params) {
  return request(`/api/system/staff-authorization/authorized-module/list?${stringify(params)}`, {
    method: 'GET',
  });
}

async function findAuthorizedMenuList(params) {
  return request(`/api/system/staff-authorization/authorized-menu/list?${stringify(params)}`, {
    method: 'GET',
  });
}

async function findAuthorizedMenuTree(params) {
  return request(`/api/system/staff-authorization/authorized-menu/tree?${stringify(params)}`, {
    method: 'GET',
  });
}

async function findAuthorizedPermissionList(params) {
  return request(
    `/api/system/staff-authorization/authorized-permission/list?${stringify(params)}`,
    {
      method: 'GET',
    }
  );
}

async function findAuthorizedPermissionTree(params) {
  return request(
    `/api/system/staff-authorization/authorized-permission/tree?${stringify(params)}`,
    {
      method: 'GET',
    }
  );
}

async function findAuthorizedOrganizationList(params) {
  return request(
    `/api/system/staff-authorization/authorized-organization/list?${stringify(params)}`,
    {
      method: 'GET',
    }
  );
}

async function findAuthorizedOrganizationTree(params) {
  return request(
    `/api/system/staff-authorization/authorized-organization/tree?${stringify(params)}`,
    {
      method: 'GET',
    }
  );
}

export default {
  getCurrentPosition,
  findAuthorizedModuleList,
  findAuthorizedMenuList,
  findAuthorizedMenuTree,
  findAuthorizedPermissionList,
  findAuthorizedPermissionTree,
  findAuthorizedOrganizationList,
  findAuthorizedOrganizationTree,
};
