import post from '../config/post'
import fetch from '../config/fetch'

// 获取列表
const roleListUrl = '/system/role/list';
const addRoleUrl = '/system/role/add';
const editRoleUrl = '/system/role/edit';
const delRoleUrl = '/system/role/del';
const detailRoleUrl = '/system/role/detail';
const saveRolepermissionUrl = '/system/rolepermission/save';

const roleList = (params, successCallback, failCallback) => post(roleListUrl, params, successCallback, failCallback)
const addRole = (params, successCallback, failCallback) => post(addRoleUrl, params, successCallback, failCallback)
const editRole = (params, successCallback, failCallback) => post(editRoleUrl, params, successCallback, failCallback)
const saveRolepermission = (params, successCallback, failCallback) => post(saveRolepermissionUrl, params, successCallback, failCallback)
const delRole = (params, successCallback, failCallback) => fetch( 'GET', delRoleUrl, params, successCallback, failCallback)
const detailRole = (params, successCallback, failCallback) => fetch('GET', detailRoleUrl, params, successCallback, failCallback)


export {
  roleList,
  addRole,
  editRole,
  saveRolepermission,
  delRole,
  detailRole
}
