const layout = resolve => require(["../views/supplier/layout.vue"], resolve);
const supplier_info = resolve =>
  require(["../views/supplier/supplier_info.vue"], resolve);
const goods_list = resolve =>
  require(["../views/supplier/goods_list.vue"], resolve);
const product_sku = resolve =>
  require(["../views/supplier/product_sku.vue"], resolve);
const goods_detail = resolve =>
  require(["../views/supplier/goods_detail.vue"], resolve);
const product_release = resolve =>
  require(["../views/supplier/product_release.vue"], resolve);
const productInfo_release = resolve =>
  require(["../views/supplier/productInfo_release.vue"], resolve);
const fare_template = resolve =>
  require(["../views/supplier/fare_template.vue"], resolve);
const fare_detail = resolve =>
  require(["../views/supplier/fare_detail.vue"], resolve);
const add_fare = resolve =>
  require(["../views/supplier/add_fare.vue"], resolve);
const protocol_list = resolve =>
  require(["../views/supplier/protocol_list.vue"], resolve);
const add_protocol = resolve =>
  require(["../views/supplier/add_protocol.vue"], resolve);
const protocol_detail = resolve =>
  require(["../views/supplier/protocol_detail.vue"], resolve);
const approve_protocol = resolve =>
  require(["../views/supplier/approve_protocol.vue"], resolve);
const purchase_list = resolve =>
  require(["../views/supplier/purchase_list.vue"], resolve);
const purchase_detail = resolve =>
  require(["../views/supplier/purchase_detail.vue"], resolve);
const protocol_ship = resolve =>
  require(["../views/supplier/protocol_ship.vue"], resolve);
const supplierRouter = {
  name: "supplier",
  path: "/supplier",
  component: layout,
  children: [
    {
      name: "supplier_info",
      path: "supplier_info",
      component: supplier_info
    },
    {
      name: "goods_list",
      path: "goods_list",
      component: goods_list
    },
    {
      name: "product_sku",
      path: "product_sku",
      component: product_sku
    },
    {
      name: "goods_detail",
      path: "goods_detail",
      component: goods_detail
    },
    {
      name: "product_release",
      path: "product_release",
      component: product_release
    },
    {
      name: "productInfo_release",
      path: "productInfo_release",
      component: productInfo_release
    },
    {
      name: "fare_template",
      path: "fare_template",
      component: fare_template
    },
    {
      name: "fare_detail",
      path: "fare_detail",
      component: fare_detail
    },
    {
      name: "add_fare",
      path: "add_fare",
      component: add_fare
    },
    {
      name: "protocol_list",
      path: "protocol_list",
      component: protocol_list
    },
    {
      name: "add_protocol",
      path: "add_protocol",
      component: add_protocol
    },
    {
      name: "protocol_detail",
      path: "protocol_detail",
      component: protocol_detail
    },
    {
      name: "approve_protocol",
      path: "approve_protocol",
      component: approve_protocol
    },
    {
      name: "purchase_list",
      path: "purchase_list",
      component: purchase_list
    },
    {
      name: "purchase_detail",
      path: "purchase_detail",
      component: purchase_detail
    },
    {
      name: "protocol_ship",
      path: "protocol_ship",
      component: protocol_ship
    }
  ]
};

export default supplierRouter;
