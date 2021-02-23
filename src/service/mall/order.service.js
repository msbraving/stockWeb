import post from '../config/post'
import fetch from '../config/fetch'

const esListUrl = '/order/mall/reqOrder/esList';
const getOrderDetailUrl = '/order/mall/poOrder/getOrderDetail';
const detailUrl = '/order/mall/reqOrder/detail';
const getOrderListUrl = '/order/mall/poOrder/getOrderList';
const reqgroupCountUrl = '/order/mall/reqOrder/groupCount';
const pogroupCountUrl = '/order/mall/poOrder/groupCount';


const esList = (params, successCallback, failCallback) => post( esListUrl, params, successCallback, failCallback)
const detail = (params, successCallback, failCallback) => fetch('GET', detailUrl, params, successCallback, failCallback)
const getOrderDetail = (params, successCallback, failCallback) => fetch('GET', getOrderDetailUrl, params, successCallback, failCallback)
const getOrderList = (params, successCallback, failCallback) => post( getOrderListUrl, params, successCallback, failCallback)
const reqGroupCount = (params, successCallback, failCallback) => post( reqgroupCountUrl, params, successCallback, failCallback)
const poGroupCount = (params, successCallback, failCallback) => post( pogroupCountUrl, params, successCallback, failCallback)

export {
  esList,
  detail,
  getOrderDetail,
  getOrderList,
  reqGroupCount,
  poGroupCount
}
