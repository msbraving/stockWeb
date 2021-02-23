import { baseUrl } from "./env";
import Vue from "vue";
import eventBus from "../../libs/event_bus";
import store from "../../store/index";
export default (
  url = "",
  data = {},
  successCallback = {},
  failCallback = {},
  method = "post"
) => {
  Vue.axios.head;

  // 白名单
  let config = {};
  if(url.indexOf('vendor/register') > -1){
    config = {
      headers: {}
    }
  }else{
    config = {
      headers: {
        Authorization: "Bearer " + JSON.parse(window.localStorage.getItem('store') || '{}').token
      }
    }
  }


  Vue.axios
    .post(baseUrl + url, data, config)
    .then(function(response) {
      if (response.status == 200) {
        if (successCallback && typeof successCallback === "function") {
          successCallback(response.data);
        }
      } else {
        if (failCallback && typeof failCallback === "function") {
          failCallback(response.data);
        }
      }
    })
    .catch(function(response) {
      if (response.response && response.response.status == 401) {
        eventBus.$emit("goToLogin");
      } else {
        if (
          failCallback &&
          typeof failCallback == "function" &&
          response.status
        ) {
          failCallback();
        }
      }
    });
};
