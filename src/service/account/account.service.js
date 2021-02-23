import post from '../config/post'
// import put from '../config/put'
// import get from '../config/get'

// 获取列表
const searchHirerUrl = '/mkt/admin/searchHirer';
// 审批
const approveUrl = '/mkt/admin/approve';
// 租户禁用启用
const updateHirerStatusUrl = '/mkt/admin/updateHirerStatus';

// 员工管理-列表
const searchStaffUrl = '/mkt/admin/searchStaff';
// 员工所属店铺-列表
const getMktHirerIdsUrl = '/mkt/admin/getMktHirerIds';

const searchHirer = (params, successCallback, failCallback) => post(searchHirerUrl, params, successCallback, failCallback)
const approve = (params, successCallback, failCallback) => post(approveUrl, params, successCallback, failCallback)
const updateHirerStatus = (params, successCallback, failCallback) => post(updateHirerStatusUrl, params, successCallback, failCallback)
const searchStaff = (params, successCallback, failCallback) => post(searchStaffUrl, params, successCallback, failCallback)
const getMktHirerIds = (params, successCallback, failCallback) => post(getMktHirerIdsUrl, params, successCallback, failCallback)
export {
  searchHirer, approve, updateHirerStatus, searchStaff, getMktHirerIds
}
