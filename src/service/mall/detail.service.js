import post from '../config/post'
import fetch from '../config/fetch'

// 查询spu详情
const getSpuDetailUrl = '/product/hSpu/getSpuDetail';
const getSkuListUrl = '/product/hSku/getSkuList';
const getSkuDetailUrl = '/product/hSku/getSkuDetail';
const AggregationSkuUrl = '/product/hSku/AggregationSku';
const addCartUrl = '/order/cart/addCart';
const buyNowUrl = '/order/mall/reqOrder/buyNow';

const getSpuDetail = (params, successCallback, failCallback) => fetch('GET', getSpuDetailUrl, params, successCallback, failCallback)
const getSkuList = (params, successCallback, failCallback) => post(getSkuListUrl, params, successCallback, failCallback)
const getSkuDetail = (params, successCallback, failCallback) => fetch('GET', getSkuDetailUrl, params, successCallback, failCallback)
const AggregationSku = (params, successCallback, failCallback) => post( AggregationSkuUrl, params, successCallback, failCallback)
const addCart = (params, successCallback, failCallback) => post( addCartUrl, params, successCallback, failCallback)
const buyNow = (params, successCallback, failCallback) => post( buyNowUrl, params, successCallback, failCallback)


export {
  getSpuDetail,
  getSkuList,
  getSkuDetail,
  AggregationSku,
  addCart,
  buyNow
}
