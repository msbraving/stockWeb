<template>
  <div class="u-overview" :style="{minHeight:clientHeight}">
    <div class="u-tle">
      <router-link to="/main/index">首页</router-link> / banner管理
    </div>
    <div class="inner-header" style="border-bottom: 1px solid #e5e5e5;">
      <div class="page-title">
        <Icon type="android-radio-button-off" size="15" class="icon"></Icon> banner管理
      </div>
    </div>
    <div class="content_head">
      <Form ref="completeInfoModal" :label-width="100" label-position="right">
        <Row>

          <Col span="8">
            <FormItem label="名称">
              <Input type="text" v-model="name" :maxlength="50"  placeholder="请输入banner名称"></Input>
            </FormItem>
          </Col>





          <Col span="3" style="text-align: right;">
            <div>
              <Button type="primary" @click="getBannerList">
                <Icon type="search"></Icon>筛选
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="content_company">
      <div class="tableBtnHead">
        <Button @click="add" type="primary" icon="plus-round" style="display: inline-block;margin-bottom:10px;">新增</Button>
      </div>
      <Table :columns="columns" :data="bannerListData"  class="table-editcontent"></Table>
      <div class="common-table-bottom" v-if="bannerListData && bannerListData.length > 0">
        <div style="float: right;">
          <Page :total="pageInfo.totalItems" show-elevator class-name="pagination-content" show-total @on-change="pageChange" :current="pageInfo.currentPage" :page-size="pageInfo.limit" style="float:right" size="small"></Page>
        </div>
      </div>
    </div>
    <Modal
      v-model="addBanner"
      title="新增分类"
      width="1000px"
      @on-ok="ok"
      @on-cancel="cancel">
      <div class="">
        <Form ref="completeInfoModal" :label-width="160" label-position="right">
          <Row>
            <Col span="12">
              <FormItem label="banner名称">
                <Input type="text" v-model="newBanner.name" :maxlength="50"  placeholder="请输入banner名称"></Input>
              </FormItem>
            </Col>

          </Row>


          <row>
            <Col span="12">
              <FormItem label="banner图片">
                <div class="demo-upload-list" v-for="item in uploadList">
                    <img :src="item.url" style="width: 20%">
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
              <FormItem label="生效日期">
                <DatePicker type="daterange" format="yyyy-MM-dd" confirm placement="bottom-end" placeholder="请选择日期" v-model="datePicker" @on-ok="dateChange()" style="width: 100%"></DatePicker>
              </FormItem>
            </Col>
          </row>


          <row>
            <Col span="12">
              <FormItem label="跳转链接">
                <Input type="text" v-model="newBanner.linkUrl" :maxlength="500"  placeholder="跳转链接"></Input>
              </FormItem>
            </Col>
          </row>

          <row>
            <Col span="12">
              <FormItem label="排序">
                <InputNumber type="input" v-model="newBanner.displayIndex" :maxlength="20"  ></InputNumber>
              </FormItem>
            </Col>
          </row>


        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>

import {bannerList, onSaleUpdate, delBanner, saveBanner, editBanner} from '../../service/system/banner.service.js';

export default {
  computed: {

  },
  props: {
    index: '',
    content: {}
  },
  mounted () {
    this.getBannerList();
  },
  data () {
    return {
      clientHeight: document.body.clientHeight + 'px',
      addBanner: false,
      datePicker: [],
      buttonProps: {
        type: 'default',
        size: 'small',
      },
      uploadList: [],
      imgName: '',
      visible: false,
      name: '',
      newBanner: {
        id: '',
        name: '',
        imgUrl: '',
        linkUrl: '',
        displayIndex: 1,
        isOnSale: true,
        validTime: '',
        expireTime: '',
        isDisabled: false
      },
      pageInfo: {
        currentPage: 1,
        limit: 10,
        totalItems: 0
      },
      bannerListData: [],
      columns: [{
        title: '序号',
        align: 'center',
        render: (h, params) => {
          return h('span', {}, params.index + 1);
        }
      }, {
        title: 'banner名称',
        align: 'center',
        key: 'name'
      }, {
        title: 'banner图片',
        align: 'center',
        render: (h, params) => {
          return h('img', {
            attrs: {
              src: params.row.imgUrl
            },
            style: {
              width: '200px'
            }
          })
        }
      }, {
        title: '链接',
        align: 'center',
        key: 'linkUrl'
      },{
        title: '生效日期',
        align: 'center',
        key: 'startDate',
        render: (h, params) => {
          return h('span', this.$moment(params.row.validTime).format('YYYY-MM-DD'));
        }
      },  {
        title: '失效日期',
        align: 'center',
        key: 'endDate',
        render: (h, params) => {
          return h('span', this.$moment(params.row.expireTime).format('YYYY-MM-DD'));
        }
      }, {
        title: '状态',
        align: 'center',
        key: 'isOnSale',
        render: (h, params) => {
          return h('span', params.row.isOnSale == true ? '上架' : '下架');
        }
      },{
        title: '操作',
        key: 'action',
        align: 'center',
        render: (h, params) => {
          return  h('div', {style: {marginBottom: '5px',marginTop: '5px' }}, [
            h('a', {style:{display:'block'},on: {click: () => {
                  this.add();
                  this.newCompany = Object.assign({}, this.compangyListData[params.index])
                }}}, '修改'),

            h('a', {style:{display:'block'},on: {click: () => {
                  this.onSale(params.row.id, params.row.isOnSale)
                }}}, params.row.isOnSale == false ? '上架' : '下架')
          ])
        }
      }]
    }
  },
  methods: {
    dateChange (){
      var _this = this;
      var rangeDate = _this.datePicker;
      if (!rangeDate[0] && !rangeDate[1]) {
        _this.newBanner.validTime = '';
        _this.newBanner.expireTime = '';
      } else {
        _this.newBanner.validTime = new Date(rangeDate[0]).getTime();
        _this.newBanner.expireTime = new Date(rangeDate[1]).getTime();
      }
    },
    getBannerList(){
      let {brandCode, brandName, pageInfo} = this;

      let params = {
        current: pageInfo.currentPage,
        size: pageInfo.limit,
        brandCode: brandCode,
        brandName: brandName
      };

      bannerList(params, res => {
          if (res.code == 0) {
            this.bannerListData = res.data.records
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
          this.addBanner = true;
    },
    ok(){
      let {newBanner} = this;
      if(this.uploadList.length > 0){
        newBanner.imgUrl = this.uploadList[0].url;
      };
      if(newBanner.id){
        editBanner(newBanner, res => {
          if (res.code == 0) {
            this.$Message.success(res.msg);
            this.getBannerList();
          } else {
            this.$Message.error(res.msg);
          }
        });
      }else{
        saveBanner(newBanner, res => {
          if (res.code == 0) {
            this.$Message.success(res.msg);
            this.getBannerList();
          } else {
            this.$Message.error(res.msg);
          }
        });
      }

      this.reset();
    },
    onSale(id, isOnSale){
      let params = {
        id: id,
        isOnSale: !isOnSale
      }
      onSaleUpdate(params, res => {
          if (res.code == 0) {
            this.$Message.success(res.msg);
            this.getBannerList();
          } else {
            this.$Message.error(res.msg);
          }
        }
      );
      console.log(id, !isOnSale)
    },
    cancel (){
      this.addBanner = false;
      this.reset();
    },
    reset(){
       this.newBanner = {
         id: '',
         name: '',
         imgUrl: '',
         linkUrl: '',
         displayIndex: 1,
         validTime: '',
         expireTime: '',
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
