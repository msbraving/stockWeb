<template>
    <div class="u-overview" :style="{minHeight:clientHeight}">
        <div class="u-tle">
            <router-link to="/main/index">首页</router-link> / <router-link to="role">角色管理</router-link> / 角色权限
        </div>
        <div class="inner-header" style="border-bottom: 1px solid #e5e5e5;">
            <div class="page-title">
                <Icon type="android-radio-button-off" size="15" class="icon"></Icon> 角色权限
            </div>
        </div>
        <div class="content_head">
            <Form ref="completeInfoModal" :label-width="140" label-position="right">
                <Row>
                  <Col span="8">
                          <FormItem label="角色名称">
                            <Input type="text" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                    <Col span="8">
                        <FormItem label="角色资源类型名称">
                           <Select style="width:100%;" placeholder="请选择">
                                <Option :value="99">全部</Option>
                                <Option value='Y'>启用</Option>
                                <Option value='N'>停用</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="8">
                          <FormItem label="资源代码">
                            <Input type="text" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                    <Col span="8">
                          <FormItem label="资源名称">
                            <Input type="text" :maxlength="20" placeholder=""></Input>
                          </FormItem>
                      </Col>
                    <Col span="16" style="text-align: right;">
                        <div>
                            <Button type="primary">
                            <Icon type="search"></Icon>查询
                            </Button>
                            </a>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
        <div class="content_company">
          <div class="tableBtnHead">
            <Button @click="$router.push({name: 'coupon_manage_add'})" type="primary" icon="plus-round" style="display: inline-block;margin-bottom:10px;">维护</Button>
          </div>
          <Table :columns="columns" :data="data" class="table-editcontent"></Table>
          <div class="common-table-bottom" v-if="data && data.length > 0">
              <div style="float: right;">
              <Page :total="pageInfo.totalItems" show-elevator class-name="pagination-content" show-total :current="pageInfo.currentPage" :page-size="pageInfo.limit" style="float:right" size="small"></Page>
              </div>
          </div>
        </div>
        <Modal
            v-model="addCompany"
            title="菜单权限维护[角色=登陆用户]"
            width="1280px"
            >
            <div class="">
              <Form ref="completeInfoModal" :label-width="100" label-position="right">
                  <Row>
                      <Col span="8">
                          <FormItem label="目录菜单">
                            <Cascader :data="data2" filterable></Cascader>
                        </FormItem>
                      </Col>
                  </Row>
              </Form>
              <Table :columns="columns" :data="data" class="table-editcontent"></Table>
              <div class="common-table-bottom" v-if="data && data.length > 0">
                <div>
                  <Button type="primary" >批量添加</Button>
                  <Button type="primary">批量移除</Button>
                </div>
                <div style="float: right;">
                  <Page :total="pageInfo.totalItems" show-elevator class-name="pagination-content" show-total  :current="pageInfo.currentPage" :page-size="pageInfo.limit" style="float:right" size="small"></Page>
                </div>
            </div>
          </div>
        </Modal>
    </div>
</template>

<script>
  import {searchData} from '../../service/system/system.service'
  export default {
    computed: {

    },
    mounted () {
      this.searchList();
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
        title: '资源类型',
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
        title: '资源代码',
        align: 'center',
        key: 'created_time'
      }, {
        title: '资源名称',
        align: 'center',
        key: 'created_time'
      }, {
        title: '操作码',
        align: 'center',
        key: 'created_time'
      }, {
        title: '操作',
        key: 'action',
        align: 'center',
        render: (h, params) => {
          return h('div', [
            h('p', {
              style: {
                marginBottom: '10px'
              }
            }, [h('a', {
              on: {
                click: () => {
                  // this.del();
                }
              }
            }, [h('Poptip', {
              props: {
                title: '确认删除吗？',
                confirm: true,
                placement: 'left'
              },
              on: {
                'on-ok': () => {
                  this.delGroup(params.row.id);
                }
              }
            }, [
              h('i', {
                style: {
                  margin: '0 4px'
                },
                class: {
                  'fa': true,
                  'fa-trash-o': true
                }
              }, ' 删除')
            ])]) ])
          ]);
        }
      }]
      }
    },
    methods: {
     searchList () {
        let _this = this;
        // searchData({}, (data) => {
        //   if (data.errcode == 0) {
        //     if (data.data.version_id == 1) {
        //       _this.version_id = 1
        //     }
        //   } else {
        //     _this.$Message.error(data.errmsg || '系统繁忙，请稍后重试！');
        //   }
        // }, () => {
        //   _this.$Message.error('系统繁忙，请稍后重试！');
        // });
      },
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
  .common-table-bottom{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
  }
</style>
