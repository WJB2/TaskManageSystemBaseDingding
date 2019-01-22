import { stringify } from 'qs';
import request from './../../utils/HttpInvoker';

async function addBuildingDeveloper(params) {
  return request('/api/building-site/building-developer', {
    method: 'POST',
    body: params,
  });
}

async function editBuildingDeveloper(params) {
  return request(`/api/building-site/building-developer/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

async function deleteBuildingDeveloperById(params) {
  return request(`/api/building-site/building-developer/${params.id}`, {
    method: 'DELETE',
  });
}

async function findBuildingDeveloperById(params) {
  return request(`/api/building-site/building-developer/${params.id}`, {
    method: 'GET',
  });
}

async function findBuildingDeveloperList(params) {
  return request(`/api/building-site/building-developer/list?${stringify(params)}`, {
    method: 'GET',
  });
}

async function findBuildingDeveloperPage(params) {
  return request(`/api/building-site/building-developer/page?${stringify(params)}`, {
    method: 'GET',
  });
}

export default {
  addBuildingDeveloper,
  editBuildingDeveloper,
  deleteBuildingDeveloperById,
  findBuildingDeveloperById,
  findBuildingDeveloperList,
  findBuildingDeveloperPage,
};
