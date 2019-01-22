import { stringify } from 'qs';
import request from './../../utils/HttpInvoker';


async function addRewardOrPunish(params) {//增加奖惩信息
  return request('/api/smart-site/reward-or-punish', {
    method: 'POST',
    body: params,
  });
}

async function deleteRewardOrPunishById(params) {
  return request(`/api/smart-site/reward-or-punish/${params.id}`, {
    method: 'DELETE',
  });
}

async function editRewardOrPunishById(params) {
  return request(`/api/smart-site/reward-or-punish/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

async function auditRewardOrPunishById(params) {
  return request(`/api/smart-site/reward-or-punish/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

async function getRewardOrPunishPage(params){
  return request(`/api/smart-site/reward-or-punish/page?${stringify(params)}`,{
    method:'GET',
  })
}


async function getRewardOrPunishList(params) {
  return request(`/api/smart-site/reward-or-punish/list?${stringify(params)}`, {
    method: 'GET',
  });
}

async function getRewardOrPunishById(params) {
  return request(`/api/smart-site/reward-or-punish/${params.id}`, {
    method: 'GET',
  });
}

export default {
  addRewardOrPunish,
  deleteRewardOrPunishById,
  editRewardOrPunishById,
  auditRewardOrPunishById,
  getRewardOrPunishPage,
  getRewardOrPunishList,
  getRewardOrPunishById,
};
