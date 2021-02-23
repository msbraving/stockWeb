<template>
    <div>
        <Head :count="count"></Head>
        <div class="content">
            <!-- 产品属性搜索 -->
            <div class="sc-carGAA dpbdIG" v-show="!topCategoryList.length">
                <div class="property-header">
                    <div class="flex ">
                        <span class="header-title">筛选条件</span>
                        <div class="flex wrap">
                            <span class="property-tab" v-show="brandList && brandList.choice">
                                <span style="color: #7ea1cb ;">品牌：{{brandList && brandList.value}}</span>
                                <Icon @click="removeSelectBrand" type="ios-close" style="font-size: 12px; margin-left: 4px;" />
                            </span>
                            <div class="flex " v-for="(item, index) in  attrsList" v-show="item.choice" >
                                <span class="property-tab" v-for="(itemChild, indexChild) in  item.attrValues" v-show="item.choiceIndex == indexChild"  >
                                    <span style="color: #7ea1cb ;">{{item.attrName}}： {{itemChild}}</span>
                                    <Icon @click="removeSelectAttr(index)" type="ios-close" style="font-size: 12px; margin-left: 4px;" />
                                </span>
                            </div>
                            <!-- <span class="property-tab"><span style="color: #7ea1cb ;">玩具类型：木制玩具</span><Icon type="ios-close" style="font-size: 12px; margin-left: 4px;" /></span> -->
                        </div>
                    </div>
                </div>

                <div class="cate-options" v-show="brandList && !brandList.choice">
                    <!-- 品牌 -->
                    <div class="sc-iJCRLp eDJvQP">
                        <div class="title">
                            <span data-testid="beast-core-icon" style="display: inline-flex;"><span class="limitWidth " style="width: 76px;">{{ brandList && brandList.title }}</span></span>
                        </div>
                        <div height="auto" class="sc-ezzayL iQrFki is-hide" >
                            <ul class="sc-giAqnE oPqrM" style="padding: 6px 0px 6px 10px; max-height: 97px;">
                                <li class="sc-bYwzba gRCHXI property-item" v-for="item in brandList && brandList.brandName" @click="addSelectBrand(item)">
                                    <span data-testid="beast-core-icon" style="display: inline-flex;">
                                        <span class="limitWidth " style="width: 83px;">
                                            {{ item }}
                                        </span>
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div class="tigger"></div>
                    </div>
                </div>
                <div class="cate-options" >
                  <!-- 产品属性 -->
                    <div class="sc-iJCRLp eDJvQP" v-for="(item, index) in attrsList" v-show=" !item.choice && !showMore && index <3 || !item.choice && showMore" >
                        <div class="title">
                            <span data-testid="beast-core-icon" style="display: inline-flex;"><span class="limitWidth " style="width: 76px;">{{item.attrName}}</span></span>
                        </div>
                        <div height="auto" class="sc-ezzayL iQrFki is-hide">
                            <ul class="sc-giAqnE oPqrM" style="padding: 6px 0px 6px 10px; max-height: 97px;">
                                <li class="sc-bYwzba gRCHXI property-item" v-for="(itemChild, indexChild) in item.attrValues"  @click="addSelectAttr(index, indexChild)">
                                    <span data-testid="beast-core-icon" style="display: inline-flex;">
                                        <span class="limitWidth " style="width: 83px;">{{itemChild}}</span>
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <!-- <div class="tigger"></div> -->
                    </div>
                </div>
                <div v-show="attrsList && attrsList.length > 2" @click="showMore = !showMore" class="flex alignItems justifyCenter point" style="height:30px;border-top:1px solid #ededed;">
                    <span>{{!showMore ? '展示更多' : '收起更多'}}</span>
                    <Icon type="ios-arrow-up"  v-show="showMore" style="font-size: 14px; margin-left: 8px;"/>
                    <Icon type="ios-arrow-down" v-show="!showMore" style="font-size: 14px; margin-left: 8px;"/>
                </div>
            </div>
            <!-- 产品分类搜索 -->
            <div class="goodsType">
              <!-- 一级分类 -->
                <div class="sc-iJCRLp eDJvQP" v-if="topCategoryList.length > 0">
                    <div class="title">
                        <span data-testid="beast-core-icon" style="display: inline-flex;"><span class="elli_outerWrapper_1343907637 elli_limitWidth_1343907637" style="width: 76px;">一级类目</span></span>
                    </div>
                    <div height="auto" class="sc-ezzayL iQrFki">
                        <ul class="sc-giAqnE oPqrM">
                            <li v-for="item in topCategoryList"  @click="searchProductByTopCategory(item.id)" class="sc-bYwzba gRCHXI">
                              <span :class="{active: topCategoryIndex == item.id}"> {{item.categoryName}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="tigger"></div>
                </div>

              <!-- 二级分类 -->
                <div class="sc-iJCRLp eDJvQP" v-if="topCategoryList.length > 0 && parentCategoryList.length > 0">
                    <div class="title">
                        <span data-testid="beast-core-icon" style="display: inline-flex;"><span class="elli_outerWrapper_1343907637 elli_limitWidth_1343907637" style="width: 76px;">二级类目</span></span>
                    </div>
                    <div height="auto" class="sc-ezzayL iQrFki">
                        <ul class="sc-giAqnE oPqrM">
                            <li class="sc-bYwzba gRCHXI" @click="searchProductByParentCategory(0)"><span :class="{active: parentCategoryIndex == 0}">全部</span></li>
                            <li class="sc-bYwzba gRCHXI"  v-for="item in parentCategoryList" @click="searchProductByParentCategory(item.id)">
                              <span :class="{active: parentCategoryIndex == item.id}" >  {{item.categoryName}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="tigger"></div>
                </div>

              <!-- 三级分类 -->
                <div class="sc-iJCRLp eDJvQP" v-if="topCategoryList.length > 0 && categoryList.length > 0" >
                    <div class="title">
                        <span data-testid="beast-core-icon" style="display: inline-flex;"><span class="elli_outerWrapper_1343907637 elli_limitWidth_1343907637" style="width: 76px;">三级类目</span></span>
                    </div>
                    <div height="auto" class="sc-ezzayL iQrFki">
                        <ul class="sc-giAqnE oPqrM">
                            <li class="sc-bYwzba gRCHXI" @click="searchProductByCategory(0)"><span :class="{active: categoryIndex == 0}">全部</span></li>
                            <li class="sc-bYwzba gRCHXI" v-for="item in categoryList" @click="searchProductByCategory(item.id)">
                              <span :class="{active: categoryIndex == item.id}">  {{item.categoryName}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="tigger"></div>
                </div>
            </div>
            <!-- 排序 -->
            <div class="sc-cxNIbT caQbbb">
                <div class="capsule " :class="{'capsuleActive': sort == 'createTime'}" @click="changeSort(1)">默认排序</div>
                <div class="capsule" :class="{'capsuleActive': sort == 'supplyPrice'}" @click="changeSort(2)">
                    <div class="type">
                        价格<span class="sc-iwaifL RlDxk">
                            <span class="up" :class="{'upActive': sort == 'supplyPrice' && sortField == 'asc' }"></span>
                            <span class="down" :class="{'downActive': sort == 'supplyPrice' && sortField == 'desc'}"></span>
                        </span>
                    </div>
                </div>
                <div class="price">
                    <div class="price-input flex">
                        <Input placeholder="最低价" v-model="minPrice" size="small" style="width:100px;" >
                            <span slot="append">元</span>
                        </Input>
                        <span style="margin: 0px 8px;">-</span>
                         <Input placeholder="最高价" v-model="maxPrice" size="small" style="width:100px;">
                            <span slot="append">元</span>
                        </Input>
                    </div>
                    <div class="btn">
                        <Button type="primary" style="margin: 0px 16px;height: 24px;font-size:12px" @click="changePrice">确定</Button>
                        <Button type="text" style="height: 24px;font-size:12px" @click="delPrice">清空</Button>
                    </div>
                </div>
            </div>
            <!-- 产品列表 -->
            <div class="blockContent flex wrap">
                <div class="cgnnmn" v-for="item in productData" @click="goDetail(item)">
                    <div class="goods-image-wrapper">
                        <img class="goods-image" width="224" :src="item.imageUrl" style="opacity: 1;">
                    </div>
                    <div class="goods-info">
                        <div class="goods-name">{{item.spuName}}</div>
                        <!-- <div class="goods-icons">
                            <span class="goods-icon">全店2件起批</span>
                            <span class="goods-icon">退货包运费</span>
                            <span class="goods-icon">全场包邮</span>
                        </div> -->
                    </div>
                    <div class="goods-price">
                        <span class="price-unit">￥</span>
                        <span class="price-text">{{item.supplyPrice/100}}</span>
                        <!-- <span class="sold-quantity">已售{{2.5}}万件</span> -->
                    </div>
                    <div class="goods-bottom " >
                        <div class="store-name">
                            <Icon type="ios-home-outline" class="store-name-icon" /><span class="store-name-text">{{item.vendorName}}</span>
                        </div>
                        <div class="store-region">{{item.brandName}}</div>
                    </div>
                </div>
            </div>
            <div class="" v-show="productData && productData.length > 0">
                <div style="float: right;">
                    <Page :total="pageInfo.totalItems" show-elevator class-name="pagination-content" show-total @on-change="pageChange" :current="pageInfo.currentPage" :page-size="pageInfo.limit" style="float:right" size="small"></Page>
                </div>
            </div>
            <!-- 空 -->
            <div class="sc-jNnnWF fCQiqA" v-show="!productData.length ">
                <div class="Empty_emptyContentbase ">
                    <img src="https://mms-static.pinduoduo.com/static/media/empty.29b2ba2c.png" class="Empty_emptyImg">
                    <div class="Empty_emptyTitle">抱歉，没有找到相关产品</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {searchByCategory, searchByKeyword, queryCategory} from '../../service/mall/search.service.js'; // 登出接口
    import { cartCount} from '../../service/mall/home.service.js'; // 登出接口
    import Head from './head';

    export default {
      components: {
        Head
      },
      mounted () {
          this.init()
          if (this.store.token) {
            this.count = window.localStorage.getItem('count')
        }
      },
      data () {
        return {
            pageInfo: {
                currentPage: 1,
                limit: 10,
                totalItems: 0,
                totalPages: 0
            },
            showMore: false,
            store: JSON.parse(window.localStorage.getItem('store')),
            count: 0,
            sort: 'createTime',
            keyword:  '',
            brandName: "",
            brandList: {},
            attrsList: [],
            attrList: [], // 属性
            productData: [],
            maxPrice: "",
            minPrice: "",
            sortField: 'asc',
            level: this.$route.query.level,
            category: this.$route.query.category,
            topCategoryIndex: 0, // 一级分类选中下标
            parentCategoryIndex: 0, // 二级分类选中下标
            categoryIndex: 0, // 三级分类选中下标
            topCategoryList: [], // 一级分类
            parentCategoryList: [], // 二级分类
            categoryList: [] // 三级分类
        }
      },
      methods: {
        init () {
            if (this.$route.query.keyWord) {
                this.keyword = this.$route.query.keyWord
                this.searchBykeyword(true)
            } else {
                this.search();
                if (this.$route.query.level && this.$route.query.level == 1) {
                this.topCategoryIndex = this.$route.query.category
                }
                if (this.$route.query.level && this.$route.query.level == 2) {
                this.topCategoryIndex = this.$route.query.parentCategory
                this.parentCategoryIndex = this.$route.query.category
                }
            }
          },
          goDetail (item) {
            let routeData = this.$router.resolve({name: 'detail', query: {spuId: item.id}});
             window.open(routeData.href, '_blank');
          },
        search () {
            // 分类目录
            this.queryCategory();
            // 按分类搜索
            this.searchByCategory();
        },
        pageChange (index) {
            this.pageInfo.currentPage = index;
            this.getBrandList();
        },
        // 关键字查询
        searchBykeyword (_resetSeart) { // _resetSeart 刷新筛选条件
          let params = {
            current: 1,
            size: 10,
            keyword: this.keyword,
            attrValues:[],
            brandName: this.brandList && this.brandList.value || '',
            maxPrice: this.maxPrice,
            minPrice: this.minPrice,
            sort: '',
            sortField: '',
          }
           if (!this.$route.query.keyWord) {
                let routeData = this.$router.resolve({name: 'search', query: {keyWord: this.keyword }});
                window.open(routeData.href, '_blank');
                return false
            }
            this.attrsList && this.attrsList.map((item) => {
                if (item && item.choice) {
                    params.attrValues.push(item.attrValues[item.choiceIndex])
                }
            })
            this.topCategoryList = [];
          searchByKeyword(params, (res) => {
            if (res.code == 0) {
                let newBraandList = res.data.args.productBrand;
                // newBraandList.value = this.brandList && this.brandList.value || ''
                if (_resetSeart || _resetSeart && !res.data.args.productAttrs || _resetSeart && !res.data.args.productBrand) {
                    this.attrsList = res.data.args.productAttrs; //其他筛选条件
                    this.brandList = newBraandList; // 品牌
                }
                // this.brandList= Object.assign({}, this.brandList, newBraandList)
                
                this.$set(this.productData, 0, res.data.goods.content[0] );
                this.productData = res.data.goods.content;
                console.log(this.productData)
                this.pageInfo = {
                    currentPage: res.data.goods.number + 1,
                    limit: 10,
                    totalItems: res.data.goods.size,
                    totalPages: res.data.goods.totalPages
                }
                
            } else {
              this.$Message.error(res.msg);
            }
          }, (res) => {
            this.$Message.error(res.msg);
          })
        },
        queryCategory () {
          let params = {
            categoryId: this.category,
            level: this.level
          }
          queryCategory(params, (res) => {
            if (res.code == 0) {
              this.topCategoryList = res.data.topCategoryList;
              this.parentCategoryList = res.data.parentCategoryList;
              if (res.data.categoryList) {
                this.categoryList = res.data.categoryList;
              } else {
                this.categoryList = [];
              }
            } else {
              this.$Message.error(res.msg);
            }
          }, (res) => {
            this.$Message.error(res.msg);
          })
        },
        searchByCategory () {
          let params = {
            current: this.pageInfo.currentPage,
            size: this.pageInfo.limit,
            categoryId: this.category,
            level: this.level
          }
          searchByCategory(params, (res) => {
            if (res.code == 0) {
              this.productData = res.data.content;
              this.pageInfo = {
                currentPage: res.data.number + 1,
                limit: 10,
                totalItems: res.data.size,
                totalPages: res.data.totalPages
              }
            } else {
              this.$Message.error(res.msg);
            }
          }, (res) => {
            this.$Message.error(res.msg);
          })
        },
        // 排序
        changeSort (type) {
            let _this = this
            if (type == 1) {
                // _this.sort == 'createTime'
                this.$set(_this, 'sort', 'createTime');
            } else {
                // _this.sort == 'supplyPrice'
                this.sortField = this.sortField == 'asc' ? 'desc' : 'asc'
                this.$set(_this, 'sort', 'supplyPrice');
            }

        },
        changePrice () {
            this.init()
        },
        delPrice () {
            this.minPrice = ''
            this.maxPrice = ''
            this.init()
        },
        // 增加品牌
        addSelectBrand (item) {
            this.brandList.value = item;
            
            this.$set(this.brandList, 'choice', true);
            this.searchBykeyword()
        },
        // 删除品牌选择
        removeSelectBrand (){
            this.$set(this.brandList, 'choice', false);
            delete this.brandList.choice
            
            this.searchBykeyword()
        },
        // 增加其他筛选条件
        addSelectAttr (index, indexChild) {
            this.attrsList[index].choiceIndex = indexChild
            this.$set(this.attrsList[index], 'choice', true);
            console.log(this.attrsList)
            this.searchBykeyword()
        },
        // 删除筛选条件
        removeSelectAttr (index) {
            this.$set(this.attrsList[index], 'choice', false);
            delete this.attrsList[index].choice
            delete this.attrsList[index].choiceIndex
            this.searchBykeyword()
        },
        // 一级分类查询
        searchProductByTopCategory (id) {
          this.topCategoryIndex = id;
          this.category = this.topCategoryIndex;
          this.level = 1;
          this.pageInfo.currentPage = 1;
          this.pageInfo.limit = 10;
          this.searchByCategory();
          this.queryCategory();
        },
        // 二级分类查询
        searchProductByParentCategory (id) {
          if (id == 0) {
            this.parentCategoryIndex = 0;
            this.category = this.topCategoryIndex;
            this.level = 1;
          } else {
            this.parentCategoryIndex = id;
            this.category = this.parentCategoryIndex;
            this.level = 2;
          }
          this.pageInfo.currentPage = 1;
          this.pageInfo.limit = 10;
          this.searchByCategory();
          this.queryCategory();
        },
        // 三级分类查询
        searchProductByCategory (id) {
          if (id == 0) {
            this.categoryIndex = 0;
            this.category = this.parentCategoryIndex;
            this.level = 2;
          } else {
            this.categoryIndex = id;
            this.category = this.categoryIndex;
            this.level = 3;
          }
          this.pageInfo.currentPage = 1;
          this.pageInfo.limit = 10;
          this.searchByCategory();
        },
      }
    }
</script>

<style scoped>
    .content{
        width: 1200px;margin: 20px auto 50px;
    }

    /* 查询 */
    .dpbdIG {
        position: relative;margin-bottom: 12px;
    }
    .dpbdIG .property-header {
        display:flex;-webkit-box-pack:justify;justify-content:space-between;-webkit-box-align:center;align-items:center;margin-bottom:6px;
    }
    .dpbdIG .property-header .header-title {
        margin-right: 16px; margin-bottom: 4px;line-height: 2; width: 54px;
    }
    .dpbdIG .property-header .property-tab {
        cursor:pointer;background:#ffffff;border-radius:2px;border:1px solid #ebebeb;color:rgba(0,0,0,0.4);padding:4px 8px;line-height:14px;margin-right:12px;margin-bottom:4px;
    }
    .dpbdIG .cate-options {
        position: relative; width: 100%; background: rgb(255, 255, 255);
    }
    .eDJvQP {
        display:flex;border-top:1px solid #ebebeb;border-right:1px solid #ebebeb;border-left:1px solid #ebebeb;border-image:initial;border-bottom:0;
    }
    .eDJvQP:last-child {
        border-bottom: 1px solid rgb(235, 235, 235);
    }
    .eDJvQP > div {
        line-height: 12px;
    }
    .eDJvQP .title {
        padding:14px 6px;background-color:#fafafa;border-right:1px solid #ebebeb;width:88px;text-align:center;
    }
    .limitWidth {
        display:inline-block;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;
    }
    .iQrFki.is-hide {
        height: 40px;
    }
    .oPqrM {
        list-style:none;margin:0;display:flex;flex-wrap:wrap;padding:6px 8px;overflow:hidden;
    }
    .goods-image-wrapper .property-item {
        padding: 8px 10px;
    }
    .gRCHXI {
        cursor:pointer;list-style:none;margin:0;line-height:12px;padding:8px 12px;color:rgba(0,0,0,0.8);
    }
    .active{
      color: #7ea1cb ;
    }

    /* 产品类别 */
    .goodsType{
        position:relative;width:100%;background:#ffffff;margin-bottom:12px;
    }
    .dBMqNa {
        cursor:pointer;list-style:none;margin:0;line-height:12px;padding:8px 12px;color:#7ea1cb ;
    }




    /* 排序 */
    .caQbbb {
        position:relative;width:100%;height:40px;background:#ffffff;display:flex;margin-bottom:20px;
    }
    .caQbbb .capsule {
        border-top:1px solid #ebebeb;border-bottom:1px solid #ebebeb;border-left:1px solid #ebebeb;border-image:initial;border-right:0;padding:0 20px;
    }
    .caQbbb .capsuleActive{
        color: #7ea1cb ; border: 1px solid #7ea1cb ; margin-right: -1px; z-index: 1;
    }
    .caQbbb > div {
       height:100%;color:rgba(0,0,0,0.8);display:flex;-webkit-box-align:center;align-items:center;cursor:pointer;
    }
    .caQbbb .capsule .type {
        display: flex;  -webkit-box-align: center; align-items: center;
    }
    .RlDxk {
        display: flex;flex-direction: column; margin-left: 3px;
    }
    .RlDxk .up {
        border-width:4px;border-style:solid;border-color:transparent transparent #ababab;margin-bottom:2px;
    }
    .RlDxk span {
        width: 0px; height: 0px;
    }
    .RlDxk .down {
        border-width: 4px; border-style: solid; border-color: rgb(171, 171, 171) transparent transparent;
    }
    .RlDxk .upActive {
        border-width:4px;border-style:solid;border-color:transparent transparent #7ea1cb ;margin-bottom:2px;
    }
    .RlDxk .downActive {
        border-width: 4px; border-style: solid; border-color: #7ea1cb  transparent transparent;
    }
    .caQbbb .price {
        flex: 1 1 0%; border: 1px solid rgb(235, 235, 235);
    }
    .caQbbb .price .price-input {
        height:40px;display:flex;-webkit-box-align:center;align-items:center;padding:0 20px;position:relative;
    }




    /* 列表 */
    .cgnnmn {
        width: 224px; height: 308px;background-color: rgb(255, 255, 255); position: relative; cursor: pointer; display: flex;flex-flow: column nowrap;
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
    .cgnnmn .goods-info {
        padding: 0px 12px; box-sizing: border-box; margin-top: 8px;
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

    /* 数据为空 */
    .Empty_emptyContentbase {
       display: flex;align-items: center;flex-direction: column;justify-content: center;background: #fff;height: 218px;
    }
    .Empty_emptyImg {
        width: 88px;
    }
    .Empty_emptyTitle {
        color:rgba(0,0,0,0.4);margin:8px 0 0;font-size:14px;font-weight:500;line-height:14px;
    }
    
</style>
