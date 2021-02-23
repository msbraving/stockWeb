import post from '../config/post'
import fetch from '../config/fetch'

const buyNowUrl = '/order/mall/reqOrder/buyNow';
const commitReqOrderUrl = '/order/mall/reqOrder/commitReqOrder';
const addAddressUrl = '/order/address/addAddress';
const getAllAreaUrl = '/order/address/getAllArea';
const updateUrl = '/order/address/update';
const delUrl = '/order/address/del';
const setDefaultUrl = '/order/address/setDefault';
const dListUrl = '/product/bdgt/dList';
const pListUrl = '/product/bdgt/pList ';
const mapInfoListUrl = '/product/bdgt/getMapInfoList';
const getFlexByCodeUrl = '/system/new-flex-value/getFlexByCode';

const buyNow = (params, successCallback, failCallback) => post( buyNowUrl, params, successCallback, failCallback)
const commitReqOrder = (params, successCallback, failCallback) => post( commitReqOrderUrl, params, successCallback, failCallback)
const addAddress = (params, successCallback, failCallback) => post( addAddressUrl, params, successCallback, failCallback)
const getAllArea = (params, successCallback, failCallback) => post( getAllAreaUrl, params, successCallback, failCallback)
const update = (params, successCallback, failCallback) => post( updateUrl, params, successCallback, failCallback)
const del = (params, successCallback, failCallback) => fetch('GET', delUrl, params, successCallback, failCallback)
const setDefault = (params, successCallback, failCallback) => fetch('GET', setDefaultUrl, params, successCallback, failCallback)
const dList = (params, successCallback, failCallback) => post( dListUrl, params, successCallback, failCallback)
const pList = (params, successCallback, failCallback) => post( pListUrl, params, successCallback, failCallback)
const mapInfoList = (params, successCallback, failCallback) => post( mapInfoListUrl, params, successCallback, failCallback)
const getFlexByCode = (params, successCallback, failCallback) => fetch('GET', getFlexByCodeUrl, params, successCallback, failCallback)

export {
  buyNow,
  commitReqOrder,
  addAddress,
  getAllArea,
  update,
  del,
  setDefault,
  dList,
  pList,
  mapInfoList,
  getFlexByCode
}
