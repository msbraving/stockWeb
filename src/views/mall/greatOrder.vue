<template>
    <div class="greatOrder">
        <div class="container">
            <div class="title">结算页</div>
            <div class="checkout-tit">
                <span class="tit-txt">填写并核对订单信息</span>
            </div>
            <div class="checkout-steps">
                <div>
                    <div class="step-tit flex alignItems justifyBeteen">
                        <h3>收货人信息</h3>
                        <div class="addAddressBtn" @click="addNewAddress">新增收货地址</div>
                    </div>
                    <div class="consignee-wrap" id="consignee" :class="{'getmore': getMoreAddress}">
                        <ul class="consignee-ul">
                            <li class="consignee-li flex alignItems justifyBeteen " v-for="(item, index) in addressList" @click="choiceAddress(index)">
                                <div class="flex alignItems">
                                    <div class="consignee-item mr10" :class="{'item-selected': index == 0}">{{item.userName}}<b></b></div>
                                    <div class="addr-detail flex alignItems">
                                        <span class="addr-name">{{item.userName}}</span>&emsp;
                                        <span class="addr-info">{{item.fullAddress}}</span>&emsp;
                                        <span class="addr-tel">{{item.mobile}}</span>
                                    </div>
                                </div>
                                <div class="op-btns">
                                    <span class="ftx-05 setdefault-consignee" v-show="item.isDefault" @click="setAddressDefault(index)">设为默认地址</span>		
                                    <span class="ftx-05 edit-consignee" @click="editAddressFun(index)">编辑</span>
                                    <span class="ftx-05 del-consignee" @click="delAddressDefault(index)">删除</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="addr-switch switch-on" @click="show_allAddress" clstag="pageclick|keycount|trade_201602181|2">
                        <span>更多地址</span><b></b>
                    </div>
                </div>
                <div class="hr"></div>
                <div>
                    <div class="step-tit flex alignItems justifyBeteen">
                        <h3>预算账户</h3>
                    </div>
                     <Form ref="completeInfoModal" :label-width="100" label-position="right">
                        <Row class="">
                            <Col span="8">
                                <FormItem  label="采购人:">
                                    <Select v-model="buyerSelect">
                                        <Option v-for="item in buyers" :value="item.id" :key="item.id">{{ item.displayName }}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="采购类型:">
                                    <Select v-model="buytypeSelect" >
                                        <Option v-for="item in buyType" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row class="">
                            <Col span="8">
                                <FormItem  label="选择项目:">
                                    <Select v-model="projectSelect" filterable clearable  @on-query-change="getProject" @on-select="selectProject">
                                        <Option v-for="item in project" :value="item.id" :key="item.id">{{ item.projectName }}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="选择部门:">
                                    <Select v-model="departSelect" filterable clearable  @on-query-change="getDepart" @on-select="changeDepart" >
                                        <Option v-for="item in depart" :value="item.id" :key="item.id">{{ item.budgetDeptName }}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="预算账户:"> 
                                    <Select v-model="mapInfoSelect" >
                                        <Option v-for="item in mapInfo" :value="item.id" :key="item.id">{{ item.budgetName }} / 余额：{{item.budgetAmountYuan}}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div class="hr"></div>
                <div>
                    <div class="step-tit flex alignItems justifyBeteen">
                        <h3>送货清单</h3>
                        <!-- <div class="addAddressBtn">返回修改购物车</div> -->
                    </div>
                    <div>
                        <div class="header-container">
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
                            <div class="sc-bkbjAj gDLPQT" v-for="(item, index) in goodsList">
                                <div class="goods-header" id="m-lYZlDmfbi554rpvUH34eCg">
                                    <div class="gh-cell2">
                                        <span class="store-name-text">{{item.vendorName}}</span>
                                    </div>
                                </div>
                                <div class="sc-fFSRdu fdffTR" v-for="(itemSpu, indexSpu) in item.spuEntityList">
                                    <div class="goods-item-block" id="g-154330197314">
                                        <div class="gi-cell2">
                                            <img class="img" :src="itemSpu.spuImageUrl" />
                                        </div>
                                        <div class="gi-cell3">
                                            <div class="goods-name ">
                                                <span class="goods-name-link">{{itemSpu.spuName}}</span>
                                            </div>
                                            <div class="goods-sku">
                                                <div class="goods-sku-container" v-for="(itemChild, indexChild) in itemSpu.skuEntityList">
                                                    <div class="sku-left-cell1">
                                                        <div class="sku-name ">
                                                            {{itemChild.skuName}}{{itemChild.specName}}
                                                        </div>
                                                    </div>
                                                    <div class="goods-discount" >{{itemChild.spec}}</div>
                                                    <div class="goods-sku-right">
                                                        <div class="sku-right-cell1">
                                                            <span>&yen;<span>{{itemChild.supplyPrice/100}}</span></span>
                                                        </div>
                                                        <div class="sku-right-cell2">
                                                            <p style="width: 112px">{{itemChild.quantity}}</p>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hr"></div>
                <div>
                    <div class="step-tit flex alignItems justifyBeteen">
                        <h3>使用优惠/礼品卡/抵用</h3>
                    </div>

                </div>
                <div class="hr"></div>
                
            </div>
            <div class="order-summary">
                 <div class="statistic fr mt20"> 
                    <div class="list"> 
                        <span><em class="ftx-01">{{cartObj.totalQuantity}}</em> 件产品，总产品金额：</span> 
                        <em class="price" >￥{{cartObj.totalAmount/100}}</em> 
                    </div> 
                    <div class="list"> 
                        <span>运费：</span> 
                        <em class="price" id="freightPriceId"><font color="#000000"> ￥0.00</font></em> 
                    </div> 
                    <div class="list" id="cachBackdivId"> 
                        <span>优惠：</span> 
                        <em class="price" id="cachBackId" v="10"> ￥0.00</em> 
                    </div> 
                </div>
            </div>
            <div class="trade-foot">
               <div class="trade-foot-detail-com">
                    <div class="fc-price-info">
                        <span class="price-tit">应付总额：</span>
                        <span class="price-num" id="sumPayPriceId">￥{{cartObj.totalAmount/100}}</span>
                    </div>
                    <div class="fc-consignee-info">
                        <span class="mr20" id="sendAddr">寄送至：{{addressList[0] && addressList[0].fullAddress}}</span>
                        <span id="sendMobile">收货人：{{addressList[0] && addressList[0].userName}} {{addressList[0] && addressList[0].mobile}}</span>
                    </div>
                </div>
                <div class="flex justifyEnd">
                    <div class="checkout-submit-combine" @click="commitReqOrder"></div>
                </div>
            </div>
        </div>
        <div class="address" v-if="showAddress">
             <Modal
                title="新增收货人信息"
                v-model="showAddress"
                width="700px"
                @on-ok="ok"
                @on-cancel="cancel">
                <AddAddress ref="addressPage" :addressProps="editAddress" :addressValueProps="editAddressValue"></AddAddress>
            </Modal>
        </div>
    </div>
</template>

<script>
    import {buyNow, commitReqOrder,addAddress, update, del, setDefault, dList, pList, mapInfoList, getFlexByCode} from '../../service/mall/greatOrder.service.js'; 
    import AddAddress from '../common/addAddress';
    export default {
        components: {
            AddAddress
        },
         mounted () {
            this.buyNow()
            this.getProject()
            this.getDepart()
            this.getFlexByCode()
        },
        data() {
            return {
                projectSelect: '',
                mapInfoSelect: '',
                departSelect:'',
                buyerSelect: '',
                buytypeSelect: '',
                cartObj: {},
                editAddress: {},
                departObj: {},
                projectObj: {},
                editAddressValue: [],
                goodsList: [],
                areaList: [],
                addressList:[],
                buyers:[],
                buyType: [],
                depart:[],
                project:[],
                mapInfo:[],
                getMoreAddress: true,
                showAddress: false,
                editShowAddress: false
            }
        },
        methods:{
            
            setAddressDefault (_index) {
                let params = {
                    addressId: this.addressList[_index].addressId
                }
                setDefault (params, (res) => {
                    if ( res.code == 0){
                        this.buyNow()
                        this.$Message.success('设置成功');
                    } else {
                        this.$Message.error(res.msg);
                    }
                }, (res) => {
                    this.$Message.error(res.msg);
                })
            },
            editAddressFun (_index) {
                this.editShowAddress = true
                this.showAddress = true
                this.editAddress = this.addressList[_index]
                this.editAddressValue = [this.addressList[_index].province,this.addressList[_index].city,this.addressList[_index].area]
                console.log(this.editAddressValue)
            },
            delAddressDefault (_index) {
                let params = {
                    addressId: this.addressList[_index].addressId
                }
                del (params, (res) => {
                    if ( res.code == 0){
                        this.buyNow()
                        this.$Message.success('删除成功');
                    } else {
                        this.$Message.error(res.msg);
                    }
                }, (res) => {
                    this.$Message.error(res.msg);
                })
            },
            selectProject (e) {
                this.projectSelect = e.value
                 this.change()
            },
            changeDepart (e) {
                this.departSelect = e.value
                this.change()
            },
            change () {
                console.log(this. projectSelect +','+  this.departSelect)
                if (this. projectSelect && this.departSelect) {
                    let params = {
                        projectId: this.projectSelect,
                        budgetDeptId: this.departSelect,
                        current:0,size:20
                    }
                    mapInfoList (params, (res) => {
                        if ( res.code == 0){
                            this.mapInfoSelect = ''
                            this.mapInfo = res.data.records || [];
                        } else {
                            this.$Message.error(res.msg);
                        }
                    }, (res) => {
                        this.$Message.error(res.msg);
                    })
                }
            },
            show_allAddress (){
                this.getMoreAddress = !this.getMoreAddress
                document.getElementById('consignee').scrollTop=0
            },
            choiceAddress (_index){
                let arr = this.addressList
                arr[0] = arr.splice(_index, 1, arr[0])[0];
            },
            ok () {
                let address = this.$refs.addressPage.address
                let addressValue = this.$refs.addressPage.addressValue
                let params = address || {}
                console.log(this.$refs.addressPage)
                if (addressValue.length != 3) {
                    this.$Message.error('请选择省市区!');
                    return false
                }
                params.area = addressValue[2]
                params.city = addressValue[1]
                params.province = addressValue[0]

                if (this.editShowAddress) {
                    update (params, (res) => {
                        if ( res.code == 0){
                            this.buyNow()
                            this.$Message.success('添加成功');
                        } else {
                            this.$Message.error(res.msg);
                        }
                    }, (res) => {
                        this.$Message.error(res.msg);
                    })
                } else {    
                    addAddress (params, (res) => {
                        if ( res.code == 0){
                            this.buyNow()
                            this.$Message.success('添加成功');
                        } else {
                            this.$Message.error(res.msg);
                        }
                    }, (res) => {
                        this.$Message.error(res.msg);
                    })
                }
                
            },
            cancel (){
                this.showAddress = false
            },
            addNewAddress(){
                this.editShowAddress = false
                this.showAddress = true
                this.editAddress = {}
                this.editAddressValue = []
            },
            
            commitReqOrder () {
                let params = {
                    skuIds: JSON.parse(this.$route.query.skuIds),
                    addressId : this.addressList[0].addressId,
                    agentId: this.buyerSelect,
                    bdgtMapinfoId: this.mapInfoSelect,
                    isFromShoppingCart: this.$route.query.isFromShoppingCart || false,
                    orderType: this.buytypeSelect,
                    reduceAmount: 0,
                }
                if (!params.addressId) {
                    this.$Message.error('请选择收货人信息！');
                    return false
                }
                if (!params.agentId) {
                    this.$Message.error('请选择采购人！');
                    return false
                }
                if (!params.orderType) {
                    this.$Message.error('请选择采购类型！');
                    return false
                }
                if (!params.bdgtMapinfoId) {
                    this.$Message.error('请选择预算账户！');
                    return false
                }
                
                commitReqOrder (params, (res) => {
                    if ( res.code == 0){
                        this.$Message.success('提交成功!');
                        let routeData = this.$router.resolve({name: 'orderList', query: {}});
                        window.open(routeData.href, '_blank');
                    } else {
                        this.$Message.error(res.msg);
                    }
                }, (res) => {
                    this.$Message.error(res.msg);
                })
            },
            buyNow () {
                let params = JSON.parse(this.$route.query.skuIds)
                buyNow ({skuIds: params}, (res) => {
                    if ( res.code == 0){
                        this.cartObj = res.data
                        this.goodsList = res.data.product || [];
                        this.addressList = res.data.address || [];
                        this.buyers = res.data.buyers || [];
                    } else {
                        this.$Message.error(res.msg);
                    }
                }, (res) => {
                    this.$Message.error(res.msg);
                })
            },
            getProject (e ) {
                let params = {
                    current:0,size:20,projectName: e || ''
                }
                pList (params, (res) => {
                    if ( res.code == 0){
                        this.project = res.data.records || [];
                        this.projectObj = res.data || {};
                    } else {
                        this.$Message.error(res.msg);
                    }
                }, (res) => {
                    this.$Message.error(res.msg);
                })
            },
            getDepart (e) {
                let params = {
                    current:0,size:20,budgetDeptName: e || ''
                }
                dList (params, (res) => {
                    if ( res.code == 0){
                        this.depart = res.data.records || [];
                        this.departObj = res.data || {};
                    } else {
                        this.$Message.error(res.msg);
                    }
                }, (res) => {
                    this.$Message.error(res.msg);
                })
            },
            getFlexByCode () {
                getFlexByCode ({code:"ORDER_TYPE"}, (res) => {
                    if ( res.code == 0){
                        this.buyType = res.data.flexValues || [];
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

<style  scoped>
    .greatOrder{
        background: #fff;overflow: hidden;
    }
    .container{
        width: 1200px;margin: 0px auto 48px;
    }
    .title {
        font-size:20px;font-weight:400;color:rgba(0,0,0,0.8);line-height:20px;margin:20px 0;
    }
    .checkout-tit {
        height:42px;line-height:42px;font-size:16px;overflow:hidden;
    }
    .checkout-steps {
        background-color: #fff;padding: 0 20px;border: 1px solid #f0f0f0;
    }
    .checkout-steps .step-tit {
        line-height: 40px; height: 40px;  color: #333;
    }
    .checkout-steps .step-tit h3 {
        font-size: 14px;height: 40px;line-height: 40px;
    }
    .addAddressBtn{
        color: #005ea7;cursor: pointer;
    }

    .addr-switch {
        height:18px;line-height:18px;padding:0 20px;cursor:pointer;
    }
    .addr-switch.switch-on b {
        background: url(//misc.360buyimg.com/user/purchase/2.0.0/widget/consignee-scroll/i/addr-i.png) no-repeat 0 0;
    }

    .addr-switch b {
        display:inline-block;vertical-align:middle;height:10px;line-height:10px;width:9px;margin-left:5px;background:url(//misc.360buyimg.com/user/purchase/2.0.0/widget/consignee-scroll/i/addr-i.png) no-repeat 0 0;
    }
    .consignee-wrap{
        height: 168px;overflow-y: auto;
    }
    .getmore{
        height: 42px;overflow: hidden;
    }
    .consignee-ul {
        margin: 0 10px 0 20px; 
    }
    .consignee-ul .consignee-li{
        height: 30px;margin: 6px 0;cursor: pointer;
    }
    .consignee-ul .consignee-li:hover{
        background: #fff3f3;
    }
    .consignee-ul .consignee-li:hover .op-btns{display: block;}
    .consignee-ul .consignee-li .op-btns{
        text-align: right;height: 30px;line-height: 30px;display: none;
    }
    .consignee-ul .consignee-li .op-btns span{
        margin-right: 10px;
    }
    .consignee-ul .consignee-li .op-btns span:hover{
        text-decoration: underline;
    }
    .ftx-05{
        color: #005ea7;
    }
    .consignee-item{
        position:relative;border:1px solid #ddd;height:30px;line-height:30px;width:120px;text-align:center;cursor:pointer;background-color:#fff;
    }
    .item-selected{
        border: 2px solid #e4393c;
    }
    .item-selected b {
        display:block;position:absolute;right:0;bottom:0;width:12px;height:12px;overflow:hidden;background:url(//misc.360buyimg.com/user/purchase/2.0.0/css/i/selected-icon.png) no-repeat;
    }
    .hr{
        border-bottom: 1px solid #e6e6e6;height: 0; margin: 30px 0;
    }
    .mr10 {
        margin-right: 10px;
    }
    .invoice-cont {
        padding: 10px 20px;line-height: 18px;
    }
    .order-summary .statistic {
        margin-bottom:10px;margin-right:20px;margin-top:20px;display:flex;align-items:flex-end;flex-direction:column;
    }
    .order-summary .statistic .list {
        height:24px;width:300px;line-height:24px;margin-bottom:5px;display:flex;
    }
    .order-summary .statistic span {
        width:180px;margin-right:20px;display:block;text-align:right;
    }
    .order-summary .statistic em {
        color: #e4393c;
    }
    .order-summary .statistic .price {
       color:#333;width:100px;text-align:right;display:block;
    }
    .trade-foot{
        display: flex;flex-direction: column;align-items: flex-end;
    }
    .trade-foot-detail-com {
        padding:15px 10px 15px 0;line-height:20px;text-align:right;border-top:1px solid #e6e6e6;width:100%;color:#999;background-color:#f4f4f4;
    }
    .presale-price-info,.fc-consignee-info {
        margin-right: 10px;line-height: 25px;
    }
    .price-tit {
        color: #666;
    }
    .price-num {
        color:#e4393c;font-family:Verdana;font-weight:700;font-size:18px;min-width:122px;text-align:right;
    }
    .mr20 {
        margin-right: 20px;
    }
    .checkout-submit-combine {
        width:135px;height:36px;background:url(../../assets/image/btn-submit.jpg) no-repeat;cursor:pointer;overflow:hidden;margin:8px 10px 0 0;
    }
    .checkout-submit-combine:hover{
        background-position: bottom;
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
        width: 180px;text-align: right; padding-right: 40px;
    }
    .header-container .cell4 {
        width: 139px; text-align: right;
    }
    .header-container .cell5 {
        width: 220px;text-align: right;padding-right: 40px;
    }
    .header-container .cell5 .cell-quantity-title {
        display: inline-block; width: 120px; text-align: center;
    }

    /* 产品列表 */
    .gDLPQT {
        background: rgb(250, 250, 250);margin-bottom: 20px;
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
        display: flex; border: 1px solid rgb(235, 235, 235);border-top: 0 none;
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
        line-height: 42px;padding-left: 12px; border-bottom: 1px solid rgb(235, 235, 235);
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
        color: rgba(0, 0, 0, 0.8); padding-right: 60px;
    }
    .fdffTR .goods-discount {
       display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:end;justify-content:flex-end;text-align:right;line-height:2;border-left:1px dashed rgba(0,0,0,0.1);border-right:1px dashed rgba(0,0,0,0.1);padding:5px 40px 5px 0;font-size:14px;color:rgba(0,0,0,0.8);font-weight:500;min-height:80px;width:180px;
    }
    .fdffTR .goods-sku-right {
        width: 319px;display: flex;align-items: center;
    }
    .fdffTR .sku-right-cell1 {
        width: 139px; text-align: right; color: rgba(0, 0, 0, 0.8);
    }
    .fdffTR .sku-right-cell2 {
        width: 180px;display: flex;justify-content: flex-end;text-align: center;
    }
    .goods-sku-str{
        margin:15px; cursor: pointer; color: #2d8cf0;
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
</style>