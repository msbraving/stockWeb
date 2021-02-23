import post from '../config/post'
import fetch from '../config/fetch'

const getCartGroupsUrl = '/order/cart/getCartGroups';
const addQtyUrl = '/order/cart/addQty';
const delUrl = '/order/cart/del';
const delBatchUrl = '/order/cart/delBatch';
const buyNowUrl = '/order/mall/reqOrder/buyNow';

const getCartGroups = (params, successCallback, failCallback) => fetch('GET', getCartGroupsUrl, params, successCallback, failCallback)
const addQty = (params, successCallback, failCallback) => fetch('GET', addQtyUrl, params, successCallback, failCallback)
const del = (params, successCallback, failCallback) => fetch('GET', delUrl, params, successCallback, failCallback)
const delBatch = (params, successCallback, failCallback) => post( delBatchUrl, params, successCallback, failCallback)
const buyNow = (params, successCallback, failCallback) => post( buyNowUrl, params, successCallback, failCallback)

export {
  getCartGroups,
  addQty,
  del,
  delBatch,
  buyNow
}
