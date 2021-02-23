import get from './config/get'
import post from './config/post'

// 获取上传token
const getUploadTokenUrl = '/attachment/qiniu_token'

// 获取自定义图片列表
const getImgListUrl = '/attachment/attachment.json'

// 获取自定义图片分组
const getGroupsUrl = '/attachment/group.json'

// 获取系统图片列表
const getSystemImgListUrl = '/admin/material/getlist.json'

// 获取系统图片分组
const getSystemGroupsUrl = '/admin/material/getgroup.json'

// 文件上传
const updateFileUrl = '/attachment/attachmentupload.json'

const getUploadToken = (successCallback) => get(getUploadTokenUrl, {}, successCallback)

const getImgList = (params, successCallback) => get(getImgListUrl, params, successCallback)

const getGroups = (params, successCallback) => get(getGroupsUrl, params, successCallback)

const getSystemImgList = (params, successCallback) => get(getSystemImgListUrl, params, successCallback)

const getSystemGroups = (params, successCallback) => get(getSystemGroupsUrl, params, successCallback)

const updateFile = (params, successCallback) => post(
  updateFileUrl,
  params,
  successCallback
)

export {
  getUploadToken, getImgList, getGroups, updateFile, getSystemImgList, getSystemGroups
}
