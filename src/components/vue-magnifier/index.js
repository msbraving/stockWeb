// 导入组件
import magnifier from './magnifier.vue'

// 定义插件，可通过 Vue.use() 方法注册插件，然后全局使用组件
const install = function (Vue, opts = {}) {
  // 定义全局组件
  Vue.component('magnifier', magnifier)
}

export { magnifier }

// 默认导出 install 方法
export default {
  install
}
