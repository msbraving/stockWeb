<template>
    <div class='layout'>
        <div>
            <div class='layout-header'>
                <div class='header'>
                    <div class='logo'>
                        <!-- <img :src='$store.state.GLOBAL.logo.indexOf('http') != -1 ? $store.state.GLOBAL.logo : ($store.state.imgBaseUrl + $store.state.GLOBAL.logo)' class='logoImg' v-if='$store.state.GLOBAL.logo!='''/> -->
                        <!-- <img
              src='http://www.qdxiaobao.com/static/data/hirerImg/da0c4288d6dc4d71b9e3a30d6160ee03/WechatIMG490.png'
              class='logoImg'
            /> -->
                        <span style="color:#fff;font-size:16px">SINO 企业数字化采购云</span>
                    </div>
                    <div class=''>
                        <!-- <a href='javascript:void(0)' class='video'>
              <Icon type='videocamera'></Icon>
              <span style='margin:0 20px 0 5px;'>视频教程</span>
            </a> -->
                        <Dropdown>
                            <a href='javascript:void(0)' class='name'>
                                {{store.userName}}
                                <Icon type="md-arrow-dropdown" />
                            </a>
                            <DropdownMenu slot='list'>
                                <DropdownItem @click.native='handleLogout()'>
                                    <a href='javascript:void(0)'>
                                        <Icon type='log-out'></Icon>退出
                                    </a>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <!-- <a href='javascript:void(0)' class='help'>
               <Icon type='help-circled'></Icon> 帮助中心
            </a>-->
                    </div>
                </div>
            </div>
            <div>
                <div class="content_layout">
                    <div class="nav__content">
                        <div class="side-nav v2">
                            <div class="nav-item-group full">
                                <li class="nav-item"><a @click="$router.push({name: 'index'})"><span class="nav-item-text">后台首页</span></a></li>
                            </div>
                            <div>
                                <div class="nav-item-group full">
                                    <div class="nav-group-fav">
                                        <span class="nav-group-fav-title">租户</span>
                                    </div>
                                    <li class="nav-item"><a @click="$router.push({name: 'system_company'})"><span class="nav-item-text">公司管理</span></a></li>
                                    <li class="nav-item"><a @click="$router.push({name: 'system_department'})"><span class="nav-item-text">部门管理</span></a></li>
                                    <li class="nav-item"><a @click="$router.push({name: 'system_role'})"><span class="nav-item-text">角色管理</span></a></li>
                                    <li class="nav-item"><a @click="$router.push({name: 'system_user'})"><span class="nav-item-text">用户管理</span></a></li>
                                    <li class="nav-item"><a @click="$router.push({name: 'system_category'})"><span class="nav-item-text">产品目录</span></a></li>
                                    <li class="nav-item"><a @click="$router.push({name: 'tenant_banner'})"><span class="nav-item-text">banner管理</span></a></li>
                                    <li class="nav-item"><a @click="$router.push({name: 'system_bdgt'})"><span class="nav-item-text">预算管理</span></a></li>

                                </div>
                            </div>
                            <div class="nav-item-group">
                                <div class="nav-item-group-title">
                                    <img src="https://commimg.pddpic.com/mms_static/2019-11-15/e28bf79a-91ca-4101-94d7-c598ffd0f523.png" width="16" height="16" />
                                    <span>系统</span>
                                    <div class="pdd-left-nav-arrow-expanded"></div>
                                </div>
                                <ul class="nav-item-group-content" style="height: 115px;">
                                    <li class="nav-item"><a @click="$router.push({name: 'system_goods'})"><span class="nav-item-text">产品分类</span></a></li>
                                    <li class="nav-item"><a @click="$router.push({name: 'system_brand'})"><span class="nav-item-text">品牌管理</span></a></li>
                                    <li class="nav-item"><a @click="$router.push({name: 'system_process'})"><span class="nav-item-text">流程管理</span></a></li>
                                    <li class="nav-item"><a @click="$router.push({name: 'system_menu'})"><span class="nav-item-text">菜单管理</span></a></li>
                                    <li class="nav-item"><a @click="$router.push({name: 'system_tenant'})"><span class="nav-item-text">租户管理</span></a></li>
                                    <li class="nav-item"><a @click="$router.push({name: 'system_supplier'})"><span class="nav-item-text">供应商管理</span></a></li>
                                </ul>
                            </div>
                            <div class="nav-item-group">
                                <div class="nav-item-group-title">
                                    <img src="https://commimg.pddpic.com/mms_static/2019-11-15/f08bfc37-4ec9-4a94-8cee-4f12ce1e3041.png" width="16" height="16" />
                                    <span>供应商</span>
                                    <div class="pdd-left-nav-arrow-expanded"></div>
                                </div>
                                <ul class="nav-item-group-content" style="height: 87px;">
                                    <li class="nav-item"><a @click="$router.push({path: '/supplier/product_release'})"><span class="nav-item-text">产品发布</span></a></li>
                                    <li class="nav-item"><a @click="$router.push({path: '/supplier/goods_list'})"><span class="nav-item-text">产品池</span></a></li>
                                    <li class="nav-item"><a @click="$router.push({path: '/supplier/add_protocol'})"><span class="nav-item-text">协议发布</span></a></li>
                                    <li class="nav-item"><a @click="$router.push({path: '/supplier/protocol_list'})"><span class="nav-item-text">协议列表</span></a></li>
                                    <li class="nav-item"><a @click="$router.push({path: '/supplier/fare_template'})"><span class="nav-item-text">运费模板</span></a></li>
                                    <li class="nav-item"><a @click="$router.push({path: '/supplier/product_sku'})"><span class="nav-item-text">产品库</span></a></li>
                                </ul>
                            </div>

                            <div class="nav-item-group">
                                <div class="nav-item-group-title">
                                    <img src="https://commimg.pddpic.com/galerie-go/static/2020-07-22/95fe62f4-df95-438d-a787-bcc7b0afe5e1.png" width="16" height="16" />
                                    <span>采购管理</span>
                                    <div class="pdd-left-nav-arrow-expanded"></div>
                                </div>
                                <ul class="nav-item-group-content" style="height: 31px;">
                                    <li class="nav-item"><a @click="$router.push({name: 'tenant_order'})"><span class="nav-item-text">采购订单</span></a></li>
                                    <li class="nav-item"><a href="https://pifa.pinduoduo.com/order/?forceLogin=true&amp;sn=84134"><span class="nav-item-text">发货中心</span></a></li>
                                </ul>
                            </div>

                            <div class="nav-item-group">
                                <div class="nav-item-group-title">
                                    <img src="https://commimg.pddpic.com/galerie-go/static/2020-07-22/95fe62f4-df95-438d-a787-bcc7b0afe5e1.png" width="16" height="16" />
                                    <span>需求管理</span>
                                    <div class="pdd-left-nav-arrow-expanded"></div>
                                </div>
                                <ul class="nav-item-group-content" style="height: 31px;">
                                    <li class="nav-item"><a @click="$router.push({name: 'tenant_reqorder'})"><span class="nav-item-text">需求处理</span></a></li>
                                    <li class="nav-item"><a href="https://pifa.pinduoduo.com/order/?forceLogin=true&amp;sn=84134"><span class="nav-item-text">需求单查询</span></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!--<Menu
              :open-names='openNames'
              :active-name='activeName'
              v-for='(item, index) in menus'
              :key='item.id'
              theme='dark'
              accordion
            >
              <MenuItem
                v-if='item.children.length === 0'
                :name='item.id'
                @click.native='handleMenuChange(item, index, false)'
              >
                <Icon :type='item.icon' class='menu-title-icon'></Icon>
                {{item.description}}
              </MenuItem>
              <Submenu v-else :name='item.id'>
                <template slot='title'>
                  <Icon :type='item.icon' class></Icon>
                  {{item.description}}
                </template>
                <MenuItem
                  v-if='!subitem.children'
                  v-for='(subitem, subindex) in item.children'
                  :key='subitem.id'
                  :name='subitem.id'
                  @click.native='handleMenuChange(subitem, subindex, true, item, index)'
                >{{subitem.description}}</MenuItem>
                <Submenu v-else :name='subitem.name'>
                  <template slot='title'>{{subitem.description}}</template>
                  <MenuItem
                    v-for='(subitemChild, subindexChild) in subitem.children'
                    :key='subitemChild.id'
                    :name='subitemChild.id'
                    @click.native='handleMenuChange(subitemChild, subindexChild, false, subitem, subindex)'
                  >{{subitemChild.description}}</MenuItem>
                </Submenu>
              </Submenu>
            </Menu>
          </Sider>-->
                    <div class='wrapper-content'>
                        <Content :style="{}">
                            <router-view></router-view>
                        </Content>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type='text/javascript'>
import { getUserMenu } from '../service/index.js';
import { logout } from '../service/auth/login'; // 登出接口
import store from '../store/index';
export default {
    mounted() {
        this.getMenu()
    },
    data() {
        return {
            store:JSON.parse(window.localStorage.getItem('store')),
            menus: [
                {
                    id: 'index',
                    name: 'index',
                    path: '/main/index',
                    description: '首页',
                    icon: 'android-home',
                    children: []
                },
                {
                    id: 'account',
                    name: 'account',
                    path: '/main/account',
                    description: '账号管理',
                    icon: 'ios-people',
                    children: [
                        {
                            id: 'account_message',
                            name: 'account_message',
                            path: '/main/account/message/',
                            description: '账号信息',
                            children: [
                                {
                                    id: 'account_message_shop',
                                    name: 'account_message_shop',
                                    path: '/main/account/shop',
                                    description: '店铺管理'
                                },
                                {
                                    id: 'account_message_staff',
                                    name: 'account_message_staff',
                                    path: '/main/account/staff',
                                    description: '员工管理'
                                }
                            ]
                        }
                    ]
                }
            ],
            openNames: [],
            activeName: 'none',
            accountInfo: {}
        };
    },
    created() {},
    watch: {
        $route(to, from) {
            this.menusFocus();
        }
    },
    methods: {
        getMenu () {
            getUserMenu( {},
                res => {
                    if (res.code == 200) {
                        this.menus = res.data
                    } else {
                        this.$Message.error(res.errmsg);
                    }
                },
                () => {
                    this.$Message.error('网络繁忙,请稍后重试！');
                }
            );
        },
        menusFocus() {
            this.menus.forEach((item, index) => {
                if (
                    this.$route.name === item.name ||
                    this.$route.path.indexOf(item.path) != -1
                ) {
                    this.activeName = item.id;
                    if (item.children) {
                        item.children.forEach((subitem, subindex) => {
                            if (
                                (this.$route.name === subitem.name ||
                                    this.$route.path.indexOf(subitem.path) != -1) &&
                                this.$route.path.indexOf(item.path) != -1
                            ) {
                                this.openNames.push(item.id);
                                this.activeName = subitem.id;
                            }
                        });
                    }
                }
            });
        },
        handleMenuChange(item, index, isChild, parentItem, parentIndex) {
            this.$router.push({
                name: item.name,
                params: item.params,
                query: item.query
            });
            this.activeName = item.id;
        },
        handleLogout() {
            logout(
                res => {
                    if (res.code == 200) {

                        // store.dispatch('setGlobal', {});
                        window.localStorage.setItem('store', {})
                        // if (res.data && res.data.url) {
                        //   location.href = res.data.url;
                        // }
                        this.$router.push({ name: 'login' });
                    } else {
                        this.$Message.error(res.errmsg);
                    }
                },
                () => {
                    this.$Message.error('网络繁忙,请稍后重试！');
                }
            );
        }
    }
};
</script>
<style scoped>
.layout-header {
    height: 60px;
    background: #323242;
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.header,
.content_layout {
    width: 1280px;
    margin: 0 auto;
    display: flex;
}
.logoImg {
    height: 42px;
    width: 42px;
    float: left;
    margin: 12px 12px 0 0;
}
.logo {
    font-size: 26px;
    color: #000;
    line-height: 60px;
    float: left;
}
.cominfo {
    float: right;
}
.name {
    font-size: 14px;
    color: #fff;
    letter-spacing: 1px;
}
.cominfo .help {
    font-size: 13px;
    color: #666;
    margin-left: 30px;
}
.cominfo .help i {
    font-size: 14px;
    color: #2d8cf0;
}
.cominfo .video {
    font-size: 13px;
    color: #666;
    margin-left: 10px;
}
.cominfo .video i {
    font-size: 14px;
    color: #2d8cf0;
}
.cominfo a.help:hover,
.cominfo a.video:hover {
    color: #2d8cf0;
}
.cominfo .content {
    padding: 10px 0;
}
.cominfo .content a {
    font-size: 14px;
}
.cominfo .content a:hover,
.cominfo .content a:hover i {
    font-weight: bold;
}

.nav__content {
    max-height: 100vh;
    overflow-y: hidden;
    overflow-x: hidden;
    padding-right: 6px;
    box-sizing: border-box;
    width: 210px;
    background: #f4f5f9;
}
.nav__content:hover {
    overflow-y: auto;
}
.nav__content::-webkit-scrollbar-track-piece {
    background-color: #f4f5f9;
    -webkit-border-radius: 0;
}

.nav__content::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.nav__content::-webkit-scrollbar-thumb {
    height: 50px;
    background-color: #b8b8b8;
    -webkit-border-radius: 4px;
    outline: 2px solid #f4f5f9;
    outline-offset: -2px;
    border: 2px solid #fff;
    filter: alpha(opacity=30);
    -moz-opacity: 0.3;
    -khtml-opacity: 0.3;
    opacity: 0.3;
}

.side-nav.v2 {
    position: relative;
    width: 210px;
    padding: 0 16px;
    line-height: 1.5;
    font-size: 14px;
    min-height: 100vh;
    background-color: #f4f5f9;
    user-select: none;
}
.side-nav.v2 .nav-item-group {
    padding-top: 6px;
}
.side-nav.v2 .nav-item-group .nav-item-group-title {
    position: relative;
    color: #151516;
    cursor: pointer;
    height: 33px;
    line-height: 33px;
}
.side-nav.v2 .nav-item-group ul {
    list-style: none;
    margin: 0;
    padding-bottom: 3px;
    padding-left: 0;
}
.side-nav.v2 .nav-item-group .nav-item {
    position: relative;
    line-height: 28px;
    color: #666;
    cursor: pointer;
    list-style: none;
    display: inline-block;
    width: 85px;
    padding: 0;
}
.side-nav.v2 .nav-item-group .nav-item a {
    font-size: 14px;
    text-decoration: none !important;
    color: unset;
    height: 100%;
    display: inline-block;
}
.side-nav.v2 .nav-item-group .nav-item a .nav-item-text {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC,
        Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial,
        sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol !important;
    display: inline-block;
    line-height: 1.5;
    position: relative;
    font-size: 12px;
}
</style>
