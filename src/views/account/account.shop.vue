<template>
  <div class="finance_goods_list">
    <div class="u-title">
      <h3><Icon type="ios-circle-outline"></Icon> 店铺管理</h3>
    </div>
    <div class="list-filter-form clearfix" style="padding-bottom: 10px;">
      <div class="clearfix mall_order_list_search" @keyup.enter="search">
        <Form ref="search" :label-width="90" @submit.native.prevent>
          <Row>
            <Col span="6">
              <FormItem label="店铺名称">
                <Input type="text" :maxlength="20" v-model="searchParams.hirerName" placeholder="店铺名称"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="所属地区">
                <Cascader @on-change="dataChange" :data="dataAddress" filterable change-on-select></Cascader>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="地址">
                <Input type="text" :maxlength="50" v-model="searchParams.hirerAddress" placeholder="地址"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="店长">
                <Input type="text" :maxlength="10" v-model="searchParams.hirerManager" placeholder="店长"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="手机号">
                <Input type="text" :maxlength="11" v-model="searchParams.hirerPhone" placeholder="手机号"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="来源">
                <Select style="width:100%;" v-model="searchParams.source">
                    <Option :value="99">全部</Option>
                    <Option value="1">中移</Option>
                    <Option value="2">渠小宝</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="创建时间">
                <DatePicker type="daterange" placeholder="选择日期和时间" style="width: 100%" @on-change="createTime"></DatePicker>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="开通时间">
                <DatePicker type="daterange" placeholder="选择日期和时间" style="width: 100%"  @on-change="openingTime"></DatePicker>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="失效时间">
                <DatePicker type="daterange" placeholder="选择日期和时间" style="width: 100%"  @on-change="expiredTime"></DatePicker>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="邀请人">
                <Input type="text" :maxlength="10" v-model="searchParams.inviter" placeholder="支付额"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="审批状态">
                <Select style="width:100%;" v-model="searchParams.approvalStatus" placeholder="请选择">
                    <Option :value="99">全部</Option>
                    <Option value="0">未审核</Option>
                    <Option value="1">通过</Option>
                    <Option value="2">不通过</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="购买服务总额">
                <Input type="text" v-model="searchParams.serviceAmount" placeholder="支付额"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="状态">
                <Select style="width:100%;" v-model="searchParams.status" placeholder="请选择">
                    <Option :value="99">全部</Option>
                    <Option value='Y'>启用</Option>
                    <Option value='N'>停用</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="18" style="text-align: right;">
              <div>
                <Button type="primary" @click="search">
                  <Icon type="search"></Icon>查询
                </Button>
                </a>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
    <div class="finance_goods_list_main_content">
      <div class="" style="clear: both;">
        <Table :columns="columns" :data="hirerdata"></Table>
      </div>
      <div class="common-table-bottom" v-if="hirerdata && hirerdata.length > 0">
        <div style="float: right;">
          <Page :total="pageInfo.total" show-elevator class-name="pagination-content" show-total @on-change="pageChange" :current="pageInfo.currentPage" :page-size="pageInfo.pageSize" style="float:right" size="small"></Page>
        </div>
      </div>
    </div>
    <Modal v-model="visible" footer-hide  class-name="vertical-center-modal">
      <Carousel loop v-if="visible">
        <CarouselItem >
          <div style="display:flex;align-items:center;">
            <img style="width:100%;" class="crop-image" :src="shopPic" alt="">
          </div>
        </CarouselItem>
        <CarouselItem style="display:flex;align-items:center;">
            <img style="width:100%;" class="crop-image" :src="codePic" alt="">
        </CarouselItem>
      </Carousel>
    </Modal>
  </div>
</template>
<script>
import {searchHirer, approve, updateHirerStatus} from '../../service/account/account.service.js'
import {areaCopy} from '../../utils/areaCopy.js'
import {cloneObj} from '../../utils/common.js'
import {baseUrl} from '../../service/config/env'
export default {
  data () {
    return {
      visible: false,
      codePic: '',
      shopPic: '',
      searchParams: {
        hirerName: '',
        hirerAddress: '',
        hirerManager: '',
        hirerPhone: '',
        approvalStatus: 99,
        source: 99,
        area: '',
        city: '',
        province: '',
        createTimeS: 0,
        createTimeE: 0,
        openingTimeS: 0,
        openingTimeE: 0,
        expiredTimeS: 0,
        expiredTimeE: 0,
        inviter: '',
        serviceAmount: '',
        status: 99,
        page: 1 // 当前页数
      },
      dataAddress: [],
      hirerdata: [],
      pageInfo: {
        totalItems: 0,
        currentPage: 1,
        pageSize: 10
      },
      columns: [{
        title: '商铺名称',
        key: 'hirerName'
      }, {
        title: '地址',
        key: 'hirerAddress',
        align: 'center',
        render: (h, params) => {
          let hirerAddress = params.row.province + params.row.city + params.row.area + params.row.hirerAddress;
          return h('span', hirerAddress);
        }
      }, {
        title: '店长',
        key: 'userName',
        align: 'center'
      }, {
        title: '手机号码',
        key: 'userTel',
        align: 'center'
      }, {
        title: '来源',
        key: 'userSource',
        align: 'center'
      }, {
        title: '邀请人',
        key: 'inviterMktUser',
        align: 'center',
        render: (h, params) => {
          let nickName = params.row.inviterMktUser ? params.row.inviterMktUser.nickName : '';
          return h('span', nickName);
        }
      }, {
        title: '所属店员',
        key: 'created_time',
        align: 'center',
        render: (h, params) => {
          let staffCount;
          staffCount = params.row.hirerInfo ? params.row.hirerInfo.staffCount + '/' + params.row.hirerInfo.mktUserQuantity : '0/0';
          return h('span', staffCount);
        }
      }, {
        title: '购买服务总额',
        key: 'serviceAmount',
        align: 'center',
        render: (h, params) => {
          let payAmount;
          payAmount = params.row.hirerInfo ? params.row.hirerInfo.payAmount : ''
          return h('span', payAmount);
        }
      }, {
        title: '开通时间',
        key: 'openingTimeS',
        align: 'center',
        render: (h, params) => {
          let datatime = '';
          if (params.row.createTime) {
            var time = new Date(params.row.createTime);
            datatime = time.getFullYear() + '年/' + (time.getMonth() + 1) + '月/' + time.getDate() + '日'
          }
          return h('span', datatime);
        }
      }, {
        title: '到期时间',
        key: 'openingTimeE',
        align: 'center',
        render: (h, params) => {
          let datatime = '';
          if (params.row.hirerInfo) {
            var time = new Date(params.row.hirerInfo.mktExpiredTime);
            datatime = time.getFullYear() + '年/' + (time.getMonth() + 1) + '月/' + time.getDate() + '日'
          }
          return h('span', datatime);
        }
      }, {
        title: '创建时间',
        key: 'createTimeS',
        align: 'center',
        render: (h, params) => {
          let datatime = '';
          if (params.row.hirerInfo && params.row.hirerInfo.createDate) {
            var time = new Date(params.row.hirerInfo.createDate);
            datatime = time.getFullYear() + '年/' + (time.getMonth() + 1) + '月/' + time.getDate() + '日'
          }
          return h('span', datatime);
        }
      }, {
        title: '审批状态',
        key: 'applyStatus',
        align: 'center',
        render: (h, params) => {
          let paramsNew = '';
          switch (params.row.applyStatus) {
            case 0:
              paramsNew = '未审核'
              break;
            case 1:
              paramsNew = '通过'
              break;
            case 2:
              paramsNew = '不通过'
              break;
          }
          return h('span', paramsNew);
        }
      }, {
        title: '状态',
        key: 'enableFlag',
        align: 'center',
        render: (h, params) => {
          let paramsNew = '';
          switch (params.row.hirerInfo && params.row.hirerInfo.enableFlag) {
            case 'Y':
              paramsNew = '启用'
              break;
            case 'N':
              paramsNew = '禁用'
              break;
          }
          return h('span', paramsNew);
        }
      }, {
        title: '操作',
        align: 'center',
        render: (h, params) => {
          return h('div', [
            h('Poptip', {
              props: {
                confirm: true,
                transfer: true,
                'ok-text': '通过',
                'cancel-text': '驳回',
                width: '200',
                title: '是否通过' + params.row.hirerName + '的申请'
              },
              style: {
                margin: '0 5px',
                float: 'left',
                cursor: 'pointer',
                display: params.row.applyStatus == 0 ? 'inline' : 'none'
              },
              on: {'on-ok': () => {
                this.approve(params.row, true)
              },
                'on-cancel': () => {
                  this.approve(params.row, false)
                }}
            }, [
              h('span', {
                style: {
                  color: '#2d8cf0'
                }
              }, '审批')
            ]),
            h('Poptip', {
              props: {
                confirm: true,
                transfer: true,
                width: '200',
                title: '是否启用' + params.row.hirerName + '的服务'
              },
              style: {
                margin: '0 5px',
                float: 'left',
                cursor: 'pointer',
                display: params.row.hirerInfo && params.row.hirerInfo.enableFlag == 'N' ? 'inline' : 'none'
              },
              on: {'on-ok': () => {
                this.updateHirerStatus(params.row, true)
              }}
            }, [
              h('span', {
                style: {
                  color: '#2d8cf0'
                }
              }, '启用')
            ]),
            h('Poptip', {
              props: {
                confirm: true,
                transfer: true,
                width: '200',
                title: '是否停用' + params.row.hirerName + '的服务'
              },
              style: {
                margin: '0 5px',
                float: 'left',
                cursor: 'pointer',
                display: params.row.hirerInfo && params.row.hirerInfo.enableFlag == 'Y' ? 'inline' : 'none'
              },
              on: {'on-ok': () => {
                this.updateHirerStatus(params.row, false)
              }}
            }, [
              h('span', {
                style: {
                  color: '#2d8cf0'
                }
              }, '停用')
            ]),
            h('a', {
              style: {
                margin: '0 5px',
                float: 'left'
              },
              on: {'click': () => {
                this.seePhoto(params.row)
              }}
            }, '资质')
          ])
        }
      }]
    }
  },
  mounted () {
    this.dataAddress = areaCopy();
    this.getShopList();
  },
  methods: {
    // 资质
    seePhoto (data) {
      let that = this;
      that.codePic = baseUrl + '/appendix/loadImg/' + data.codePic;
      that.shopPic = baseUrl + '/appendix/loadImg/' + data.shopPic;
      this.visible = true;
      // loadImg({url:data.codePic}, (res) => {
      //   if (res.code == 200) {
      //     that.getShopList();
      //   } else {
      //     that.$Message.error(res.msg);
      //   }
      // }, () => {
      //   this.$Message.error('系统繁忙，请稍后重试!');
      // });
    },
    // 审核
    approve (data, type) {
      let that = this;
      let params = {};
      params.applyId = data.id;
      params.operation = type ? '1' : '2';
      approve(params, (res) => {
        if (res.code == 200) {
          that.getShopList();
        } else {
          that.$Message.error(res.msg);
        }
      }, () => {
        this.$Message.error('系统繁忙，请稍后重试!');
      });
    },
    // 启用，停用
    updateHirerStatus (data, type) {
      let that = this;
      let params = {};
      params.hirerId = data.hirerId;
      params.status = type ? 'Y' : 'N';
      updateHirerStatus(params, (res) => {
        if (res.code == 200) {
          that.getShopList();
        } else {
          that.$Message.error(res.msg);
        }
      }, () => {
        this.$Message.error('系统繁忙，请稍后重试!');
      });
    },
    dataChange (value, selectedData) {
      this.searchParams['area'] = value[2];
      this.searchParams['city'] = value[1];
      this.searchParams['province'] = value[0];
    },
    createTime (value) {
      this.formatTime(value, 'createTimeS', 'createTimeE')
    },
    openingTime (value) {
      this.formatTime(value, 'openingTimeS', 'openingTimeE')
    },
    expiredTime (value) {
      this.formatTime(value, 'expiredTimeS', 'expiredTimeE')
    },
    formatTime (value, objS, objE) {
      let val = value;
      val.forEach((selectItem, selectIndex) => {
        var date = new Date(selectItem);
        val[selectIndex] = date.getTime();
      })
      this.searchParams[objS] = val[0]
      this.searchParams[objE] = val[1]
    },
    pageChange (page) {
      this.pageInfo.currentPage = page;
      this.getShopList();
    },
    search () {
      this.getShopList();
    },
    getShopList () {
      // 获取产品列表
      let params = cloneObj(this.searchParams);
      params.page = this.pageInfo.currentPage;
      params.approvalStatus = params.approvalStatus == 99 ? '' : params.approvalStatus;
      params.source = params.source == 99 ? '' : params.source;
      params.status = params.status == 99 ? '' : params.status;
      params.serviceAmount = params.serviceAmount == '' ? 0 : params.serviceAmount;
      // params.pagesize = this.pageInfo.pageSize;
      searchHirer(params, (res) => {
        if (res.code == 200) {
          let dt = res.data;
          dt.forEach((selectItem, selectIndex) => {
            selectItem.userSource = selectItem.inviterMktUser && selectItem.inviterMktUser.userSource;
            selectItem.nickName = selectItem.inviterMktUser && selectItem.inviterMktUser.nickName;
          })
          console.log(dt)
          this.hirerdata = dt;
          this.pageInfo.total = res.pageInfo.total;
        } else {
          this.$Message.error(res.msg);
        }
      }, () => {
        this.$Message.error('系统繁忙，请稍后重试!');
      });
    }
  }
}
</script>
<style>
.finance_goods_list_main_content {
  clear: both;
}
.list-filter-form {
  border: 1px solid #f2f2f2;
  margin-bottom: 15px;
  padding: 15px 15px 0;
}
.vertical-center-modal{
  display: flex;
  align-items: center;
  justify-content: center;
}
.ivu-modal{
  top: 0;
}
</style>
