import { stringify } from 'qs';
import request from './../../utils/HttpInvoker';

async function addEmployee(params) {
  return request('/api/building-site/employee', {
    method: 'POST',
    body: params,
  });
}

async function importEmployee(params){
  return request('/api/building-site/employee/excel', {
    method: 'POST',
    multipartForm :true,
    body: params,
  });
}

async function editEmployee(params) {
  return request(`/api/building-site/employee/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

async function deleteEmployeeById(params) {
  return request(`/api/building-site/employee/${params.id}`, {
    method: 'DELETE',
  });
}

async function findEmployeeById(params) {
  return request(`/api/building-site/employee/${params.id}`, {
    method: 'GET',
  });
}

async function findEmployeeList(params) {
  return request(`/api/building-site/employee/list?${stringify(params)}`, {
    method: 'GET',
  });
}

async function findEmployeePage(params) {
  return request(`/api/building-site/employee/page?${stringify(params)}`, {
    method: 'GET',
  });
}

export default {
  addEmployee,
  importEmployee,
  editEmployee,
  deleteEmployeeById,
  findEmployeeById,
  findEmployeeList,
  findEmployeePage,
};
