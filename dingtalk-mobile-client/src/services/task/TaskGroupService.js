import { stringify } from 'qs';
import request from './../../utils/HttpInvoker';

async function addTaskGroup(params) {
  return request(`/api/tm/task-group`, {
    method: 'POST',
    body : params
  });
}

async function editTaskGroup(params) {
  return request(`/api/tm/task-group/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

async function deleteTaskGroupById(params) {
  return request(`/api/tm/task-group/${params.id}`, {
    method: 'DELETE',
  });
}

async function findTaskGroupById(params) {
  return request(`/api/tm/task-group/${params.id}`, {
    method: 'GET',
  });
}

async function findTaskGroupList(params) {
  return request(`/api/tm/task-group/list?${stringify(params)}`, {
    method: 'GET',
  });
}

export default {
  addTaskGroup,
  editTaskGroup,
  deleteTaskGroupById,
  findTaskGroupById,
  findTaskGroupList
}
