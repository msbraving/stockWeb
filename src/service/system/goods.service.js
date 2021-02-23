import post from '../config/post'
import fetch from '../config/fetch'

// 获取列表
const categoryListUrl = '/product/category/list';

const parentCategoryListUrl = '/product/category/parentList';

const saveCategoryUrl = '/product/category/save';

const editCategoryUrl = '/product/category/edit';

const delCategoryUrl = '/product/category/del';

const attrListUrl = '/product/category/attrListByCategoryId';

const categoryList = (params, successCallback, failCallback) => post(categoryListUrl, params, successCallback, failCallback)

const parentCategoryList = (params, successCallback, failCallback) => post(parentCategoryListUrl, params, successCallback, failCallback)

const saveCategory = (params, successCallback, failCallback) => post(saveCategoryUrl, params, successCallback, failCallback)

const editCategory = (params, successCallback, failCallback) => post(editCategoryUrl, params, successCallback, failCallback)

const delCategory = (params, successCallback, failCallback) => fetch('GET', delCategoryUrl, params, successCallback, failCallback)

const attrList = (params, successCallback, failCallback) => fetch('GET', attrListUrl, params, successCallback, failCallback)

export {
  categoryList,
  parentCategoryList,
  saveCategory,
  editCategory,
  delCategory,
  attrList
}
