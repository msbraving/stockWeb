// 获取参数
const GetUrlParam = (name, url) => {
  if (!url) url = window.location.search
  if (url) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    if (url.split('?').length > 1) {
      var r = url.split('?')[1].match(reg)
      if (r != null) return unescape(r[2])
    }
    return ''
  }
  return null
}
// 读取cookie
const GetCookie = (name) => {
  var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  var arr = document.cookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  } else {
    return ''
  }
}
const setCookie = (name, value, days, firstDomain) => {
  var expire = new Date()
  name = name || 'true'
  days = days || 30
  if (days < 0) {
    expire.setTime(expire.getTime() - 1000)
  } else {
    expire.setTime(expire.getTime() + days * 24 * 60 * 60 * 1000)
  }
  if (firstDomain) {
    document.cookie = name + '=' + escape(value) + ';expires=' + expire.toGMTString() + ';path=/' + ';domain=wxrrd.com'
  } else {
    document.cookie = name + '=' + escape(value) + ';expires=' + expire.toGMTString()
  }
}
// 获取参数
const GetRequest = () => {
  var url = location.href // 获取url中'?'符后的字串
  url = url.substring(url.indexOf('?'), url.length)
  var theRequest = {}
  if (url.indexOf('?') !== -1) {
    var str = url.substr(1)
    var strs = str.split('&')
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
    }
  }
  return theRequest
}
// 格式化 hex 颜色值
const parseColor = (hexStr) => {
  if (hexStr.length === 4) {
    hexStr = '#' + hexStr[1] + hexStr[1] + hexStr[2] + hexStr[2] + hexStr[3] + hexStr[3]
  }
  return hexStr
}
var cloneObj = function (obj) {
  var newObj = {};
  if (obj instanceof Array) {
    newObj = [];
  }
  for (var key in obj) {
    var val = obj[key];
    newObj[key] = typeof val === 'object' ? cloneObj(val) : val;
  }
  return newObj;
};
export {
  GetCookie, GetUrlParam, setCookie, GetRequest, parseColor, cloneObj
    // hexToRgb
}
