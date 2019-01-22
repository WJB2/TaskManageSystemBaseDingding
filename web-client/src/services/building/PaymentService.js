import { stringify } from 'qs';
import request from './../../utils/HttpInvoker';

async function addPayments(params){
  return request(`/api/building-site/payment`, {
    method: 'POST',
    multipartForm :true,
    body: params
  });
}
async function payoffPayments(params){
  return request(`/api/building-site/payment/payoff`, {
    method: 'POST',
    multipartForm :true,
    body: params
  });
}

async function findBuildingSitePaymentDetail(params){
  return request(`/api/building-site/payment-detail/list?${stringify(params)}`, {
    method: 'GET',
  });
}

async function findPaymentReport(params){
  return request(`/api/building-site/payment/report?${stringify(params)}`, {
    method: 'GET',
  });
}

export default {
  addPayments,
  payoffPayments,
  findBuildingSitePaymentDetail,
  findPaymentReport
}
