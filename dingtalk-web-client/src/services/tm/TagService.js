import { stringify } from 'qs';
import request from './../../utils/HttpInvoker';

async function addTaskTag(params) {
  return request(`/api/tm/task-tag`, {
    method: 'POST',
    body : params
  });
}

async function editTaskTag(params) {
  return request(`/api/tm/task-tag/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

async function deleteTaskTagById(params) {
  return request(`/api/tm/task-tag/${params.id}`, {
    method: 'DELETE',
  });
}

async function findTaskTagById(params) {
  return request(`/api/tm/task-tag/${params.id}`, {
    method: 'GET',
  });
}

async function findTaskTagList(params) {
  return request(`/api/tm/task-tag/list?${stringify(params)}`, {
    method: 'GET',
  });
}

export default {
  addTaskTag,
  editTaskTag,
  deleteTaskTagById,
  findTaskTagById,
  findTaskTagList
}
