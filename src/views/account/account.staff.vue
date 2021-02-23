<template>
  <div class="finance_goods_list">
    <div class="u-title">
      <h3><Icon type="ios-circle-outline"></Icon> 员工管理</h3>
    </div>
    <div class="list-filter-form clearfix" style="padding-bottom: 10px;">
      <div class="clearfix mall_order_list_search" @keyup.enter="search">
        <Form ref="search" :label-width="90" @submit.native.prevent>
          <Row>
            <Col span="6">
              <FormItem label="姓名">
                <Input type="text" v-model="searchParams.name" placeholder="姓名"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="身份">
                <Select style="width:100%;" v-model="searchParams.identity">
                    <Option :value="99">全部</Option>
                    <Option value="visitor">游客</Option>
                    <Option value="manager">店长</Option>
                    <Option value="staff">店员</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="手机号">
                <Input type="text" :maxlength="11" v-model="searchParams.order_sn" placeholder="手机号"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="所属店铺">
                <Select style="width:100%;" v-model="searchParams.hirerId">
                  <Option :value="99">全部</Option>
                  <Option v-for="item in hirerId_list" :value="item.hirerId" :key="item.hirerId">{{ item.hirerName}}</Option>
                </Select>
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
              <FormItem label="邀请码">
                <Input type="text" v-model="searchParams.shareCode" placeholder="邀请码"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="状态">
                <Select style="width:100%;" v-model="searchParams.status">
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
        <Table :columns="columns" :data="staffdata"></Table>
      </div>
      <div class="common-table-bottom" v-if="staffdata && staffdata.length > 0">
        <div style="float: right;">
          <Page :total="pageInfo.total" show-elevator class-name="pagination-content" show-total @on-change="pageChange" :current="pageInfo.currentPage" :page-size="pageInfo.pageSize" style="float:right" size="small"></Page>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {searchStaff, getMktHirerIds} from '../../service/account/account.service.js'
import {cloneObj} from '../../utils/common.js'
export default {
  data () {
    return {
      hirerId_list: [],
      searchParams: {
        name: '',
        tel: '',
        identity: 99,
        hirerId: 99,
        source: 99,
        createTimeS: 0,
        createTimeE: 0,
        openingTimeS: 0,
        openingTimeE: 0,
        shareCode: '',
        status: 99,
        bind: '',
        page: 1
      },
      staffdata: [],
      pageInfo: {
        totalItems: 0,
        currentPage: 1,
        pageSize: 10
      },
      columns: [{
        title: '姓名',
        key: 'nickName'
      }, {
        title: '身份',
        key: 'identity',
        align: 'center',
        render: (h, params) => {
          let paramsNew = '';
          if (!params.row.mktUserGroup) {
            paramsNew = '游客'
          } else if (params.row.mktUserGroup && params.row.mktUserGroup.hirerManager == 1) {
            paramsNew = '店长'
          } else if (params.row.mktUserGroup && params.row.mktUserGroup.hirerManager == 2) {
            paramsNew = '店员'
          }
          return h('span', paramsNew);
        }
      }, {
        title: '手机号码',
        key: 'tel'
      }, {
        title: '所属店铺',
        key: 'mktHirerApply',
        align: 'center',
        render: (h, params) => {
          let paramsNew = '';
          if (params.row.mktHirerApply) {
            paramsNew = params.row.mktHirerApply.hirerName
          }
          return h('span', paramsNew);
        }
      }, {
        title: '来源',
        key: 'source',
        align: 'center'
      }, {
        title: '创建时间',
        key: 'createTime',
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
        title: '开通时间',
        key: 'openingTimeS',
        align: 'center',
        render: (h, params) => {
          let datatime = '';
          if (params.row.mktUserGroup && params.row.mktUserGroup.createTime) {
            var time = new Date(params.row.mktUserGroup.createTime);
            datatime = time.getFullYear() + '年/' + (time.getMonth() + 1) + '月/' + time.getDate() + '日'
          }
          return h('span', datatime);
        }
      }, {
        title: '邀请码',
        key: 'shareCode',
        align: 'center'
      }, {
        title: '业务记录',
        key: 'shelve_at',
        align: 'center'
      }, {
        title: '会员数',
        key: 'shelve_at',
        align: 'center'
      }, {
        title: '佣金收入',
        key: 'shelve_at',
        align: 'center'
      }, {
        title: '是否绑定',
        key: 'hirerId',
        align: 'center',
        render: (h, params) => {
          let hirerId = '';
          if (params.row.hirerId) {
            hirerId = '是'
          } else {
            hirerId = '否'
          }
          return h('span', hirerId);
        }
      }, {
        title: '状态',
        key: 'userFlag',
        align: 'center',
        render: (h, params) => {
          let userFlag = '';
          switch (params.row.userFlag) {
            case 'Y':
              userFlag = '启用'
              break;
            case 'N':
              userFlag = '禁用'
              break;
          }
          return h('span', userFlag);
        }
      }],
      data: [],
      tabType: '1',
      tabs: [{
        label: '已上架产品',
        name: 'onSale',
        type: '1'
      }, {
        label: '已售罄',
        name: 'sellOut',
        type: '3'
      }, {
        label: '未上架',
        name: 'offSale',
        type: '2'
      }]
    }
  },
  mounted () {
    this.getMktHirerIds();
  },
  methods: {
    getMktHirerIds () {
      let that = this;
      getMktHirerIds({}, (res) => {
        if (res.code == 200) {
          let dt = res.data;
          this.hirerId_list = dt;
          that.getStaffList()
        } else {
          this.$Message.error(res.msg);
        }
      }, () => {
        this.$Message.error('系统繁忙，请稍后重试!');
      });
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
      this.getGoodsList();
    },
    search () {
      this.getStaffList();
    },
    getStaffList () {
      let params = cloneObj(this.searchParams);
      params.page = this.pageInfo.currentPage;
      params.identity = params.identity == 99 ? '' : params.identity;
      params.hirerId = params.hirerId == 99 ? '' : params.hirerId;
      params.source = params.source == 99 ? '' : params.source;
      params.status = params.status == 99 ? '' : params.status;
      params.serviceAmount = params.serviceAmount == '' ? 0 : params.serviceAmount;
      // params.pagesize = this.pageInfo.pageSize;
      searchStaff(params, (res) => {
        if (res.code == 200) {
          let dt = res.data;
          this.staffdata = dt;
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
<style scoped>
.finance_goods_list_main_content {
  clear: both;
}
.list-filter-form {
  border: 1px solid #f2f2f2;
  margin-bottom: 15px;
  padding: 15px 15px 0;
}
</style>
