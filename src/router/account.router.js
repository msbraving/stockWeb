const layout = resolve => require(["../views/account/layout.vue"], resolve);
const messageLayout = resolve =>
  require(["../views/account/layout.accout.vue"], resolve);
const shop = resolve => require(["../views/account/account.shop.vue"], resolve);
const staff = resolve =>
  require(["../views/account/account.staff.vue"], resolve);

const accountRouter = {
  name: "account",
  path: "/account",
  component: layout,
  children: [
    {
      name: "account_message",
      path: "account_message",
      component: messageLayout,
      children: [
        {
          name: "account_message_shop",
          path: "shop",
          component: shop
        },
        {
          name: "account_message_staff",
          path: "staff",
          component: staff
        }
      ]
    }
  ]
};

export default accountRouter;
