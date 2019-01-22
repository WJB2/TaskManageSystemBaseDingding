import request from './../../utils/HttpInvoker';

async function login(params) {
  return request('/api/authentication/session', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

async function logout() {
  return request('/api/authentication/session', {
    method: 'DELETE',
  });
}

async function getCurrentUser() {
  return request('/api/authentication/session/user', {
    method: 'GET',
  });
}

export default {
  login,
  logout,
  getCurrentUser,
};
