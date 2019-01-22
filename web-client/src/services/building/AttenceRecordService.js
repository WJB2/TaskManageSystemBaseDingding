import { stringify } from 'qs';
import request from './../../utils/HttpInvoker';

async function findEmployeeForManualClocking() {
  return request(`/api/building/attence-record/manual-clocking-employee`, {
    method: 'GET',
  });
}

async  function clocking(params) {
  return request(`/api/building/attence-record/manual-clocking`, {
    method: 'POST',
    body : params
  });
}

async function findBuildingSiteWithCheckDetail(params){
  return request(`/api/building/attence-record/attence-detail?${stringify(params)}`, {
    method: 'GET'
  });
}

export default {
  findEmployeeForManualClocking,
  clocking,
  findBuildingSiteWithCheckDetail,
};
