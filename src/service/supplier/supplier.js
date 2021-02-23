import get from "../config/get";
import fetch from "../config/fetch";
import post from "../config/post";
/* ----------------------------------注册---------------------------------------- */
// 发送短信验证码
const CSddeemnossUrl = "/vendor/sendSmsCode";
const CSddeemnoss = (params, successCallback, failCallback) =>
  get(CSddeemnossUrl, params, successCallback, failCallback);
// 验证短信验证码;
const checkCodeUrl = "/vendor/checkCode";
const checkCode = (params, successCallback, failCallback) =>
  get(checkCodeUrl, params, successCallback, failCallback);
// 注册;
const registerUrl = "/vendor/register";
const register = (params, successCallback, failCallback) =>
  post(registerUrl, params, successCallback, failCallback);
/* ----------------------------------供应商详情---------------------------------------- */
// 获取供应商详情
const vendorDetailUrl = "/vendor/getVendorDetail";
const getVendorDetail = (params, successCallback, failCallback) =>
  post(vendorDetailUrl, params, successCallback, failCallback);
// 获取供应商字典
const vendorFlexUrl = "/vendor/getVendorFlex";
const getVendorFlex = (params, successCallback, failCallback) =>
  post(vendorFlexUrl, params, successCallback, failCallback);
// 更新供应商信息
const updateVendorUrl = "/vendor/updateVendor";
const updateVendor = (params, successCallback, failCallback) =>
  post(updateVendorUrl, params, successCallback, failCallback);
/* ----------------------------------系统分类---------------------------------------- */
// 查询所有(树形结构)品类
const treeListUrl = "/product/category/treeList";
const getreeList = (params, successCallback, failCallback) =>
  post(treeListUrl, params, successCallback, failCallback);
// 分类id来获取属性
const attrListByCategoryIdUrl = "/product/category/attrListByCategoryId";
const getAttrListByCategoryId = (params, successCallback, failCallback) =>
  fetch("GET", attrListByCategoryIdUrl, params, successCallback, failCallback);
// 获取分类详细信息
const getCategoryDetailUrl = "/product/category/getCategoryDetail";
const getCategoryDetail = (params, successCallback, failCallback) =>
  fetch("GET", getCategoryDetailUrl, params, successCallback, failCallback);
/* ----------------------------------产品品牌---------------------------------------- */
// 查询品牌
const brandListAllUrl = "/product/brand/listAll"; //
const getBrandListALL = (params, successCallback, failCallback) =>
  post(brandListAllUrl, params, successCallback, failCallback);
/* ----------------------------------运费模板---------------------------------------- */
// 获取运费列表
const shipplingListUrl = "/product/shipping/getShipplingList";
const getShipplingList = (params, successCallback, failCallback) =>
  post(shipplingListUrl, params, successCallback, failCallback);
// 获取运费模板详情
const shipplingDetailUrl = "/product/shipping/getDetail";
const getShipplingDetail = (params, successCallback, failCallback) =>
  fetch("GET", shipplingDetailUrl, params, successCallback, failCallback);
// 新增运费模板
const saveShippingUrl = "/product/shipping/saveShipping";
const saveShipping = (params, successCallback, failCallback) =>
  post(saveShippingUrl, params, successCallback, failCallback);
// 删除运费
const deleteShippingUrl = "/product/shipping/deleteShipping";
const deleteShipping = (params, successCallback, failCallback) =>
  fetch("GET", deleteShippingUrl, params, successCallback, failCallback);
/* ----------------------------------供应商设置商品---------------------------------------- */
// 规格列表
const getSpecListUrl = "/product/PProduct/getSpecList";
const getSpecList = (params, successCallback, failCallback) =>
  post(getSpecListUrl, params, successCallback, failCallback);
// 新建产品
const saveProductUrl = "/product/PProduct/saveProduct";
const saveProduct = (params, successCallback, failCallback) =>
  post(saveProductUrl, params, successCallback, failCallback);
// 产品列表
const productListUrl = "/product/PProduct/getProductList";
const getProductList = (params, successCallback, failCallback) =>
  post(productListUrl, params, successCallback, failCallback);
// 产品详情
const productDetailUrl = "/product/PProduct/getProductDetail";
const getProductDetail = (params, successCallback, failCallback) =>
  fetch("get", productDetailUrl, params, successCallback, failCallback);
// 查询产品列表
const getSkuListUrl = "/product/PProduct/getSkuList";
const getSkuList = (params, successCallback, failCallback) =>
  post(getSkuListUrl, params, successCallback, failCallback);
/* ----------------------------------协议---------------------------------------- */
// 协议列表
const contractListUrl = "/vendor/contract/getContractList";
const getContractList = (params, successCallback, failCallback) =>
  post(contractListUrl, params, successCallback, failCallback);
// 协议详情
const contractDetailUrl = "/vendor/contract/getContractDetail";
const getContractDetail = (params, successCallback, failCallback) =>
  fetch("get", contractDetailUrl, params, successCallback, failCallback);
// 创建协议
const createContractUrl = "/vendor/contract/createContract";
const createContract = (params, successCallback, failCallback) =>
  post(createContractUrl, params, successCallback, failCallback);
// 查询待审批合同
const applyContractListUrl = "/vendor/contract/getApplyContractList";
const getApplyContractList = (params, successCallback, failCallback) =>
  post(applyContractListUrl, params, successCallback, failCallback);
// 协议审批
const contractApplyUrl = "/product/contract/contractApply";
const contractApply = (params, successCallback, failCallback) =>
  post(contractApplyUrl, params, successCallback, failCallback);
/* ----------------------------------租户---------------------------------------- */
// 租户列表查询
const tenantListUrl = "/system/tenant/list";
const tenantList = (params, successCallback, failCallback) =>
  post(tenantListUrl, params, successCallback, failCallback);
// 查询采购员
const buyerListUrl = "/system/tenant/getBuyerList";
const getBuyerList = (params, successCallback, failCallback) =>
  fetch("get", buyerListUrl, params, successCallback, failCallback);
/* ----------------------------------租户spu---------------------------------------- */
// 查询产品库SPU列表-后台
const getSpuListUrl = "/product/hSpu/getSpuList;";
const getSpuList = (params, successCallback, failCallback) =>
  post(getSpuListUrl, params, successCallback, failCallback);
// 查询产品库SKU列表-后台
const gethSkuListUrl = "/product/hSpu/getSkuList;";
const getHSkuList = (params, successCallback, failCallback) =>
  post(gethSkuListUrl, params, successCallback, failCallback);
// 产品库上下架-后台
const changeIsOnlineUrl = "/product/hSpu/changeIsOnline;";
const changeIsOnline = (params, successCallback, failCallback) =>
  post(changeIsOnlineUrl, params, successCallback, failCallback);
export {
  CSddeemnoss,
  checkCode,
  register,
  getVendorDetail,
  getVendorFlex,
  updateVendor,
  getreeList,
  getAttrListByCategoryId,
  getCategoryDetail,
  getBrandListALL,
  getShipplingList,
  getShipplingDetail,
  saveShipping,
  deleteShipping,
  getSpecList,
  saveProduct,
  getProductList,
  getProductDetail,
  getSkuList,
  getContractList,
  getContractDetail,
  createContract,
  getApplyContractList,
  contractApply,
  tenantList,
  getBuyerList,
  getSpuList,
  getHSkuList,
  changeIsOnline
};
