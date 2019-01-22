import { stringify } from 'qs';
import request from './../../utils/HttpInvoker';

async function findAttenceRuleList(params) {
  return request(`/api/building-site/attence-rule/list?${stringify(params)}`, {
    method: 'GET',
  });
}

async  function saveAttenceRule(params) {
  return request(`/api/building-site/attence-rule`, {
    method: 'PUT',
    body : params
  });
}


export default {
  findAttenceRuleList,
  saveAttenceRule,
};
