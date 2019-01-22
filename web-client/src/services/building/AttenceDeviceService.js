import { stringify } from 'qs';
import request from './../../utils/HttpInvoker';

async function addAttenceDevice(params) {
  return request('/api/building-site/attence-device', {
    method: 'POST',
    body: params,
  });
}

async function editAttenceDevice(params) {
  return request(`/api/building-site/attence-device/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

async function deleteAttenceDeviceById(params) {
  return request(`/api/building-site/attence-device/${params.id}`, {
    method: 'DELETE',
  });
}

async function findAttenceDeviceById(params) {
  return request(`/api/building-site/attence-device/${params.id}`, {
    method: 'GET',
  });
}

async function findAttenceDeviceList(params) {
  return request(`/api/building-site/attence-device/list?${stringify(params)}`, {
    method: 'GET',
  });
}

async function findAttenceDevicePage(params) {
  return request(`/api/building-site/attence-device/page?${stringify(params)}`, {
    method: 'GET',
  });
}

export default {
  addAttenceDevice,
  editAttenceDevice,
  deleteAttenceDeviceById,
  findAttenceDeviceById,
  findAttenceDeviceList,
  findAttenceDevicePage,
};
