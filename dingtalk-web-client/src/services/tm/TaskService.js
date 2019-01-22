import { stringify } from 'qs';
import request from './../../utils/HttpInvoker';

async function addTask(params) {
  return request(`/api/tm/task`, {
    method: 'POST',
    body : params
  });
}

async function editTask(params) {
  return request(`/api/tm/task/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

async function editTaskBonusPoints(params) {
  return request(`/api/tm/task/bonus-points/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

async function deleteTaskById(params) {
  return request(`/api/tm/task/${params.id}`, {
    method: 'DELETE',
  });
}

async function notificationTaskById(params) {
  return request(`/api/tm/task/notification/${params.id}`, {
    method: 'POST',
  });
}

async function completeTaskById(params) {
  return request(`/api/tm/task/complete/${params.id}`, {
    method: 'POST',
  });
}

async function restartTaskById(params) {
  return request(`/api/tm/task/restart/${params.id}`, {
    method: 'POST',
  });
}

async function suspendTaskById(params) {
  return request(`/api/tm/task/suspend/${params.id}`, {
    method: 'POST',
  });
}

async function markTaskUnreachableById(params) {
  return request(`/api/tm/task/unreachable/${params.taskId}`, {
    method: 'POST',
    body: params
  });
}

async function markTaskReachableById(params) {
  return request(`/api/tm/task/reachable/${params.taskId}`, {
    method: 'POST',
    body: params
  });
}

async function resumeTaskById(params) {
  return request(`/api/tm/task/resume/${params.id}`, {
    method: 'POST',
  });
}

async function auditTaskById(params) {
  return request(`/api/tm/task/audit/${params.id}`, {
    method: 'POST',
  });
}

async function revokeAuditTaskById(params) {
  return request(`/api/tm/task/revoke-audit/${params.id}`, {
    method: 'POST',
  });
}

async function archiveTaskById(params) {
  return request(`/api/tm/task/archive/${params.id}`, {
    method: 'POST',
  });
}

async function unarchiveTaskById(params) {
  return request(`/api/tm/task/unarchive/${params.id}`, {
    method: 'POST',
  });
}

async function commentTaskById(params) {
  return request(`/api/tm/task/${params.taskId}/comment`, {
    method: 'POST',
    body: params,
  });
}

async function editTaskGroupById(params) {
  return request(`/api/tm/task/${params.taskId}/group`, {
    method: 'POST',
    body: params,
  });
}

async function findTaskById(params) {
  return request(`/api/tm/task/${params.id}`, {
    method: 'GET',
  });
}

async function findTaskList(params) {
  return request(`/api/tm/task/list?${stringify(params,  { arrayFormat: 'repeat' })}`, {
    method: 'GET',
  });
}

async function findTaskPage(params) {
  return request(`/api/tm/task/page?${stringify(params,  { arrayFormat: 'repeat' })}`, {
    method: 'GET',
  });
}

async function countsOwnerTask(params) {
  return request(`/api/tm/task/owner-${params.staffId}/count`, {
    method: 'GET',
  });
}

async function countsAssigneeTask(params) {
  return request(`/api/tm/task/assignee-${params.staffId}/count`, {
    method: 'GET',
  });
}

async function countsSupervisorTask(params) {
  return request(`/api/tm/task/supervisor-${params.staffId}/count`, {
    method: 'GET',
  });
}

async function countsParticipatorTask(params) {
  return request(`/api/tm/task/participator-${params.staffId}/count`, {
    method: 'GET',
  });
}

async function countStaffCompletedTask(params) {
  return request(`/api/tm/task/assignee-${params.staffId}/completed`, {
    method: 'GET',
  });
}

async function findStaffTaskBounsPoints(params) {
  return request(`/api/tm/task/assignee-${params.staffId}/bouns-point?${stringify(params,  { arrayFormat: 'repeat' })}`, {
    method: 'GET',
  });
}

async function reportTaskByAssignee(params) {
  return request(`/api/tm/task/task-assignee-report?${stringify(params,  { arrayFormat: 'repeat' })}`, {
    method: 'GET',
  });
}

async function reportTaskByProject(params) {
  return request(`/api/tm/task/task-project-report?${stringify(params,  { arrayFormat: 'repeat' })}`, {
    method: 'GET',
  });
}

export default {
  addTask,
  editTask,
  editTaskBonusPoints,
  deleteTaskById,
  notificationTaskById,
  completeTaskById,
  restartTaskById,
  suspendTaskById,
  resumeTaskById,
  auditTaskById,
  revokeAuditTaskById,
  markTaskUnreachableById,
  markTaskReachableById,
  archiveTaskById,
  unarchiveTaskById,
  commentTaskById,
  editTaskGroupById,
  findTaskById,
  findTaskList,
  findTaskPage,
  countsOwnerTask,
  countsAssigneeTask,
  countsParticipatorTask,
  countsSupervisorTask,
  countStaffCompletedTask,
  findStaffTaskBounsPoints,
  reportTaskByAssignee,
  reportTaskByProject
}
