/**
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 */
var baseUrl;
let routerMode;
const imgBaseUrl = "";
const cdn = "";
const sourceUrl = "";
// 开发环境:
const devAddress = "http://51.qdxiaobao.com";
// 测试
const testAddress = "http://51.qdxiaobao.com";
// 线上
const lineAddress = "https://www.qdxiaobao.com";

let origin = location.origin;
console.log(origin);
if (
  origin &&
  origin.indexOf(devAddress) === -1 &&
  origin.indexOf(testAddress) === -1 &&
  origin.indexOf(lineAddress) === -1
) {
  baseUrl = location.origin + "/api";
  // baseUrl = location.origin
} else {
  baseUrl = origin;
}

export { baseUrl, routerMode, imgBaseUrl, sourceUrl, cdn };
