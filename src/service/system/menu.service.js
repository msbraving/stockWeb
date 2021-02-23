import post from '../config/post'
// import put from '../config/put'
import fetch from '../config/fetch'

// 获取列表
const menuListUrl = '/system/menu/list';
const rolepermissionListUrl = '/system/rolepermission/list';
const addMenuUrl = '/system/menu/add';
const editMenuUrl = '/system/menu/edit';
const delMenuUrl = '/system/menu/del';
const detailMenuUrl = '/system/menu/detail';
const childMenuUrl = '/system/menu/childList';

const menuList = (params, successCallback, failCallback) => post(menuListUrl, params, successCallback, failCallback)
const rolepermissionList = (params, successCallback, failCallback) => post(rolepermissionListUrl, params, successCallback, failCallback)
const addMenu = (params, successCallback, failCallback) => post(addMenuUrl, params, successCallback, failCallback)
const editMenu = (params, successCallback, failCallback) => post(editMenuUrl, params, successCallback, failCallback)
const delMenu = (params, successCallback, failCallback) => fetch('GET', delMenuUrl, params, successCallback, failCallback)
const detailMenu = (params, successCallback, failCallback) => fetch('GET', detailMenuUrl, params, successCallback, failCallback)
const childMenu = (params, successCallback, failCallback) => post(childMenuUrl, params, successCallback, failCallback)

export {
  menuList,
  rolepermissionList,
  addMenu,
  editMenu,
  delMenu,
  detailMenu,
  childMenu
}
