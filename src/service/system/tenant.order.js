import post from '../config/post'
import fetch from '../config/fetch'

// 获取列表
const orderListUrl = '/order/poOrder/esList';
const orderDetailUrl = '/order/poOrder/detail';
//获取字典值
const getFlexValuelistUrl = '/system/new-flex-value/flexValuelistByCode';
//获取字典值
const getFlexValuetByIdUrl = '/system/new-flex-value/flexValuetById';

const orderList = (params, successCallback, failCallback) => post(orderListUrl, params, successCallback, failCallback)
const orderDetail = (params, successCallback, failCallback) => fetch('GET', orderDetailUrl, params, successCallback, failCallback)
const flexValuelist = (params, successCallback, failCallback) => fetch('GET', getFlexValuelistUrl, params, successCallback, failCallback)
const flexValuetById = (params, successCallback, failCallback) => fetch('GET', getFlexValuetByIdUrl, params, successCallback, failCallback)

export {
  orderList,
  orderDetail,
  flexValuelist,
  flexValuetById
}
