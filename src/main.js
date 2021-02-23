// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import iView from 'iview'
import ViewUI from 'view-design';
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import Vuex from 'vuex'
import store from './store/index'
import Routers from './router/index'
import echarts from 'echarts'
import VueQuillEditor from 'vue-quill-editor'
import eventBus from './libs/event_bus'
import moment from 'moment'; // 引入momentjs
import magnifier from './components/vue-magnifier'
import VueClipboard from 'vue-clipboard2'// 复制 https://github.com/Inndy/vue-clipboard2
// import {getMerchantInfo} from './service/main/main'
import {logout} from './service/auth/login' // 登出接口

// import 'iview/dist/styles/iview.css'
import 'view-design/dist/styles/iview.css';
import 'cropperjs/dist/cropper.min.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import './assets/css/index.css';

import * as custom from './filter/filter' // 引入过滤器
import util from './libs/util' // 引入全局方法

Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key]) // 注册全局过滤方法
})

Vue.prototype.$echarts = echarts
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(ViewUI)
Vue.use(VueQuillEditor)
Vue.use(magnifier)
Vue.use(util)
Vue.use(VueClipboard)
Object.defineProperty(Vue.prototype, '$moment', { value: moment });
// 路由配置
const RouterConfig = {
  mode: 'hash',
  // mode: 'history',
  routes: Routers
}

const router = new VueRouter(RouterConfig)

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
/* eslint-disable no-new */

let logOut = function () {
  store.dispatch('setGlobal', {})
  window.localStorage.setItem('store', {})
  window.localStorage.setItem('count', 0)
  router.push({name: 'login'})
  // logout((res) => {
  //   if (res.code == 200) {
  //     store.dispatch('setGlobal', {})
  //     // if (res.data && res.data.url) {
  //     //   location.href = res.data.url;
  //     // }
  //     router.push({name: 'login'})
  //   } else {
  //     ViewUI.Message.error(res.errmsg)
  //   }
  // }, () => {
  //   ViewUI.Message.error('网络繁忙,请稍后重试！');
  // })
}

router.beforeEach((to, from, next) => {
  ViewUI.LoadingBar.start();
    next();
  // if (to.path.indexOf('resetPwd') != -1 || to.path.indexOf('login') != -1) {
  //   next()
  // } else if (!store.state.GLOBAL.id) {
  //   console.log('beforeEach')
  //   getMerchantInfo((res) => {
  //     if (res.errcode == 0) {
  //       if (res.data.logo == '') {
  //         res.data.logo = '2018/6/5/dQZ6ApgXMdqeVYko01mvaiQPiUAk.png'
  //       }
  //       store.dispatch('setGlobal', res.data)
  //       iView.LoadingBar.start();
  //       next();
  //     } else {
  //       logOut();
  //       // next('/login')
  //     }
  //   }, () => {
  //     // next('/login')
  //     logOut();
  //   });
  // } else {
  //   ViewUI.LoadingBar.start();
  //   next();
  // }
})

router.afterEach((to, from, next) => {
  // store.commit('UPDATEROUTE', to)
  ViewUI.LoadingBar.finish()
  window.scrollTo(0, 0)
})

new Vue({
  router: router,
  render: h => h(App),
  store,
  mounted () {
    eventBus.$on('goToLogin', this.goToLogin);
  },
  methods: {
    goToLogin () {
      this.$store.dispatch('setGlobal', {});
      logOut();
      // this.$router.push({name: 'login'})
    }
  }
}).$mount('#app-box')
