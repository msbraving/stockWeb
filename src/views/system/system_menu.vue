<template>
    <div class="u-overview" :style="{minHeight:clientHeight}">
        <div class="u-tle">
            <router-link to="/main/index">首页</router-link> / 菜单管理
        </div>
        <div class="inner-header" style="border-bottom: 1px solid #e5e5e5;">
            <div class="page-title">
                <Icon type="android-radio-button-off" size="15" class="icon"></Icon> 菜单管理
            </div>
        </div>
        <div class="content_head">
            <Form ref="completeInfoModal" :label-width="100" label-position="right">
                <Row>
                    <Col span="20">
                        <FormItem label="菜单名称">
                            <Input type="text" :maxlength="20" placeholder="请输入菜单名称"></Input>
                        </FormItem>
                    </Col>
                    <Col span="4" style="text-align: right;">
                        <div>
                            <Button type="primary" @click="getMenuList">
                            <Icon type="md-search" />&ensp;查询
                          </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
         <div class="content_company">
           <Row>
              <Col span="6">
                <div class="menu">
                    <Tree :data="data5"  @on-select-change="getSelectedNodes"></Tree>
                </div>
              </Col>
              <Col span="18" style="text-align: right;">
                <Table :columns="columns" :data="menuListData" class="table-editcontent"></Table>
              </Col>
          </Row>
      </div>
      <Modal
          v-model="addModel"
          title="新增菜单"
          width="1280px"
          @on-ok="ok"
          @on-cancel="cancel">
          <div class="">
            <Form ref="completeInfoModal" :label-width="100" label-position="right">
                <Row>
                    <Col span="8">
                        <FormItem label="资源代码">
                          <Input type="text" v-model="newMenu.code" :maxlength="20" placeholder=""></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="资源名称">
                            <Input type="text" v-model="newMenu.title" :maxlength="20" placeholder=""></Input>
                        </FormItem>
                    </Col>
                     <Col span="8">
                        <FormItem label="上级菜单">
                          <Input type="text" disabled v-model="baseData.title" :maxlength="20" placeholder=""></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                      <FormItem label="是否有效" >
                        <RadioGroup style="height:30px" v-model="newMenu.enableFlag">
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
                      <FormItem label="是否弹出窗口"  >
                        <RadioGroup style="height:30px" v-model="newMenu.popupFlag">
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
                        <FormItem label="显示顺序">
                          <Input type="text" v-model="newMenu.displayOrder" :maxlength="20" placeholder=""></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="URL">
                            <Input type="text" v-model="newMenu.url" :maxlength="20" placeholder=""></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="描述">
                            <Input type="text" v-model="newMenu.tooltip" :maxlength="20" placeholder=""></Input>
                        </FormItem>
                    </Col>

                  <Col span="24">
                    <FormItem label="菜单icon">
                      <Upload v-model="newMenu.iconClass"
                        type="drag"
                        action="//jsonplaceholder.typicode.com/posts/">
                        <div style="padding: 20px 0">
                          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                          <p>Click or drag files here to upload</p>
                        </div>
                      </Upload>
                    </FormItem>
                  </Col>

                </Row>
            </Form>
        </div>
      </Modal>
    </div>
</template>

<script>
  import { menuList, addMenu, editMenu, delMenu, detailMenu, childMenu} from '../../service/system/menu.service';

  export default {
    computed: {

    },
     mounted () {
      this.getMenuList()
    },
    data () {
      return {
        clientHeight: document.body.clientHeight + 'px',
        addModel: false,
        baseData: {},
        newMenu:{
          categoryType: "",
          closable: "",
          code: "",
          dataHeight: "",
          deleted: 0,
          displayOrder: 0,
          duplicate: "",
          enableFlag: "Y",
          externalLink: "",
          iconClass: "",
          id: 0,
          isFrontEnd: "",
          menuClass: "",
          parentId: 0,
          popupFlag: "Y",
          reassignedFlag: "",
          tenantId: 0,
          title: "",
          tooltip: "",
          url: "",
          uuid: ""
        },
        menuListData: [],
        data5: [],
        columns: [{
          title: '上级资源名称',
          align: 'center',
          render: (h, params) => {
            let nickName = params.index != 0 ? params.row.title : '';
            return h('span', nickName);
          }
        }, {
          title: '资源名称',
          align: 'center',
          key: 'title',
        }, {
          title: '是否有效',
          align: 'center',
          key: 'enableFlag',
          render: (h, params) => {
            let nickName = params.row.enableFlag == 'Y' ? '有效' : '失效';
            return h('span', nickName);
          }
        }, {
          title: '操作',
          align: 'center',
          render: (h, params) => {
            return  h('div', {style: {marginBottom: '5px',marginTop: '5px' }}, [
                h('a', {style:{display:'block'},on: {click: () => { this.showAddMenu(params) }}}, '新增'),
                h('a', {style:{display:'block'},on: {click: () => { this.editMenu(params)}}}, '修改'),
                h('a', {on: {click: () => { }}},
                  [
                    h('Poptip',
                      {props: {title: '确认删除吗？',confirm: true,placement: 'left', },on: {'on-ok': () => {this.delMenu(params.row.id);}}},
                      ' 删除')
                  ]
                ),
                h('a', {style:{display:'block'},on: {click: () => { }}}, '菜单角色配置'),
              ])
          }
        }]
      }
    },
    methods: {
     getMenuList(){
        let {newMenu} = this
        let params = newMenu
        menuList(params, res => {
            if (res.code == 0) {
              this.data5 = res.data
            } else {
              this.$Message.error(res.msg);
            }
          });
      },
      getChildMenu (parentId) {
        let params = {parentId: parentId}
        this.menuListData=[]
        childMenu(params, res => {
            if (res.code == 0) {
             this.menuListData = this.menuListData.concat(res.data.base, res.data.list)
             this.baseData = res.data.base
            } else {
              this.$Message.error(res.msg);
            }
          });
      },
      ok () {
        let {newMenu} = this
        let reslutMenu = this.newMenu
        if (newMenu.id) {
          editMenu(newMenu, res => {
            if (res.code == 0) {
              this.getMenuList();
              this.menuListData = []
              this.reset()
            } else {
              this.$Message.error(res.msg);
            }
          });
        } else {
          reslutMenu.parentId = this.baseData.id;
          addMenu(reslutMenu, res => {
            if (res.code == 0) {
              this.getMenuList();
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
      reset (){
        this.newMenu = {
          categoryType: "",
          closable: "",
          code: "",
          dataHeight: "",
          deleted: 0,
          displayOrder: 0,
          duplicate: "",
          enableFlag: "Y",
          externalLink: "",
          iconClass: "",
          id: 0,
          isFrontEnd: "",
          menuClass: "",
          parentId: 0,
          popupFlag: "Y",
          reassignedFlag: "",
          tenantId: 0,
          title: "",
          tooltip: "",
          url: "",
          uuid: ""
        }
      },
      getSelectedNodes(data, row){
        // console.log(data, row)
        this.getChildMenu(row.parentId == 0 ? row.id : row.id)
      },
      showAddMenu (params){
        this.addModel = true

      },
      editMenu (params){
        this.addModel = true
        this.newMenu = Object.assign({}, this.menuListData[params.index])
      },
      delMenu (id){
        let params = {
          menuId: id
        }
        delMenu(params, res => {
            if (res.code == 0) {
                this.getMenuList()
                this.menuListData = []
            } else {
              // this.changeCaptcha()
              this.$Message.error(res.msg);
            }
          }
        );
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
  .menu{
    background-color: #f6f6f6;
    padding: 10px;
    margin-right: 20px;
    border: 1px solid #dddee1;
    min-height: 300px;
  }
</style>
