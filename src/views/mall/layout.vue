<template>
    <div class='mall'>
        <div>
            <div class="topBox">
                <div class="headTop flex alignItems justifyBeteen">
                    <div class="flex alignItems">
                        <span class="">
                            <a class="home word fonthover" @click="open('home')">数字化采购平台</a>
                        </span>
                        <span class=" ">
                            <a class="switch word fonthover" rel="noreferrer noopener" @click="open('index')" >采购管理后台</a>
                        </span>
                    </div>
                    <div class="flex alignItems">
                        <span class=" ">
                            <a class="fonthover word" @click="open('cart')">购物车({{ count }})</a>
                        </span>
                        <div class="Div_vertical " style="margin-left: 16px; margin-right: 16px; margin-top: 5px; border-color: rgba(0, 0, 0, 0.12);"></div>
                        <span class=" flex alignItems" @click="open('orderList')">
                            <a class="fonthover word">已购买(0)</a>
                        </span>
                        <span v-if="!store.userName" class="account word">欢迎来到数字化采购平台，请先
                            <span class="fonthover point" style="margin-left: 2px;" @click="open('login')">登录</span>
                        </span>
                        <span v-else class="account word">欢迎来到数字化采购平台，{{store.userName}}
                            <span class="fonthover point" style="margin-left: 2px;" @click="logout">退出</span>
                        </span>
                    </div>
                </div>
            </div>
            <div>
                <router-view></router-view>
            </div>
        </div>
        <div class="root right">
            <div class="sc-pNWxx dryRrI">
                <div class="item cart">
                    <div class="icon iconBox">
                        <Icon type="ios-cart-outline" style="font-size: 20px;"/>
                        <span class="badge" v-show="count > 0">{{ count }}</span>
                    </div>
                    <div class="text">购物车</div>
                </div>
                <div class="item" style="display: flex;">
                    <div class="icon">
                        <Icon type="ios-paper-outline" style="font-size: 20px;" />
                    </div>
                    <div class="text">意见反馈</div>
                </div>
                <div class="item" >
                    <div class="icon">
                        <Icon type="ios-arrow-up" style="font-size: 20px;" />
                    </div>
                    <div class="text">回到顶部</div>
                </div>
            </div>
        </div>
        <div class="foot">
            <div class="foot-content">Copyright 2015-2021 数字化采购平台 版权所有 (沪ICP备15010535号)</div>
        </div>
    </div>
</template>
<script type='text/javascript'>

 import {cartCount, getUser} from '../../service/mall/home.service.js'; // 登出接口

export default {
    mounted () {
        if (this.store.token) {
            this.cartCount()
        }
        console.log(JSON.parse(window.localStorage.getItem('store')))
        // this.getUser()
    },
    data() {
        return {
           'imgBaseUrl': this.$store.state.imgBaseUrl,
           store: JSON.parse(window.localStorage.getItem('store')),
           value1: 0,
           count: localStorage.getItem('count')
        };
    },
    created() {
        // 在页面加载时读取localStorage里的状态信息
        // console.log(this.store)
        // if (localStorage.getItem('store')) {
        //     this.$store.replaceState(
        //         Object.assign(
        //             {},
        //             this.$store.state,
        //             localStorage.getItem('store')
        //         )
        //     )
        // }

        // 在页面刷新时将vuex里的信息保存到localStorage里
        // beforeunload事件在页面刷新时先触发
        // window.addEventListener('beforeunload', () => {
        //     localStorage.setItem('store', JSON.stringify(this.$store.state))
        // })

    },
    methods: {
        open (name) {
            let routeData = this.$router.resolve({name: name});
            window.open(routeData.href, '_blank');
        },
        getUser (){
            getUser({}, (res) => {
                if (res.code == 0) {

                } else {
                    this.$Message.error(res.msg);
                }
            }, (res) => {
                this.$Message.error(res.msg);
            })
        },
        logout(){
            // this.$store.dispatch('setGlobal', {})
            window.localStorage.setItem('store', '{}')
            // console.log(window.localStorage.getItem('store'))
            this.$router.push({name: 'login'})
        },
        cartCount () {
            cartCount({}, (res) => {
                if (res.code == 0) {
                  window.localStorage.setItem('count', res.data)
                } else {
                    this.$Message.error(res.msg);
                }
            }, (res) => {
                this.$Message.error(res.msg);
            })
        }
    }
};
</script>
<style scoped>
    /* head */
    .mall{

    }
    .topBox{
        width: 100%;height: 36px; background: rgb(245, 245, 245); box-shadow: rgb(235, 235, 235) 0px 1px 0px 0px; color: rgba(0, 0, 0, 0.6); z-index: 101;
    }
    .headTop{
        width: 1200px; height: 100%; margin: 0px auto;
    }
    .mall .word{
        color: rgba(0, 0, 0, 0.6);
    }
    .switch{
        margin-right: 24px; padding-left: 18px;
    }
    .Div_vertical {
        top: -0.06em; height: 0.9em; margin: 0 8px; display: inline-block; position: relative;  border-right: 1px solid #ebebeb; vertical-align: middle;
    }
    .account {
        margin-left: 40px;
    }
    .mall .fonthover:hover{
        color: #7ea1cb ;
    }
    /* end */

    /* tool */
    .root{
        position: fixed; z-index: 100; bottom: 64px;left: 50%; transform: translateX(620px);width: 64px;
    }
    .root .item.cart {
        color: #7ea1cb ;
    }
    .root .item {
        cursor: pointer; display: flex; -webkit-box-pack: center;justify-content: center; -webkit-box-align: center; align-items: center;flex-direction: column;
        text-align: center; height: 64px; width: 64px; border: 1px solid rgba(235, 235, 235, 0.8); background: rgb(255, 255, 255); box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px;
    }
    .root .item.cart .badge {
        position: absolute; top: -6px;left: auto;  right: 4px; transform: translateX(100%); background-color: #7ea1cb ;color: #fff;font-weight: 500;
        border: 1px solid #7ea1cb ; transition: all 0.3s ease 0s; box-shadow: rgb(255, 255, 255) 0px 0px 0px 1px; line-height: 14px; height: 16px; border-radius: 8px;padding: 0px 4px 1px;
    }
    .iconBox{
        position: relative;
    }
    /* end */

    /* foot */
    .foot{
        width: 100%; text-align: center;
    }
    .foot-content{
        width: 1200px;  height: 52px; overflow: hidden;font-size: 12px;
        font-weight: 400;color: rgba(0, 0, 0, 0.4); line-height: 52px; margin: 0px auto; border-top: 1px solid rgb(235, 235, 235);
    }
    /* end */
</style>
