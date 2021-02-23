<template>
    <div class="u-overview" :style="{minHeight:clientHeight}">
        <div class="u-tle">
            <router-link to="/main/index">首页</router-link> / 订单详情
        </div>



        <div class="inner-header" style="border-bottom: 1px solid #e5e5e5;">
            <div class="page-title">
                <Icon type="android-radio-button-off"   size="15" class="icon"></Icon> 订单详情
            </div>
        </div>
        <div class="content_tep">
          <Steps :current="1">
            <Step title="提交订单" content="王开春2020-01-01提交"></Step>
            <Step title="确认订单" content="王军2020-01-01审核通过"></Step>
            <Step title="已发货" content="xx发货，时间："></Step>
            <Step title="已签收" content="xx签收，时间："></Step>
            <Step title="已完成" content="已完成"></Step>
          </Steps>
        </div>

      <div class="inner-header" style="border-bottom: 1px solid #e5e5e5;">
        <div class="page-title">
          <Icon type="android-radio-button-off"   size="15" class="icon"></Icon> 订单信息
        </div>
      </div>
      <div class="content_head">
        <Form ref="queryForm" :label-width="100" label-position="right">
          <Row>


            <Col span="7">
              <FormItem label="所属公司">
                <Input type="text"  disabled :maxlength="50"  placeholder="所属公司"></Input>
              </FormItem>
            </Col>

            <Col span="7">
              <FormItem label="需求部门">
                <Input type="text"  disabled :maxlength="50"  placeholder="需求部门"></Input>
              </FormItem>
            </Col>

            <Col span="7">
              <FormItem label="需求人">
                <Input type="text" disabled :maxlength="50"  placeholder="需求人"></Input>
              </FormItem>
            </Col>

            <Col span="7">
              <FormItem label="状态">
                <Input type="text"  disabled :maxlength="50"  placeholder="状态"></Input>
              </FormItem>
            </Col>

            <Col span="7">
              <FormItem label="采购用途">
                <Input type="text"  disabled :maxlength="50"  placeholder="采购用途"></Input>
              </FormItem>
            </Col>

            <Col span="7">
              <FormItem label="预算项目">
                <Input type="text"  disabled :maxlength="50"  placeholder="需求人"></Input>
              </FormItem>
            </Col>

            <Col span="7">
              <FormItem label="订单总金额(元)">
                <Input type="text"  disabled :maxlength="50"  placeholder="需求人"></Input>
              </FormItem>
            </Col>

          </Row>
        </Form>
      </div>
      <div class="inner-header" style="margin-top:20px;border-bottom: 1px solid #e5e5e5;">
        <div class="page-title">
          <Icon type="android-radio-button-off"   size="15" class="icon"></Icon> 产品信息
        </div>
      </div>

        <div class="content_company">
          <div class="package-center-table">
            <div style="margin-top: 0px;">
              <div style="font-size: 12px; border-top: 1px solid rgb(232, 232, 232); border-right: 1px solid rgb(232, 232, 232); border-bottom: none; border-left: 1px solid rgb(232, 232, 232); border-image: initial; padding: 10px 16px;">
                <div style="display: flex; justify-content: space-between; line-height: 20px;">
                  <div style="display: flex; align-items: center;">
                    <span>订单编号：</span>
                    <span style="margin-right: 10px;">210120-208226880321861</span>
                    <div style="margin-right: 8px;">
                      <a data-tracking="86997" data-clipboard-text="210120-208226880321861" data-testid="beast-core-button-link" id="copy" class="BTN_outerWrapper_4-103-1 BTN_textPrimary_4-103-1 BTN_small_4-103-1 BTN_outerWrapperLink_4-103-1"><span>复制</span></a>
                    </div>
                  </div>
                  <div>
                    <span>订单成交时间：</span>
                    <span style="margin-left: 8px;">2020-01-01 11:11:11</span>
                  </div>
                </div>
              </div>
              <div style="font-size: 12px;">
                <div class="TB_outerWrapper_4-103-1 TB_bordered_4-103-1 TB_notTreeStriped_4-103-1">
                  <div class="TB_inner_4-103-1 TB_scrollPositionLeft_4-103-1">
                    <div class="TB_innerMiddle_4-103-1">
                      <table>
                        <colgroup>
                          <col style="width: 100px; min-width: 100px;" />
                          <col style="width: 280px; min-width: 280px;" />
                          <col style="width: 120px; min-width: 120px;" />
                          <col style="width: 80px; min-width: 80px;" />
                          <col style="width: 108px; min-width: 108px;" />
                          <col style="width: 120px; min-width: 120px;" />
                          <col style="width: 96px; min-width: 96px;" />
                          <col style="width: 96px; min-width: 96px;" />
                          <col style="width: 96px; min-width: 96px;" />
                        </colgroup>
                        <thead data-testid="beast-core-table-middle-thead">
                        <tr data-testid="beast-core-table-header-tr">
                          <th data-testid="beast-core-table-th" class="TB_cellTextAlignLeft_4-103-1"><span>产品图片</span></th>
                          <th data-testid="beast-core-table-th" class="TB_cellTextAlignLeft_4-103-1"><span>产品信息</span></th>
                          <th data-testid="beast-core-table-th" class="TB_cellTextAlignLeft_4-103-1"><span>订单/售后状态</span></th>
                          <th data-testid="beast-core-table-th" class="TB_cellTextAlignLeft_4-103-1"><span>数量</span></th>
                          <th data-testid="beast-core-table-th" class="TB_cellTextAlignLeft_4-103-1"><span>产品总价(元)</span></th>
                          <th data-testid="beast-core-table-th" class="TB_cellTextAlignLeft_4-103-1"><span>实收金额(元)</span></th>
                          <th data-testid="beast-core-table-th" class="TB_cellTextAlignLeft_4-103-1"><span>收货人</span></th>
                          <th data-testid="beast-core-table-th" class="TB_cellTextAlignLeft_4-103-1"><span>买家</span></th>
                          <th data-testid="beast-core-table-th" class="TB_cellTextAlignLeft_4-103-1 TB_rightmostTh_4-103-1"><span>操作</span></th>
                        </tr>
                        </thead>
                        <tbody data-testid="beast-core-table-middle-tbody">
                        <tr data-testid="beast-core-table-body-tr" class=" TB_whiteTr_4-103-1 ">

                          <td data-testid="beast-core-table-td" class=" TB_cellTextAlignLeft_4-103-1 TB_cellVerticalAlignMiddle_4-103-1 TB_lastCell_4-103-1">
                            <div class="goods-record-container">
                              <img data-volta="9e407233-7469-443a-847a-02320f67ada0" src="https://t16img.yangkeduo.com/garner-api/0e3d8d6a50400a7a92f56e5a27b99af0.jpeg" style="width: 52px; height: 52px; cursor: pointer;" />

                            </div>
                          </td>

                          <td data-testid="beast-core-table-td" class=" TB_cellTextAlignLeft_4-103-1 TB_cellVerticalAlignMiddle_4-103-1 TB_lastCell_4-103-1">
                            <div class="goods-record-container">
                              <div style="margin-left: 8px;">
                                <span data-testid="beast-core-icon" style="display: inline-flex;"><span class="elli_outerWrapper_4-103-1 elli_limitWidth_4-103-1" style="width: 190px;"><a data-volta="7502ae94-bf01-47d3-bdc8-8405be371987">韩国LG ReEn睿嫣润膏水凝养护燕窝洗发水一支250ml</a></span></span>
                                <p style="margin-top: 0px;">ID:205003995209</p>
                                <p style="color: rgb(51, 51, 51); text-overflow: ellipsis; width: 150px; overflow: hidden; white-space: nowrap; margin-top: 0px;">250ml</p>
                              </div>
                            </div>
                          </td>

                          <td data-testid="beast-core-table-td" class=" TB_cellTextAlignLeft_4-103-1 TB_cellVerticalAlignMiddle_4-103-1 TB_lastCell_4-103-1">
                            <div class="orderState">
                              已签收
                              <em style="display: none;">已缺货处理</em>
                              <a data-volta="76402304-9c06-4fc1-815e-9750eaa07fd1" data-testid="beast-core-button-link" class="BTN_outerWrapper_4-103-1 BTN_textPrimary_4-103-1 BTN_small_4-103-1 BTN_outerWrapperLink_4-103-1" style="margin: 0px;"><span>物流信息</span></a>
                            </div>
                          </td>

                          <td data-testid="beast-core-table-td" class=" TB_cellTextAlignLeft_4-103-1 TB_cellVerticalAlignMiddle_4-103-1 TB_lastCell_4-103-1">
                            1
                          </td>

                          <td data-testid="beast-core-table-td" class=" TB_cellTextAlignLeft_4-103-1 TB_cellVerticalAlignMiddle_4-103-1 TB_lastCell_4-103-1">
                            24.90
                          </td>

                          <td data-testid="beast-core-table-td" class=" TB_cellTextAlignLeft_4-103-1 TB_cellVerticalAlignMiddle_4-103-1 TB_lastCell_4-103-1">
                            <div style="text-align: left;">
                              <span class="BTN_outerWrapper_4-103-1 BTN_textTip_4-103-1 BTN_small_4-103-1 BTN_outerWrapperLink_4-103-1"><span>24.90</span></span>
                            </div>
                          </td>

                          <td data-testid="beast-core-table-td" class=" TB_cellTextAlignLeft_4-103-1 TB_cellVerticalAlignMiddle_4-103-1 TB_lastCell_4-103-1">
                            <div style="display: flex; flex-direction: column;">
                              ****
                            </div>
                          </td>

                          <td data-testid="beast-core-table-td" class=" TB_cellTextAlignLeft_4-103-1 TB_cellVerticalAlignMiddle_4-103-1 TB_lastCell_4-103-1">
                            <div style="display: flex; flex-direction: column;">
                              **
                            </div>
                          </td>

                          <td data-testid="beast-core-table-td" class=" TB_cellTextAlignLeft_4-103-1 TB_cellVerticalAlignMiddle_4-103-1 TB_rightmostTd_4-103-1 TB_lastCell_4-103-1">
                            <div style="display: flex; flex-direction: column; align-items: baseline;">
                              <a data-volta="6475f0a8-9307-4f54-93d2-5934ba4c07f9" data-tracking="87003" data-testid="beast-core-button-link" class="BTN_outerWrapper_4-103-1 BTN_textPrimary_4-103-1 BTN_small_4-103-1 BTN_outerWrapperLink_4-103-1" style="margin: 0px;"><span>查看详情</span></a>
                              <a data-volta="89aeb4c6-42b7-4147-a497-aa23886c205c" data-testid="beast-core-button-link" class="BTN_outerWrapper_4-103-1 BTN_textPrimary_4-103-1 BTN_small_4-103-1 BTN_outerWrapperLink_4-103-1" style="margin: 5px 0px 0px;"><span>添加备注</span></a>
                            </div>
                          </td>

                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="common-table-bottom" v-if="reqOrderData && reqOrderData.length > 0">
              <div style="float: right;">

              <Page :total="pageInfo.totalItems" show-elevator class-name="pagination-content" show-total @on-change="pageChange" :current="pageInfo.currentPage" :page-size="pageInfo.limit" style="float:right" size="small"></Page>
              </div>
          </div>
        </div>

      <div class="inner-header" style="margin-top:20px;border-bottom: 1px solid #e5e5e5;">
        <div class="page-title">
          <Icon type="android-radio-button-off"   size="15" class="icon"></Icon> 收件人信息
        </div>
      </div>

      <div>
        <div class="detail-buyer-info" style="margin-top: 20px;">
          <div class="buyer-info-container">
            <div class="buyer-receive-info">
              <div class="Grid_row_4-103-1 Grid_rowHorizontal_4-103-1 Grid_rowJustifyStart_4-103-1  " style="margin-left: -8px; margin-right: -8px; line-height: 28px;">
                <div class="Grid_col_4-103-1 " style="width: 70px; padding-left: 8px; padding-right: 8px; color: rgba(0, 0, 0, 0.8); font-size: 12px; text-align: right;">
                  联系人
                </div>
                <div class="Grid_col_4-103-1 Grid_colNotFixed_4-103-1" style="padding-left: 8px; padding-right: 8px; color: rgba(0, 0, 0, 0.8); font-size: 12px;">
                  <div>
                    王开春，13023285912
                  </div>
                </div>
              </div>
              <div class="Grid_row_4-103-1 Grid_rowHorizontal_4-103-1 Grid_rowJustifyStart_4-103-1  " style="margin-left: -8px; margin-right: -8px; line-height: 28px;">
                <div class="Grid_col_4-103-1 " style="width: 70px; padding-left: 8px; padding-right: 8px; color: rgba(0, 0, 0, 0.8); font-size: 12px; text-align: right;">
                  联系地址
                </div>
                <div class="Grid_col_4-103-1 Grid_colNotFixed_4-103-1" style="padding-left: 8px; padding-right: 8px; color: rgba(0, 0, 0, 0.8); font-size: 12px;">
                  上海市上海市长宁区天山路641号白猫科技园1号楼303a
                </div>
              </div>
            </div>
            <div style="margin-right: 24px; margin-top: 14px;">
              <button data-tracking="86997" data-clipboard-text="王开春，13023285912，上海市上海市长宁区天山路641号白猫科技园1号楼303a"  class="BTN_outerWrapper_4-103-1 BTN_gray_4-103-1 BTN_medium_4-103-1 BTN_outerWrapperBtn_4-103-1" type="button" data-testid="beast-core-button"><span>复制</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { reqOrderList, flexValuelist  } from '../../service/system/tenant.reqorder.js';

export default {
    computed: {

    },
    mounted () {
      //90天
      this.queryDate.push(this.$moment(new Date()).format('YYYY-MM-DD'));
      this.queryDate.push(this.$moment(new Date().setDate((new Date().getDate()-90))).format('YYYY-MM-DD'));

      this.getFlexValuelist();
      this.getReqOrderList();
      console.log();

    },
    props: {
      index: '',
      content: {}
    },
    data () {
      return {
        clientHeight: document.body.clientHeight + 'px',
        DatePicker: [],
        queryDate: [],
        orderStatus: '',
        pageInfo: {
          currentPage: 1,
          limit: 10,
          totalItems: 0
        },
        orderType: '',
        orderTypes: [],
        reqOrderData: [],
        columns: [{
          title: '序号',
          align: 'center',
          render: (h, params) => {
            return h('span', {}, params.index + 1);
          }
        }, {
          title: '需求单号',
          align: 'center',
          key: 'orderNo',
          minWidth: 50
        }, {
          title: '申请日期',
          align: 'center',
          key: 'type',
          render: (h, params) => {
            return h('span', this.$moment(params.row.endDate).format('YYYY-MM-DD'));
          }
        }, {
          title: '采购用途',
          align: 'center',
          key: 'enableFlag',
          render: (h, params) => {
            return h('span', this.getFlexValue(params.row.orderType));
          }
        }, {
          title: '审核状态',
          align: 'center',
          key: 'orderStatus'
        }, {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', {style: {marginBottom: '5px', marginTop: '5px' }}, [
              h('a', {style: {display: 'block'},
                on: {click: () => {
                  this.$router.push({name: 'tenant_reqorderdetail', query: {id: params.row.orderId}})
                }}}, '详情')
            ])
          }
        }]
      }
    },
    methods: {
      getFlexValuelist(){
        let params = {
          code: 'ORDER_TYPE'
        };
        flexValuelist(params, res => {
          if (res.code == 0) {
            this.orderTypes = res.data;
          } else {
            this.$Message.error(res.msg);
          }
        })
      },
      getFlexValue(id){
        let name = '';
        console.log(this.orderTypes)
        this.orderTypes.forEach(function(item, index) {
           if(item.id == id){
             name = item.name;
           }
          })
        return name;
      },
      getReqOrderList () {
        let {orderStatus, pageInfo} = this;
        if(orderStatus == ''){
          orderStatus = null;
        }
        let params = {
          current: pageInfo.currentPage,
          size: pageInfo.limit,
          orderStatus: orderStatus
        };
        reqOrderList(params, res => {
          if (res.code == 0) {
            this.reqOrderData = res.data.records;
            this.pageInfo = {
              currentPage: res.data.current,
              limit: 10,
              totalItems: res.data.total
            }
          } else {
            this.$Message.error(res.msg);
          }
        })
      },
      pageChange (index) {
        this.pageInfo.currentPage = index;
        this.getReqOrderList();
      },
      resetForm(){

      }
    }
}
</script>

<style scoped>
  .content_head {
    background-color: #f6f6f6;
    padding: 20px 20px 20px 0;
  }
  .content_radio {
    padding: 20px 20px 0 0;
  }
  .content_company{
      margin-top:10px
  }
  .content_tep{
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .detail-buyer-info .buyer-info-container {
    border: 1px solid #ebebeb;
    padding: 24px 0;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: row;
    -moz-box-orient: horizontal;
    -moz-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-justify-content: space-between;
    -moz-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }

  .Grid_rowJustifyStart_4-103-1 {
    justify-content: flex-start;
  }
   .Grid_rowHorizontal_4-103-1 {
     flex-direction: row;
   }
   .Grid_row_4-103-1 {
     display: flex;
     box-sizing: border-box;
   }

  .TB_hidden_4-103-1 {
    display: none;
  }
  .TB_outerWrapper_4-103-1 {
    color: inherit;
    font-size: 12px;
    line-height: 1.5;
  }
  .TB_outerWrapper_4-103-1 * {
    box-sizing: border-box;
  }
  .TB_outerWrapper_4-103-1 table {
    border-spacing: 0;
    border-collapse: collapse;
  }
  .TB_outerWrapper_4-103-1.TB_isTableLayoutFixed_4-103-1 table {
    table-layout: fixed;
  }
  .TB_outerWrapper_4-103-1 th, .TB_outerWrapper_4-103-1 td {
    word-break: break-word;
  }
  .TB_outerWrapper_4-103-1 td {
    font-weight: 400;
  }
  .TB_outerWrapper_4-103-1 th {
    color: rgba(0, 0, 0, 0.6);
    padding: 9px 12px;
    position: relative;
    font-weight: 400;
    border-right: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
  }
  .TB_outerWrapper_4-103-1 thead {
    background: #f7f7f7;
  }
  .TB_outerWrapper_4-103-1 thead tr {
    line-height: 22px;
  }
  .TB_outerWrapper_4-103-1 tbody tr {
    background: #fff;
  }
  .TB_outerWrapper_4-103-1 tbody tr.TB_expandedRow_4-103-1 {
    background: #FAFAFA;
  }
  .TB_outerWrapper_4-103-1 tbody tr td {
    color: rgba(0, 0, 0, 0.8);
    padding: 9px 12px;
    border-right: 1px solid #ebebeb;
  }
  .TB_outerWrapper_4-103-1 tbody tr.TB_trDisabled_4-103-1 {
    cursor: not-allowed;
  }
  .TB_outerWrapper_4-103-1 tbody tr.TB_trHover_4-103-1:not(.TB_trDisabled_4-103-1):hover {
    cursor: pointer;
    background: rgba(230, 249, 255, 1);
  }
  .TB_outerWrapper_4-103-1 tbody tr.TB_trDisabled_4-103-1 td:not(.TB_checkCell_4-103-1) {
    opacity: 0.24;
  }
  .TB_outerWrapper_4-103-1 tbody tr td.TB_rightmostTd_4-103-1 {
    border-right: 0;
  }
  .TB_outerWrapper_4-103-1 tbody tr td.TB_lastCell_4-103-1 {
    border-bottom: 0;
  }
  .TB_outerWrapper_4-103-1 th:hover .TB_resizeHandle_4-103-1 {
    opacity: 0.3;
  }
  .TB_outerWrapper_4-103-1 th.TB_rightmostTh_4-103-1 {
    overflow: hidden;
    border-right: 0;
  }
  .TB_cellTextAlignLeft_4-103-1 {
    text-align: left;
  }
  .TB_cellTextAlignCenter_4-103-1 {
    text-align: center;
  }
  .TB_cellTextAlignRight_4-103-1 {
    text-align: right;
  }
  .TB_cellVerticalAlignTop_4-103-1 {
    vertical-align: top;
  }
  .TB_cellVerticalAlignMiddle_4-103-1 {
    vertical-align: middle;
  }
  .TB_portalRow_4-103-1, .TB_portalRow_4-103-1 > tr {
    box-shadow: rgba(0, 0, 0, 0.4) 0px 5px 5px -5px;
  }
  .TB_cellVerticalAlignBottom_4-103-1 {
    vertical-align: bottom;
  }
  .TB_checkCell_4-103-1 {
    padding: 12px 0;
    text-align: left;
  }
  .TB_inner_4-103-1 {
    position: relative;
  }
  .TB_inner_4-103-1 .TB_hoveringRow_4-103-1 td {
    background: none;
  }
  .TB_innerLeft_4-103-1 {
    top: 0;
    z-index: 100;
    overflow: hidden;
    position: absolute;
    background: #fff;
    border-top: 1px solid #ebebeb;
    box-shadow: 6px 0 6px -4px rgba(0, 0, 0, 0.15);
    border-left: 1px solid #ebebeb;
    border-width: 1px 0 0 1px;
    border-radius: 3px 0 0  3px;
  }
  .TB_innerMiddle_4-103-1 {
    border: 1px solid #ebebeb;
    overflow: hidden;
    border-bottom: 1px solid #ebebeb;
    border-radius: 3px;
  }
  .TB_innerMiddle_4-103-1 table {
    width: 100%;
  }
  .TB_hiddenRowBorder_4-103-1 .TB_innerMiddle_4-103-1 {
    border-left: none;
    border-right: none;
  }
  .TB_hiddenRowBorder_4-103-1 .TB_innerLeft_4-103-1 {
    border-left: none;
  }
  .TB_hiddenRowBorder_4-103-1 .TB_innerRight_4-103-1 {
    border-right: none;
  }
  .TB_hiddenRowBorder_4-103-1 tbody tr td {
    border-right: none;
  }
  .TB_hiddenRowBorder_4-103-1 thead tr th {
    border-right: none;
  }
  .TB_innerRight_4-103-1 {
    top: 0;
    right: 0;
    z-index: 100;
    overflow: hidden;
    position: absolute;
    background: #fff;
    border-top: 1px solid #ebebeb;
    box-shadow: -6px 0 6px -4px rgba(0, 0, 0, 0.15);
    border-left: 1px solid #ebebeb;
    border-width: 1px 1px 0 1px;
    border-radius: 0 3px 3px 0;
    border-right-color: #ebebeb;
    border-right-style: solid;
  }
  .TB_innerOffFixedAndScrollX_4-103-1 table {
    width: 100% !important;
  }
  .TB_innerOffFixedAndScrollX_4-103-1 .TB_innerLeft_4-103-1, .TB_innerOffFixedAndScrollX_4-103-1 .TB_innerRight_4-103-1 {
    display: none;
  }
  .TB_innerOffFixedAndScrollX_4-103-1 .TB_header_4-103-1 table, .TB_innerOffFixedAndScrollX_4-103-1 .TB_body_4-103-1 table {
    width: 100% !important;
  }
  .TB_scrollPositionLeft_4-103-1 .TB_innerLeft_4-103-1 {
    box-shadow: none;
  }
  .TB_scrollPositionRight_4-103-1 .TB_innerRight_4-103-1 {
    box-shadow: none;
  }
  .TB_tableNoBody_4-103-1 .TB_innerMiddle_4-103-1 {
    border-bottom: 0;
  }
  .TB_scrollbarOccupySpace_4-103-1.TB_header_4-103-1::-webkit-scrollbar {
    border: 1px solid #e8e8e8;
    border-width: 0 0 1px 0;
    background-color: #f7f7f7;
  }
  .TB_header_4-103-1 > table, .TB_header_4-103-1 .TB_innerMiddle_4-103-1 table {
    width: 100%;
  }
  .TB_\$innerMiddle\ \$header_4-103-1 {
    overflow-x: auto;
  }
  .TB_body_4-103-1 {
    overflow-x: hidden;
    overflow-y: auto;
  }
  .TB_body_4-103-1 > table, .TB_body_4-103-1 .TB_innerMiddle_4-103-1 table {
    width: 100%;
  }
  .TB_groupRows_4-103-1 .TB_innerMiddle_4-103-1 {
    border: 0;
  }
  .TB_groupRows_4-103-1 .TB_innerMiddle_4-103-1 .TB_header_4-103-1 {
    border: 1px solid #ebebeb;
    border-bottom: 0;
    border-radius: 3px 3px 0 0;
  }
  .TB_groupRows_4-103-1 .TB_innerMiddle_4-103-1 .TB_bodyGroup_4-103-1 {
    border: 1px solid #ebebeb;
    margin-top: 8px;
  }
  .TB_groupRows_4-103-1 .TB_innerMiddle_4-103-1 .TB_bodyGroup_4-103-1 .TB_bodyGroupHeader_4-103-1, .TB_groupRows_4-103-1 .TB_innerMiddle_4-103-1 .TB_bodyGroup_4-103-1 .TB_bodyGroupFooter_4-103-1 {
    min-height: 36px;
  }
  .TB_groupRows_4-103-1 .TB_innerMiddle_4-103-1 .TB_bodyGroup_4-103-1 .TB_bodyGroupHeader_4-103-1 .TB_checkCell_4-103-1, .TB_groupRows_4-103-1 .TB_innerMiddle_4-103-1 .TB_bodyGroup_4-103-1 .TB_bodyGroupCell_4-103-1 {
    background: #f7f7f7;
  }
  .TB_sorters_4-103-1 {
    cursor: pointer;
    position: relative;
  }
  .TB_sorters_4-103-1:hover {
    background-color: #ebebeb;
  }
  .TB_sorters_4-103-1 .TB_sorter_4-103-1 {
    width: 13px;
    height: 20px;
    margin: auto 0 auto 5px;
    display: inline-block;
    vertical-align: middle;
  }
  .TB_sorters_4-103-1 .TB_sorterUp_4-103-1, .TB_sorters_4-103-1 .TB_sorterDown_4-103-1 {
    color: #999;
    height: 16px;
    display: block;
  }
  .TB_sorters_4-103-1 .TB_sorterUp_4-103-1.TB_active_4-103-1, .TB_sorters_4-103-1 .TB_sorterDown_4-103-1.TB_active_4-103-1 {
    color: #1890ff;
  }
  .TB_sorterUp_4-103-1 {
    transform: rotate(270deg) translate(1px, 0) scale(0.4);
  }
  .TB_sorterDown_4-103-1 {
    transform: rotate(90deg) translate(-12px, 0) scale(0.4);
  }
  .TB_filter_4-103-1 {
    display: inline-block;
  }
  .TB_filter_4-103-1 i {
    color: #999;
    cursor: pointer;
    font-size: 12px;
    margin-left: 3px;
  }
  .TB_filterDropdown_4-103-1 {
    margin: 12px 0 0 0;
    list-style: none;
  }
  .TB_filterDropdown_4-103-1, .TB_filterDropdown_4-103-1 ul, .TB_filterDropdown_4-103-1 li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .TB_filterItem_4-103-1 {
    padding: 0 8px;
    line-height: 28px;
  }
  .TB_filterItem_4-103-1-active, .TB_filterItem_4-103-1:hover {
    cursor: pointer;
    background: #e6f9ff;
  }
  .TB_filterBottom_4-103-1 {
    padding: 5px 8px;
  }
  .TB_filterSeperateLine_4-103-1 {
    width: 1px;
    height: 8px;
    display: inline-block;
    background: #dadada;
  }
  .TB_rowExpandIcon_4-103-1 {
    width: 16px;
    border: 1px solid #e8e8e8;
    cursor: pointer;
    height: 16px;
    display: inline-block;
    font-style: normal;
    text-align: center;
    line-height: 14px;
  }
  .TB_rowCollapsed_4-103-1:after {
    color: none;
    content: "+";
  }
  .TB_rowExpanded_4-103-1:after {
    color: none;
    content: "-";
  }
  .TB_rowExpandSpaced_4-103-1 {
    visibility: hidden;
  }
  .TB_rowExpandSpaced_4-103-1:after {
    content: ".";
  }
  .TB_rowExpandAreaForChildren_4-103-1 {
    margin-right: 6px;
  }
  .TB_rowIndent_4-103-1 + .TB_rowExpandIcon_4-103-1 {
    margin-right: 8px;
  }
  .TB_resizeHandle_4-103-1 {
    top: 0;
    right: -5px;
    width: 10px;
    bottom: 0;
    cursor: col-resize;
    opacity: 0;
    position: absolute;
  }
  .TB_resizeHandle_4-103-1:hover {
    opacity: 0.5;
  }
  .TB_headerBeingResized_4-103-1 .TB_resizeHandle_4-103-1 {
    opacity: 0.5;
  }
  .TB_emptyData_4-103-1 {
    color: rgba(0, 0, 0, 0.32);
    position: relative;
    background: #FAFAFA;
    text-align: center;
    padding-top: 36px;
    padding-bottom: 40px;
  }
  .TB_loading_4-103-1 {
    top: 0;
    left: 0;
    color: rgba(0, 0, 0, 0.6);
    right: 0;
    border: 1px solid #ebebeb;
    bottom: 0;
    display: flex;
    z-index: 110;
    position: absolute;
    background: rgba(255, 255, 255, 0.8);
    align-items: center;
    border-bottom: 1px solid #ebebeb;
    border-radius: 3px;
    justify-content: center;
  }
  .TB_loadingInner_4-103-1 {
    text-align: center;
  }
  .TB_loadingIcon_4-103-1 {
    color: #1199ee;
    font-size: 20px;
  }
  .TB_loadingText_4-103-1 {
    color: #666;
    font-size: 12px;
    margin-top: 10px;
  }
  .TB_bordered_4-103-1 tbody tr td {
    border-bottom: 1px solid #ebebeb;
  }
  .TB_bordered_4-103-1 tbody tr:last-child > td {
    border-bottom: 0;
  }
  .TB_notTreeStriped_4-103-1:not(.TB_bordered_4-103-1) tbody tr .TB_whiteTr_4-103-1 + tr.TB_whiteTr_4-103-1 td {
    border-top: 1px solid #ebebeb;
  }
  .TB_notTreeStriped_4-103-1:not(.TB_bordered_4-103-1) tbody tr .TB_greyTr_4-103-1 + tr.TB_whiteTr_4-103-1 td {
    border-top: 1px solid #ebebeb;
  }
  .TB_notTreeStriped_4-103-1 tbody tr.TB_whiteTr_4-103-1 {
    background: #fff;
  }
  .TB_notTreeStriped_4-103-1 tbody tr.TB_greyTr_4-103-1 {
    background: #FAFAFA;
  }
  .TB_treeStriped_4-103-1 .TB_father_4-103-1 {
    background: #fff;
  }
  .TB_treeStriped_4-103-1 .TB_children_4-103-1 {
    background: #FAFAFA;
  }
  .TB_bottom_4-103-1 {
    display: flex;
    margin-top: 10px;
  }
  .TB_bottomLeft_4-103-1 {
    flex: 1;
  }
  .TB_bottomRight_4-103-1 {
    display: flex;
    margin-left: auto;
  }
  .TB_bottomLeftNode_4-103-1 {
    display: inline-block;
  }
  .TB_isSummaryRow_4-103-1 td:last-chid {
    border-right: 0;
  }
  .TB_isSummaryStickyTop_4-103-1 td {
    top: 0;
    z-index: 1;
    position: sticky;
    background: #FAFAFA;
  }
  .TB_isSummaryStickyBottom_4-103-1 td {
    bottom: 0;
    z-index: 1;
    position: sticky;
    background: #FAFAFA;
  }
  .TB_isNewSummaryRow_4-103-1 td {
    background: inherit;
  }
</style>
