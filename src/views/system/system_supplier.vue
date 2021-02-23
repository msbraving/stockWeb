<template>
    <div class="u-overview" :style="{minHeight:clientHeight}">
        <div class="u-tle">
            <router-link to="/main/index">首页</router-link> / 供应商管理
        </div>
        <div class="inner-header" style="border-bottom: 1px solid #e5e5e5;">
            <div class="page-title">
                <Icon type="android-radio-button-off" size="15" class="icon"></Icon> 供应商管理
            </div>
        </div>
        <div class="content_head">
            <Form ref="completeInfoModal" :label-width="100" label-position="right">
                <Row>
                    <Col span="8">
                        <FormItem label="租户">
                           <Select style="width:100%;" placeholder="请选择">
                                <Option :value="99">全部</Option>
                                <Option value='Y'>启用</Option>
                                <Option value='N'>停用</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="目录菜单">
                            <Cascader :data="data2" v-model="value2" filterable></Cascader>
                        </FormItem>
                    </Col>
                    <Col span="8" style="text-align: right;">
                        <div>
                            <Button type="primary" @click="getCompanyList">
                              <Icon type="md-search" />&ensp;查询
                            </Button>
                            <Button  @click="getCompanyList">
                              <Icon type="md-refresh" />&ensp;重置
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
        <div class="content_company">
          <div class="tableBtnHead">
            <Button @click="$router.push({name: 'coupon_manage_add'})" type="primary" icon="md-add" style="display: inline-block;margin-bottom:10px;">新增</Button>
          </div>
          <Table :columns="columns" :data="data" @on-select-all="selectAll" @on-selection-change="selectChange" @on-sort-change="sortableList" class="table-editcontent"></Table>
          <div class="common-table-bottom" v-if="data && data.length > 0">
              <div style="float: right;">
              <Page :total="pageInfo.totalItems" show-elevator class-name="pagination-content" show-total @on-change="pageChange" :current="pageInfo.currentPage" :page-size="pageInfo.limit" style="float:right" size="small"></Page>
              </div>
          </div>
        </div>
        <Modal
            v-model="addCompany"
            title="新增供应商用户"
            width="1280px"
            @on-ok="ok"
            @on-cancel="cancel">
            <div class="">
              <Form ref="completeInfoModal" :label-width="160" label-position="right">
                  <Row>
                      <Col span="8">
                          <FormItem label="登陆名">
                            <Input type="text" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                      <Col span="8">
                          <FormItem label="登陆密码">
                             <Input type="text" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                      <Col span="8">
                          <FormItem label="确认密码">
                             <Input type="text" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                      <Col span="8">
                          <FormItem label="用户名">
                             <Input type="text" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                      <Col span="8">
                          <FormItem label="用户邮箱">
                             <Input type="text" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                      <Col span="8">
                          <FormItem label="传真号">
                             <Input type="text" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                      <Col span="8">
                          <FormItem label="手机号">
                             <Input type="text" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                      
                      <Col span="8">
                        <FormItem label="用户类型">
                           <Select style="width:100%;" placeholder="">
                                <Option :value="99">全部</Option>
                                <Option value='Y'>启用</Option>
                                <Option value='N'>停用</Option>
                            </Select>
                        </FormItem>
                      </Col>
                      <Col span="8">
                        <FormItem label="类型">
                          <Select  filterable>
                            <Option :value="99">全部</Option>
                                <Option value='Y'>启用</Option>
                                <Option value='N'>停用</Option>
                        </Select>
                        </FormItem>
                      </Col>
                      <Col span="8">
                        <FormItem label="是否订单确认人" prop="sales_consultant" style="margin-bottom: 10px">
                          <RadioGroup >
                            <Radio label="1">
                              <span>是</span>
                            </Radio>
                            <Radio label="0">
                              <span>否</span>
                            </Radio>
                          </RadioGroup>
                        </FormItem>
                      </Col>
                      <Col span="8">
                        <FormItem label="是否供应商业务负责人" prop="sales_consultant" style="margin-bottom: 10px" >
                          <RadioGroup >
                            <Radio label="1">
                              <span>是</span>
                            </Radio>
                            <Radio label="0">
                              <span>否</span>
                            </Radio>
                          </RadioGroup>
                        </FormItem>
                      </Col>
                      <Col span="8">
                        <FormItem label="是否订单查询人" prop="sales_consultant" style="margin-bottom: 10px" >
                          <RadioGroup >
                            <Radio label="1">
                              <span>是</span>
                            </Radio>
                            <Radio label="0">
                              <span>否</span>
                            </Radio>
                          </RadioGroup>
                        </FormItem>
                      </Col>
                  </Row>
              </Form>
          </div>
        </Modal>
    </div>
</template>

<script>
  export default {
    computed: {

    },
    props: {
      index: '',
      content: {}
    },
    data () {
      return {
        clientHeight: document.body.clientHeight + 'px',
        addCompany: true,
        value1: [],
        data2: [{
            value: 'beijing',
            label: '上海分公司',
            children: [
                {
                    value: 'gugong',
                    label: '点聚'
                },
                {
                    value: 'tiantan',
                    label: 'sinoprof'
                }
            ]
        }, {
            value: 'jiangsu',
            label: '北京分公司',
            children: [
                {
                    value: 'nanjing',
                    label: '点聚'
                },
                {
                    value: 'suzhou',
                    label: 'sinoprof'
                }
            ],
        }],
        pageInfo: {
            currentPage: 1,
            limit: 10,
            totalItems: 0
        },
        data: [],
      columns: [{
        title: '序号',
        align: 'center',
        // key: 'id'
        render: (h, params) => {
          return h('span', {}, params.index + 1);
        }
      }, {
        title: '名称',
        align: 'center',
        key: 'name',
        render: (h, params) => {
          return h('div', {}, [h('span', {
            style: {
              cursor: 'pointer'
            },
            on: {
              click: (e, field, user) => {
                let that = this;
                this.$editable(e, function (value) {
                  editGroup(params.row.id, {
                    group_id: params.row.id,
                    name: value
                  }, (res) => {
                    if (res.errcode == 0) {
                      that.$Message.success(res.errmsg);
                    } else {
                      that.$Message.error(res.errmsg);
                    }
                    that.getGroups();
                  }, () => {
                    that.$Message.error('系统繁忙，请稍后重试！');
                    that.getGroups();
                  });
                  // 这里做ajax请求
                  // 如果数据没有被修改这个回调方法不会执行
                });
              }
            }
          }, params.row.name), h('Icon', {
            props: {
              type: 'compose'
            },
            style: {
              marginLeft: '10px'
            },
            class: {
              'table-icon-edit': true
            }
          }, '')]);
        }
      }, {
        title: '代码',
        align: 'center',
        key: 'created_time'
      }, {
        title: '类型',
        align: 'center',
        key: 'created_time'
      }, {
        title: '有效',
        align: 'center',
        key: 'created_time'
      }, {
        title: '省公司本部',
        align: 'center',
        key: 'created_time'
      }, {
        title: '操作',
        key: 'action',
        align: 'center',
        render: (h, params) => {
          return  h('div', {style: {marginBottom: '5px',marginTop: '5px' }}, [
              h('a', {style:{display:'block'},on: {click: () => { 
                   this.$router.push({name: 'article_manage_article_list', params: {group_id: params.row.id}});
              }}}, '失效'),
              h('a', {style:{display:'block'},on: {click: () => { 
                 this.$router.push({name: 'article_manage_article_list', params: {group_id: params.row.id}});
              }}}, '修改'),
              h('a', 
                [
                  h('Poptip',
                    {props: {title: '确认删除吗？',confirm: true,placement: 'left', },on: {'on-ok': () => {
                       this.delGroup(params.row.id);
                    }}},
                    ' 删除')
                ]
              ),
              
            ])
        }
      }]
      }
    },
    methods: {
     
    }
  }
</script>

<style scoped>
  .content_head {
    background-color: #f6f6f6;
    padding: 20px 20px 10px 0;
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
</style>
