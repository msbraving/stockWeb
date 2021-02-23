import post from '../config/post'
import fetch from '../config/fetch'

// 获取列表
const bannerListUrl = '/product/banner/getAll';

const onSaleUpdateUrl = '/product/banner/update';

const saveBannerUrl = '/product/banner/save';

const editBannerUrl = '/product/banner/update';

const delBannerUrl = '/product/banner/del';

const bannerList = (params, successCallback, failCallback) => post(bannerListUrl, params, successCallback, failCallback)

const onSaleUpdate = (params, successCallback, failCallback) => post(onSaleUpdateUrl, params, successCallback, failCallback)

const editBanner = (params, successCallback, failCallback) => post(editBannerUrl, params, successCallback, failCallback)

const saveBanner = (params, successCallback, failCallback) => post(saveBannerUrl, params, successCallback, failCallback)

const delBanner = (params, successCallback, failCallback) => fetch('GET', delBannerUrl, params, successCallback, failCallback)

export {
  bannerList,
  onSaleUpdate,
  editBanner,
  saveBanner,
  delBanner
}
