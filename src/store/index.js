import Vue from "vue";
import Vuex from "vuex";
import actions from "./action";
import { imgBaseUrl, sourceUrl } from "../service/config/env";
Vue.use(Vuex);

const state = {
  imgBaseUrl: imgBaseUrl,
  sourceUrl: sourceUrl,
  GLOBAL: {},
  imgBaseUrl: "https://xcx.wrcdn.com/"
};
const getters = {};
const mutations = {};

mutations["GLOBAL"] = function(state, object) {
  state.GLOBAL = object;
  // console.log(state.GLOBAL);
};
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
