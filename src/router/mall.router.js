const layout = resolve => require(['../views/mall/layout.vue'], resolve)
const home = resolve => require(['../views/mall/home.vue'], resolve)
const detail = resolve => require(['../views/mall/detail.vue'], resolve)
const search = resolve => require(['../views/mall/search.vue'], resolve)
const cart = resolve => require(['../views/mall/cart.vue'], resolve)
const greatOrder = resolve => require(['../views/mall/greatOrder.vue'], resolve)
const orderList = resolve => require(['../views/mall/orderList.vue'], resolve)
const orderDetail = resolve => require(['../views/mall/orderDetail.vue'], resolve)


const mallRouter = {
  name: 'mall',
  path: '/mall',
  component: layout,
  children: [
    {
      name: "home",
      path: "home",
      component: home
    },
    {
      name: "detail",
      path: "detail",
      component: detail
    },
    {
      name: "search",
      path: 'search',
      // path: 'search/:level/:category/:parentCategory',
      component: search
    },
    {
      name: "cart",
      path: "cart",
      component: cart
    },
    {
      name: "greatOrder",
      path: "greatOrder",
      component: greatOrder
    },
    {
      name: "orderList",
      path: "orderList",
      component: orderList
    },
    {
      name: "orderDetail",
      path: "orderDetail",
      component: orderDetail
    }
  ]
}

export default mallRouter
