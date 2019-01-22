import { stringify } from 'qs';
import request from './../../utils/HttpInvoker';

async function addWorkType(params) {
  return request('/api/building-site/work-type', {
    method: 'POST',
    body: params,
  });
}

async function editWorkType(params) {
  return request(`/api/building-site/work-type/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

async function deleteWorkTypeById(params) {
  return request(`/api/building-site/work-type/${params.id}`, {
    method: 'DELETE',
  });
}

async function findWorkTypeById(params) {
  return request(`/api/building-site/work-type/${params.id}`, {
    method: 'GET',
  });
}

async function findWorkTypeList(params) {
  return request(`/api/building-site/work-type/list?${stringify(params)}`, {
    method: 'GET',
  });
}

async function findWorkTypePage(params) {
  return request(`/api/building-site/work-type/page?${stringify(params)}`, {
    method: 'GET',
  });
}

export default {
  addWorkType,
  editWorkType,
  deleteWorkTypeById,
  findWorkTypeById,
  findWorkTypeList,
  findWorkTypePage,
};
