import post from '../config/post'
import fetch from '../config/fetch'

// 按分类搜索
const productByCategoryUrl = '/product/hSpu/getProductByCategory';
// 按关键字搜索
const productByKeywordUrl = '/product/hSpu/getProductByKeyword';

const queryCategoryUrl = '/product/hSpu/getCategory';

const searchByCategory = (params, successCallback, failCallback) => fetch('GET', productByCategoryUrl, params, successCallback, failCallback)

const searchByKeyword = (params, successCallback, failCallback) => post(productByKeywordUrl, params, successCallback, failCallback)

const queryCategory = (params, successCallback, failCallback) => fetch('GET', queryCategoryUrl, params, successCallback, failCallback)

export {
  searchByCategory,
  searchByKeyword,
  queryCategory
}
