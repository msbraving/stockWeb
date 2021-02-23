import { baseUrl } from './env'
import store from '../../store/index';
import eventBus from '../../libs/event_bus'

export default (type = 'GET', url = '', data = {}, successCallback = {}, failCallback = {}, method = 'fetch') => {
  type = type.toUpperCase()
  url = baseUrl + url
  if (type === 'GET') {
    let dataStr = '' // 数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&'
    })
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr
    }
  }
  let requestObj
  if (window.XMLHttpRequest) {
    requestObj = new XMLHttpRequest()
  } else {
    /* eslint-disable */
    requestObj = new ActiveXObject
    /* eslint-enable */
  }
  requestObj.open(type, url, true)
  let sendData = ''
  if (type === 'POST' || type === 'DELETE' || type === 'PUT') {
    sendData = JSON.stringify(data)
  }
  if (JSON.parse(window.localStorage.getItem('store') || '{}').token  && location.origin.indexOf('oauth/token') === -1  ){
    requestObj.setRequestHeader('Authorization', 'Bearer ' + JSON.parse(window.localStorage.getItem('store') || '{}').token)
  }
  requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  requestObj.send(sendData)
  requestObj.onreadystatechange = () => {
    if (requestObj.readyState === 4) {
      if (requestObj.status === 200) {
        let obj = requestObj.response
        if (obj && typeof obj !== 'object') {
          try {
            obj = JSON.parse(obj)
          } catch (e) {
            alert('网络异常，请稍后再试')
            obj = {}
          }
        }
        if (successCallback && typeof successCallback === 'function') {
          successCallback(obj)
        }
        return obj
      } else if (requestObj.status === 401) {
        eventBus.$emit('goToLogin');
      } else {
        throw new Error(requestObj)
      }
    }
  }
}
