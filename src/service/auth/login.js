import fetch from "../config/fetch";
import post from "../config/post";
import put from "../config/put";
import get from "../config/get";

// 商家登录
const loginUrl = "/oauth/token";
// // 图形验证码
// const getAuthCodeUrl = '/captcha?'
// // 修改商家登录密码
// const resetPwdUrl = '/admin/auth/resetpwd'
// // 获取短信验证码
// const getSMSCodeUrl = '/admin/auth/send_verfity_message.json'
// 登出
const logoutUrl = "/mkt/admin/logout";

const login = (params, successCallback, failCallback) => fetch("GET", loginUrl, params, successCallback, failCallback);
// const getAuthCode = (mathNo, successCallback, failCallback) => fetch('GET', getAuthCodeUrl + mathNo, {}, successCallback, failCallback)
// const resetPwd = (params, successCallback, failCallback) => put(resetPwdUrl, params, successCallback, failCallback)
// const getSMSCode = (params, successCallback, failCallback) => fetch('GET', getSMSCodeUrl, params, successCallback, failCallback)
const logout = (successCallback, failCallback) =>
  fetch("POST", logoutUrl, {}, successCallback, failCallback);

export { login, logout };
