const layout = r =>
  require.ensure([], () => r(require("../views/goods/layout.vue")));
const list = r =>
  require.ensure([], () => r(require("../views/goods/goods_list.vue")));
const list_line = r =>
  require.ensure([], () => r(require("../views/goods/list_line.vue")));
const list_history = r =>
  require.ensure([], () => r(require("../views/goods/list_history.vue")));

const goodsRouter = {
  name: "goods",
  path: "/goods",
  component: layout,
  children: [
    {
      name: "goods_list",
      path: "list",
      component: list,
      children: [
        {
          name: "line",
          path: "line",
          component: list_line
        },
        {
          name: "history",
          path: "history",
          component: list_history
        }
      ]
    }
  ]
};

export default goodsRouter;
