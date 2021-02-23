const layout = r => require.ensure([], () => r(require('../views/system/layout.vue')))
const company = r => require.ensure([], () => r(require('../views/system/system_company.vue')))
const department = r => require.ensure([], () => r(require('../views/system/system_department.vue')))
const role = r => require.ensure([], () => r(require('../views/system/system_role.vue')))
const user = r => require.ensure([], () => r(require('../views/system/system_user.vue')))
const process = r => require.ensure([], () => r(require('../views/system/system_process.vue')))
const menu = r => require.ensure([], () => r(require('../views/system/system_menu.vue')))
const goods = r => require.ensure([], () => r(require('../views/system/system_goods.vue')))
const bdgt = r => require.ensure([], () => r(require('../views/tenant/tenant_bdgt.vue')))
const category = r => require.ensure([], () => r(require('../views/tenant/tenant_category.vue')))
const brand = r => require.ensure([], () => r(require('../views/system/system_brand.vue')))
const banner = r => require.ensure([], () => r(require('../views/tenant/tenant_banner.vue')))
const tenant = r => require.ensure([], () => r(require('../views/system/system_tenant.vue')))
const supplier = r => require.ensure([], () => r(require('../views/system/system_supplier.vue')))
const jurisdiction = r => require.ensure([], () => r(require('../views/system/system_jurisdiction.vue')))
const reqorder = r => require.ensure([], () => r(require('../views/tenant/tenant_reqorder.vue')))
const reqorderdetail = r => require.ensure([], () => r(require('../views/tenant/tenant_reqorderdetail.vue')))
const order = r => require.ensure([], () => r(require('../views/tenant/tenant_order.vue')))
const orderdetail = r => require.ensure([], () => r(require('../views/tenant/tenant_orderdetail.vue')))

const systemRouter = {
  name: 'system',
  path: '/system',
  component: layout,
  children: [{
    name: 'system_company',
    path: 'company',
    component: company
  },
  {
    name: 'system_department',
    path: 'department',
    component: department
  },
  {
    name: 'system_role',
    path: 'role',
    component: role
  },
  {
    name: 'system_jurisdiction',
    path: 'jurisdiction',
    component: jurisdiction
  },
  {
    name: 'system_user',
    path: 'user',
    component: user
  },
  {
    name: 'system_process',
    path: 'process',
    component: process
  },
  {
    name: 'system_menu',
    path: 'menu',
    component: menu
  },
  {
    name: 'system_goods',
    path: 'goods',
    component: goods
  },
  {
    name: 'system_brand',
    path: 'brand',
    component: brand
  },
  {
    name: 'tenant_banner',
    path: 'banner',
    component: banner
  },
  {
    name: 'system_bdgt',
    path: 'bdgt',
    component: bdgt
  },
  {
    name: 'system_category',
    path: 'category',
    component: category
  },
  {
    name: 'system_tenant',
    path: 'tenant',
    component: tenant
  },
  {
    name: 'tenant_reqorder',
    path: 'reqorder',
    component: reqorder
  },
  {
    name: 'tenant_order',
    path: 'order',
    component: order
 },
 {
    name: 'tenant_orderdetail',
    path: 'orderdetail',
    component: orderdetail
 },
  {
    name: 'tenant_reqorderdetail',
    path: 'reqorderdetail',
    component: reqorderdetail
  },
  {
    name: 'system_supplier',
    path: 'supplier',
    component: supplier
  }]
}

export default systemRouter
