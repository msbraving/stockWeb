<template>
    <div class="orderDetail">
        <div class="container">
            <div class="title">订单详情</div>
            <br v-show="activityIndex == 1" />
            <div class="steps" v-show="activityIndex == 1">
                 <Steps :current="title.length -1">
                    <Step v-for="item in title" :key="item.k" :title="item.k" :content="item.v ? $moment(item.v).format('YYYY-MM-DD'): ''"></Step>
                </Steps>
            </div>
            <br/><br/>
            <div class="line"></div>
            <br/><br/>
            <div class="">
                <div class="title_h">收件人信息</div>
                <Form :label-width="100" label-position="right">
                    <Row class="">
                        <Col span="8">
                            <FormItem  label="联系人:">
                                <div>{{addressEntity.userName}}</div>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="联系电话:">
                                <div>{{addressEntity.mobile}}</div>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem  label="地址:">
                                <div>{{addressEntity.fullAddress}}</div>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
            <br/><br/>
            <div class="line"></div>
            <br/><br/>
            <div>
                <div class="title_h">订单信息</div>
                <div>
                    <Form :label-width="100" label-position="right">
                        <Row class="">
                            <Col span="8">
                                <FormItem  label="采购人:">
                                    <div>{{dataObj.agentName}}</div>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="采购订单号:">
                                    <div>{{dataObj.orderTypeTitle}}</div>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem  label="需求订单号:">
                                    <div>{{bdgtMapinfo.projectName}}</div>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <br/>
                <div class="TB_innerMiddle" >
                    <div class="TB_title flex alignItems justifyBeteen">
                        <div class="flex alignItems">
                            <span class="">供应商：{{dataObj.vendorName}}</span>&emsp;&emsp;
                            <span class="">订单编号：{{dataObj.orderNo}}</span>
                            <!-- <span class="copy point">复制</span> -->
                            <a class="copy point" v-clipboard:copy="dataObj.orderNo" v-clipboard:success="onCopy" v-clipboard:error="onError"><span>复 制</span></a>
                        </div>
                        <span class="TB_title_time">订单成交时间： {{$moment(dataObj.createTime).format('YYYY-MM-DD')}}</span>
                    </div>
                    <table>
                        <thead >
                            <tr >
                                <th  class="" style="width:650px">
                                    <span> 产品信息 </span>
                                </th>
                                <th  class="" style="width:300px">
                                    <span> 规格型号 </span>
                                </th>
                                <th  class="" style="width:90px">
                                    <span>单价 </span>
                                </th>
                                <th  class="" style="width:90px">
                                    <span> 数量</span>
                                </th>
                                <th  class="" style="width:90px">
                                    <span> 批发优惠</span>
                                </th>
                                <th  class="" style="width:90px">
                                    <span> 实付金额</span>
                                </th>
                                <th  class="" style="width:90px">
                                    <span>订单状态 </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr  class=" " v-for="item in dataList">
                                <td  class="">
                                    <div class="sc-hOPghE NzEgA flex">
                                        <img class="img" :src="item.skuPicture">
                                        <div class="info-right">
                                            <div>
                                                <span class="goods-name-link" >
                                                    {{item.skuName}}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                 <td  class="">
                                    <span> {{item.specName}}</span>
                                </td>
                                <td  class="">
                                    ¥<span> {{item.price/100}}</span>
                                </td>
                                <td  class="">
                                    <div>×{{item.quantity}} </div>
                                </td>
                                <td  class="">
                                    <div>-¥ <span> 0</span></div>
                                </td>
                                <td  class="">
                                    <span style="font-weight: bold;">¥<span>{{activityIndex == 0 ? item.skuMoney/100 : item.goodsMoney/100}}</span> </span>
                                </td>
                                <td  class="">
                                    <div>{{dataObj.orderStatus}}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {detail, getOrderDetail} from '../../service/mall/order.service.js'; 
    export default {
        mounted () {
            this.init();
        },
        data() {
            return {
                activityIndex: this.$route.query.from,
                addressList:[],
                dataList: [],
                title: [],
                addressEntity: {},
                dataObj: {},
                bdgtMapinfo: {},
            }
        },
        methods:{
            onCopy: function (e) {
                this.$Message.success('复制成功');
            },
            onError: function (e) {
                this.$Message.warning('无法复制文本！');
            },
            init () {
                let params = {
                    orderId: this.$route.query.orderId
                }
                if (this.$route.query.from == 0) {
                    detail (params, (res) => {
                        if ( res.code == 0){
                            this.dataObj = res.data
                            this.dataList = res.data.orderLineEntities
                            this.addressEntity = res.data.addressEntity
                            this.bdgtMapinfo = res.data.bdgtMapinfo
                        } else {
                            this.$Message.error(res.msg);
                        }
                    }, (res) => {
                        this.$Message.error(res.msg);
                    })
                } else {
                    getOrderDetail (params, (res) => {
                        if ( res.code == 0){
                            this.title = res.data.title
                            this.addressEntity = res.data.address
                            this.dataList = res.data.order.poOrderLines
                            this.dataObj = res.data.order
                        } else {
                            this.$Message.error(res.msg);
                        }
                    }, (res) => {
                        this.$Message.error(res.msg);
                    })
                }
            },
        }
    }
</script>

<style  scoped>
    .orderDetail{
        background: #fff;overflow: hidden;height: 98vh;
    }
    .container{
        width: 1200px;margin: 0px auto ;
    }
    .title {
        font-size:20px;font-weight:400;color:rgba(0,0,0,0.8);line-height:20px;margin:20px 0;
    }
    .title_h{
        font-size:16px;font-weight:400;color:rgba(0,0,0,0.8);line-height:20px;margin-bottom:20px;
    }
    .steps{
        margin:30px 0 ;
    }
    .line{width: 100%;height: 1px;background: #ebebeb;}

    /* 列表 */
    .TB_innerMiddle {
        border: 1px solid #ebebeb;
        overflow: hidden;
        border-bottom: 1px solid #ebebeb;
        border-radius: 3px;
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
        border-bottom: 1px solid #ebebeb;
    }
    .TB_innerMiddle tbody tr td:first-child {
        text-align: left;
    }
    .TB_innerMiddle tbody tr td {
        color: rgba(0, 0, 0, 0.8);
        padding: 9px 12px;
        border-right: 1px solid #ebebeb;text-align: center;
    }
    .NzEgA .img {
        width: 52px;
        height: 52px;
        margin-right: 8px;
        flex-shrink: 0;
    }
    .orderDetailStr{color: rgb(17, 153, 238);}
    .orderDetailStr:hover{text-decoration: underline;}
</style>