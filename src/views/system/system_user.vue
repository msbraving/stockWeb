<template>
    <div class="u-overview" :style="{minHeight:clientHeight}">
        <div class="u-tle">
            <router-link to="/main/index">首页</router-link> / 用户管理
        </div>
        <div class="inner-header" style="border-bottom: 1px solid #e5e5e5;">
            <div class="page-title">
                <Icon type="android-radio-button-off" size="15" class="icon"></Icon> 用户管理
            </div>
        </div>
        <div class="content_head">
            <Form ref="completeInfoModal" :label-width="100" label-position="right">
              <Row>
                <Col span="7">
                    <FormItem label="登录名">
                        <Input type="text" v-model="userSearch.loginName" :maxlength="20" placeholder="可以输入部分名称"></Input>
                    </FormItem>
                </Col>
                <Col span="7">
                    <FormItem label="用户名">
                        <Input type="text" v-model="userSearch.displayName" :maxlength="50"  placeholder="可以输入部分名称"></Input>
                    </FormItem>
                </Col>
                <Col span="7">
                    <FormItem label="公司名称">
                        <Input type="text" v-model="userSearch.companyName" :maxlength="11" placeholder="可以输入部分名称"></Input>
                    </FormItem>
                </Col>
                <Col span="7">
                    <FormItem label="部门名称">
                        <Input type="text" v-model="userSearch.groupName" :maxlength="11" placeholder="可以输入部分名称"></Input>
                    </FormItem>
                </Col>
                <Col span="7" style="text-align: right;">
                    <div>
                            <Button type="primary" @click="getUserList">
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
              <div span="8" style="text-align: right;margin-left:20px;">
                <Button type="primary" @click="addNewUser">
                  <Icon type="search"></Icon>新增
                </Button>
              </div>
            </div>
            <Table :columns="columns" :data="userListData" class="table-editcontent"></Table>
            <div class="common-table-bottom" v-if="userListData && userListData.length > 0">
                <div style="float: right;">
                <Page :total="pageInfo.totalItems" show-elevator class-name="pagination-content" show-total @on-change="pageChange" :current="pageInfo.currentPage" :page-size="pageInfo.limit" style="float:right" size="small"></Page>
                </div>
            </div>
          </div>
          <Modal
            v-model="addUser"
            title="用户基本信息"
            width="800px"
            @on-ok="ok"
            @on-cancel="cancel">
            <div class="">
              <Form ref="completeInfoModal" :label-width="100" label-position="right">
                  <Row>
                      <Col span="10">
                          <FormItem label="登录名">
                            <Input type="text" v-model="newUser.loginName" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                      <Col span="10">
                          <FormItem label="用户名">
                             <Input type="text" v-model="newUser.displayName" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                  </Row>
                  <Row>
                      <Col span="10">
                          <FormItem label="员工编号">
                             <Input type="text"  v-model="newUser.employeeNumber" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                      <Col span="10">
                        <FormItem label="是否有效" >
                          <RadioGroup style="height:30px"  v-model="newUser.enableFlag">
                            <Radio label="Y"><span>是</span></Radio>
                            <Radio label="N"><span>否</span></Radio>
                          </RadioGroup>
                        </FormItem>
                      </Col>
                  </Row>
                  <Row>
                      <Col span="10">
                          <FormItem label="办公电话">
                             <Input type="text"  v-model="newUser.officeTel" placeholder=""></Input>
                          </FormItem>
                      </Col>
                      <Col span="10">
                          <FormItem label="邮件">
                             <Input type="text"  v-model="newUser.email" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                  </Row>
                      <Col span="10">
                          <FormItem label="手机">
                             <Input type="text"  v-model="newUser.mobile" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                      <Col span="10">
                          <FormItem label="QQ">
                             <Input type="text"  v-model="newUser.qq" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                <Row>
                      <Col span="10">
                          <FormItem label="传真">
                             <Input type="text"  v-model="newUser.fax" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                      <Col span="10">
                          <FormItem label="生效日期">
                             <DatePicker type="daterange" format="yyyy-MM-dd" confirm placement="bottom-end" placeholder="请选择日期" v-model="newUser.DatePicker" @on-ok="dateChange()" style="width: 100%"></DatePicker>
                          </FormItem>
                      </Col>
                </Row>
                <Row>
                      <Col span="10">
                          <FormItem label="公司">
                            <Select v-model="newUser.companyId"  filterable  clearable remote :remote-method="getCompanyList">
                              <Option on v-for="item in companyList" @click.native="chooseCompany(item.id)" :value="item.id" :key="item.id">{{ item.name }}</Option>
                            </Select>
                          </FormItem>
                      </Col>
                       <Col span="10">
                          <FormItem label="部门">
                            <Select v-model="newUser.groupId"  filterable filterable clearable remote :remote-method="getGroupList">
                              <Option v-for="item in groupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                            </Select>
                          </FormItem>
                      </Col>
                </Row>
                <Row>
                      <Col span="20">
                        <FormItem label="可选角色"  prop="sales_consultant" style="margin-bottom: 10px" >
                          <CheckboxGroup v-model="newUser.roleIds">
                            <Checkbox border v-for="item in roleList" :value="item.id" :key="item.id" :label="item.id">{{ item.name }}</Checkbox>
                          </CheckboxGroup>
                        </FormItem>
                      </Col>
                  </Row>
              </Form>
          </div>
        </Modal>
    </div>
</template>

<script>
  import { userList, addUser, editUser, resetUser} from '../../service/system/user.service.js';
  import { companyList} from '../../service/system/company.service.js';
  import { groupList} from '../../service/system/group.service.js';
  import { roleList} from '../../service/system/role.service.js';

  export default {
    mounted () {
      this.getUserList()
    },
    data () {
      return {
        clientHeight: document.body.clientHeight + 'px',
        addUser: false,
        userSearch: {
          companyName: '',
          displayName: '',
          groupName: '',
          loginName: ''
        },
        userListData: [],
        companyList: [],
        groupList: [],
        roleList: [],
        newUser: {
          appTokenId: '',
          deleted: 0,
          displayName: '',
          displayOrder: '',
          email: '',
          employeeId: 0,
          employeeNumber: '',
          enableFlag: '',
          encryptedUserPassword: '',
          endDate: 0,
          fax: '',
          DatePicker: [],
          id: 0,
          isLocked: '',
          loginErrCount: 0,
          loginName: '',
          mainAccountFlag: '',
          mobile: '',
          officeTel: '',
          pager: '',
          password: '',
          passwordAccessesLeft: 0,
          passwordModifyDate: 0,
          qq: '',
          remark: '',
          showFlag: '',
          startDate: 0,
          tenantId: 0,
          userGrade: '',
          userId: 0,
          companyId: '',
          roleIds: [],
          userType: '',
          uuid: '',
          workScheduleId: 0,
          primaryFlag: 'N'
        },
        pageInfo: {
          currentPage: 1,
          limit: 10,
          totalItems: 0
        },
        data2: [{
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'gugong',
              label: '故宫'
            },
            {
              value: 'tiantan',
              label: '天坛'
            },
            {
              value: 'wangfujing',
              label: '王府井'
            }
          ]
        }, {
          value: 'jiangsu',
          label: '江苏',
          children: [
            {
              value: 'nanjing',
              label: '南京',
              children: [
                {
                  value: 'fuzimiao',
                  label: '夫子庙'
                }
              ]
            },
            {
              value: 'suzhou',
              label: '苏州',
              children: [
                {
                  value: 'zhuozhengyuan',
                  label: '拙政园'
                },
                {
                  value: 'shizilin',
                  label: '狮子林'
                }
              ]
            }
          ]
        }],
        columns: [{
          title: '登录名',
          align: 'center',
          key: 'loginName'
        }, {
          title: '用户名',
          align: 'center',
          key: 'displayName'
        }, {
          title: '状态',
          align: 'center',
          key: 'enableFlag',
          render: (h, params) => {
            let nickName = params.row.enableFlag == 'Y' ? '有效' : '失效';
            return h('span', nickName);
          }
        }, {
          title: '生效日期',
          align: 'center',
          key: 'startDate',
          minWidth: 50,
          render: (h, params) => {
            return h('span', this.$moment(params.row.endDate).format('YYYY-MM-DD'));
          }
        }, {
          title: '失效日期',
          align: 'center',
          key: 'endDate',
          minWidth: 50,
          render: (h, params) => {
            return h('span', this.$moment(params.row.endDate).format('YYYY-MM-DD'));
          }
        }, {
          title: '手机',
          align: 'center',
          key: 'mobile'
        }, {
          title: 'QQ',
          align: 'center',
          key: 'qq'
        }, {
          title: '公司名称',
          align: 'center',
          key: 'companyName'
        }, {
          title: '部门名称',
          align: 'center',
          key: 'groupName'
        }, {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', {style: {marginBottom: '5px', marginTop: '5px' }}, [
              h('a', {style: {display: 'block'},
                on: {click: () => {
                  this.editUser(params)
  }}}, '修改'),
              h('a', {style: {display: 'block'},
                on: {click: () => {
                  this.enabledUser(params)
  }}}, '禁用'),
              h('a',
                [
                  h('Poptip',
                    {props: {title: '确认重置密码吗？', confirm: true, placement: 'left' },
                      on: {'on-ok': () => {
                        this.resetPassword(params)
  }}},
                    ' 重置密码')
                ]
              )

            ])
          }
        }]
      }
    },
    methods: {
      getUserList () {
        let {userSearch, pageInfo} = this
        let params = {
          current: pageInfo.currentPage,
          size: pageInfo.limit,
          companyName: userSearch.companyName,
          displayName: userSearch.displayName,
          groupName: userSearch.groupName,
          loginName: userSearch.loginName
        }
        userList(params, res => {
          if (res.code == 0) {
            this.userListData = res.data.records
            this.pageInfo = {
              currentPage: res.data.current,
              limit: 10,
              totalItems: res.data.total
            }
            if (res.data.records.length == 0 && res.data.current > 1) {
              this.pageInfo.currentPage = res.data.current - 1
              this.getUserList()
            }
          } else {
            this.$Message.error(res.msg);
          }
        });
      },
      pageChange (index) {
        this.pageInfo.currentPage = index;
        this.getUserList();
      },
      editUser (params) {
        this.addUser = true;
        this.newUser = Object.assign({}, this.userListData[params.index]);
        if (this.newUser.roleIds == null) {
          this.newUser.roleIds = [];
        }
        this.newUser.primaryFlag = 'N';
        this.newUser.companyId = parseInt(this.userListData[params.index].companyId);

        this.newUser.groupId = parseInt(this.userListData[params.index].groupId);

        this.newUser.DatePicker = [ this.$moment(this.newUser.startDate).format('YYYY-MM-DD'), this.$moment(this.newUser.endDate).format('YYYY-MM-DD')]

        this.getCompanyList(this.userListData[params.index].companyName);
        this.getGroupList(this.userListData[params.index].groupName);

        this.getRoleList();
      },
      ok () {
        let {newUser} = this

        if (newUser.id) {
          editUser(newUser, res => {
            if (res.code == 0) {
              this.$Message.success(res.msg);
              this.getUserList();
              this.userListData = []
              this.reset()
            } else {
              this.$Message.error(res.msg);
            }
          });
        } else {
          addUser(newUser, res => {
            if (res.code == 0) {
              this.$Message.success(res.msg);
              this.getUserList();
              this.reset()
            } else {
              this.$Message.error(res.msg);
            }
          });
        }
      },
      cancel () {
        this.reset()
      },
      reset () {
        this.newUser = {
          appTokenId: '',
          deleted: 0,
          displayName: '',
          displayOrder: '',
          email: '',
          employeeId: 0,
          employeeNumber: '',
          enableFlag: '',
          encryptedUserPassword: '',
          endDate: 0,
          fax: '',
          DatePicker: [],
          id: 0,
          isLocked: '',
          loginErrCount: 0,
          loginName: '',
          mainAccountFlag: '',
          mobile: '',
          officeTel: '',
          pager: '',
          password: '',
          passwordAccessesLeft: 0,
          passwordModifyDate: 0,
          qq: '',
          remark: '',
          showFlag: '',
          startDate: 0,
          tenantId: 0,
          userGrade: '',
          userId: 0,
          companyId: '',
          roleIds: [],
          userType: '',
          uuid: '',
          workScheduleId: 0,
          primaryFlag: 'N'
        }
      },
      resetPassword (params) {
        let ids = {ids: params.row.id}
        resetUser(ids, res => {
          if (res.code == 0) {
            this.getUserList();
          } else {
            this.$Message.error(res.msg);
          }
        });
      },
      enabledUser () {
        let resetUser = Object.assign({}, this.userListData[params.index])
        resetUser.enableFlag = resetUser.enableFlag == 'Y' ? 'N' : 'Y'
        editUser(resetUser, res => {
          if (res.code == 0) {
            this.getUserList();
              // this.userListData = []
              // this.reset()
          } else {
            this.$Message.error(res.msg);
          }
        });
      },
      addNewUser () {
        this.addUser = true;
        this.getCompanyList(null);
        this.newUser.roleIds = [];
        this.getRoleList();
      },
      dateChange () {
        var _this = this;
        var rangeDate = _this.newUser.DatePicker;
        console.log()
        if (!rangeDate[0] && !rangeDate[1]) {
          _this.newUser.startDate = '';
          _this.newUser.endDate = '';
        } else {
          _this.newUser.startDate = new Date(rangeDate[0]).getTime();
          _this.newUser.endDate = new Date(rangeDate[1]).getTime();
        }
      },
      getCompanyList (query) {
        let params = {
          current: 1,
          size: 10,
          name: query
        };
        companyList(params, res => {
          if (res.code == 0) {
            this.companyList = res.data.records
          } else {
            this.$Message.error(res.msg);
          }
        }
        )
      },
      chooseCompany (id) {
        this.newUser.companyId = id;
        this.getGroupList(null);
      },
      getGroupList (query) {
        let {companyId} = this.newUser;
        if (!companyId) {
          this.$Message.warning('请先选择公司');
          return;
        }
        let params = {
          current: 1,
          size: 10,
          companyId: companyId,
          name: query
        };
        groupList(params, res => {
          if (res.code == 0) {
            this.groupList = res.data.records
          } else {
            this.$Message.error(res.msg);
          }
        }
        )
      },
      getRoleList () {
        let params = {
          current: 1,
          size: 9999
        };
        roleList(params, res => {
          if (res.code == 0) {
            this.roleList = res.data.records
          } else {
            this.$Message.error(res.msg);
          }
        }
        )
      },
      resetForm () {
        this.userSearch = {
          companyName: '',
          displayName: '',
          groupName: '',
          loginName: ''
        }
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
