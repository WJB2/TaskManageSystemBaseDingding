import request from './../../utils/HttpInvoker';

async function editRolePermission(params) {
  return request(`/api/system/role-authorization/permission/${params.roleId}`, {
    method: 'PUT',
    body: params,
  });
}

async function findRolePermissions(params) {
  return request(`/api/system/role-authorization/permission/${params.roleId}`, {
    method: 'GET',
  });
}

export default {
  editRolePermission,
  findRolePermissions,
};
