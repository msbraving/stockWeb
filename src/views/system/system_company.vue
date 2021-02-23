<template>
    <div class="u-overview" :style="{minHeight:clientHeight}">
        <div class="u-tle">
            <router-link to="/main/index">首页</router-link> / 公司管理
        </div>
        <div class="inner-header" style="border-bottom: 1px solid #e5e5e5;">
            <div class="page-title">
                <Icon type="android-radio-button-off" size="15" class="icon"></Icon> 公司管理
            </div>
        </div>
        <div class="content_head">
            <Form ref="queryForm" :label-width="100" label-position="right">
                <Row>
                    <Col span="7">
                      <FormItem label="公司名称">
                        <Input type="text" v-model="name" :maxlength="50"  placeholder="请输入公司名称"></Input>
                      </FormItem>
                    </Col>

                  <Col span="7">
                    <FormItem label="公司代码">
                      <Input type="text" v-model="code" :maxlength="50"  placeholder="请输入公司代码"></Input>
                    </FormItem>
                  </Col>

                    <Col span="7" style="text-align: right;">
                        <div>
                            <Button type="primary" @click="getCompanyList">
                              <Icon type="md-search" />&ensp;查询
                            </Button>
                            <Button  @click="resetForm">
                              <Icon type="md-refresh" />&ensp;重置
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
        <div class="content_company">
          <div class="tableBtnHead">
            <Button @click="add" type="primary" icon="md-add" style="display: inline-block;margin-bottom:10px;">新增</Button>
          </div>
          <Table :columns="columns"  :data="compangyListData" class="table-editcontent"></Table>
          <div class="common-table-bottom" v-if="compangyListData && compangyListData.length > 0">
              <div style="float: right;">

              <Page :total="pageInfo.totalItems" show-elevator class-name="pagination-content" show-total @on-change="pageChange" :current="pageInfo.currentPage" :page-size="pageInfo.limit" style="float:right" size="small"></Page>
              </div>
          </div>
        </div>
        <Modal
            v-model="addCompany"
            title="新增公司主体"
            width="880px"
            @on-ok="ok"
            @on-cancel="cancel">
            <div class="content_head">
              <Form ref="completeInfoModal" :label-width="100" label-position="right">
                  <Row>
                      <Col span="8">
                          <FormItem label="公司名称">
                            <Input type="text" :maxlength="50" v-model="newCompany.name" placeholder=""></Input>
                          </FormItem>
                      </Col>
                      <Col span="8">
                          <FormItem label="公司代码">
                             <Input type="text" :maxlength="20" v-model="newCompany.code" placeholder=""></Input>
                          </FormItem>
                      </Col>
                      <Col span="8">
                        <FormItem label="公司类型" >
                           <Select style="width:100%;"  placeholder="请选择" v-model="newCompany.type">
                                <Option value='01'>移动</Option>
                                <Option value='02'>其他</Option>
                            </Select>
                        </FormItem>
                      </Col>
                      <Col span="8">
                        <FormItem label="是否本部"   style="margin-bottom: 10px" >
                          <RadioGroup v-model="newCompany.centralFlag">
                            <Radio label="Y">
                              <span>是</span>
                            </Radio>
                            <Radio label="N">
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
    import { companyList, addCompany, editCompany, delCompany, detailCompany } from '../../service/system/company.service.js';

export default {
    computed: {

    },
    mounted () {
      this.getCompanyList()
    },
    props: {
      index: '',
      content: {}
    },
    data () {
      return {
        clientHeight: document.body.clientHeight + 'px',
        addCompany: false,
        name: '',
        code: '',
        newCompany: {
          id: '',
          name: '',
          code: '',
          type: '',
          enableFlag: 'Y',
          centralFlag: 'Y'
        },
        pageInfo: {
          currentPage: 1,
          limit: 10,
          totalItems: 0
        },
        compangyListData: [],
        columns: [{
          title: '序号',
          align: 'center',
          render: (h, params) => {
            return h('span', {}, params.index + 1);
          }
        }, {
          title: '公司名称',
          align: 'center',
          key: 'name'
        }, {
          title: '公司代码',
          align: 'center',
          key: 'code'
        }, {
          title: '公司类型',
          align: 'center',
          key: 'type',
          render: (h, params) => {
            return h('span', params.row.type == '01' ? '移动' : '其他');
          }
        }, {
          title: '是否有效',
          align: 'center',
          key: 'enableFlag',
          render: (h, params) => {
            return h('span', params.row.enableFlag == 'Y' ? '有效' : '禁用');
          }
        }, {
          title: '省公司本部',
          align: 'center',
          key: 'centralFlag',
          render: (h, params) => {
            return h('span', params.row.centralFlag == 'Y' ? '是' : '否');
          }
        }, {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', {style: {marginBottom: '5px', marginTop: '5px' }}, [
              h('a', {style: {display: 'block'},
              on: {click: () => {
                this.add();
                this.newCompany = Object.assign({}, this.compangyListData[params.index])
    }}}, '修改'),
              h('a', {on: {click: () => { }}},
              [
                h('Poptip',
                    {props: {title: '确认删除吗？', confirm: true, placement: 'left' }, on: {'on-ok': () => { this.deleteCompany(params.row.id); }}},
                    ' 删除')
              ]
              )
            ])
          }
        }]
      }
    },
    methods: {
      getCompanyList () {
        let {name, code, pageInfo} = this;
        let params = {
          current: pageInfo.currentPage,
          size: pageInfo.limit,
          name: name,
          code: code
        };

        companyList(params, res => {
          if (res.code == 0) {
            this.compangyListData = res.data.records
            this.pageInfo = {
              currentPage: res.data.current,
              limit: 10,
              totalItems: res.data.total
            }
            if (res.data.records.length == 0 && res.data.current > 1) {
              this.pageInfo.currentPage = res.data.current - 1
              this.getCompanyList()
            }
          } else {
            this.$Message.error(res.msg);
          }
        }
        )
      },
      add () {
        this.addCompany = true
      },
      ok () {
        let {newCompany} = this;
        editCompany(newCompany, res => {
          if (res.code == 0) {
            this.$Message.success(res.msg);
            this.getCompanyList();
            this.reset()
          } else {
            this.$Message.error(res.msg);
          }
        });
      },
      pageChange (index) {
        this.pageInfo.currentPage = index;
        this.getCompanyList();
      },
      disableCompany (id) {
        let params = {
          tenantId: id
        }
        delTenant(params, res => {
          if (res.code == 0) {
            this.getTenantList()
          } else {
              // this.changeCaptcha()
            this.$Message.error(res.msg);
          }
        }
        );
      },
      deleteCompany (id) {
        let params = {
          id: id
        }
        delCompany(params, res => {
          if (res.code == 0) {
            this.$Message.success(res.msg);
            this.getCompanyList()
          } else {
              // this.changeCaptcha()
            this.$Message.error(res.msg);
          }
        }
        );
      },
      cancel () {
        this.addCompany = false;
        this.newCompany = {
          id: '',
          name: '',
          code: '',
          type: '',
          enableFlag: 'Y',
          centralFlag: 'Y'
        }
      },
      resetForm () {
        this.name = '';
        this.code = '';
      }
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
</style>
