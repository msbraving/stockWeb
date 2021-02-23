import post from '../config/post'
// import put from '../config/put'
import fetch from '../config/fetch'

// 获取列表
const companyListUrl = '/system/company/list';
const addCompanyUrl = '/system/company/add';
const editCompanyUrl = '/system/company/edit';
const delCompanyUrl = '/system/company/del';
const detailCompanyUrl = '/system/company/detail';

const companyList = (params, successCallback, failCallback) => post(companyListUrl, params, successCallback, failCallback)
const addCompany = (params, successCallback, failCallback) => post(addCompanyUrl, params, successCallback, failCallback)
const editCompany = (params, successCallback, failCallback) => post(editCompanyUrl, params, successCallback, failCallback)
const delCompany = (params, successCallback, failCallback) => fetch( 'GET', delCompanyUrl, params, successCallback, failCallback)
const detailCompany = (params, successCallback, failCallback) => fetch('GET', detailCompanyUrl, params, successCallback, failCallback)


export {
  companyList,
  addCompany,
  editCompany,
  delCompany,
  detailCompany
}
