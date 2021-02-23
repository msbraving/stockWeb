import post from '../config/post'
import fetch from '../config/fetch'

// 获取列表
const reqOrderListUrl = '/order/reqOrder/esList';
// 需求单详情
const reqOrderDetailUrl = '/order/reqOrder/detail';
//获取字典值
const getFlexValuelistUrl = '/system/new-flex-value/flexValuelistByCode';
//获取字典值
const getFlexValuetByIdUrl = '/system/new-flex-value/flexValuetById';
//审核通过
const approvedUrl = '/order/reqOrder/audit/approved';
//审核拒绝
const rejectUrl = '/order/reqOrder/audit/reject';

const reqOrderList = (params, successCallback, failCallback) => post(reqOrderListUrl, params, successCallback, failCallback)
const reqOrderDetail = (params, successCallback, failCallback) => fetch('GET', reqOrderDetailUrl, params, successCallback, failCallback)
const flexValuelist = (params, successCallback, failCallback) => fetch('GET', getFlexValuelistUrl, params, successCallback, failCallback)
const flexValuetById = (params, successCallback, failCallback) => fetch('GET', getFlexValuetByIdUrl, params, successCallback, failCallback)
const approved = (params, successCallback, failCallback) => fetch('GET', approvedUrl, params, successCallback, failCallback)
const reject = (params, successCallback, failCallback) => fetch('GET', rejectUrl, params, successCallback, failCallback)

export {
  reqOrderList,
  reqOrderDetail,
  flexValuelist,
  flexValuetById,
  approved,
  reject
}
