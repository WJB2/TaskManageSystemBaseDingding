import { stringify } from 'qs';
import request from './../../utils/HttpInvoker';

async function addDeposit(params) {
  return request('/api/building-site/deposit-record', {
    method: 'POST',
    body: params,
  });
}

async function editDeposit(params) {
  return request(`/api/building-site/deposit/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

async function deleteDepositById(params) {
  return request(`/api/building-site/deposit/${params.id}`, {
    method: 'DELETE',
  });
}

async function findDepositById(params) {
  return request(`/api/building-site/deposit/${params.id}`, {
    method: 'GET',
  });
}

async function findDepositList(params) {
  return request(`/api/building-site/deposit/list?${stringify(params)}`, {
    method: 'GET',
  });
}

async function findDepositPage(params) {
  return request(`/api/building-site/deposit/page?${stringify(params)}`, {
    method: 'GET',
  });
}

async function findDepositRecordPage(params) {
  return request(`/api/building-site/deposit-record/page?${stringify(params)}`, {
    method: 'GET',
  });
}

export default {
  addDeposit,
  editDeposit,
  deleteDepositById,
  findDepositById,
  findDepositList,
  findDepositPage,
  findDepositRecordPage,
};
