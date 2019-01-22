import { stringify } from 'qs';
import request from './../../utils/HttpInvoker';

async function findTaskOperateLogList(params) {
  return request(`/api/tm/task-operate-log/list?${stringify(params)}`, {
    method: 'GET',
  });
}

async function findTaskOperateLogWithTaskList(params) {
  return request(`/api/tm/task-operate-log/detail/list?${stringify(params)}`, {
    method: 'GET',
  });
}

export default {
  findTaskOperateLogList,
  findTaskOperateLogWithTaskList
}
