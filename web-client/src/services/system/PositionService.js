import { stringify } from 'qs';
import request from './../../utils/HttpInvoker';

async function addPosition(params) {
  return request('/api/system/position', {
    method: 'POST',
    body: params,
  });
}

async function editPosition(params) {
  return request(`/api/system/position/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

async function deletePositionById(params) {
  return request(`/api/system/position/${params.id}`, {
    method: 'DELETE',
  });
}

async function findPositionById(params) {
  return request(`/api/system/position/${params.id}`, {
    method: 'GET',
  });
}

async function findPositionList(params) {
  return request(`/api/system/position/list?${stringify(params)}`, {
    method: 'GET',
  });
}

async function findPositionPage(params) {
  return request(`/api/system/position/page?${stringify(params)}`, {
    method: 'GET',
  });
}

export default {
  addPosition,
  editPosition,
  deletePositionById,
  findPositionById,
  findPositionList,
  findPositionPage,
};
