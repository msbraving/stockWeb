import post from '../config/post'
import fetch from '../config/fetch'

// 获取列表
const bdgtListUrl = '/product/bdgt/mapInfoList'

const mapInfoListLogExportUrl = '/product/bdgt/mapInfoListExport';

const budgetDeptListUrl = '/product/bdgt/dList';

const budgetProjectListUrl = '/product/bdgt/pList';

const saveBdgtUrl = '/product/bdgt/save';

const delBdgtUrl = '/product/bdgt/del';

const bdgtList = (params, successCallback, failCallback) => post(bdgtListUrl, params, successCallback, failCallback)

const mapInfoListLogExport = (params, successCallback, failCallback) => post(mapInfoListLogExportUrl, params, successCallback, failCallback)

const budgetDeptList = (params, successCallback, failCallback) => post(budgetDeptListUrl, params, successCallback, failCallback)

const budgetProjectList = (params, successCallback, failCallback) => post(budgetProjectListUrl, params, successCallback, failCallback)

const saveBdgt = (params, successCallback, failCallback) => post(saveBdgtUrl, params, successCallback, failCallback)

const delBdgt = (params, successCallback, failCallback) => fetch('GET', delBdgtUrl, params, successCallback, failCallback)

export {
  bdgtList,
  mapInfoListLogExport,
  budgetDeptList,
  budgetProjectList,
  saveBdgt,
  delBdgt
}
