<template>
    <div class="detail">
        <div class="content">
            <div class="DesHeader flex">
                <div>
                    <div class="goodImage">
                        <magnifier :imageArr="imgList"  v-if='status' ></magnifier>
                    </div>

                    <div class="eGqnrC">
                        <div class="mallFWarpper">
                            供应商信息
                        </div>
                        <div class="sc-jcwofb jtftyQ">
                            <div class="brief">
                                <div class="mallLeft">
                                    <a class="goods-link" target="_blank" href="/mall?mid=-mn_KV8xyawvpowtiiFHMw&amp;sn=70031.3573723.0.-mn_KV8xyawvpowtiiFHMw&amp;refer_page_id=65672_1611034579423_764daa6d7">
                                        <div class="logo" data-tracking="3295680">
                                            <img src="https://t16img.yangkeduo.com/pdd_ims/img_check/v2/E62F2CFFFFFF0520200112174154497/feafc9a14a5a48dbb71f2b7c8f191418.png?imageMogr2/quality/90/format/webp" />
                                        </div>
                                        <div class="store-name" data-tracking="3295680">
                                            <span>{{detailData.vendorName}}<Icon type="ios-arrow-forward" style="font-size: 10px; margin-left: 1px;"/></span>
                                        </div>
                                    </a>
                                    <div class="customer-service">
                                        <span class="cusSerWrap">
                                            <Icon type="md-headset" style="font-size: 14px; color: #7ea1cb ; margin-right: 4px;"/>评估得分</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div  class="goodsInfoR">
                    <h2 class="flex alignItems justifyBeteen goods-name">
                        <span class="goods-n-title">{{detailData.spuName}}</span>
                        <span class="goods-share">
                            <Icon type="md-share" style="font-size: 14px; color: #7ea1cb ; margin-right: 4px;" />
                            分享产品
                        </span>
                    </h2>
                    <div class="priceInfo">
                        <div class="info-block">
                            <div class="info-list">
                                <div class="info-row">
                                    <div class="info-label">批发价</div>
                                    <div class="info-text">
                                        <span class="current-price-unit">￥</span>
                                        <span class="current-price">{{detailData.supplyPrice/100}}</span>
                                    </div>
                                </div>
                                <div class="info-row">
                                    <div class="info-label">原价</div>
                                    <div class="info-text">
                                        <span class="origin-price">¥{{detailData.marketPrice/100}}</span>
                                    </div>
                                </div>
                                <!-- <div class="info-row">
                                    <div class="info-label">批发规则</div>
                                    <div class="info-text">
                                        <span class="price-list-item">
                                            ≥{{detailData.spuName}}件<span class="discount">{{detailData.spuName}}折</span>
                                        </span>
                                    </div>
                                </div>
                                <div class="info-row">
                                    <div class="info-label">起批量</div>
                                    <div class="info-text">{{detailData.spuName}}件</div>
                                </div> -->
                            </div>
                            <!-- <div class="sold-info">
                                <div class="sold-info-text">
                                    已售<span class="sold-quantity">{{detailData.spuName}}+</span>件
                                </div>
                            </div>   -->
                        </div>
                         <!-- <div class="info-block">
                            <div class="info-list">
                                <div class="info-row">
                                    <div class="info-label">专享服务</div>
                                    <div class="info-text">
                                        <span class="goods-tag">全店2件起批</span>
                                        <span class="goods-tag">退货包运费</span>
                                        <span class="goods-tag">闪电退货</span>
                                        <span class="goods-tag">全场包邮</span>
                                        <span class="goods-tag">七天退换</span>
                                        <span class="goods-tag">48小时发货</span>
                                        <span class="goods-tag">极速退款</span>
                                        <span class="goods-tag">品牌保障</span>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                    </div>
                    <div class="sc-dPaNSN KQWTL">
                        <div class="sku-select-row" v-for="(item, index) in AggregationSkuList">
                            <div class="sku-select-row-label">{{item.skuName}}{{item.specName}} </div>
                            <div class="sku-select-row-all">
                                 <div class="textWrapper " :class="{'CBX_disabled':!item.isSelect }" @click="slectSkuListAll(index)">全部</div>
                            </div>
                            <div class="sku-select-row-list">
                                <div class="sku-select-row-item">
                                    <div class="textWrapper" :class="{'CBX_disabled':!itemChild.isSelect }" @click="slectSkuList(index, indexChild)" v-for="(itemChild, indexChild) in item.specValues"> {{itemChild.v}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="selectNumBox">
                        <div class="list-wrapper">
                            <div>
                                <div class="sku-list-row" v-for="(item, index) in SkuList">
                                    <div class="info-area">
                                        <div class="sku-image">
                                            <img class="sku-image-inner" :src="item.imageUrl">
                                        </div>
                                        <div class="sku-title">{{item.skuName}}{{item.specName}}</div>
                                        <div class="sku-price">¥{{item.supplyPrice/100}}</div>
                                    </div>
                                    <div class="">
                                        <Input style="width: 112px" v-model="item.quantity" @on-change="val => changeVal(val, index)" >
                                            <Button slot="prepend" @click="changeQuantity(0, index)" icon="md-remove" style="width: 30px"></Button>
                                            <Button slot="append" @click="changeQuantity(1, index)" icon="md-add" style="width: 30px"></Button>
                                        </Input>
                                    </div>
                                </div>

                            </div>
                            <!-- <div class="list-pagination flex justifyEnd">
                                <Page :total="100" />
                            </div> -->
                        </div>
                    </div>
                    <div class="" v-show="showResult">
                        <div class="list-button-wrapper">
                            <div class="list-button">
                                <div class="list-label">已选择 </div>
                                <div class="goods-total">共{{resultSize}}件</div>
                                <div class="price-count"> &yen; {{resultPrice}}</div>
                                <!-- <div class="origin-price-count"> &yen;177.00</div> -->
                                <div class="flex-space"></div>
                                <!-- <div class="discount-desc">
                                    享受优惠： <span class="discount-number">9.5折</span>
                                </div> -->
                                <div class="switch-button fonthover" :class="{'switch-button-show': selectGoods}" @click="showSelectGoods">
                                    <div class="switch-button-name ">已选产品</div>
                                    <Icon type="ios-arrow-up"  v-show="selectGoods" style="font-size: 14px; margin-left: 8px;"/>
                                    <Icon type="ios-arrow-down" v-show="!selectGoods" style="font-size: 14px; margin-left: 8px;"/>
                                    <div class="switch-button-top" :class="{'switch-button-top-show': selectGoods}" ></div>
                                </div>
                            </div>
                            <div class="list-mask-wrapper" v-show="selectGoods">
                                <div class="list-mask">
                                    <div class="list-mask-title">已选规格</div>
                                    <div class="">
                                        <div class="sku-list-row" v-for="(item, index) in SkuList" v-show="item.quantity">
                                            <div class="info-area">
                                                <div class="sku-image">
                                                    <img class="sku-image-inner" :src="item.imageUrl">
                                                </div>
                                                <div class="sku-title">{{item.skuName}}{{item.specName}}</div>
                                                <div class="sku-price">¥{{item.supplyPrice/100}}</div>
                                            </div>
                                            <div class="">
                                                <Input style="width: 112px"  v-model="item.quantity" @on-change="val => changeVal(val, index)">
                                                    <Button slot="prepend" @click="changeQuantity(0, index)" icon="md-remove" style="width: 30px"></Button>
                                                    <Button slot="append" @click="changeQuantity(1, index)" icon="md-add" style="width: 30px"></Button>
                                                </Input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="goods-options">
                            <div class="goods-option">
                                <button class="buyBtn" @click="buyNow" type="button" style="width: 128px; min-width: 128px; padding: 0px;">
                                    <span>立即购买</span>
                                </button>
                            </div>
                            <div class="goods-option">
                                <button class="shopCartBtn" @click="addCart" type="button" style="width: 128px; min-width: 128px; padding: 0px;">
                                    <span>加入购物车</span>
                                </button>
                            </div
                        ></div>
                    </div>
                </div>
            </div>
            <div class="goods-tab">
                <div class="goods-head flex">
                    <div class="labelEle labelActive">产品介绍</div>
                    <div class="labelEle">产品评价(98073)</div>
                </div>
                <div>
                    <div class="">
                        <div class="detailHeader">
                            <div class="subItemWrapper" v-for="item in attrList">
                                <div class="subItemLabel">{{item.attrName}}</div>
                                <div class="subItemVal">{{item.attrValue}}</div>
                            </div>
                        </div>
                        <div class="detailContent">
                            <img v-for="item in detailImgList" class="goodsIntroImg" :src="item.imageUrl" style="display:block">
                        </div>
                    </div>
                    <div class=""></div>
                    <div class=""></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getSpuDetail, getSkuList, AggregationSku, getSkuDetail, addCart, buyNow} from '../../service/mall/detail.service.js';
    import {cartCount} from '../../service/mall/home.service.js'; // 登出接口

    export default {
        mounted (){
            this.getSpuDetail()
            this.AggregationSku()
            this.getSkuList()
        },
        data() {
            return{
                resultPrice: 0,
                resultSize: 0,
                status: false,
                showResult: false,
                selectGoods: false,
                selectGoodsList: [],
                detailImgList: [],
                attrList: [],
                detailData:{},
                imgList: [],
                SkuList: [],
                specValueList: [],
                AggregationSkuList: []
            }
        },
        methods:{
            slectSkuListAll (index, indexChild) { //点击全部sku
                this.AggregationSkuList[index].isSelect = true
                this.AggregationSkuList[index].specValues.map((item, indexChild) => {
                    this.AggregationSkuList[index].specValues[indexChild].isSelect = false
                })
                this.setSpecValueListAll(index)
                this.$set(this.AggregationSkuList, index, this.AggregationSkuList[index])
                this.getSkuList()
            },
            slectSkuList (index, indexChild) { // 点击单个sku
                this.AggregationSkuList[index].isSelect = false
                this.AggregationSkuList[index].specValues[indexChild].isSelect = this.AggregationSkuList[index].specValues[indexChild].isSelect == true ?false : true
                this.$set(this.AggregationSkuList, index, this.AggregationSkuList[index])
                this.setSpecValueList(this.AggregationSkuList[index].specValues[indexChild].isSelect, index, indexChild)
            },
            setSpecValueListAll(_index){ //处理sku
                this.AggregationSkuList[_index].specValues.map((item, index) => {
                    this.specValueList.map((itemChild, indexChild) => {
                        if (itemChild == item.v) {
                            console.log(itemChild)
                            this.specValueList.splice(indexChild, 1)
                        }
                    })
                })
                this.getSkuList()
            },
            setSpecValueList(_isSelect, _index, _indexChild){
                let v = this.AggregationSkuList[_index].specValues[_indexChild].v
                if (_isSelect) {
                     this.specValueList.push(v)
                } else{
                    this.specValueList.map((item, index) => {
                        if (v == item) {
                            this.specValueList.splice(index, 1)
                        }
                    })

                }
                this.getSkuList()
            },
            changeQuantity (type, _index){//改变数量
                let nub = Number(this.SkuList[_index].quantity)
                if (type) { //++
                    this.SkuList[_index].quantity = nub+1
                } else { //--
                    this.SkuList[_index].quantity = nub > 0 ? nub-1 : nub
                }
                this.getPrice()
            },
            changeVal(val, _index){
                console.log(val.target.value)
                if (val.target.value < 0 ) {
                    this.SkuList[_index].quantity = 0
                } else {
                    this.SkuList[_index].quantity =  Number(val.target.value)
                }
                this.getPrice()
            },
            getPrice (){ // 计算价值
                let price = 0;
                let size = 0;
                this.SkuList.map((item, index) => {
                    if (item.quantity) {
                        price = this.numAdd(price, item.quantity * item.supplyPrice/100)
                        size += item.quantity
                    }
                })
                if (size == 0) {
                    this.selectGoods = false
                }
                this.resultPrice = price;
                this.resultSize = size;
                price ? this.showResult = true : this.showResult = true
                console.log(size)
            },
            showSelectGoods () { // 查看已选产品
                this.selectGoods = !this.selectGoods
            },
            buyNow(){ // 立即购买
                let params = []
                this.SkuList.map((item, index) => {
                    if (item.quantity) {
                        params.push({
                            "quantity": item.quantity,
                            "skuId": item.id
                        })
                    }
                })
                console.log({skuIds: params})
                buyNow ({skuIds: params}, (res) => {
                    if ( res.code == 0){
                        // this.$router.push({name:'cart'})
                        let routeData = this.$router.resolve({name: 'greatOrder', query: {skuIds:JSON.stringify(params)  }});
                        window.open(routeData.href, '_blank');
                    } else {
                        this.$Message.error(res.msg);
                    }
                }, (res) => {
                    this.$Message.error(res.msg);
                })
            },
            addCart(){ // 加入购物车
                let params = []
                this.SkuList.map((item, index) => {
                    if (item.quantity) {
                        params.push({
                            "quantity": item.quantity,
                            "skuId": item.id
                        })
                    }
                })
                addCart ({productList: params}, (res) => {
                    if ( res.code == 0){
                        this.cartCount()
                        this.$Message.success('已添加至购物车');
                    } else {
                        this.$Message.error(res.msg);
                    }
                }, (res) => {
                    this.$Message.error(res.msg);
                })
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
            },
            getSpuDetail(){
                let params = {
                    spuId: this.$route.query.spuId
                }
                getSpuDetail (params, (res) => {
                    if ( res.code == 0){
                        this.detailData = res.data
                        this.attrList = res.data.attrList
                        this.imgList = res.data.imgList
                        this.detailImgList = res.data.detailImgList
                        this.status = true
                    } else {
                        this.$Message.error(res.msg);
                    }
                }, (res) => {
                    this.$Message.error(res.msg);
                })
            },
            getSkuList () {
                let params = {
                    spuId: this.$route.query.spuId,
                    specValueList: this.specValueList
                }
                getSkuList (params, (res) => {
                    if ( res.code == 0){
                        this.SkuList = res.data
                    } else {
                        this.$Message.error(res.msg);
                    }
                }, (res) => {
                    this.$Message.error(res.msg);
                })
            },
            AggregationSku () {
                let params = {
                    spuId: this.$route.query.spuId
                }
                AggregationSku (params, (res) => {
                    if ( res.code == 0){
                        this.AggregationSkuList = res.data
                        this.AggregationSkuList.map((item, index) => {
                            this.AggregationSkuList[index].isSelect = true
                        })
                        console.log(this.AggregationSkuList)
                    } else {
                        this.$Message.error(res.msg);
                    }
                }, (res) => {
                    this.$Message.error(res.msg);
                })
            },
            getSkuDetail () {
                let params = {
                    skuId: this.$route.query.spuId
                }
                 console.log('123')
                getSkuDetail (params, (res) => {
                    if ( res.code == 0){
                        this.detailData = res.data
                        this.attrList = res.data.attrList
                        this.imgList = res.data.imgList
                    } else {
                        this.$Message.error(res.msg);
                    }
                }, (res) => {
                    this.$Message.error(res.msg);
                })
            }
        }
    }
</script>

<style scoped>
    .fonthover:hover{
        color: #7ea1cb ;
    }
    .detail{
        background: #fff;
    }
    .goodImage{margin-top: 24px;}
    .content{
        width: 1200px;margin: 0px auto ;
    }
    .DesHeader{
        display: flex;flex: 1 1 0%;flex-direction: row;
    }
    .goodsInfoR{
        flex: 1 1 0%;margin-left: 20px;
    }
    .goodsInfoR .goods-name {
        font-size:16px;font-weight:600;line-height:24px;color:rgba(0,0,0,0.8);padding:20px 0 12px;margin:0;
    }
    .goods-name .goods-share {
        white-space:nowrap;width:66px;font-size:12px;font-weight:400;color:rgba(0,0,0,0.8);cursor:pointer;
    }
    .goods-name .goods-n-title {
        flex: 1 1 0%;word-break: break-all;padding-right: 8px;
    }
    .priceInfo{
        width: 100%;padding: 20px 0px 20px 20px;background: rgb(245, 245, 245);
    }
    .info-block{
        display: flex;flex-flow: row nowrap;
    }
    .priceInfo .info-block:not(:first-child) {
        margin-top: 20px; padding-top: 20px;border-top: 1px dashed rgb(235, 235, 235); margin-right: 20px;
    }
    .priceInfo .info-list {
        flex: 1 1 0%;
    }
    .priceInfo .info-list .info-row {
        display: flex;flex-flow: row nowrap; -webkit-box-align: baseline;align-items: baseline;
    }
    .priceInfo .info-list .info-row .info-label {
        flex:0 0 auto;width:50px;height:12px;font-size:12px;font-weight:400;color:rgba(0,0,0,0.4);line-height:12px;margin-right:20px;text-align:right;
    }
    .priceInfo .info-list .info-row .info-text {
        flex:1 1 0;font-size:12px;font-weight:400;color:rgba(0,0,0,0.8);line-height:12px;
    }
    .priceInfo .current-price-unit {
       font-size:16px;color:#7ea1cb ;line-height:16px;font-weight:600;
    }
    .priceInfo .current-price {
        font-size:28px;color:#7ea1cb ;line-height:28px;font-weight:600;
    }
    .priceInfo .info-list .info-row:not(:first-child) {
        margin-top: 20px;
    }
    .priceInfo .price-list-item {
        height: 12px;display: inline-block;
    }
    .priceInfo .price-list-item .discount {
        color: #7ea1cb ;padding-left: 4px;font-weight: 600;
    }
    .priceInfo .sold-info {
        width:176px;height:auto;display:flex;flex-flow:column nowrap;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;border-left:1px dashed #ebebeb;
    }
    .priceInfo .sold-info .sold-info-text {
        font-size: 12px;color: rgba(0, 0, 0, 0.8);line-height: 12px;
    }
    .priceInfo .sold-info .sold-quantity {
        font-size: 16px;color: #7ea1cb ;line-height: 16px;
    }
    .priceInfo .info-list .info-row {
        display:flex;flex-flow:row nowrap;-webkit-box-align:baseline;align-items:baseline;
    }
    .priceInfo .info-list .info-row .info-label {
        flex:0 0 auto;width:50px;height:12px;font-size:12px;font-weight:400;color:rgba(0,0,0,0.4);line-height:12px;margin-right:20px;text-align:right;
    }
    .priceInfo .info-list .info-row .info-text {
        flex:1 1 0;font-size:12px;font-weight:400;color:rgba(0,0,0,0.8);line-height:12px;
    }
    .priceInfo .goods-tag {
        height:12px;font-size:12px;line-height:12px;color:#ff5d25;border:1px solid #ffdace;padding:1px 3px;background:#fff9f7;box-sizing:content-box;display:inline-block;cursor:pointer;
    }
    .priceInfo .goods-tag:not(:first-child) {
        margin-left: 8px;
    }
    .KQWTL {
        padding-top: 20px;padding-bottom: 8px;
    }
    .KQWTL .sku-select-row {
        display: flex;flex-flow: row nowrap; cursor: pointer;
    }
    .KQWTL .sku-select-row-label {
        width:68px;height:28px;line-height:28px;font-size:12px;font-weight:400;color:rgba(0,0,0,0.4);text-align:right;margin-right:20px;
    }
    .KQWTL .sku-select-row-all {
        margin-right: 12px;
    }
    .textWrapper{
        padding: 7px 12px;
         color: rgba(0, 0, 0, 0.8);
        border: 1px solid #dbdbdb;
        border-radius: 3px;
        background-color: transparent;
        cursor: pointer;
        display: inline-flex;
        font-size: 12px;
        align-items: center;
        vertical-align: middle;
    }
    .textWrapper:not(.CBX_disabled) {
        color: #7ea1cb ;
        border-color: #7ea1cb ;
    }

    .KQWTL .sku-select-row-list {
        flex: 1 1 0%; display: flex; flex-flow: row wrap;
    }
    .KQWTL .sku-select-row-item .textWrapper {
        margin-right: 12px;margin-bottom: 12px;
    }
    .selectNumBox{
        border-top: 1px solid rgb(235, 235, 235);
    }
    .selectNumBox .list-wrapper {
        overflow: hidden; transition: height 0.3s ease 0s; padding-left: 88px;
    }
    .sku-list-row{
        height:50px;box-sizing:content-box;display:flex;-webkit-box-align:center;align-items:center;
    }
    .sku-list-row:not(:first-child) {
        border-top: 1px dashed rgb(235, 235, 235);
    }
    .sku-image {
        width: 32px;height: 32px; margin-right: 12px;
    }
    .sku-image .sku-image-inner {
        width: 100%; height: 100%; display: block;box-sizing: border-box;border: 1px solid rgb(235, 235, 235);
    }
    .info-area{
        flex: 1 1 0%;display: flex; -webkit-box-align: center;align-items: center;
    }
    .sku-title {
        flex:1 1 0;height:18px;font-size:12px;font-weight:600;color:rgba(0,0,0,0.8);line-height:18px;
    }
    .sku-price {
        width:96px;height:18px;font-size:12px;text-align:center;font-weight:400;color:rgba(0,0,0,0.8);line-height:18px;
    }
    .list-pagination{
        border-top: 1px solid rgb(235, 235, 235);padding: 20px 0;
    }
    .list-button-wrapper {
        position: relative;
    }
    .list-button {
       height:48px;box-sizing:border-box;border:1px solid #ebebeb;background-color:#f5f5f5;display:flex;flex-flow:row nowrap;-webkit-box-align:center;align-items:center;cursor:pointer;position:relative;
    }
    .list-button .list-label {
       width:68px;font-size:12px;color:rgba(0,0,0,0.4);line-height:12px;text-align:right;
    }
    .list-button .goods-total {
        font-size:20px;font-weight:600;color:#7ea1cb ;line-height:20px;margin-left:20px;
    }
    .list-button .price-count {
        height:20px;font-size:20px;font-weight:600;color:#7ea1cb ;line-height:20px;padding-left:17px;position:relative;
    }
    .list-button .origin-price-count {
        margin-left:8px;font-size:12px;padding-top:4px;height:12px;box-sizing:content-box;color:#999999;line-height:12px;text-decoration:line-through;
    }
    .list-button .flex-space {
        flex: 1 1 0%;
    }
    .list-button .discount-desc {
        font-size: 12px; color: rgba(0, 0, 0, 0.8);line-height: 12px;
    }
    .list-button .switch-button {
        height:100%;width:176px;background-color:rgba(255,255,255,0);display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;margin-left:16px;border-left:1px solid #ebebeb;box-sizing:content-box;transition:background-color .3s ease 0s;
    }
    .list-button .switch-button-show{
        background: #ffff;
    }
    .list-button .switch-button-top{
       position: absolute; background-color: rgb(255, 255, 255); right: 0px; top: -1px;width: 176px; height: 3px; opacity: 0;transition: opacity 0.3s ease 0s;
    }
    .list-button .switch-button-top-show{
        opacity: 1;
    }
    .list-mask-wrapper{
       height:194px;box-shadow:rgba(0,0,0,0.1) 0 -2px 4px 0;position:absolute;top:0;left:0;right:0;overflow:hidden;box-sizing:border-box;background-color:#ffffff;transform:translateY(-100%);transition:height .3s ease 0s;z-index:100;
    }
    .list-mask{
        max-height:462px;overflow-y:auto;box-sizing:border-box;background-color:#ffffff;border-left:1px solid #ebebeb;border-right:1px solid #ebebeb;border-top:1px solid #ebebeb;padding:20px 20px 10px;max-height:462px;overflow-y:auto;box-sizing:border-box;background-color:#ffffff;border-left:1px solid #ebebeb;border-right:1px solid #ebebeb;border-top:1px solid #ebebeb;padding:20px 20px 10px;
    }
    .list-mask-wrapper .list-mask-title {
        height:12px;font-size:12px;color:rgba(0,0,0,0.4);line-height:12px;
    }
    .eGqnrC {
        display: flex;flex-direction: column; margin-top: 20px; border: 1px solid rgb(235, 235, 235);
    }
    .eGqnrC .mallFWarpper {
       padding-left:12px;height:38px;background:#f5f5f5;font-weight:600;color:rgba(0,0,0,0.8);line-height:38px;font-size:14px;
    }
    .jtftyQ {
       display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:start;justify-content:flex-start;padding:12px;min-height:72px;
    }
    .jtftyQ .brief {
        display:flex;flex:1 1 0;-webkit-box-pack:justify;justify-content:space-between;-webkit-box-align:center;align-items:center;
    }
    .jtftyQ .brief .mallLeft {
        display: flex;flex: 1 1 0%;
    }
    .jtftyQ .brief .mallLeft .goods-link {
        display: flex; -webkit-box-align: center;  align-items: center; flex: 1 1 0%;
    }
    .jtftyQ .logo {
        width:48px;height:48px;display:inline-flex;margin-right:12px;background:#ffffff;border-radius:3px;border:1px solid #ebebeb;
    }
    .jtftyQ .logo img {
        width: 100%;height: 100%;
    }
    .jtftyQ .brief .store-name {
        flex:1 1 0;font-size:14px;font-weight:600;color:rgba(0,0,0,0.8);line-height:14px;flex-wrap:wrap;padding-right:13px;word-break:break-all;
    }
    .jtftyQ .brief .customer-service {
        width:92px;height:48px;line-height:48px;text-align:center;font-size:12px;font-weight:400;color:rgba(0,0,0,0.8);border-left:1px solid #ebebeb;
    }



    .goods-options{
        margin: 24px 0px 0px 88px;display: flex; flex-flow: row nowrap; -webkit-box-align: center;align-items: center;
    }
    .goods-options .goods-option:not(:first-child) {
        margin-left: 16px;
    }
    .buyBtn{
        height: 40px;color: #fff;font-weight: 500; border-color: #7ea1cb ; border-style: solid;border-width: 1px; border-radius: 3px;background-color: #7ea1cb ;
        outline: none;cursor: pointer;font-size: 14px;
    }
     .buyBtn:hover{
         background: #ff5d25;
     }
    .shopCartBtn{
        height: 40px;color: #7ea1cb ;font-weight: 500; border-color: #7ea1cb ;border-style: solid; border-width: 1px;border-radius: 3px; background-color: #fff;
        outline: none;cursor: pointer;font-size: 14px;
    }
    .shopCartBtn:hover{
        color: #ff5d25;
    }

    .goods-head{
        width:1200px;position:relative;top:0;z-index:100;background:#f5f5f5;height:48px;line-height:48px;border-bottom:1px solid #7ea1cb ;margin-top: 50px;
    }
    .labelEle{
        cursor:pointer;display:inline-block;text-align:center;font-size:16px;min-width:112px;padding:0 24px;
    }
    .labelActive{
        background: #7ea1cb ;color: rgb(255, 255, 255);
    }
    .detailHeader {
        background:#ffffff;box-shadow:#ebebeb 0 -1px 0 0;border-bottom:1px solid #ebebeb;margin-top:1px;margin-bottom:20px;color:rgba(0,0,0,0.4);font-size:12px;display:flex;flex-wrap:wrap;padding:14px 0 14px 24px;
    }
     .detailHeader .subItemWrapper {
        display: inline-flex;
        padding: 10px 0px;
    }
    .detailHeader .subItemWrapper .subItemLabel {
        width: 96px;
        text-align: left;
        margin-right: 16px;
    }
    .detailHeader .subItemWrapper .subItemVal {
        width: 256px;
        color: rgba(0, 0, 0, 0.8);
    }
    .detailContent {
        width: 750px;min-height: 100vh;padding-top: 10px; margin: auto;
    }
    .goodsIntroImg{
        visibility: visible;width: 750px;zoom: 1;
    }

</style>
