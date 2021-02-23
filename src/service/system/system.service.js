import post from '../config/post'
// import put from '../config/put'
// import get from '../config/get'

// 获取列表
const tenantListUrl = 'system/tenant/list';

const tenantList = (params, successCallback, failCallback) => post(tenantListUrl, params, successCallback, failCallback)

export {
  tenantList, 
}
