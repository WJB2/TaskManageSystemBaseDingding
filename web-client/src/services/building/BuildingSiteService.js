import { stringify } from 'qs';
import request from './../../utils/HttpInvoker';

async function addBuildingSite(params) {
  return request('/api/building-site/building-site', {
    method: 'POST',
    body: params,
  });
}

async function editBuildingSite(params) {
  return request(`/api/building-site/building-site/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

async function deleteBuildingSiteById(params) {
  return request(`/api/building-site/building-site/${params.id}`, {
    method: 'DELETE',
  });
}

async function findBuildingSiteById(params) {
  return request(`/api/building-site/building-site/${params.id}`, {
    method: 'GET',
  });
}

async function findBuildingSiteList(params) {
  return request(`/api/building-site/building-site/list?${stringify(params)}`, {
    method: 'GET',
  });
}

async function findBuildingSitePage(params) {
  return request(`/api/building-site/building-site/page?${stringify(params)}`, {
    method: 'GET',
  });
}

export default {
  addBuildingSite,
  editBuildingSite,
  deleteBuildingSiteById,
  findBuildingSiteById,
  findBuildingSiteList,
  findBuildingSitePage,
};
