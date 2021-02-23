
<template>
    <div class="cart">
        <div class="container">
            <div class="title">购物车</div>
            <div class="" v-show="goodsList.length > 0">
                <div class="header-container">
                    <div class="cell1">
                         <Checkbox v-model="cartObj.checked" @on-change="checkAllGroup" style="width:16px;height:16px;margin:0;padding:0;display: flex;"></Checkbox>
                    </div>
                    <div class="cell2">
                        <span>产品信息</span>
                        <!-- <span>原价</span> -->
                    </div>
                    <div class="cell3" style="width: 180px;">规格型号</div>
                    <div class="cell4">
                        <Poptip word-wrap width="200" trigger="hover" content="Steven Paul Jobs chairman, chief executive officer, and a co-founder of Apple Inc.">
                            <span class="title-text">批发价</span>
                        </Poptip>
                    </div>
                    <div class="cell5">
                        <div class="cell-quantity-title">数量 </div>
                    </div>
                </div>
                <div class="">
                    <div class="sc-bkbjAj gDLPQT" v-for="(item, index) in goodsList" :key="item.id">
                        <div class="goods-header" id="m-lYZlDmfbi554rpvUH34eCg">
                            <div class="gh-cell1 alignItems">
                                <Checkbox v-model="item.checked" @on-change="checkAllSpu(index)" style="width:16px;height:16px;margin:0;padding:0;display: flex;"></Checkbox>
                            </div>
                            <div class="gh-cell2">
                                <span class="store-name-text">{{item.vendorName}}</span>
                            </div>
                        </div>
                        <div class="sc-fFSRdu fdffTR" v-for="(itemSpu, indexSpu) in item.spu" :key="itemSpu.id">
                            <div class="goods-item-block" id="g-154330197314">
                                <div class="gi-cell1">
                                    <Checkbox v-model="itemSpu.checked" @on-change="checkAllSku(index, indexSpu)" style="width:16px;height:16px;margin:0;padding:0;display: flex;"></Checkbox>
                                </div>
                                <div class="gi-cell3">
                                    <div class="goods-name ">
                                        <span class="goods-name-link">{{itemSpu.spuName}}</span>
                                        <Icon type="ios-trash-outline" @click="delAllSpuGoods(index)" style="font-size: 15px; color: rgba(0, 0, 0, 0.4); cursor: pointer; margin-left: 12px;font-weight:bold;"/>
                                    </div>
                                    <div class="goods-sku">
                                        <div class="goods-sku-container" v-for="(itemChild, indexChild) in itemSpu.entityList" :key="itemChild.id">
                                          <div class="gi-cell2">
                                            <img class="img" :src="itemChild.imageUrl" />
                                          </div>

                                            <div class="sku-left-cell1">
                                                <div class="sku-name ">
                                                    <Checkbox v-model="itemChild.checked" @on-change="checkSku(index, indexSpu, indexChild)" style="margin:0;padding:0;">{{itemChild.skuName}}{{itemChild.specName}}</Checkbox>
                                                    <Icon @click="delGoods(index, indexSpu, indexChild)" type="ios-trash-outline" style="font-size: 15px; color: rgba(0, 0, 0, 0.4); cursor: pointer; margin-left: 12px;font-weight:bold;"/>
                                                </div>
                                            </div>
                                            <div class="goods-discount" >{{itemChild.spec}}</div>
                                            <div class="goods-sku-right">
                                                <div class="sku-right-cell1">
                                                    <span>&yen;<span>{{itemChild.price/100}}</span></span>
                                                </div>
                                                <div class="sku-right-cell2">
                                                    <Input style="width: 112px;" v-model="itemChild.quantity"  >
                                                        <Button slot="prepend" @click="changeQuantity(0, index, indexSpu, indexChild)" icon="md-remove" style="width: 30px"></Button>
                                                        <Button slot="append" @click="changeQuantity(1, index, indexSpu, indexChild)" icon="md-add" style="width: 30px"></Button>
                                                    </Input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="goods-sku-footer">
                                        <span class="goods-sku-str" @click="choiseNew(index)" style="margin: 15px;">再选一款</span>
                                    </div>
                                </div>
                            </div>
                            <div class="goods-total-price">
                                <div>
                                    <div class="flex-item "> 数量小计：<span class="checked-count">{{item.quantity}}</span></div>
                                </div>
                                <div class="right-item">
                                    <div class="flex-item">
                                        金额小计：<span class="price red">&yen;<span>{{item.amount/100}}</span></span>
                                    </div>
                                    <!-- <div class="red">共省 &yen; <span>0.26</span></div> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="foot"  :offset-bottom="0" >
                    <div class="sc-hHEjAm eGEZbi fixed-footer">
                        <div style="margin-left: 24px;">
                            <Checkbox v-model="cartObj.checked" @on-change="checkAllGroup">全选</Checkbox>
                        </div>
                        <a @click="delAllGoods" class="BTN_outerWrapper_1343907637 BTN_textPrimary_1343907637 BTN_small_1343907637 BTN_outerWrapperLink_1343907637" style="margin-left: 16px;"><span>删除所选产品</span></a>
                        <div class="order-info">
                            <div>
                                <!-- <span class="info-text">产品规格：<span class="count"><span>4</span>/10</span></span> -->
                                <span class="info-text">数量总计：<span class="count">{{cartObj.num}}</span></span>
                                <span class="info-text">产品金额合计：<span class="price">&yen;<span>{{cartObj.amount/100}}</span></span></span>
                            </div>
                        </div>
                        <div class="pay-btn" @click="buyNow">提交</div>
                    </div>
                </div>
            </div>
            <div class="sc-jNnnWF fCQiqA" v-show="!goodsList.length ">
                <div class="Empty_emptyContentbase ">
                    <img src="https://commimg.pddpic.com/mms_static/2019-09-27/d1ee7fb3-2562-41e1-97d9-564495d54aa3.png" class="Empty_emptyImg">
                    <div class="Empty_emptyTitle">购物车还是空的，快去添加吧！</div>
                    <div class="Empty_emptyButton">
                        <button class="sc-cTJmaU hbkwIT" @click="goHome">去首页逛逛<div class="sc-efHXLn fEpwRc"></div></button>
                    </div>
                </div>
            </div>
        </div>
        <Modal v-model="addModal"
            :title="title"
            @on-ok="ok"
            @on-cancel="cancel">
            <div>
                <div class="sc-dPaNSN KQWTL">
                    <div class="sku-select-row" v-for="(item, index) in AggregationSkuList" :key="item.id">
                        <div class="sku-select-row-label">{{item.skuName}}{{item.specName}} </div>
                        <div class="sku-select-row-all">
                            <div class="textWrapper " :class="{'CBX_disabled':!item.isSelect }" @click="slectSkuListAll(index)">全部</div>
                        </div>
                        <div class="sku-select-row-list">
                            <div class="sku-select-row-item">
                                <div class="textWrapper" :class="{'CBX_disabled':!itemChild.isSelect }" v-for="(itemChild, indexChild) in item.specValues" :key="itemChild.id" @click="slectSkuList(index, indexChild)" > {{itemChild.v}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="selectNumBox">
                    <div class="list-wrapper">
                        <div>
                            <div class="sku-list-row" v-for="(item, index) in SkuList" :key="item.id">
                                <div class="info-area">
                                    <div class="sku-image">
                                        <img class="sku-image-inner" :src="item.imageUrl">
                                    </div>
                                    <div class="sku-title">{{item.skuName}}{{item.specName}}</div>
                                </div>
                                <div class="">
                                    <Input style="width: 112px" v-model="item.quantity" @on-change="val => changeVal(val, index)" >
                                        <Button slot="prepend" @click="changeNewQuantity(0, index)" icon="md-remove" style="width: 30px"></Button>
                                        <Button slot="append" @click="changeNewQuantity(1, index)" icon="md-add" style="width: 30px"></Button>
                                    </Input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
    import {getCartGroups, addQty,  del, delBatch, buyNow} from '../../service/mall/cart.service.js';
    import {AggregationSku, getSkuList, addCart} from '../../service/mall/detail.service.js';

    export default {
        mounted () {
            this.getCartGroups()
        },
        data() {
            return {
                title: '',
                addModal: false,
                cartObj: {},
                goodsList: [],
                AggregationSkuList: [],
                SkuList: []
            }
        },
        methods:{
            checkAllGroup(){ // 选择所有
                console.log(this.goodsList)
                this.cartObj.num = 0
                this.cartObj.amount = 0
                this.goodsList.map((item, index) => {
                    item.checked = this.cartObj.checked
                    item.spu.map((itemSpu, indexSpu) => {
                        itemSpu.checked = this.cartObj.checked
                        itemSpu.entityList.map((itemChild, indexChild) => {
                            itemChild.checked = this.cartObj.checked
                            if (this.cartObj.checked) {
                                this.cartObj.num += itemChild.quantity
                                this.cartObj.amount += itemChild.quantity * itemChild.price
                            }
                        })
                    })
                })
            },
            checkAllSpu(_index){ // 选择所有spu
                let checked = this.goodsList[_index].checked
                if (!checked) {
                    this.cartObj.checked = false
                    this.$set(this.cartObj, 'checked', false )
                }
                this.goodsList[_index].spu.map((item, index) => {
                    item.checked = checked
                    if (_index == index ) {
                        item.entityList.map((itemChild, indexChild) => {
                            itemChild.checked = checked
                            if (checked) {
                                this.cartObj.num = 0
                                this.cartObj.amount = 0
                                this.cartObj.num += itemChild.quantity
                                this.cartObj.amount += itemChild.quantity * itemChild.price
                            }else {
                                this.cartObj.num -= itemChild.quantity
                                this.cartObj.amount -= itemChild.quantity * itemChild.price
                            }
                        })
                    }
                })
            },
            checkAllSku(_index, _indexSpu){ //  - 选择所有sku
                let checked = this.goodsList[_index].spu[_indexSpu].checked
                if (!checked) {
                    this.cartObj.checked = false
                    this.$set(this.cartObj, 'checked', false )
                }
                this.goodsList.map((item, index) => {
                    if (!checked) {
                        item.checked = false
                    }
                    item.spu.map((itemSpu, indexSpu) => {
                        itemSpu.checked = checked
                        itemSpu.entityList.map((itemChild, indexChild) => {
                            itemChild.checked = checked
                            if (checked) {
                                this.cartObj.num = 0
                                this.cartObj.amount = 0
                                this.cartObj.num += itemChild.quantity
                                this.cartObj.amount += itemChild.quantity * itemChild.price
                            }else {
                                this.cartObj.num -= itemChild.quantity
                                this.cartObj.amount -= itemChild.quantity * itemChild.price
                            }
                        })
                    })
                    let obj = Object.assign({}, this.goodsList[index])
                    this.$set(this.goodsList, index, obj )
                })
            },
            checkSku(_index, _indexSpu, _indexChild) { // 选择单个spu
                let entity = this.goodsList[_index].spu[_indexSpu].entityList[_indexChild]
                let checked = entity.checked

                if (!checked) {
                    this.cartObj.checked = false
                    this.cartObj.num -= entity.quantity
                    this.cartObj.amount -= entity.quantity * entity.price
                    this.$set(this.cartObj, 'checked', false )
                } else {
                    this.cartObj.num = 0
                    this.cartObj.amount = 0
                    this.cartObj.num += entity.quantity
                    this.cartObj.amount += entity.quantity * entity.price
                }
                this.goodsList.map((item, index) => {
                    if (!checked) {
                        item.checked = false
                    }
                    item.spu.map((itemSpu, indexSpu) => {
                        if (!checked) {
                            itemSpu.checked = false
                        }
                    })
                    let obj = Object.assign({}, this.goodsList[index])
                    this.$set(this.goodsList, index, obj )
                })
            },
            choiseNew(index, indexChild) { //再选一款
                this.title = this.goodsList[index].vendorName
                this.addModal = true
                this.AggregationSku()
                this.getSkuList()
            },
             getCartGroups () {
                 let params = {}
                getCartGroups (params, (res) => {
                    if ( res.code == 0){
                        this.cartObj = res.data
                        this.cartObj.num = 0;
                        this.cartObj.amount = 0;
                        let items =  res.data.items || [];
                        items && items.map((item, index) => {
                            item.spu = []
                            item.entityList.map((itemChild, indexChild) => {
                                itemChild.checked = false
                            })
                            item.spu.push({
                                checked: false,
                                entityList: item.entityList,
                                spuImageUrl: item.entityList[0].spuImageUrl,
                                spuName: item.entityList[0].spuName,
                            })
                        })
                        this.goodsList = items
                        // let obj = Object.assign({}, res.data)
                        this.$set(this.goodsList, items )
                        // console.log(items)
                    } else {
                        this.$Message.error(res.msg);
                    }
                }, (res) => {
                    this.$Message.error(res.msg);
                })
             },
             ok (){
               this.addCart()
             },
             cancel (){

             },
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
             changeVal(val, _index){
                console.log(val.target.value)
                if (val.target.value < 0 ) {
                    this.goodsList[_index].spu[_indexSpu].entityList[_indexChild].quantity = 0
                } else {
                    this.goodsList[_index].spu[_indexSpu].entityList[_indexChild].quantity =  Number(val.target.value)
                }
                this.getPrice()
            },
            changeQuantity (type, _index, _indexSpu, _indexChild){//改变数量
                let nub = Number( this.goodsList[_index].spu[_indexSpu].entityList[_indexChild].quantity)
                if (type) { //++
                    this.goodsList[_index].spu[_indexSpu].entityList[_indexChild].quantity = nub+1
                } else { //--
                    this.goodsList[_index].spu[_indexSpu].entityList[_indexChild].quantity = nub > 1 ? nub-1 : nub
                }
                this.getPrice(_index, _indexSpu, _indexChild)
            },
            changeNewQuantity (type, _index, _indexSpu, _indexChild){//新增sku 改变数量
                let nub = Number(this.SkuList[_index].quantity)
                if (type) { //++
                    this.SkuList[_index].quantity = nub+1
                } else { //--
                    this.SkuList[_index].quantity = nub > 0 ? nub-1 : nub
                }

            },
            getPrice (_index, _indexSpu, _indexChild){ // 计算价值
                let price = 0;
                let size = 0;
                this.goodsList[_index].spu[_indexSpu].entityList.map((item, index) => {
                    if (item.quantity) {
                        price = this.numAdd(price, item.quantity * item.price)
                        size += item.quantity
                    }
                })

                this.goodsList[_index].amount = price;
                this.goodsList[_index].quantity = size;
                let obj = Object.assign({}, this.goodsList[_index])
                this.$set(this.goodsList, _index, obj )
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
                        this.getCartGroups()
                        this.$Message.success('已添加至购物车');
                    } else {
                        this.$Message.error(res.msg);
                    }
                }, (res) => {
                    this.$Message.error(res.msg);
                })
            },
            delGoods (_index, _indexSpu, _indexChild){  //删除单个
                let params = {
                    skuId: this.goodsList[_index].spu[_indexSpu].entityList[_indexChild].skuId
                }
                del (params, (res) => {
                    if ( res.code == 0){
                        this.getCartGroups()
                    } else {
                        this.$Message.error(res.msg);
                    }
                }, (res) => {
                    this.$Message.error(res.msg);
                })
            },
            delAllSpuGoods (_index) { //删除单个spu下所有sku
                let params = []
                this.goodsList[_index].spu.map((item, index) => {
                    item.entityList.map((itemChild, indexChild) => {
                        params.push(itemChild.skuId)
                    })
                })
                delBatch (params, (res) => {
                    if ( res.code == 0){
                        this.getCartGroups()
                    } else {
                        this.$Message.error(res.msg);
                    }
                }, (res) => {
                    this.$Message.error(res.msg);
                })
            },
            delAllGoods (){  //批量删除
                let params = []
                this.goodsList.map((item, index) => {
                    item.spu.map((itemSpu, indexSpu) => {
                        itemSpu.entityList.map((itemChild, indexChild) => {
                            params.push(itemChild.skuId)
                        })
                    })
                })
                delBatch (params, (res) => {
                    if ( res.code == 0){
                        this.getCartGroups()
                    } else {
                        this.$Message.error(res.msg);
                    }
                }, (res) => {
                    this.$Message.error(res.msg);
                })
            },
            goHome (){
                let routeData = this.$router.resolve({name: 'home'});
                window.open(routeData.href, '_blank');
            },
            buyNow () {
                let params = []
                this.goodsList.map((item, index) => {
                    item.spu.map((itemSpu, indexSpu) => {
                        itemSpu.entityList.map((itemChild, indexChild) => {
                            if (itemChild.checked) {
                                params.push({
                                    "quantity": itemChild.quantity,
                                    "skuId": itemChild.skuId
                                })
                            }
                        })
                    })
                })
                if (params.length > 0) {
                     let routeData = this.$router.resolve({name: 'greatOrder', query: {skuIds:JSON.stringify(params), isFromShoppingCart: true  }});
                    window.open(routeData.href, '_blank');
                } else {
                    this.$Message.error('请选择产品！');
                }
                // buyNow ({skuIds: params}, (res) => {
                //     if ( res.code == 0){
                //         this.$router.push({name:'greatOrder'})
                //     } else {
                //         this.$Message.error(res.msg);
                //     }
                // }, (res) => {
                //     this.$Message.error(res.msg);
                // })
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
        }
    }
</script>

<style scoped>
    .container{
        width: 1200px;margin: 0px auto 48px;
    }
    .title {
        font-size:20px;font-weight:400;color:rgba(0,0,0,0.8);line-height:20px;margin:20px 0;
    }

    /* thead */
    .header-container {
        font-size:12px;color:rgba(0,0,0,0.6);display:flex;line-height:36px;background:#fafafa;border:1px solid #ebebeb;margin-bottom:10px;
    }
    .header-container .cell1 {
       width:36px;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;border-right:1px solid #ebebeb;
    }
    .header-container .cell2 {
        padding-left:12px;display:flex;flex:1 1 0;-webkit-box-pack:justify;justify-content:space-between;padding-right:60px;
    }
    .header-container .cell3 {
        width: 180px; text-align: right; padding-right: 40px;
    }
    .header-container .cell4 {
        width: 139px; text-align: right;
    }
    .header-container .cell5 {
        width: 220px;text-align: right; padding-right: 40px;
    }
    .header-container .cell5 .cell-quantity-title {
        display: inline-block; width: 120px; text-align: center;
    }

    /* 产品列表 */
    .gDLPQT {
        background: rgb(250, 250, 250); margin-bottom: 20px;
    }
    .gDLPQT .goods-header {
        font-size:12px;color:rgba(0,0,0,0.6);display:flex;border:1px solid #ebebeb;background:#fafafa;
    }
    .gDLPQT .goods-header .gh-cell1 {
        width:36px;display:flex;-webkit-box-pack:center;justify-content:center;border-right:1px solid #ebebeb;
    }
    .gDLPQT .goods-header .gh-cell2 {
        padding-left:12px;line-height:36px;flex:1 1 0;color:rgba(0,0,0,0.8);
    }
    .fdffTR {
        background: rgb(255, 255, 255);
    }
    .fdffTR .goods-item-block {
        display:flex;border-left:1px solid #ebebeb;border-right:1px solid #ebebeb;border-bottom:1px solid #ebebeb;
    }
    .fdffTR .goods-item-block .gi-cell1 {
       width:36px;text-align:center;padding-top:10px;border-right:1px solid #ebebeb;display:flex;justify-content:center;
    }
    .fdffTR .goods-item-block .gi-cell2 {
       width:96px;display:flex;-webkit-box-pack:center;justify-content:center;border-right:1px solid #ebebeb;padding:11px 0;text-align:center;
    }
    .fdffTR .goods-item-block .gi-cell2 .img {
        width: 72px; height: 72px; margin-bottom: 4px;
    }
    .fdffTR .goods-item-block .gi-cell3 {
        flex: 1 1 0%;
    }
    .fdffTR .goods-item-block .gi-cell3 .goods-name {
        line-height: 42px;padding-left: 12px;border-bottom: 1px solid rgb(235, 235, 235);
    }
    .fdffTR .goods-item-block .gi-cell3 .goods-sku {
        padding: 0px 40px 0px 12px;
    }
    .fdffTR .goods-item-block .gi-cell3 .goods-sku .goods-sku-container {
        border-bottom:1px dashed rgba(0,0,0,0.1);display:flex;-webkit-box-align:center;align-items:center;
    }
    .fdffTR .goods-item-block .gi-cell3 .goods-sku-footer {
        display:flex;-webkit-box-pack:justify;justify-content:space-between;-webkit-box-align:center;align-items:center;
    }
    .goods-sku .sku-left-cell1 {
       flex:1 1 0;display:flex;-webkit-box-pack:justify;justify-content:space-between;-webkit-box-align:center;align-items:center;flex:1 1 0;line-height:28px;height:60px;
    }
    .goods-sku .sku-price {
        color: rgba(0, 0, 0, 0.8);padding-right: 60px;
    }
    .fdffTR .goods-discount {
        display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:end;justify-content:flex-end;text-align:right;line-height:2;border-left:1px dashed rgba(0,0,0,0.1);border-right:1px dashed rgba(0,0,0,0.1);padding:5px 40px 5px 0;font-size:14px;color:rgba(0,0,0,0.8);font-weight:500;min-height:80px;width:180px;
    }
    .fdffTR .goods-sku-right {
        width: 319px;display: flex;align-items: center;
    }
    .fdffTR .sku-right-cell1 {
        width: 139px; text-align: right;color: rgba(0, 0, 0, 0.8);
    }
    .fdffTR .sku-right-cell2 {
        width: 180px;display: flex;justify-content: flex-end;
    }
    .goods-sku-str{
        margin:15px;  cursor: pointer; color: #2d8cf0;
    }
    .goods-sku-str:hover{
       text-decoration: underline;
    }
    .fdffTR .goods-total-price {
        text-align:right;height:70px;position:relative;border-left:1px solid #ebebeb;border-right:1px solid #ebebeb;border-bottom:1px solid #ebebeb;font-size:12px;color:rgba(0,0,0,0.8);display:flex;-webkit-box-pack:end;justify-content:flex-end;padding:14px 40px 0 0;line-height:1.5;
    }
    .fdffTR .goods-total-price .checked-count {
        font-size: 18px; font-weight: 500;
    }
    .fdffTR .goods-total-price .right-item {
        margin-left: 40px;
    }
    .fdffTR .goods-total-price .flex-item {
        display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:end;justify-content:flex-end;
    }
    .fdffTR .goods-total-price .red {
        color: #7ea1cb ;
    }
    .fdffTR .goods-total-price .price {
        font-size: 18px;font-weight: 500;
    }
    .fdffTR .goods-total-price::after {
        content:" ";position:absolute;right:0;top:0;background:linear-gradient(270deg,#7ea1cb  0,rgba(251,52,52,0) 100%);opacity:.05;width:260px;height:100%;
    }


    /* 预算 */
    .account{
        margin-top: 50px;
    }


    /* 结算 */
    .foot{
        height: 70px; width: 1200px;width: 1200px;
    }
    .eGEZbi {
        margin:0 auto;height:70px;background:#ffffff;display:flex;-webkit-box-align:center;align-items:center;width:1200px;
    }
    .eGEZbi.fixed-footer {
        box-shadow: rgba(0, 0, 0, 0.12) 0px -2px 4px 0px;
    }
    .eGEZbi .order-info {
        flex:1 1 0;padding-right:24px;text-align:right;height:70px;display:flex;-webkit-box-pack:center;justify-content:center;flex-direction:column;line-height:1;
    }
    .eGEZbi .order-info .info-text {
        font-size:12px;color:rgba(0,0,0,0.8);margin-left:40px;display:inline-flex;-webkit-box-align:center;align-items:center;
    }
    .eGEZbi .order-info .info-text .count {
        font-weight: 600; color: rgba(0, 0, 0, 0.8);
    }
    .eGEZbi .order-info .save-amount {
        margin-top: 8px; color: #7ea1cb ;
    }
    .eGEZbi .order-info .info-text .price {
        font-size: 20px;font-weight: 600; color: #7ea1cb ;
    }
    .eGEZbi .pay-btn {
       text-align:center;width:128px;background:#7ea1cb ;position:relative;cursor:pointer;font-size:20px;font-weight:500;color:#ffffff;line-height:70px;
    }


    /* 弹框 */
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
    .hbkwIT {
        position:relative;display:inline-block;white-space:nowrap;text-align:center;vertical-align:middle;overflow:hidden;outline:none;cursor:pointer;border:none;color:rgb(255,255,255);background:#7ea1cb ;box-shadow:rgb(83 109 140 / 52%) 0px 6px 12px -4px;height:36px;font-size:16px;border-radius:18px;padding:0px 36px;margin-top:16px;
    }
    .fEpwRc {
        position:absolute;bottom:0px;right:2px;width:54px;height:54px;opacity:0.18;background:linear-gradient(270deg,rgb(255,255,255) 0%,rgba(255,255,255,0) 100%);border-radius:0px 0px 100%;
    }

</style>
