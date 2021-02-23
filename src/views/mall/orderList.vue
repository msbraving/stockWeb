<template>
    <div class="orderList">
        <div class="container">
            <div class="title">订单列表</div>
            <div class="WholeSale flex alignItems ">
                <div class="WholeSaleTab" @click="changeMenu(index)" :class="{'WholeSaleTab_active': index == activityIndex}" v-for="(item, index) in menu" :key="item" >{{item}} </div>
            </div>
            <div class="searchBox">
                <Form ref="completeInfoModal" :label-width="100" label-position="right">
                    <Row class="">
                        <Col span="8">
                            <FormItem  label="产品名称:">
                                <Input v-model="spuName" placeholder="产品名称/订单编号"  />
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="订单编号:">
                                <Input v-model="orderNo" placeholder="产品名称/订单编号"  />
                            </FormItem>
                        </Col>
                        <Col span="8" style="text-align:right;">
                            <Button type="primary" @click="esList">搜索</Button>
                            <Button type="default" @click="restSearch">重置</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div class=" WholeSaleChild flex alignItems ">
                <div class=" WholeSaleTabChild" @click="changeChildMenu(index)" :class="{'WholeSaleChild_active': index == activityChildIndex}" v-for="(item, index) in activityIndex == 0? tabLeft : tabRight" :key="item.reqOrderStatus" >{{item && item.reqOrderStatus || item && item.poOrderStatus}}({{item && item.total}})</div>
                <!-- <div v-show="activityIndex == 1" class=" WholeSaleTabChild" @click="changeChildMenu(index)" :class="{'WholeSaleChild_active': index == activityChildIndex}" v-for="(item, index) in tabRight" :key="item" >{{item}} <span class="pop">1</span></div> -->
            </div>
            <div>
                <div class="TB_innerMiddle" v-for="item in dataList" :key="item.content.orderNo">
                    <div class="TB_title flex alignItems justifyBeteen">
                        <div class="flex alignItems">
                            <span class="">供应商：{{item.content.vendorName}}</span>&emsp;&emsp;
                            <span class="">订单编号：{{item.content.orderNo}}</span>
                            <!-- <span class="copy point">复制</span> -->
                            <a class="copy point" v-clipboard:copy="item.content.orderNo" v-clipboard:success="onCopy" v-clipboard:error="onError"><span>复 制</span></a>
                        </div>
                        <span class="TB_title_time">订单成交时间： {{$moment(item.content.createTime).format('YYYY-MM-DD')}}</span>
                    </div>
                    <table>
                        <thead >
                            <tr >
                                <th  class="" style="width:450px">
                                    <span> 产品信息 </span>
                                </th>
                                <th  class="" style="width:200px">
                                    <span> 规格型号 </span>
                                </th>
                                <th  class="" style="width:90px">
                                    <span>单价 </span>
                                </th>
                                <th  class="" style="width:90px">
                                    <span> 数量</span>
                                </th>
                                <th  class="" style="width:90px">
                                    <span> 优惠</span>
                                </th>
                                <th  class="" style="width:90px">
                                    <span> 实付金额</span>
                                </th>
                                <th  class="" style="width:90px">
                                    <span>订单状态 </span>
                                </th>
                                <th  class="" style="">
                                    <span> 操作 </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr  class=" " v-for="itemChild in  activityIndex == 0? item.content.orderLineEntities : item.content.poOrderLines" :key="itemChild.id">
                                <td  class="">
                                    <div class="sc-hOPghE NzEgA flex">
                                        <img class="img" :src="itemChild.skuPicture">
                                        <div class="info-right">
                                            <div>
                                                <span class="goods-name-link" >
                                                    {{itemChild.skuName}}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td  class="">
                                    <span> {{itemChild.specName}}</span>
                                </td>
                                <td  class="">
                                    ¥<span> {{itemChild.price/100}}</span>
                                </td>
                                <td  class="">
                                    <div>×{{itemChild.quantity}} </div>
                                </td>
                                <td  class="">
                                    <div>¥ <span> 0</span></div>
                                </td>
                                <td  class="">
                                    <span style="font-weight: bold;">¥<span>{{activityIndex == 0 ? itemChild.skuMoney/100 : itemChild.goodsMoney/100}}</span> </span>
                                </td>
                                <td  class="">
                                    <div>{{activityIndex == 0 ? tabLeft && tabLeft[activityChildIndex] && tabLeft[activityChildIndex].reqOrderStatus : tabRight && tabRight[activityChildIndex] && tabRight[activityChildIndex].poOrderStatus}}</div>
                                    <div class="point orderDetailStr"  v-show="tabRight && tabRight[activityChildIndex] && tabRight[activityChildIndex].poOrderStatus != '待发货' && tabRight[activityChildIndex].poOrderStatus != '部分发货'">快递信息</div>
                                </td>
                                <td class="">
                                    <div class="sc-kHWWFa bhyOal">
                                        <span class="orderDetailStr point" @click="orderDetail(itemChild)">订单详情 </span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="" v-show="dataList.length > 0" style="margin-top:20px">
                <div style="float: right;">
                    <Page :total="pageInfo.totalItems" show-elevator class-name="pagination-content" show-total @on-change="pageChange" :current="pageInfo.currentPage" :page-size="pageInfo.limit" style="float:right" size="small"></Page>
                </div>
            </div>
            <div class="sc-jNnnWF fCQiqA" v-show="!dataList.length ">
                <div class="Empty_emptyContentbase ">
                    <img src="https://mms-static.pinduoduo.com/static/media/empty.29b2ba2c.png" class="Empty_emptyImg">
                    <div class="Empty_emptyTitle">抱歉，没有找到相关产品</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {esList, getOrderList, reqGroupCount,poGroupCount} from '../../service/mall/order.service.js'; 
    export default {
         mounted () {
            this.esList()
            this.reqGroupCountFn()
            // this.poGroupCountFn()
        },
        data() {
            return {
                spuName: '',
                orderNo: '',
                activityIndex: 0,
                activityChildIndex: 0,
                menu: [ '需求单列表', '采购单列表'],
                tabLeft: [],
                tabRight: [],
                dataList:[],
                dataObj: {},
                pageInfo: {
                    currentPage: 1,
                    limit: 5,
                    totalItems: 0,
                    totalPages: 0
                },
            }
        },
        methods:{
            changeMenu (_index) {
                this.pageInfo={
                    currentPage: 1,
                    limit: 5,
                    totalItems: 0,
                    totalPages: 0
                }
                this.spuName= '';
                this.orderNo= '';
                this.activityChildIndex = 0
                this.activityIndex = _index
                this.esList();
                if (_index == 0) {
                     this.reqGroupCountFn()
                } else {
                    this.poGroupCountFn()
                }
            },
            changeChildMenu (_index) {
                this.activityChildIndex = _index
                this.pageInfo={
                    currentPage: 1,
                    limit: 5,
                    totalItems: 0,
                    totalPages: 0
                }
                this.esList();
            },
            restSearch () {
                this.spuName= '';
                this.orderNo= '';
                this.pageInfo={
                    currentPage: 1,
                    limit: 5,
                    totalItems: 0,
                    totalPages: 0
                }
                this.esList();
            },
            pageChange (page) {
                this.pageInfo.currentPage = page;
                this.esList();
            },
            onCopy: function (e) {
                this.$Message.success('复制成功');
            },
            onError: function (e) {
                this.$Message.warning('无法复制文本！');
            },
            orderDetail (_item) {
                let routeData = this.$router.resolve({name: 'orderDetail', query:{orderId: _item.orderId, from: this.activityIndex }});
                window.open(routeData.href, '_blank');
            },
            reqGroupCountFn () {
                reqGroupCount ({}, (res) => {
                    if ( res.code == 0){
                        this.tabLeft = res.data
                    } else {
                        this.$Message.error(res.msg);
                    }
                }, (res) => {
                    this.$Message.error(res.msg);
                })
            },
            poGroupCountFn () {
                poGroupCount ({}, (res) => {
                    if ( res.code == 0){
                        this.tabRight = res.data
                    } else {
                        this.$Message.error(res.msg);
                    }
                }, (res) => {
                    this.$Message.error(res.msg);
                })
            },
            esList () {
                let params = {
                    current: this.pageInfo.currentPage,
                    orderStatus: this.activityIndex == 0 ? this.tabLeft && this.tabLeft[this.activityChildIndex] && this.tabLeft[this.activityChildIndex].reqOrderStatus : this.tabRight && this.tabRight[this.activityChildIndex] && this.tabRight[this.activityChildIndex].poOrderStatus,
                    size: this.pageInfo.limit,
                    spuName: this.spuName,
                    orderNo: this.orderNo,
                }
                if (this.activityIndex == 0) {
                    esList (params, (res) => {
                        if ( res.code == 0){
                            this.dataList = res.data.searchHits
                            this.dataObj = res.data
                            this.pageInfo = {
                                currentPage: res.page.current,
                                limit: 5,
                                totalItems: res.page.total,
                            }
                        } else {
                            this.$Message.error(res.msg);
                        }
                    }, (res) => {
                        this.$Message.error(res.msg);
                    })
                } else {
                    console.log(213)
                    getOrderList (params, (res) => {
                        if ( res.code == 0){
                            this.dataList = res.data.searchHits
                            this.dataObj = res.data
                            this.pageInfo = {
                                currentPage: res.page.current,
                                limit: 5,
                                totalItems: res.page.total,
                            }
                        } else {
                            this.$Message.error(res.msg);
                        }
                    }, (res) => {
                        this.$Message.error(res.msg);
                    })
                }
            }
        }
    }
</script>

<style  scoped>
    .orderList{
        background: #fff;min-height: 98vh;overflow: hidden;padding-bottom: 30px;
    }
    .container{
        width: 1200px;margin: 0px auto ;
    }
    .title {
        font-size:20px;font-weight:400;color:rgba(0,0,0,0.8);line-height:20px;margin:20px 0;
    }
      /* 目录列表 */
    .WholeSale {
        height:42px;line-height:42px;font-size:16px;width: 100%;position: relative;
    }
    .WholeSale::after {
        flex:1;width:1200px;height:1px;background:#7ea1cb ;bottom:0;content:"";display:block;z-index:0;position:absolute;
    }
    .WholeSaleTab{
        cursor:pointer;display:block;height:42px;line-height:42px;padding:0 20px;position:relative;font-size:16px;border-radius: 4px 4px 0 0;border:1px solid #fff;
    }
    .WholeSaleTab_active{
        color: #7ea1cb ;background: #fff;border:1px solid #7ea1cb ;
    }
    .WholeSaleTab_active::after{
        flex:1;width:100%;bottom:-1px;content:"";display:block;left:0;z-index:1;position:absolute;
        width: 120px;height: 1px;background:#fff;
    }
    .WholeSaleChild{
        margin-bottom: 10px; background: #f7f7f7;
    }
    .WholeSaleTabChild{
        font-size: 14px;color: #666;
        cursor:pointer;padding:12px;position:relative;line-height:1;margin-right: 20px;
    }
    .WholeSaleTabChild .pop{
        color: #fff;background: #7ea1cb ;width:16px;height: 16px;line-height: 16px;display: block;text-align: center;font-size: 12px;position: absolute;
        top:5px;right:-5px;border-radius: 50%;;
    }
    .WholeSaleChild_active{
        color: #7ea1cb ;
    }
    .WholeSaleChild_active::after{
        flex:1;width:100%;bottom:0;content:"";display:block;left:45%;z-index:1;position:absolute;
        width: 10px;height: 3px;background:#7ea1cb ;
    }
    
    /* 搜索 */
    .searchBox{margin: 30px 0;}

    /* 列表 */
    .TB_innerMiddle {
        border: 1px solid #ebebeb;
        overflow: hidden;
        border-bottom: 1px solid #ebebeb;
        border-radius: 3px;
        margin-bottom: 10px;
    }
    .TB_title{
        padding: 10px 16px;
    }
    .copy{margin-left: 10px;color: rgb(17, 153, 238);}
    .copy:hover{text-decoration: underline;}
    .TB_title_time{color:rgba(0, 0, 0, 0.4) ;}
    .TB_innerMiddle table {
        width: 100%;
    }
    .TB_innerMiddle table {
        border-spacing: 0;
        border-collapse: collapse;
    }
    .TB_innerMiddle thead {
        background: #f7f7f7;
    }
    .TB_innerMiddle thead tr {
        line-height: 22px;
    }
    .TB_innerMiddle th {
        color: rgba(0, 0, 0, 0.6);
        padding: 9px 12px;
        position: relative;
        font-weight: 400;
        border-right: 1px solid #ebebeb;
        border-bottom: 1px solid #ebebeb;
    }
    .TB_innerMiddle tbody tr:last-child > td {
        border-bottom: 0;
    }
    .TB_innerMiddle tbody tr td {
        color: rgba(0, 0, 0, 0.8);
        padding: 9px 12px;
        border-right: 1px solid #ebebeb;
        border-bottom: 1px solid #ebebeb;text-align: center;
    }

    .TB_innerMiddle tbody tr td:first-child {
        text-align: left;
    }
    .NzEgA .img {
        width: 52px;
        height: 52px;
        margin-right: 8px;
        flex-shrink: 0;
    }
    .orderDetailStr{color: rgb(17, 153, 238);}
    .orderDetailStr:hover{text-decoration: underline;}

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