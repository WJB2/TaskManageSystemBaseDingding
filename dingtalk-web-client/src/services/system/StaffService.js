import { stringify } from 'qs';
import request from './../../utils/HttpInvoker';

async function addStaff(params) {
  return request('/api/system/staff', {
    method: 'POST',
    body: params,
  });
}

async function editStaff(params) {
  return request(`/api/system/staff/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

async function deleteStaffById(params) {
  return request(`/api/system/staff/${params.id}`, {
    method: 'DELETE',
  });
}

async function findStaffById(params) {
  return request(`/api/system/staff/${params.id}`, {
    method: 'GET',
  });
}

async function findStaffList(params) {
  return request(`/api/system/staff/list?${stringify(params)}`, {
    method: 'GET',
  });
}

async function findStaffPage(params) {
  return request(`/api/system/staff/page?${stringify(params)}`, {
    method: 'GET',
  });
}

export default {
  addStaff,
  editStaff,
  deleteStaffById,
  findStaffById,
  findStaffList,
  findStaffPage,
};
