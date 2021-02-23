<template>
    <div class="u-overview" :style="{minHeight:clientHeight}">
        <div class="u-tle">
            <router-link to="/main/index">首页</router-link> / 租户管理
        </div>
        <div class="inner-header" style="border-bottom: 1px solid #e5e5e5;">
            <div class="page-title">
                <Icon type="android-radio-button-off" size="15" class="icon"></Icon> 租户管理
            </div>
        </div>
        <div class="content_head">
            <Form ref="completeInfoModal" :label-width="100" label-position="right">
                <Row>
                    <Col span="8">
                        <FormItem label="租户名">
                            <Input type="text" v-model="name" :maxlength="50" placeholder="租户名"></Input>
                        </FormItem>
                    </Col>
                  <Col span="8">
                    <FormItem label="租户编码">
                      <Input type="text" v-model="hirerCode" :maxlength="50" placeholder="租户编码"></Input>
                    </FormItem>
                  </Col>
                    <Col span="8">
                        <FormItem label="系统名称">
                            <Input type="text" v-model="systemName" :maxlength="50"  placeholder="产品编码"></Input>
                        </FormItem>
                    </Col>

                    <Col span="8">
                        <FormItem label="是否启用">
                            <RadioGroup v-model="enableFlag">
                              <Radio label="Y">
                                <span>是</span>
                              </Radio>
                              <Radio label="N">
                                <span>否</span>
                              </Radio>
                            </RadioGroup>
                        </FormItem>
                    </Col>
                    <Col span="16" style="text-align: right;">
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
            <Button @click="addTenant()" type="primary" icon="md-add" style="display: inline-block;margin-bottom:10px;">新增</Button>
          </div>
            <Table :columns="columns" :data="tenantListData" class="table-editcontent"></Table>
            <div class="common-table-bottom" v-if="tenantListData && tenantListData.length > 0">
                <div style="float: right;">
                <Page :total="pageInfo.totalItems" show-elevator class-name="pagination-content" show-total @on-change="pageChange" :current="pageInfo.currentPage" :page-size="pageInfo.limit" style="float:right" size="small"></Page>
                </div>
            </div>
        </div>
        <Modal
            v-model="addModal"
            title="用户基本信息"
            width="1280px"
            @on-ok="ok"
            @on-cancel="cancel">
            <div class="">
              <Form ref="completeInfoModal" :label-width="100" label-position="right">
                <Divider orientation="left">租户信息</Divider>
                  <Row>
                      <Col span="8">
                          <FormItem label="租户名称">
                            <Input type="text" v-model="newTenant.name" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                      <Col span="8">
                          <FormItem label="租户编码">
                             <Input type="text" v-model="newTenant.hirerCode" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                      <Col span="8">
                        <FormItem label="租户类型" >
                          <Select style="" v-model="newTenant.hirerType" placeholder="请选择">
                                <Option :value="99">请选择</Option>
                                <Option value='00'>移动</Option>
                                <Option value='SH'>其他</Option>
                            </Select>
                        </FormItem>
                      </Col>
                      <Col span="8">
                          <FormItem label="办公电话">
                             <Input type="text" v-model="newTenant.officePhone" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                       <Col span="8">
                          <FormItem label="邮件">
                             <Input type="text" v-model="newTenant.email" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                      <Col span="8">
                        <FormItem label="是否启用" >
                          <RadioGroup v-model="newTenant.enableFlag">
                            <Radio label="Y">
                              <span>是</span>
                            </Radio>
                            <Radio label="N">
                              <span>否</span>
                            </Radio>
                          </RadioGroup>
                        </FormItem>
                      </Col>
                       <Col span="8">
                          <FormItem label="联系人">
                             <Input type="text" v-model="newTenant.contactUsername" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                       <Col span="8">
                          <FormItem label="租户地址">
                             <Input type="text" v-model="newTenant.address" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                       <Col span="8">
                          <FormItem label="邮政编码">
                             <Input type="text" v-model="newTenant.zipCode" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                       <Col span="8">
                          <FormItem label="统一信用码">
                             <Input type="text" v-model="newTenant.hirerCertificateCode" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                       <Col span="8">
                          <FormItem label="系统名称">
                             <Input type="text" v-model="newTenant.systemName" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                      <Col span="8">
                          <FormItem label="系统LOGO">
                             <Input type="text" v-model="newTenant.systemLogo" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                       <Col span="8">
                          <FormItem label="自定义URL">
                             <Input type="text" v-model="newTenant.workbenchUrl" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                      <Col span="8">
                        <FormItem label="是否转向"  style="margin-bottom: 10px" >
                          <RadioGroup v-model="newTenant.forwardFlag">
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
                  <Divider orientation="left">租户管理员信息</Divider>
                  <Row>
                      <Col span="8">
                          <FormItem label="登陆名">
                            <Input type="text" v-model="newTenant.agentLoginName" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                      <Col span="8">
                          <FormItem label="用户名">
                             <Input type="text" v-model="newTenant.agentDisplayName" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                      <Col span="8">
                        <FormItem label="用户是否生效" >
                          <RadioGroup v-model="newTenant.agentEnableFlag">
                            <Radio label="Y">
                              <span>是</span>
                            </Radio>
                            <Radio label="N">
                              <span>否</span>
                            </Radio>
                          </RadioGroup>
                        </FormItem>
                      </Col>
                       <Col span="8">
                          <FormItem label="有效时间">
                            <!-- <DatePicker type="date" v-model="newTenant.startDate" placeholder="" style="width: 100%"></DatePicker> -->
                            <DatePicker type="daterange" format="yyyy-MM-dd" confirm placement="bottom-end" placeholder="请选择日期" v-model="newTenant.DatePicker" @on-ok="dateChange()" style="width: 100%"></DatePicker>
                          </FormItem>
                      </Col>
                       <!-- <Col span="8">
                          <FormItem label="失效日期">
                             <DatePicker type="date" v-model="newTenant.endDate" placeholder="" style="width: 100%"></DatePicker>
                          </FormItem>
                      </Col> -->
                  </Row>
                  <Divider orientation="left">扩展属性信息</Divider>
                  <Row>
                      <Col span="8">
                          <FormItem label="扩展属性1">
                            <Input type="text" v-model="newTenant.attr1" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                      <Col span="8">
                          <FormItem label="扩展属性2">
                             <Input type="text" v-model="newTenant.attr2" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                      <Col span="8">
                          <FormItem label="扩展属性3">
                            <Input type="text" v-model="newTenant.attr3" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                      <Col span="8">
                          <FormItem label="扩展属性4">
                             <Input type="text" v-model="newTenant.attr4" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                      <Col span="8">
                          <FormItem label="扩展属性5">
                            <Input type="text" v-model="newTenant.attr5" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                      <Col span="8">
                          <FormItem label="扩展属性6">
                             <Input type="text" v-model="newTenant.attr6" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                      <Col span="8">
                          <FormItem label="扩展属性7">
                            <Input type="text" v-model="newTenant.attr7" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                      <Col span="8">
                          <FormItem label="扩展属性8">
                             <Input type="text" v-model="newTenant.attr8" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                      <Col span="8">
                          <FormItem label="扩展属性9">
                             <Input type="text" v-model="newTenant.attr9" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                  </Row>
              </Form>
          </div>
        </Modal>

      <Modal
        v-model="addtenantMenuModal"
        title="角色权限分配"
        width="680px"
        @on-ok="tenantok"
        @on-cancel="tenantcancel">
        <div class="">
          <Tree ref="tree" :data="menuDataList" show-checkbox></Tree>
        </div>
      </Modal>
    </div>
</template>

<script>
  import { tenantList, addTenant, editTenant, delTenant, tenantmenuList, saveTenantMenu } from '../../service/system/tenant.service.js';

  export default {
    computed: {

    },
    mounted () {
      this.getTenantList()
    },
    data () {
      return {
        clientHeight: document.body.clientHeight + 'px',
        addModal: false,
        addtenantMenuModal: false,
        tenantId: '',
        name: '',
        systemName: '',
        hirerCode: '',
        current: 0,
        hirerType: '',
        enableFlag: 'Y',
        pageInfo: {
            currentPage: 1,
            limit: 4,
            totalItems: 0
        },
        DatePicker: [],
        tenantListData: [],
        menuDataList: [],
        options3: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
        newTenant:{
          DatePicker: '',
          acctId: "",
          address: "",
          agentId: 0,
          attr1: "",
          attr10: "",
          attr2: "",
          attr3: "",
          attr4: "",
          attr5: "",
          attr6: "",
          attr7: "",
          attr8: "",
          attr9: "",
          bankCard: "",
          bankName: "",
          bankOfDeposit: "",
          contactUsername: "",
          agentEnableFlag: 'Y',
          createdBy: 0,
          createdDate: "",
          deleted: 0,
          email: "",
          agentDisplayName:'',
          agentLoginName: '',
          enableFlag: "Y",
          endDate: 0,
          forwardFlag: "Y",
          hirerCertificateCode: "",
          hirerCode: "",
          hirerType: "",
          id: '',
          lastUpdate: "",
          lastUpdateBy: 0,
          name: "",
          officePhone: "",
          registerDate: "",
          startDate: 0,
          systemLogo: "",
          systemName: "",
          treasureNum: "",
          wechatNum: "",
          workbenchUrl: "",
          zipCode: ""
        },
        columns: [{
          title: '租户名',
          align: 'center',
          key: 'name'
        }, {
          title: '租户编码',
          align: 'center',
          key: 'hirerCode',
        }, {
          title: '租户类型',
          align: 'center',
          key: 'hirerType'
        }, {
          title: '登陆名',
          align: 'center',
          key: 'name'
        }, {
          title: '联系人',
          align: 'center',
          key: 'contactUsername'
        }, {
          title: '系统名称',
          align: 'center',
          key: 'systemName'
        }, {
          title: '生效日期',
          align: 'center',
          key: 'startDate'
        }, {
          title: '失效日期',
          align: 'center',
          key: 'endDate'
        }, {
          title: '办公电话',
          align: 'center',
          key: 'officePhone'
        }, {
          title: '是否启用',
          align: 'center',
          key: 'enableFlag'
        }, {
          title: '操作',
          align: 'center',
          key: 'created_time',
          render: (h, params) => {
            return  h('div', {style: {marginBottom: '5px',marginTop: '5px' }}, [
                h('a', {style:{display:'block'},on: {click: () => { 
                  this.addTenant()
                    this.newTenant = Object.assign({}, this.tenantListData[params.index])
                    this.newTenant.DatePicker = [ this.$moment(this.newTenant.startDate).format('YYYY-MM-DD') ,  this.$moment(this.newTenant.endDate).format('YYYY-MM-DD')]
                }}}, '修改'),
                h('a', 
                  [
                    h('Poptip',
                      {props: {title: '确认删除吗？',confirm: true,placement: 'left', },on: {'on-ok': () => {
                        this.delTenant(params.row.id);
                      }}},
                      ' 删除')
                  ]
                ),
                h('a', {style:{display:'block'},on: {click: () => { 
                  this.menuTenant(params.row.id);
                }}}, '权限分配'),
              ])
          }
        },]
      }
    },
    methods: {
      getTenantList(){
        let {current, enableFlag,  hirerType, name, systemName, pageInfo} = this
        console.log()
        let params = {
          current: pageInfo.currentPage,
          enableFlag: enableFlag,
          hirerType,
          menuIds: [0],
          name,
          size: pageInfo.limit,
          systemName,
          tenantId: 0
        }
        tenantList(params, res => {
            if (res.code == 0) {
              this.tenantListData = res.data.records
              this.pageInfo = {
                currentPage: res.data.current,
                limit: 4,
                totalItems: res.data.total
              }
              if (res.data.records.length == 0 && res.data.current > 1) {
                this.pageInfo.currentPage = res.data.current-1
                this.getTenantList()
              }
            } else {
              // this.changeCaptcha()
              this.$Message.error(res.msg);
            }
          }
        );
      },
      addTenant(){
        this.addModal = true
      },
      pageChange (index) {
        console.log(123)
        this.pageInfo.currentPage = index;
        this.getTenantList();
      },

      ok () {
        let {newTenant} = this
        console.log(newTenant);

        if (newTenant.id) {
          editTenant(newTenant, res => {
            if (res.code == 0) {
              this.getTenantList();
              this.reset()
            } else {
              this.$Message.error(res.msg);
            }
          });
        } else {
          addTenant(newTenant, res => {
            if (res.code == 0) {
              this.getTenantList();
              this.reset()
            } else {
              this.$Message.error(res.msg);
            }
          });
        }
      },
      cancel (){
        this.reset()
      },
      delTenant (id) {
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
      dateChange (){
        var _this = this;
        var rangeDate = _this.newTenant.DatePicker;
        console.log()
        if (!rangeDate[0] && !rangeDate[1]) {
          _this.newTenant.startDate = '';
          _this.newTenant.endDate = '';
        } else {
          _this.newTenant.startDate = new Date(rangeDate[0]).getTime();
          _this.newTenant.endDate = new Date(rangeDate[1]).getTime();
        }
      },
      menuTenant(id){
        this.addtenantMenuModal = true;
        this.tenantId = id;
        this.getMenuList(id);
      },
      getMenuList(id){
        tenantmenuList({tenantId:id}, res => {
          if (res.code == 0) {
            this.menuDataList = res.data

          } else {
            this.$Message.error(res.msg);
          }
        });
      },
      tenantok(){
        this.checkedNode = this.$refs.tree.getCheckedAndIndeterminateNodes();
        this.checkedNodeId = [];
        this.checkedNode.forEach((item, index) => {
          this.checkedNodeId.push({menuId: item.id, checked:item.checked});
        })

        let params = {
          tenantId: this.tenantId,
          menuEntities: this.checkedNodeId
        }

        saveTenantMenu(params, res => {
            if (res.code == 0) {
              this.$Message.success(res.msg);
              this.tenantList()
            } else {
              // this.changeCaptcha()
              this.$Message.error(res.msg);
            }
          }
        );
      },
      tenantcancel(){},
      reset (){
        this.newTenant = {
          acctId: "",
          address: "",
          agentId: 0,
          attr1: "",
          attr10: "",
          attr2: "",
          attr3: "",
          attr4: "",
          attr5: "",
          attr6: "",
          attr7: "",
          attr8: "",
          attr9: "",
          DatePicker: [],
          bankCard: "",
          bankName: "",
          bankOfDeposit: "",
          contactUsername: "",
          agentEnableFlag: 'Y',
          createdBy: 0,
          createdDate: "",
          deleted: 0,
          email: "",
          agentDisplayName:'',
          agentLoginName: '',
          enableFlag: "Y",
          endDate: 0,
          forwardFlag: "Y",
          hirerCertificateCode: "",
          hirerCode: "",
          hirerType: "",
          id: '',
          lastUpdate: "",
          lastUpdateBy: 0,
          name: "",
          officePhone: "",
          registerDate: "",
          startDate: 0,
          systemLogo: "",
          systemName: "",
          treasureNum: "",
          wechatNum: "",
          workbenchUrl: "",
          zipCode: ""
        }
      }
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
