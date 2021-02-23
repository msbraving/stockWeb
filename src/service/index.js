import get from './config/get'
import fetch from './config/fetch'

const getUserMenuUrl = '/system/menu/getUserMenu'
const getUserMenu = (params, successCallback, failCallback) => fetch('GET', getUserMenuUrl, params, successCallback, failCallback)

export {
  getUserMenu
}
