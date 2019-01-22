import { stringify } from 'qs';
import request from './../../utils/HttpInvoker';


async function addDevelopRewardOrPunish(params) {//增加奖惩信息
  return request('/api/smart-site/reward-or-punish', {
    method: 'POST',
    body: params,
  });
}

async function deleteDevelopRewardOrPunishById(params) {
  return request(`/api/smart-site/reward-or-punish/${params.id}`, {
    method: 'DELETE',
  });
}

async function editDevelopRewardOrPunishById(params) {
  return request(`/api/smart-site/reward-or-punish/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

async function auditDevelopRewardOrPunishById(params) {
  return request(`/api/smart-site/reward-or-punish/audit/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

async function getDevelopRewardOrPunishPage(params){
  return request(`/api/smart-site/reward-or-punish/page?${stringify(params)}`,{
    method:'GET',
  })
}


async function getDevelopRewardOrPunishList(params) {
  return request(`/api/smart-site/reward-or-punish/list?${stringify(params)}`, {
    method: 'GET',
  });
}

async function getDevelopRewardOrPunishById(params) {
  return request(`/api/smart-site/reward-or-punish/${params.id}`, {
    method: 'GET',
  });
}

export default {
  addDevelopRewardOrPunish,
  deleteDevelopRewardOrPunishById,
  editDevelopRewardOrPunishById,
  auditDevelopRewardOrPunishById,
  getDevelopRewardOrPunishPage,
  getDevelopRewardOrPunishList,
  getDevelopRewardOrPunishById,
};
