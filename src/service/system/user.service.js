import post from '../config/post'
// import put from '../config/put'
import fetch from '../config/fetch'

// 获取列表
const menuListUrl = '/system/user/list';
const addUserUrl = '/system/user/add';
const editUserUrl = '/system/user/edit';
const delUserUrl = '/system/user/del';
const detailUserUrl = '/system/user/detail';
const resetUserUrl = '/system/user/resetPassword';

const userList = (params, successCallback, failCallback) => post(menuListUrl, params, successCallback, failCallback)
const addUser = (params, successCallback, failCallback) => post(addUserUrl, params, successCallback, failCallback)
const editUser = (params, successCallback, failCallback) => post(editUserUrl, params, successCallback, failCallback)
const delUser = (params, successCallback, failCallback) => fetch('GET', delUserUrl, params, successCallback, failCallback)
const detailUser = (params, successCallback, failCallback) => fetch('GET', detailUserUrl, params, successCallback, failCallback)
const resetUser = (params, successCallback, failCallback) => fetch('GET', resetUserUrl, params, successCallback, failCallback)

export {
  userList, 
  addUser,
  editUser,
  delUser,
  detailUser,
  resetUser
}
