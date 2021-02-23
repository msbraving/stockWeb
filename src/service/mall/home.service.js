import post from '../config/post'
import fetch from '../config/fetch'

// 获取列表
const mallUrl = '/product/main/mall';
// 首页楼层
const storeyListUrl = '/product/regionProduct/getProduct';
// 查询子分类
const getChildCategoryUrl = '/product/main/getCategory';

//查询购物车
const cartCountUrl = '/order/cart/getCartCount';
//查询用户
const getUserUrl = '/product/main/getUser';

const mall = (params, successCallback, failCallback) => fetch('GET', mallUrl, params, successCallback, failCallback)

const storeyList = (params, successCallback, failCallback) => fetch('GET', storeyListUrl, params, successCallback, failCallback)

const getChildCategory = (params, successCallback, failCallback) => post(getChildCategoryUrl, params, successCallback, failCallback)

const cartCount = (params, successCallback, failCallback) => fetch('GET', cartCountUrl, params, successCallback, failCallback)
const getUser = (params, successCallback, failCallback) => fetch('GET', getUserUrl, params, successCallback, failCallback)

export {
  mall,
  getChildCategory,
  storeyList,
  cartCount,
  getUser
}
