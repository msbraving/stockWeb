import post from '../config/post'
// import put from '../config/put'
import fetch from '../config/fetch'

// 获取列表
const tenantListUrl = '/system/tenant/list';
const addTenantUrl = '/system/tenant/add';
const editTenantUrl = '/system/tenant/edit';
const delTenantUrl = '/system/tenant/del';
const tenantmenuListUrl = '/system/menu/listAndSelected';
const saveTenantMenuUrl = '/system/tenantMenu/save';

const tenantList = (params, successCallback, failCallback) => post(tenantListUrl, params, successCallback, failCallback)
const addTenant = (params, successCallback, failCallback) => post(addTenantUrl, params, successCallback, failCallback)
const editTenant = (params, successCallback, failCallback) => post(editTenantUrl, params, successCallback, failCallback)
const tenantmenuList = (params, successCallback, failCallback) => post(tenantmenuListUrl, params, successCallback, failCallback)
const saveTenantMenu = (params, successCallback, failCallback) => post(saveTenantMenuUrl, params, successCallback, failCallback)
const delTenant = (params, successCallback, failCallback) => fetch('GET', delTenantUrl, params, successCallback, failCallback)


export {
  tenantList,
  addTenant,
  editTenant,
  delTenant,
  tenantmenuList,
  saveTenantMenu
}
