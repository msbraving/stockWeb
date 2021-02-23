<template>
   <div>
            <Head :count="count"></Head>
            <div class="bannerBox">
                <div class="bannerContent">
                    <Carousel v-model="value1" loop>
                        <CarouselItem v-for="item in banner" :key="item.imgUrl">
                            <div class="demo-carousel">
                                <img style="cursor:pointer" :src="item.imgUrl" @click="open(item.linkUrl)">
                            </div>
                        </CarouselItem>
                    </Carousel>
                    <div class="bannerArticle">
                        <div class="banner-side" @mouseleave="removeActive">
                            <div class="content_layout flex"  >
                                <div class="nav__content">
                                    <div class="category-menu-item" v-for="(item, index) in category" :index="index" v-if="index%2==1" data-menu="menu" v-on:mouseover="changeActive(index)">
                                        <a @click="search(1,category[index-1].parentCategoryId)"   class="category-menu-item-label label1">
                                            <span>{{category[index-1].parentCategoryName}}</span>
                                        </a>
                                        <a @click="search(2,category[index-1].id, category[index-1].parentCategoryId)" class="category-menu-item-text label3">
                                          <span>{{category[index-1].categoryName}}</span>
                                        </a>
                                        <a @click="search(1,item.parentCategoryId)" class="category-menu-item-label label2">
                                            <span>{{item.parentCategoryName}}</span>
                                        </a>
                                        <a @click="search(2,item.id, item.parentCategoryId)" class="category-menu-item-text label4">
                                            <span>{{item.categoryName}}</span>
                                        </a>
                                    </div>
                                </div>
                                <div class='wrapper-content' v-show="showMenuChild">
                                    <ul class="categoryList">
                                        <li class="categoryLi" v-for="item in childCategory" >
                                            <div class="categoryLiTitle">
                                                <h2 class="categoryLiTitleWord" @click="search(1,item.parentCategory)">{{item.parentCategoryName}}</h2>
                                            </div>
                                            <div class="categoryContent flex" >
                                                <div class="categoryContentItem fonthover" v-for="child in item.list">
                                                    <span @click="search(2,child.id, child.parentCategory)">{{child.categoryName}}</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="fdffTR">
                            <div class="user-empty-avatar">
                                <img class="" src="../../assets/image/visitorAvatarIcon.png" width="98" alt="">
                            </div>
                            <div class="user-empty-name">
                                <span v-if="store.userName">{{store.userName}}</span>
                                <span v-else>Hi~欢迎来到思诺博批发！</span>
                                </div>
                            <div class="user-pad2">
                                <div class="info-block">
                                    <div class="info-block-text">{{count}}</div>
                                    <div class="info-block-desc">购物车</div>
                                </div>
                                <div class="info-block">
                                    <div class="info-block-text">0</div>
                                    <div class="info-block-desc">已购买</div>
                                </div>
                            </div>
                            <div>
                                <img class="" width="202" src="../../assets/image/helpCenterIcon.png" alt="">
                                <ul class="help-list">
                                    <li class="help-item fonthover">系统通知-春节待办1</li>
                                    <li class="help-item fonthover">系统通知-春节待办2</li>
                                    <li class="help-item fonthover">系统通知-春节待办3</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="sectionConten ">
                <div class="sectionList" v-for="item in storey" >
                    <h2 class="block-header">{{ item.regionName }}</h2>
                    <div class="blockContent flex" >
                        <div class="cgnnmn" v-for="child in item.regionProductEntityList" @click="goDetail(item.id)">
                            <div class="goods-image-wrapper">
                                <img class="goods-image" width="224" :src="child.imageUrl" style="opacity: 1;">
                            </div>
                            <div class="goods-info">
                                <div class="goods-name">
                                  {{child.spuName}}
                                </div>
<!--                                <div class="goods-icons">-->
<!--                                    <span class="goods-icon">全店2件起批</span>-->
<!--                                    <span class="goods-icon">退货包运费</span>-->
<!--                                    <span class="goods-icon">全场包邮</span>-->
<!--                                </div>-->
                            </div>
                            <div class="goods-price">
                                <span class="price-unit">￥</span>
                                <span class="price-text">{{store.token?child.supplyPrice/100:'?'}}</span>
<!--                                <span class="sold-quantity">已售2.5万件</span>-->
                            </div>
                            <div class="goods-bottom " >
                                <div class="store-name">
                                    <Icon type="ios-home-outline" class="store-name-icon" /><span class="store-name-text">{{child.vendorName}}</span>
                                </div>
                                <div class="store-region">{{child.brandName}}</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

    </div>
</template>
<script type='text/javascript'>

import { mall, storeyList, getChildCategory, cartCount} from '../../service/mall/home.service.js'; // 登出接口
import Head from './head';

export default {
    components: {
        Head
    },
    mounted (){
        this.init()
        if (this.store.token) {
            this.count = window.localStorage.getItem('count')
        }
    },
    data() {
        return {
           'imgBaseUrl': this.$store.state.imgBaseUrl,
           count: 0,
           value1: 0,
           showMenuChild: false,
           childCategoryRequest: true,
           store: JSON.parse(window.localStorage.getItem('store') || '{}'),
           banner: [],
           category: [],
           childCategory: [],
           storey: []
        };
    },
    created() {
        // 在页面加载时读取localStorage里的状态信息
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
      //首页加载
        init (){
            let params = {
                tenantId: 1
            }
            //首页数据
            mall (params, (res) => {
                if ( res.code == 0){
                    this.banner = res.data.banner
                    this.category = res.data.category;
                    if(this.category.length % 2 == 1){
                      this.category.push({});
                    }
                    this.tenant = res.data.tenant
                    this.user = res.data.user
                    
                } else {
                    this.$Message.error(res.msg);
                }
            }, (res) => {
                this.$Message.error(res.msg);
            })
          //楼层数据
          storeyList (params, (res) => {
            if ( res.code == 0){
              this.storey = res.data;
            } else {
              this.$Message.error(res.msg);
            }
          }, (res) => {
            this.$Message.error(res.msg);
          })
        },
        goDetail (_id) {
            let routeData = this.$router.resolve({name: 'detail', query: {spuId:_id }});
             window.open(routeData.href, '_blank');
        },
        searchKeyWord (keyWord) {
            // console.log(keyWord)
            let routeData = this.$router.resolve({name: 'search', query: {keyWord:keyWord }});
             window.open(routeData.href, '_blank');
        },
        search(level,id, parentId){
            // this.$router.push({name: 'search', query: {level:level,  category: id, parentCategory: parentId }})
            let routeData = this.$router.resolve({name: 'search', query: {level:level,  category: id, parentCategory: parentId }});
             window.open(routeData.href, '_blank');
        },
        changeActive(index){
                this.showMenuChild = true;
                if(this.childCategoryRequest){
                  this.getChildCategoryList(index);
                }
        },

        removeActive($event){
           this.showMenuChild = false
        },
       //banner打开链接
       open(url){
          window.open(url);
       },
       //获取子分类
       getChildCategoryList(index){
          this.childCategoryRequest = false;
          let categoryIds = [];
          categoryIds.push(this.category[parseInt(index)-1].parentCategoryId);
          if(this.category[index].parentCategoryId){
           categoryIds.push(this.category[index].parentCategoryId);
         }
          let params = {
            tenantId: 1,
            list: categoryIds
          }
        //   console.log(params)
          getChildCategory (params, (res) => {
            if ( res.code == 0){
              this.childCategory = res.data;
            } else {
              this.$Message.error(res.msg);
            }
            this.childCategoryRequest = true;
          }, (res) => {
            this.$Message.error(res.msg);
            this.childCategoryRequest = true;
          })
        }
    }
};
</script>
<style scoped>

    .mall .fonthover:hover{
        color: #7ea1cb ;
    }



    .bannerBox{
        width: 100%; height: 416px;background: #7ea1cb ;position: relative;
    }
   .demo-carousel{
         width: 100%;display: flex;justify-content: center;
    }
    .demo-carousel img{
        width: 1200px;height: 416px;
    }
    .bannerArticle{
        position: absolute; width: 1200px;height: 0px;left: 50%;top: 0px; transform: translateX(-50%); overflow: visible;
    }
    .fdffTR {
        position: absolute; right: 0px; top: 16px;height: 384px; width: 242px;border-radius: 2px; display: flex;flex-flow: column nowrap;
        -webkit-box-align: center;align-items: center;background-color: rgb(255, 255, 255);
    }
    .user-empty-avatar{
        width: 98px;
        height: 98px;
        margin-top: 20px;
        cursor: pointer;
    }
    .user-empty-name {
        margin-top: 4px;height: 12px;font-size: 12px;font-weight: 400;color: rgba(0, 0, 0, 0.4); line-height: 12px;
    }
    .user-pad2 {
        height: 104px;margin-top: 16px;flex: 0 0 auto;display: flex;
    }
   .user-pad2 .info-block {
        width: 95px;height: 72px; display: flex; align-items: center;justify-content: center;flex-direction: column;background: #f6f6f6;border-radius: 5px;cursor: pointer;
    }
    .user-pad2 .info-block:last-child{
        margin-left: 10px;
    }
    .user-pad2 .info-block .info-block-text {
        height: 20px; font-size: 20px;font-weight: 500; color: rgba(0, 0, 0, 0.8);line-height: 20px;
    }
    .user-pad2 .info-block .info-block-desc {
        height: 12px; font-size: 12px;color: rgba(0, 0, 0, 0.6); line-height: 12px;margin-top: 8px;
    }
    .help-list{
        width: 202px; margin: 14px 0px 0px; padding: 0px; list-style: none; cursor: pointer;
    }
    .help-item{
        height: 12px;font-size: 12px; color: rgba(0, 0, 0, 0.8);line-height: 12px;margin-top: 16px;
    }
    .help-item:first-child{margin-top: 0;}
    .banner-side{
        position: absolute; left: 0px; top: 0px;height: 416px;
    }
    .nav__content{
        width: 242px;height: 416px;  background-color: rgb(255, 255, 255); overflow: hidden;padding-top: 8px; box-shadow: 0px -1px 1px #f5f5f5;
    }
    .category-menu-item:hover{background: #f9f9f9;}
    .category-menu-item {
        width: 100%; height: 40px;cursor: pointer; position: relative;
    }
    .category-menu-item .label1 {
        left: 20px;
    }
    .category-menu-item .category-menu-item-label {
        height: 28px; font-size: 14px; line-height: 28px; display: block;color: rgba(0, 0, 0, 0.8); font-weight: 400; position: absolute;font-weight: 500;top: 50%; transform: translateY(-50%);
    }
    .category-menu-item .label3 {
        left: 112px;
    }
    .category-menu-item .label2 {
        left: 64px;
    }
    .category-menu-item .label4 {
        left: 176px;
    }
    .category-menu-item .category-menu-item-text {
         height: 28px; font-size: 12px; line-height: 28px; display: block;color: rgba(0, 0, 0, 0.5); font-weight: 400; position: absolute; top: 50%; transform: translateY(-50%);
    }
    .wrapper-content{
        background: #fff;height: 416px; width: 700px;overflow-y: auto;box-sizing: border-box;font-size: 0;box-shadow: rgba(122,134,174,0.12) 0px 2px 8px 0px;box-shadow: rgba(123,124,131,0.4) -6px 0px 8px -8px;
    }
    .categoryList{
        padding: 36px 48px;width: 100%;
    }
    .categoryUl{

    }
    .categoryLi{
        width: 100%;
    }
    .categoryLi:not(:first-child){
        margin-top: 34px;
    }
    .categoryLiTitle{
       padding-bottom:16px;border-bottom: 1px solid rgb(235, 235, 235);
    }
    .categoryLiTitleWord{
        cursor: pointer;margin:0;padding:0;font-size: 14px;font-weight: 500;line-height: 14px;color: rgba(0,0,0,.8);height: 14px;
    }
    .categoryContent{
        flex-flow: row wrap;margin-top: -4px;cursor: pointer;
    }
    .categoryContentItem{
        margin-right: 24px;margin-top: 20px;height: 12px;font-size: 12px;color: rgba(0,0,0,.6);line-height: 12px;
    }
    .sectionConten{
        background-color: rgb(244, 244, 244);margin-bottom: 100px;
    }
    .sectionList{
        width: 1200px;margin: 20px auto 0px;
    }
    .block-header {
        display: inline-block; padding: 20px 53px 4px 0px; font-size: 24px; font-weight: 500;color: rgba(0, 0, 0, 0.8);line-height: 24px;
        background-image: url(data:image/png;base64,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);
        background-position: right top;background-repeat: no-repeat; background-size: auto 48px; margin: 0px 0px 20px;
    }
    .cgnnmn {
        width: 224px; height: 348px;background-color: rgb(255, 255, 255); position: relative; cursor: pointer; display: flex;flex-flow: column nowrap;
        margin-left: 20px;margin-bottom: 20px;
    }
    .cgnnmn:nth-child(6n), .cgnnmn:first-child {
        margin-left: 0;
    }
    .cgnnmn .goods-bottom {
        flex: 0 0 auto;  height: 36px; box-sizing: border-box;border-top: 1px solid rgb(238, 238, 238); padding: 0px 12px;
        display: flex; -webkit-box-align: center; align-items: center; font-size: 12px; color: rgba(0, 0, 0, 0.4); line-height: 12px; position: relative; z-index: 1;
    }
    .cgnnmn .goods-bottom .store-name {
        flex: 1 1 0%; overflow: hidden;text-overflow: ellipsis; white-space: nowrap;
    }
    .cgnnmn .goods-bottom .store-name .store-name-text {
        margin-left: 5px;
    }
    .cgnnmn .goods-bottom .store-name .store-name-icon {
        color: rgba(0, 0, 0, 0.4);font-size: 15px;
    }
    .cgnnmn .goods-bottom .store-region {
        max-width: 70px;margin-left: 4px; overflow: hidden;text-overflow: ellipsis; white-space: nowrap;
    }
    .cgnnmn .goods-image-wrapper {
        width: 224px; height: 224px; position: relative;overflow: hidden;
    }
    .cgnnmn .goods-image-wrapper .goods-image {
        transform: scale(1); transition: transform 0.25s ease 0s; width: 100%; height: 100%;
    }
    .cgnnmn .goods-image-wrapper .goods-image:hover {
        transform: scale(1.5); transition: transform 1s ease 0s; 
    }
    .cgnnmn .goods-info {
        height: 40px; padding: 0px 12px; box-sizing: border-box; margin-top: 8px;
    }
    .cgnnmn .goods-info .goods-name {
        display: block;font-size: 12px; color: rgba(0, 0, 0, 0.8); line-height: 20px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;
    }
    .cgnnmn .goods-info .goods-icons {
        display: -webkit-box; overflow: hidden;-webkit-box-orient: vertical; -webkit-line-clamp: 1; margin-top: 6px; font-size: 0px;
    }
    .cgnnmn .goods-info .goods-icon {
        display: inline-block; height: 16px; box-sizing: border-box;
        color: rgb(255, 93, 37); font-size: 12px; line-height: 12px; padding: 1px 4px;background: rgb(255, 249, 247);border-radius: 1px; border: 1px solid rgb(255, 218, 206);
    }
    .cgnnmn .goods-info .goods-icon:not(:first-child) {
        margin-left: 8px;
    }
    .cgnnmn .goods-price {
        margin: 12px 0px 10px;padding: 0px 12px;height: 18px; font-size: 0px;box-sizing: border-box;
    }
    .cgnnmn .goods-price .price-unit {
        font-size: 12px; line-height: 12px;font-weight: 500; color: #7ea1cb ;
    }
    .cgnnmn .goods-price .price-text {
        font-size: 18px;font-weight: 500;color: #7ea1cb ; line-height: 18px;
    }
    .cgnnmn .goods-price .sold-quantity {
        text-align: right; font-size: 12px; color: rgba(0, 0, 0, 0.4);line-height: 18px; float: right;
    }

</style>
