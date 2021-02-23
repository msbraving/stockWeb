<template>
    <div class="u-overview" :style="{minHeight:clientHeight}">
        <div class="u-tle">
            <router-link to="/main/index">首页</router-link> / 部门管理
        </div>
        <div class="inner-header" style="border-bottom: 1px solid #e5e5e5;">
            <div class="page-title">
                <Icon type="android-radio-button-off" size="15" class="icon"></Icon> 部门管理
            </div>
        </div>
        <div class="content_head">
            <Form ref="completeInfoModal" :label-width="100" label-position="right">
                <Row>
                    <Col span="7">
                      <FormItem label="选择公司" >
                        <Select v-model="companyId" style="width:200px" filterable :label-in-value="true"  @on-change="chooseCompany">
                          <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                      </FormItem>
                    </Col>

                    <Col span="7">
                        <FormItem label="部门名称">
                          <Input type="text" v-model="name" :maxlength="50"  placeholder="请输入部门名称"></Input>
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
            <Button @click="addGroup" type="primary" icon="md-add" style="display: inline-block;margin-bottom:10px;">新增</Button>
          </div>
          <Table :columns="columns" :data="groupListData"  class="table-editcontent"></Table>
          <div class="common-table-bottom" v-if="groupListData && groupListData.length > 0">
              <div style="float: right;">
              <Page :total="pageInfo.totalItems" show-elevator class-name="pagination-content" show-total @on-change="pageChange" :current="pageInfo.currentPage" :page-size="pageInfo.limit" style="float:right" size="small"></Page>
              </div>
          </div>
        </div>
       <Modal
            v-model="addModal"
            title="部门管理"
            width="800px"
            @on-ok="ok"
            @on-cancel="cancel">
            <div class="">
              <Form ref="completeInfoModal" :label-width="160" label-position="right">
                  <Row>
                    <Col span="10">
                      <FormItem label="公司名称">
                        <Input type="text" v-model="companyName" :maxlength="50" disabled placeholder="请输入公司名称"></Input>
                      </FormItem>
                    </Col>
                    <Col span="10">
                      <FormItem label="上级部门">
                        <Input type="text" v-model="newGroup.parentName" disabled  :maxlength="50"  placeholder="根"></Input>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="10">
                      <FormItem label="部门名称">
                        <Input type="text" v-model="newGroup.name" :maxlength="50"  placeholder="请输入公司部门名称"></Input>
                      </FormItem>
                    </Col>
                    <Col span="10">
                      <FormItem label="部门代码">
                        <Input type="text" v-model="newGroup.code" :maxlength="50"  placeholder="请输入公司部门名称"></Input>
                      </FormItem>
                    </Col>
                  </Row>
              </Form>
          </div>
        </Modal>
    </div>
</template>

<script>
 import { groupList, addGroup, editGroup, delGroup, detailGroup } from '../../service/system/group.service.js';

 import {companyList, delCompany, editCompany} from '../../service/system/company.service.js';

  export default {
    computed: {

    },
    mounted () {
      this.getCompanyList();
      this.getGroupList();
    },
    data () {
      return {
        clientHeight: document.body.clientHeight + 'px',
        addModal: false,
        buttonProps: {
                    type: 'default',
                    size: 'small',
                },
        companyList: [],
        companyId: '',
        companyName: '',
        name: '',
        newGroup: {
          id: '',
          name: '',
          code: '',
          parentName: '',
          parentId: '',
          companyId: '',
          enableFlag: 'Y'
        },
        pageInfo: {
            currentPage: 1,
            limit: 10,
            totalItems: 0
        },
        groupListData: [],
        columns: [{
        title: '序号',
        align: 'center',
        render: (h, params) => {
          return h('span', {}, params.index + 1);
        }
      }, {
        title: '所属公司',
        align: 'center',
        key: 'companyName'
      }, {
        title: '上级部门',
        align: 'center',
        key: 'parentName'
      }, {
        title: '部门名称',
        align: 'center',
        key: 'name'
      },{
        title: '部门代码',
        align: 'center',
        key: 'code'
      }, {
        title: '操作',
        key: 'action',
        align: 'center',
        render: (h, params) => {
          return  h('div', {style: {marginBottom: '5px',marginTop: '5px' }}, [
              h('a', {style:{display:'block'},on: {click: () => {
                this.companyName = this.groupListData[params.index].companyName;
                this.addModal = true;
                this.newGroup = Object.assign({}, this.groupListData[params.index]);
              }}}, '修改'),
              h('a',
                [
                  h('Poptip',
                    {props: {title: '确认删除吗？',confirm: true,placement: 'left', },on: {'on-ok': () => {this.delGroup(params.row.id);}}},
                    ' 删除')
                ]
              ),
              h('a', {style:{display:'block'},on: {click: () => {
                  this.companyName = this.groupListData[params.index].companyName;
                  this.newGroup.parentName = this.groupListData[params.index].name;
                  this.newGroup.parentId = this.groupListData[params.index].id;
                  this.newGroup.companyId = this.groupListData[params.index].companyId;
                  console.log(this.newGroup)
                  this.addModal = true;
              }}}, '添加子部门'),
            ])
        }
      }]
      }
    },
    methods: {
      getGroupList(){
        let {companyId, name, pageInfo} = this;
        let params = {
          current: pageInfo.currentPage,
          size: pageInfo.limit,
          companyId: companyId,
          name: name
        };

        groupList(params, res => {
            if (res.code == 0) {
              this.groupListData = res.data.records
              this.pageInfo = {
                currentPage: res.data.current,
                limit: 10,
                totalItems: res.data.total
              }
            } else {
              this.$Message.error(res.msg);
            }
          }
        )
      },
      getCompanyList(){
        let params = {
          current: 1,
          size: 10,
          companyId: this.companyId,
          name: this.name
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
      pageChange (index) {
        this.pageInfo.currentPage = index;
        this.getGroupList();
      },
      addGroup(){
        if(!this.companyId){
          this.$Message.warning("请先选择公司");
          return;
        }
        this.addModal=true;
      },
      chooseCompany(e){
       this.companyName=e.label;
      },
      ok(){
        let {newGroup} = this;
        if(!newGroup.companyId){
          newGroup.companyId = this.companyId;
        }

        editGroup(newGroup, res => {
          if (res.code == 0) {
            this.$Message.success(res.msg);
            this.getGroupList();
            this.cancel();
          } else {
            this.$Message.error(res.msg);
          }
        });
      },
      cancel (){
        this.addModal = false;
        this.newGroup = {
            id: '',
            name: '',
            code: '',
            parentName: '',
            parentId: '',
            enableFlag: 'Y'
        }
      },
      delGroup (id){
        let params = {
          id: id
        }
        delGroup(params, res => {
            if (res.code == 0) {
              this.$Message.success(res.msg);
              this.getGroupList();
            } else {
              this.$Message.error(res.msg);
            }
          }
        );
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
  .ivu-tree-title{
        width: 100%;
    }
     .tableBtnHead{
    display:flex;
    align-items:center;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
</style>
