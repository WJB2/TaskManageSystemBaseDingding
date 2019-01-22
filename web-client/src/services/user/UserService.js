import request from "../../utils/HttpInvoker";

async function editUserPassword(params) {
  return request(`/api/user/${params.userId}/password`, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

async function adminEditUserPassword(params) {
  return request(`/api/user/password`, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export default {
  editUserPassword,
  adminEditUserPassword,
};
