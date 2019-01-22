import { stringify } from 'qs';
import request from './../../utils/HttpInvoker';

async function addProject(params) {
  return request(`/api/tm/project`, {
    method: 'POST',
    body : params
  });
}

async function editProject(params) {
  return request(`/api/tm/project/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

async function deleteProjectById(params) {
  return request(`/api/tm/project/${params.id}`, {
    method: 'DELETE',
  });
}

async function deleteProjectById(params) {
  return request(`/api/tm/project/${params.id}`, {
    method: 'DELETE',
  });
}

async function findProjectById(params) {
  return request(`/api/tm/project/${params.id}`, {
    method: 'GET',
  });
}

async function findProjectList(params) {
  return request(`/api/tm/project/list?${stringify(params)}`, {
    method: 'GET',
  });
}

async function findProjectPage(params) {
  return request(`/api/tm/project/page?${stringify(params)}`, {
    method: 'GET',
  });
}

export default {
  addProject,
  editProject,
  deleteProjectById,
  findProjectById,
  findProjectList,
  findProjectPage
}
