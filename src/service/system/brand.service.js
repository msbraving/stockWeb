import post from '../config/post'
import fetch from '../config/fetch'

// 获取列表
const brandListUrl = '/product/brand/list';

const saveBrandUrl = '/product/brand/save';

const editBrandUrl = '/product/brand/edit';

const delBrandUrl = '/product/brand/del';

const brandList = (params, successCallback, failCallback) => post(brandListUrl, params, successCallback, failCallback)

const editBrand = (params, successCallback, failCallback) => post(editBrandUrl, params, successCallback, failCallback)

const saveBrand = (params, successCallback, failCallback) => post(saveBrandUrl, params, successCallback, failCallback)

const delBrand = (params, successCallback, failCallback) => fetch('GET', delBrandUrl, params, successCallback, failCallback)

export {
  brandList,
  editBrand,
  saveBrand,
  delBrand
}
