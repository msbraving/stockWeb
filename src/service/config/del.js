import { baseUrl } from './env'
import Vue from 'vue'
import eventBus from '../../libs/event_bus'
export default (url = '', data = {}, successCallback = {}, failCallback = {}, method = 'del') => {
  Vue.axios.delete(baseUrl + url, { params: data }).then(function (response) {
    if (response.status === 200) {
      if (successCallback && typeof successCallback === 'function') {
        successCallback(response.data)
      }
    } else {
      if (failCallback && typeof failCallback === 'function') {
        failCallback(response.data)
      }
    }
  }).catch(function (response) {
    if (response.response.status == 401) {
      eventBus.$emit('goToLogin');
    } else {
      if (failCallback && typeof failCallback == 'function') {
        failCallback()
      }
    }
  })
}
