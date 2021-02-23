<template>
    <div class="u-overview" :style="{minHeight:clientHeight}">
        <div class="u-tle">
            <router-link to="/main/index">首页</router-link> / 角色管理
        </div>
        <div class="inner-header" style="border-bottom: 1px solid #e5e5e5;">
            <div class="page-title">
                <Icon type="android-radio-button-off" size="15" class="icon"></Icon> 角色管理
            </div>
        </div>
        <div class="content_head">
            <Form ref="completeInfoModal" :label-width="100" label-position="right">
                <Row>
                    <Col span="7">
                        <FormItem label="角色名称">
                            <Input type="text" v-model="name" :maxlength="50" placeholder="可以输入部分名称"></Input>
                        </FormItem>
                    </Col>
                    <Col span="7">
                        <FormItem label="角色代码">
                            <Input type="text" v-model="code" :maxlength="20"  placeholder="角色代码"></Input>
                        </FormItem>
                    </Col>
                    <Col span="7" style="text-align: right;">
                        <div>
                            <Button type="primary" @click="getRoleList">
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
            <Button @click="addRole" type="primary" icon="md-add" style="display: inline-block;margin-bottom:10px;">新增</Button>
          </div>
          <Table :columns="columns" :data="roleListData"  class="table-editcontent"></Table>
          <div class="common-table-bottom" v-if="roleListData && roleListData.length > 0">
              <div style="float: right;">
              <Page :total="pageInfo.totalItems" show-elevator class-name="pagination-content" show-total @on-change="pageChange" :current="pageInfo.currentPage" :page-size="pageInfo.limit" style="float:right" size="small"></Page>
              </div>
          </div>
        </div>
        <Modal
            v-model="addRoleModal"
            title="角色管理"
            width="600px"
            @on-ok="ok"
            @on-cancel="cancel">
            <div class="">
              <Form ref="completeInfoModal" :label-width="160" label-position="right">
                  <Row>
                    <Col span="16">
                      <FormItem label="角色分类">
                        <Input type="text" v-model="newRole.category" :maxlength="20" placeholder=""></Input>
                      </FormItem>
                    </Col>
                  </Row>

                <Row>
                    <Col span="16">
                          <FormItem label="角色名称">
                             <Input type="text" v-model="newRole.name" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                </Row>

                <Row>
                      <Col span="16">
                          <FormItem label="角色代码">
                             <Input type="text" v-model="newRole.code" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                </Row>

                <Row>
                      <Col span="16">
                          <FormItem label="描述">
                            <Input v-model="newRole.descript" maxlength="200" show-word-limit type="textarea" placeholder="角色描述"  />
                          </FormItem>
                      </Col>
                </Row>
              </Form>
          </div>
        </Modal>

        <Modal
        v-model="addRoleMenuModal"
        title="角色权限分配"
        width="680px"
        @on-ok="menuok"
        @on-cancel="menucancel">
        <div class="">
          <Tree ref="tree" :data="menuDataList" show-checkbox></Tree>
        </div>
      </Modal>
    </div>
</template>

<script>
import { roleList, addRole, editRole, delRole, saveRolepermission } from '../../service/system/role.service.js';
import {rolepermissionList} from '../../service/system/menu.service.js';

  export default {
    computed: {

    },
    props: {
      index: '',
      content: {}
    },
    mounted () {
      this.getRoleList();
    },
    data () {
      return {
        clientHeight: document.body.clientHeight + 'px',
        addRoleModal:false,
        addRoleMenuModal:false,
        pageInfo: {
            currentPage: 1,
            limit: 10,
            totalItems: 0
        },
        name: '',
        code: '',
        roleId: '',
        checkedNode: [],
        checkedNodeId: [],
        menuDataList: [],
        roleListData: [],
        newRole: {
          id: '',
          name: '',
          code: '',
          category: '',
          descript: ''
        },
      columns: [{
        title: '序号',
        align: 'center',
        render: (h, params) => {
          return h('span', {}, params.index + 1);
        }
      }, {
        title: '角色代码',
        align: 'center',
        key: 'code'
      }, {
        title: '角色名称',
        align: 'center',
        key: 'name'
      }, {
        title: '描述',
        align: 'center',
        key: 'descript'
      }, {
        title: '角色类型',
        align: 'center',
        key: 'category'
      }, {
        title: '操作',
        key: 'action',
        align: 'center',
        render: (h, params) => {
          return  h('div', {style: {marginBottom: '5px',marginTop: '5px' }}, [
              h('a', {style:{display:'block'},on: {click: () => {
                  this.menuRole(params.row.id);
              }}}, '权限'),
              h('a', {style:{display:'block'},on: {click: () => {
                 this.addRole();
                  this.newRole = Object.assign({}, this.roleListData[params.index])
              }}}, '修改'),
              h('a',
                [
                  h('Poptip',
                    {props: {title: '确认删除吗？',confirm: true,placement: 'left', },on: {'on-ok': () => {
                       this.delRole(params.row.id);
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
      getRoleList(){
        let {name, code, pageInfo} = this;
        let params = {
          current: pageInfo.currentPage,
          size: pageInfo.limit,
          name: name,
          code: code
        };

        roleList(params, res => {
            if (res.code == 0) {
              this.roleListData = res.data.records
              this.pageInfo = {
                currentPage: res.data.current,
                limit: 10,
                totalItems: res.data.total
              }
              if (res.data.records.length == 0 && res.data.current > 1) {
                this.pageInfo.currentPage = res.data.current-1
                this.getRoleList();
              }
            } else {
              this.$Message.error(res.msg);
            }
          }
        )
      },
      pageChange (index) {
        this.pageInfo.currentPage = index;
        this.getRoleList();
      },
      addRole(){
        this.addRoleModal = true;
      },
      ok(){
        let {newRole} = this;
        editRole(newRole, res => {
          if (res.code == 0) {
            this.$Message.success(res.msg);
            this.getRoleList();
            this.reset()
          } else {
            this.$Message.error(res.msg);
          }
        });
      },
      cancel(){
        this.addRoleModal = false;
        this.newRole = {
          id: '',
            name: '',
            code: '',
            category: '',
            descript: ''
        }
      },
      delRole(id){
        let params = {
          roleId: id
        }
        delRole(params, res => {
            if (res.code == 0) {
              this.$Message.success(res.msg);
              this.getRoleList()
            } else {
              // this.changeCaptcha()
              this.$Message.error(res.msg);
            }
          }
        );
      },
      menuok(){
        this.checkedNode = this.$refs.tree.getCheckedNodes();
        this.checkedNodeId = [];
        this.checkedNode.forEach((item, index) => {
          this.checkedNodeId.push(item.id);
        })
        let params = {
          roleId: this.roleId,
          resourceIds: this.checkedNodeId
        }
        saveRolepermission(params, res => {
            if (res.code == 0) {
              this.$Message.success(res.msg);
              this.getRoleList()
            } else {
              // this.changeCaptcha()
              this.$Message.error(res.msg);
            }
          }
        );
      },
      menucancel(){
        this.checkedNode = [];
        this.checkedNodeId = [];
      },
      getMenuList(id){
        rolepermissionList({roleId:id}, res => {
          if (res.code == 0) {
            this.menuDataList = res.data
            console.log(this.menuDataList)

          } else {
            this.$Message.error(res.msg);
          }
        });
      },
      menuRole(id){
        this.roleId = id;
        this.addRoleMenuModal = true;
        this.getMenuList(id);

      },
      resetForm(){
        this.name = '';
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
