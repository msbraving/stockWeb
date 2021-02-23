import loginRouter from "./login.router";
const supplier_settled = resolve =>
  require(["../views/supplier/supplier_settled.vue"], resolve);
import mallRouter from "./mall.router";
import accountRouter from "./account.router";
import goodsRouter from "./goods.router";
import systemRouter from "./system.router";
import supplierRouter from "./supplier.router";
const NotFoundComponent = r =>
  require.ensure([], () => r(require("@/views/404/404")));
const main = r => require.ensure([], () => r(require("@/views/main.vue")));
const index = r => require.ensure([], () => r(require("@/views/index.vue")));

const routers = [
  {
    path: "/",
    redirect: "/main/index"
  },
  {
    name: "main",
    path: "/main",
    component: main,
    children: [
      {
        name: "index",
        path: "index",
        component: index
      }
    ]
  },

  {
    path: "*",
    component: NotFoundComponent
  },
  {
    name: "supplier_settled",
    path: "/supplier_settled",
    component: supplier_settled
  }
];
// routers.unshift(resetPwdRouter)
routers.unshift(loginRouter);
routers.unshift(mallRouter);
routers[3].children.push(accountRouter);
routers[3].children.push(goodsRouter);
routers[3].children.push(systemRouter);
routers[3].children.push(supplierRouter);
export default routers;
