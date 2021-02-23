import post from '../config/post'
import fetch from '../config/fetch'

// 获取列表
const groupListUrl = '/system/group/list';
const addGroupUrl = '/system/group/add';
const editGroupUrl = '/system/group/edit';
const delGroupUrl = '/system/group/del';
const detailGroupUrl = '/system/group/detail';

const groupList = (params, successCallback, failCallback) => post(groupListUrl, params, successCallback, failCallback)
const addGroup = (params, successCallback, failCallback) => post(addGroupUrl, params, successCallback, failCallback)
const editGroup = (params, successCallback, failCallback) => post(editGroupUrl, params, successCallback, failCallback)
const delGroup = (params, successCallback, failCallback) => fetch( 'GET', delGroupUrl, params, successCallback, failCallback)
const detailGroup = (params, successCallback, failCallback) => fetch('GET', detailGroupUrl, params, successCallback, failCallback)


export {
  groupList,
  addGroup,
  editGroup,
  delGroup,
  detailGroup
}
