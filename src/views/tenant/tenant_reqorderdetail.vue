<template>
    <div class="u-overview" :style="{minHeight:clientHeight}">
        <div class="u-tle">
            <router-link to="/main/index">首页</router-link> / 需求详情
        </div>
        <div class="inner-header" style="border-bottom: 1px solid #e5e5e5;">
            <div class="page-title">
                <Icon type="android-radio-button-off" size="15" class="icon"></Icon> 需求详情
            </div>
          <div class="page-title-right" v-if="reqOrderData.orderStatus == '待审批'">
            <Button type="primary" @click="approved">通过</Button>
            <Button @click="reject">退回</Button>
          </div>
        </div>


        <div class="content_head">
            <Form ref="queryForm" :label-width="100" label-position="right">
                <Row>
                    <Col span="7">
                      <FormItem label="申请日期">
                        <Input type="text" v-model="reqOrderData.createTime" disabled :maxlength="50"  placeholder="申请日期"></Input>
                      </FormItem>
                    </Col>

                  <Col span="7">
                    <FormItem label="需求单号">
                      <Input type="text" v-model="reqOrderData.orderNo" disabled :maxlength="50"  placeholder="需求单号"></Input>
                    </FormItem>
                  </Col>

                  <Col span="7">
                    <FormItem label="状态">
                      <Input type="text" v-model="reqOrderData.orderStatus" disabled :maxlength="50"  placeholder="状态"></Input>
                    </FormItem>
                  </Col>

                  <Col span="7">
                    <FormItem label="采购用途">
                      <Input type="text" v-model="reqOrderData.orderTypeValue" disabled :maxlength="50"  placeholder="采购用途"></Input>
                    </FormItem>
                  </Col>


                  <Col span="7">
                    <FormItem label="所属公司">
                      <Input type="text" v-model="reqOrderData.buyerInfo.companyName" disabled :maxlength="50"  placeholder="所属公司"></Input>
                    </FormItem>
                  </Col>

                  <Col span="7">
                    <FormItem label="需求部门">
                      <Input type="text" v-model="reqOrderData.buyerInfo.groupName" disabled :maxlength="50"  placeholder="需求部门"></Input>
                    </FormItem>
                  </Col>

                  <Col span="7">
                    <FormItem label="需求人">
                      <Input type="text" v-model="reqOrderData.buyerInfo.displayName" disabled :maxlength="50"  placeholder="需求人"></Input>
                    </FormItem>
                  </Col>

                  <Col span="7">
                    <FormItem label="预算项目">
                      <Input type="text" v-model="reqOrderData.bdgtMapinfo.budgetName" disabled :maxlength="50"  placeholder="需求人"></Input>
                    </FormItem>
                  </Col>

                  <Col span="7">
                    <FormItem label="订单总金额(元)">
                      <Input type="text" v-model="reqOrderData.orderMoney/100" disabled :maxlength="50"  placeholder="需求人"></Input>
                    </FormItem>
                  </Col>

                </Row>
            </Form>
        </div>
      <div class="inner-header" style="border-bottom: 1px solid #e5e5e5;">
        <div class="page-title">
          <Icon type="android-radio-button-off" size="15" class="icon"></Icon> 收货人信息
        </div>
      </div>

      <div class="content_head">
        <Form ref="queryForm" :label-width="100" label-position="right">
          <Row>


            <Col span="7">
              <FormItem label="收货人">
                <Input type="text" v-model="reqOrderData.addressEntity.userName" disabled :maxlength="50"  placeholder="所属公司"></Input>
              </FormItem>
            </Col>

            <Col span="7">
              <FormItem label="收货人手机号">
                <Input type="text" v-model="reqOrderData.addressEntity.mobile" disabled :maxlength="50"  placeholder="需求部门"></Input>
              </FormItem>
            </Col>



            <Col span="24">
              <FormItem label="收货地址">
                <Input type="text" v-model="reqOrderData.addressEntity.fullAddress" disabled :maxlength="50"  placeholder="需求人"></Input>
              </FormItem>
            </Col>

          </Row>
        </Form>
      </div>

      <div class="inner-header" style="border-bottom: 1px solid #e5e5e5;">
        <div class="page-title">
          <Icon type="android-radio-button-off" size="15" class="icon"></Icon> 需求清单
        </div>
      </div>

        <div class="content_company">
          <Table :columns="columns" :data="reqOrderData.orderLineEntities" border show-summary :summary-method="handleSummary"></Table>


        </div>
    </div>
</template>

<script>
import {reqOrderDetail, flexValuetById, approved, reject} from '../../service/system/tenant.reqorder.js';

export default {
    computed: {

    },
    mounted () {
      if(this.$route.query.id){
        this.orderId = this.$route.query.id;
        this.getReqOrderDetail()
      }

    },
    props: {
      index: '',
      content: {}
    },
    data () {
      return {
        clientHeight: document.body.clientHeight + 'px',
        name: '',
        code: '',
        orderId: null,
        pageInfo: {
          currentPage: 1,
          limit: 10,
          totalItems: 0
        },
        reqOrderData: {buyerInfo:{}, bdgtMapinfo:{}, addressEntity:{}},
        columns: [{
          title: '序号',
          align: 'center',
          render: (h, params) => {
            return h('span', {}, params.index + 1);
          }
        }, {
          title: '产品图片',
          align: 'center',
          key: 'name',
          render: (h, params) => {
            return h('img', {
              attrs: {
                src: params.row.skuPicture,
              },
              style: {
                width: '100px'
              },
              on: {
                click: () => {

                }
              }
            });
          }
        }, {
          title: '产品名称',
          align: 'center',
          key: 'skuName'
        }, {
          title: '供应商',
          align: 'center',
          key: 'vendorName'
        }, {
          title: '数量',
          align: 'center',
          key: 'quantity'
        }, {
          title: '单价',
          align: 'center',
          key: 'price',
          render: (h, params) => {
            return h('span', params.row.price/100);
          }
        }, {
          title: '金额',
          align: 'center',
          key: 'skuMoney',
          render: (h, params) => {
            return h('span', params.row.skuMoney/100);
          }
        }]
      }
    },
    methods: {
      getReqOrderDetail () {
        let params = {
          orderId: this.orderId
        };
        reqOrderDetail(params, res => {
          if (res.code == 0) {
            this.reqOrderData = res.data;
            this.reqOrderData.createTime = this.$moment(res.data.createTime).format('YYYY-MM-DD');
            this.getFlexValuetById(res.data.orderType)
          } else {
            this.$Message.error(res.msg);
          }
        })
      },
      approved(){
        let params = {
          orderId: this.orderId
        };
        approved(params, res => {
          if (res.code == 0) {
            this.$Message.success(res.msg);
            this.getReqOrderDetail();
          } else {
            this.$Message.error(res.msg);
          }
        })
      },
      reject(){
        let params = {
          orderId: this.orderId
        };
        reject(params, res => {
          if (res.code == 0) {
            this.$Message.success(res.msg);
            this.getReqOrderDetail();
          } else {
            this.$Message.error(res.msg);
          }
        })
      },
      handleSummary ({ columns, data }) {
        const sums = {};
        columns.forEach((column, index) => {
          const key = column.key;
          if (index === 0) {
            sums[key] = {
              key,
              value: '总价'
            };
            return;
          }
          const values = data.map(item => Number(item[key]));
          if (!values.every(value => isNaN(value))) {
            const v = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
           if(index === 4){
             sums[key] = {
               key,
               value: v + ' 个'
             };
           }else if(index === 6){
             sums[key] = {
               key,
               value: v/100 + ' 元'
             };
           }else{
             sums[key] = {
               key,
               value: ''
             };
           }

          } else {
            sums[key] = {
              key,
              value: ''
            };
          }
        });

        return sums;
      },
      getFlexValuetById(orderType){
        let params = {
          code: 'ORDER_TYPE',
          valueId: orderType
        };
        flexValuetById(params, res => {
          if (res.code == 0) {
            if(res.data){
              this.reqOrderData.orderTypeValue = res.data.name;
            }
          } else {
            this.$Message.error(res.msg);
          }
        })
      },
    }
}
</script>

<style scoped>
  .content_head {
    background-color: #f6f6f6;
    padding: 20px 20px 20px 0;
  }
  .content_company{
      margin-top:20px
  }
  .tableBtnHead{
    display:flex;
    align-items:center;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
  .inner-header .page-title-right {
    display: inline-block;
    font-weight: 400;
    line-height: 30px;
    font-size: 16px;
    margin: 0 0 0 797px;
    color: #333;
  }
</style>
