<template>
  <div class="u-overview" :style="{minHeight:clientHeight}">
    <div class="u-tle">
      <router-link to="/main/index">首页</router-link> / 品牌管理
    </div>
    <div class="inner-header" style="border-bottom: 1px solid #e5e5e5;">
      <div class="page-title">
        <Icon type="android-radio-button-off" size="15" class="icon"></Icon> 品牌管理
      </div>
    </div>
    <div class="content_head">
      <Form ref="completeInfoModal" :label-width="100" label-position="right">
        <Row>

          <Col span="8">
            <FormItem label="品牌编号">
              <Input type="text" v-model="brandCode" :maxlength="50"  placeholder="请输入品牌编号"></Input>
            </FormItem>
          </Col>


          <Col span="8">
            <FormItem label="品牌名称">
              <Input type="text" v-model="brandName" :maxlength="50"  placeholder="请输入品牌名称"></Input>
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
        <Button @click="add" type="primary" icon="md-add" style="display: inline-block;margin-bottom:10px;">新增</Button>
      </div>
      <Table :columns="columns" :data="brandListData"  class="table-editcontent"></Table>
      <div class="common-table-bottom" v-if="brandListData && brandListData.length > 0">
        <div style="float: right;">
          <Page :total="pageInfo.totalItems" show-elevator class-name="pagination-content" show-total @on-change="pageChange" :current="pageInfo.currentPage" :page-size="pageInfo.limit" style="float:right" size="small"></Page>
        </div>
      </div>
    </div>
    <Modal
      v-model="addBrand"
      title="新增分类"
      width="1000px"
      @on-ok="ok"
      @on-cancel="cancel">
      <div class="">
        <Form ref="completeInfoModal" :label-width="160" label-position="right">
          <Row>
            <Col span="12">
              <FormItem label="品牌名称">
                <Input type="text" v-model="newBrand.brandName" :maxlength="50"  placeholder="请输入品牌名称"></Input>
              </FormItem>
            </Col>

          </Row>


          <row>
            <Col span="12">
              <FormItem label="品牌logo">
                <div class="demo-upload-list" v-for="item in uploadList">
                    <img :src="item.url">
                    <div class="demo-upload-list-cover">
                      <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                      <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                    </div>
                </div>
                <Upload
                  ref="upload"
                  :show-upload-list="false"
                  :on-success="handleSuccess"
                  :format="['jpg','jpeg','png']"
                  :max-size="2048"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :before-upload="handleBeforeUpload"
                  multiple
                  type="drag"
                  action="/api/system/file/upload"
                  style="display: inline-block;width:58px;">
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                  </div>
                </Upload>
                <Modal title="View Image" v-model="visible">
                  <img :src = imgName  v-if="visible" style="width: 100%">
                </Modal>
              </FormItem>
            </Col>
          </row>

          <row>
            <Col span="12">
              <FormItem label="品牌描述">
                <Input type="textarea" v-model="newBrand.brandDesc" :maxlength="500"  placeholder="请输入关键词"></Input>
              </FormItem>
            </Col>
          </row>


        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>

import {brandList, delBrand, saveBrand, editBrand} from '../../service/system/brand.service.js';

export default {
  computed: {

  },
  props: {
    index: '',
    content: {}
  },
  mounted () {
    this.getBrandList();
  },
  data () {
    return {
      clientHeight: document.body.clientHeight + 'px',
      addBrand: false,
      buttonProps: {
        type: 'default',
        size: 'small',
      },
      uploadList: [],
      imgName: '',
      visible: false,
      brandCode: '',
      brandName: '',
      newBrand: {
        id: '',
        brandCode: '',
        brandName: '',
        brandDesc: '',
        brandImageUrl: '',
        isDisabled: false
      },
      pageInfo: {
        currentPage: 1,
        limit: 10,
        totalItems: 0
      },
      brandListData: [],
      columns: [{
        title: '序号',
        align: 'center',
        render: (h, params) => {
          return h('span', {}, params.index + 1);
        }
      },{
        title: '品牌编码',
        align: 'center',
        key: 'brandCode'
      }, {
        title: '品牌名称',
        align: 'center',
        key: 'brandName'
      }, {
        title: '品牌logo',
        align: 'center',
        render: (h, params) => {
          return h('img', {
            attrs: {
              src: params.row.brandImageUrl
            },
            style: {
              width: '100px',
              height: '100px'
            }
          })
        }
      }, {
        title: '品牌描述',
        align: 'center',
        key: 'brandDesc'
      }, {
        title: '操作',
        key: 'action',
        align: 'center',
        render: (h, params) => {
          return  h('div', {style: {marginBottom: '5px',marginTop: '5px' }}, [
              h('a', {style:{display:'block'},on: {click: () => { 
                this.addBrand = true;
                  this.newBrand = Object.assign({}, this.brandListData[params.index]);
                  this.uploadList.push({url: this.newBrand.brandImageUrl})
              }}}, '修改'),
              h('a', {on: {click: () => { }}},
                [
                  h('Poptip',
                    {props: {title: '确认删除吗？',confirm: true,placement: 'left', },on: {'on-ok': () => {
                      this.delCategory(params.row.categoryId);
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
    getBrandList(){
      let {brandCode, brandName, pageInfo} = this;

      let params = {
        current: pageInfo.currentPage,
        size: pageInfo.limit,
        brandCode: brandCode,
        brandName: brandName
      };

      brandList(params, res => {
          if (res.code == 0) {
            this.brandListData = res.data.records
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
    pageChange (index) {
      this.pageInfo.currentPage = index;
      this.getBrandList();
    },
    add(){
          this.addBrand = true;
    },
    ok(){
      let {newBrand} = this;
      if(this.uploadList.length > 0){
        newBrand.brandImageUrl = this.uploadList[0].url;
      };
      if(newBrand.id){
        editBrand(newBrand, res => {
          if (res.code == 0) {
            this.$Message.success(res.msg);
            this.getBrandList();
          } else {
            this.$Message.error(res.msg);
          }
        });
      }else{
        saveBrand(newBrand, res => {
          if (res.code == 0) {
            this.$Message.success(res.msg);
            this.getBrandList();
          } else {
            this.$Message.error(res.msg);
          }
        });
      }

      this.reset();
    },

    cancel (){
      this.addBrand = false;
      this.reset();
    },
    reset(){
       this.newBrand = {
         id: '',
         brandCode: '',
         brandName: '',
         brandDesc: '',
         brandImageUrl: '',
         isDisabled: false
       };
       this.uploadList = [];
    },
    del(id){
      let params = {
        id: id
      }
      delBrand(params, res => {
          if (res.code == 0) {
            this.$Message.success(res.msg);
            this.getBrandList();
          } else {
            this.$Message.error(res.msg);
          }
        }
      );
    },
    handleView (url) {
      this.imgName = url;
      this.visible = true;
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      this.uploadList = [];
    },
    handleSuccess (res, file) {
      file.url = res.data;
      this.uploadList = [];
      this.uploadList.push(file);

    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
      });
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      });
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: 'Up to five pictures can be uploaded.'
        });
      }
      return check;
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
