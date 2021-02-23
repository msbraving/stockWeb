import post from '../config/post'
import fetch from '../config/fetch'

// 获取列表
const categoryListUrl = '/product/hCategory/list';

const categoryTreeListUrl = '/product/category/treeList';

const parentCategoryListUrl = '/product/hCategory/parentList';

const saveCategoryUrl = '/product/hCategory/save';

const editCategoryUrl = '/product/hCategory/edit';

const delCategoryUrl = '/product/hCategory/del';

const categoryList = (params, successCallback, failCallback) => post(categoryListUrl, params, successCallback, failCallback)

const treeList = (params, successCallback, failCallback) => post(categoryTreeListUrl, params, successCallback, failCallback)

const parentCategoryList = (params, successCallback, failCallback) => post(parentCategoryListUrl, params, successCallback, failCallback)

const saveCategory = (params, successCallback, failCallback) => post(saveCategoryUrl, params, successCallback, failCallback)

const editCategory = (params, successCallback, failCallback) => post(editCategoryUrl, params, successCallback, failCallback)

const delCategory = (params, successCallback, failCallback) => fetch('GET', delCategoryUrl, params, successCallback, failCallback)

export {
  categoryList,
  parentCategoryList,
  saveCategory,
  editCategory,
  delCategory,
  treeList
}
