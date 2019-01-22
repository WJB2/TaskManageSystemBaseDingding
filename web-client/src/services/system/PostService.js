import { stringify } from 'qs';
import request from './../../utils/HttpInvoker';

async function addPost(params) {
  return request('/api/system/post', {
    method: 'POST',
    body: params,
  });
}

async function editPost(params) {
  return request(`/api/system/post/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

async function deletePostById(params) {
  return request(`/api/system/post/${params.id}`, {
    method: 'DELETE',
  });
}

async function findPostById(params) {
  return request(`/api/system/post/${params.id}`, {
    method: 'GET',
  });
}

async function findPostList(params) {
  return request(`/api/system/post/list?${stringify(params)}`, {
    method: 'GET',
  });
}

async function findPostPage(params) {
  return request(`/api/system/post/page?${stringify(params)}`, {
    method: 'GET',
  });
}

async function findPostTree(params) {
  return request(`/api/system/post/tree?${stringify(params)}`, {
    method: 'GET',
  });
}

export default {
  addPost,
  editPost,
  deletePostById,
  findPostById,
  findPostList,
  findPostPage,
  findPostTree,
};
