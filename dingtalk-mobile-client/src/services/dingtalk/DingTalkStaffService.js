import { stringify } from 'qs';
import request from './../../utils/HttpInvoker';

async function convertStaffIdToDingtalkUserId(params) {

  return request(`/api/dingtalk/staff/staff-id-to-user-id?${stringify(params,  { arrayFormat: 'repeat' })}`, {
    method: 'GET',
  });
}

async function convertDingtalkUserIdToStaffId(params) {
  return request(`/api/dingtalk/staff/user-id-to-staff-id?${stringify(params,  { arrayFormat: 'repeat' })}`, {
    method: 'GET'
  });
}

export default {
  convertStaffIdToDingtalkUserId,
  convertDingtalkUserIdToStaffId,
}
