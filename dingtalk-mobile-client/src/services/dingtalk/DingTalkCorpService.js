import { stringify } from 'qs';
import request from './../../utils/HttpInvoker';

async function getConfig(params) {
  return request(`/api/dingtalk/corp/config?${stringify(params)}`, {
    method: 'GET',
  });
}

async function login(params) {
  return request(`/api/dingtalk/corp/session?${stringify(params)}`, {
    method: 'POST'
  });
}

export default {
  getConfig,
  login,
}
