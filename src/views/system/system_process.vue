<template>
    <div class="u-overview" :style="{minHeight:clientHeight}">
        <div class="u-tle">
            <router-link to="/main/index">首页</router-link> / 流程管理
        </div>
        <div class="inner-header" style="border-bottom: 1px solid #e5e5e5;">
            <div class="page-title">
                <Icon type="android-radio-button-off" size="15" class="icon"></Icon> 流程管理
            </div>
        </div>
        <div class="content_head">
            <Form ref="completeInfoModal" :label-width="100" label-position="right">
                <Row>
                    <Col span="8">
                        <FormItem label="产品ID">
                            <Input type="text" :maxlength="20" placeholder="产品ID"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="产品编码">
                            <Input type="text" :maxlength="50"  placeholder="产品编码"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="产品名称">
                            <Input type="text" :maxlength="10"  placeholder="产品名称"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="产品分类">
                            <Input type="text" :maxlength="11" placeholder="产品分类"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="累计销量">
                            <Row>
                                <Col span="11">
                                    <Input type="text" :maxlength="11" placeholder=""></Input>
                                </Col>
                                <Col span="2" style="text-align: center">-</Col>
                                <Col span="11">
                                    <Input type="text" :maxlength="11" placeholder=""></Input>
                                </Col>
                            </Row>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="当前价">
                            <Row>
                                <Col span="11">
                                    <Input type="text" :maxlength="11" placeholder=""></Input>
                                </Col>
                                <Col span="2" style="text-align: center">-</Col>
                                <Col span="11">
                                    <Input type="text" :maxlength="11" placeholder=""></Input>
                                </Col>
                            </Row>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="是否预售">
                            <Select style="width:100%;" placeholder="请选择">
                                <Option :value="99">全部</Option>
                                <Option value='Y'>启用</Option>
                                <Option value='N'>停用</Option>
                            </Select>
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
            <Table :columns="columns" :data="data" @on-select-all="selectAll" @on-selection-change="selectChange" @on-sort-change="sortableList" class="table-editcontent"></Table>
            <div class="common-table-bottom" v-if="data && data.length > 0">
                <div style="float: right;">
                <Page :total="pageInfo.totalItems" show-elevator class-name="pagination-content" show-total @on-change="pageChange" :current="pageInfo.currentPage" :page-size="pageInfo.limit" style="float:right" size="small"></Page>
                </div>
            </div>
            </div>
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
        title: '分组名称',
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
        title: '发布时间',
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
                  this.$router.push({name: 'article_manage_article_list', params: {group_id: params.row.id}});
                }
              }
            }, [h('i', {
              class: {
                'fa': true,
                'fa-eye': true
              }
            }, '查看资讯')]), h('span', {
              class: {
                delimiter: true
              },
              style: {
                margin: '0 4px'
              }
            }), h('a', {
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
                class: {
                  'fa': true,
                  'fa-trash-o': true
                }
              }, ' 删除')
            ])])])
          ]);
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
</style>
