import { stringify } from 'qs';
import request from './../../utils/HttpInvoker';

async function addMenu(params) {
  return request('/api/global/menu', {
    method: 'POST',
    body: params,
  });
}

async function editMenu(params) {
  return request('/api/global/menu', {
    method: 'PUT',
    body: params,
  });
}

async function deleteMenuById(id) {
  return request(`/api/global/menu${id}`, {
    method: 'DELETE',
  });
}

async function findMenuList(params) {
  return request(`/api/global/menu/list${stringify(params)}`, {
    method: 'GET',
  });
}

async function findMenuPage(params) {
  return request(`/api/global/menu/page${stringify(params)}`, {
    method: 'GET',
  });
}

async function findMenuTree(params) {
  return request(`/api/global/menu/tree${stringify(params)}`, {
    method: 'GET',
  });
}

export default {
  addMenu,
  editMenu,
  deleteMenuById,
  findMenuList,
  findMenuPage,
  findMenuTree,
};
