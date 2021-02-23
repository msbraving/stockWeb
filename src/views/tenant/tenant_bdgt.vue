<template>
    <div class="u-overview" :style="{minHeight:clientHeight}">
        <div class="u-tle">
            <router-link to="/main/index">首页</router-link> /预算管理
        </div>
        <div class="inner-header" style="border-bottom: 1px solid #e5e5e5;">
            <div class="page-title">
                <Icon type="android-radio-button-off" size="15" class="icon"></Icon> 预算管理
            </div>
        </div>
        <div class="content_head">
            <Form ref="completeInfoModal" :label-width="100" label-position="right">
                <Row>

                    <Col span="8">
                    <FormItem label="预算账户">
                        <Input type="text" v-model="budgetAccount" :maxlength="50" placeholder="请输入预算账户"></Input>
                    </FormItem>
                    </Col>

                    <Col span="8">
                    <FormItem label="预算名称">
                        <Input type="text" v-model="budgetName" :maxlength="50" placeholder="请输入预算账户"></Input>
                    </FormItem>
                    </Col>

                    <Col span="8">
                    <FormItem label="预算项目名称">
                        <Input type="text" v-model="projectName" :maxlength="50" placeholder="请输入预算项目名称"></Input>
                    </FormItem>
                    </Col>

                    <Col span="8">
                    <FormItem label="预算部门名称">
                        <Input type="text" v-model="budgetDeptName" :maxlength="50" placeholder="请输入预算部门名称"></Input>
                    </FormItem>
                    </Col>

                    <Col span="8" style="text-align: right;">
                    <div>
                        <Button type="primary" @click="getBdgtList">
                            <Icon type="md-search" />&ensp;查询
                        </Button>
                        <Button>
                            <Icon type="md-refresh" />&ensp;重置
                        </Button>
                    </div>
                    </Col>
                </Row>
            </Form>
        </div>
        <div class="content_company">
            <div class="tableBtnHead">

                <Button @click="exportlist" type="primary" icon="md-add" style="display: inline-block;margin-bottom:10px;">导出</Button>
                <Button @click="add" type="primary" icon="md-add" style="display: inline-block;margin-bottom:10px;">新增</Button>
            </div>
            <Table :columns="columns" :data="budgetMapListData" class="table-editcontent"></Table>
            <div class="common-table-bottom" v-if="budgetMapListData && budgetMapListData.length > 0">
                <div style="float: right;">
                    <Page :total="pageInfo.totalItems" show-elevator class-name="pagination-content" show-total @on-change="pageChange" :current="pageInfo.currentPage"
                          :page-size="pageInfo.limit" style="float:right" size="small"></Page>
                </div>
            </div>
        </div>
        <Modal v-model="addBdgt" title="新增分类" width="1000px" @on-ok="ok" @on-cancel="cancel">
            <div class="">
                <Form ref="completeInfoModal" :label-width="160" label-position="right">

                    <Row>
                        <Col span="12">
                        <FormItem label="预算名称">
                            <Input type="text" v-model="newBdgt.budgetName" :maxlength="50" placeholder="请输入预算账户"></Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                        <FormItem label="预算部门">
                            <Select v-model="newBdgt.budgetDeptId" filterable clearable remote :remote-method="getBudgetDeptList">
                                <Option v-for="item in budgetDeptListData" :value="item.id" :key="item.id">{{ item.budgetDeptName }}</Option>
                            </Select>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                        <FormItem label="预算项目">
                            <Select v-model="newBdgt.projectId" filterable clearable remote :remote-method="getBudgetProjectList">
                                <Option v-for="item in budgetProjectListData" :value="item.id" :key="item.id">{{ item.projectName }}</Option>
                            </Select>
                        </FormItem>
                        </Col>

                    </Row>
                    <Row>
                        <Col span="12">
                        <FormItem label="预算年">
                            <Select v-model="newBdgt.year" filterable>
                                <Option value="2019">2019</Option>
                                <Option value='2020'>2020</Option>
                                <Option value='2021'>2021</Option>
                                <Option value='2022'>2022</Option>
                            </Select>
                        </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="12">
                        <FormItem label="预算金额（元）">
                            <InputNumber style="width: 200px;" type="text" v-model="newBdgt.budgetAmountYuan"></InputNumber>
                        </FormItem>
                        </Col>
                    </Row>

                </Form>
            </div>
        </Modal>
    </div>
</template>

<script>

import { bdgtList, mapInfoListLogExport, delBdgt, saveBdgt, budgetDeptList, budgetProjectList } from '../../service/system/bdgt.service.js';
import Vue from 'vue';
import { baseUrl } from '../../service/config/env';
import store from '../../store';

export default {
    computed: {

    },
    props: {
        index: '',
        content: {}
    },
    mounted() {
        this.getBdgtList();
    },
    data() {
        return {
            clientHeight: document.body.clientHeight + 'px',
            addBdgt: false,
            buttonProps: {
                type: 'default',
                size: 'small',
            },
            budgetAccount: '',
            budgetName: '',
            projectName: '',
            projectCode: '',
            budgetDeptName: '',
            budgetDeptCode: '',
            newBdgt: {
                budgetName: '',
                budgetId: null,
                projectId: null,
                budgetDeptId: null,
                budgetAmountYuan: null,
                year: '2021'
            },
            pageInfo: {
                currentPage: 1,
                limit: 10,
                totalItems: 0
            },
            budgetMapListData: [],
            budgetDeptListData: [],
            budgetProjectListData: [],
            columns: [{
                title: '序号',
                align: 'center',
                render: (h, params) => {
                    return h('span', {}, params.index + 1);
                }
            }, {
                title: '预算账户',
                align: 'center',
                key: 'budgetAccount'
            },
            {
                title: '预算名称',
                align: 'center',
                key: 'budgetName'
            },
            {
                title: '项目',
                align: 'center',
                key: 'projectName'
            }, {
                title: '部门',
                align: 'center',
                key: 'budgetDeptName'
            }, {
                title: '可用金额(元)',
                align: 'center',
                key: 'budgetAmountYuan'
            }, {
                title: '占用金额(元)',
                align: 'center',
                key: 'budgetLockAmountYuan'
            },
            {
                title: '已用金额(元)',
                align: 'center',
                key: 'budgetUserAmountYuan'
            }, {
                title: '操作',
                key: 'action',
                align: 'center',
                render: (h, params) => {
                    return h('div', { style: { marginBottom: '5px', marginTop: '5px' } }, [
                        h('a', {
                            style: { display: 'block' }, on: {
                                click: () => {
                                    this.addCategory = true;
                                    this.newCategory = Object.assign({}, this.groupListData[params.index]);
                                }
                            }
                        }, '修改'),
                        h('a', { on: { click: () => { } } },
                            [
                                h('Poptip',
                                    {
                                        props: { title: '确认删除吗？', confirm: true, placement: 'left', }, on: {
                                            'on-ok': () => {
                                                this.delCategory(params.row.categoryId);
                                            }
                                        }
                                    },
                                    ' 删除')
                            ]
                        ),
                    ])
                }
            }]
        }
    },
    methods: {
        getBdgtList() {
            let { budgetName, budgetCode, projectName, budgetDeptName, pageInfo } = this;

            let params = {
                current: pageInfo.currentPage,
                size: pageInfo.limit,
                budgetName: budgetName,
                budgetCode: budgetCode,
                budgetDeptName: budgetDeptName,
                projectName: projectName
            };

            bdgtList(params, res => {
                if (res.code == 0) {
                    this.budgetMapListData = res.data.records
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
        exportlist() {
            let { budgetName, budgetCode, projectName, budgetDeptName, pageInfo } = this;

            let params = {
                current: pageInfo.currentPage,
                size: pageInfo.limit,
                budgetName: budgetName,
                budgetCode: budgetCode,
                budgetDeptName: budgetDeptName,
                projectName: projectName
            };

            Vue.axios.post(baseUrl + "/product/bdgt/mapInfoListExport", params, {
                headers: {
                    Authorization: 'Bearer ' + store.state.GLOBAL.token
                },
                responseType: 'arraybuffer'
            }).then((res) => {
                const blob = new Blob([res.data], {
                    type: "application/octet-stream",
                });
                var link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.download = "预算信息.xlsx";
                link.click();
                window.URL.revokeObjectURL(blob); // 释放掉blob对象
            })
                .catch((err) => {
                    this.$message.error("下载失败");
                });

        },
        pageChange(index) {
            this.pageInfo.currentPage = index;
            this.getCategoryList();
        },
        add() {
            this.addBdgt = true;
            this.getBudgetDeptList(null);
            this.getBudgetProjectList(null);

        },
        getBudgetDeptList(query) {
            let params = {
                current: 1,
                size: 20,
                budgetDeptName: query
            };
            budgetDeptList(params, res => {
                if (res.code == 0) {
                    this.budgetDeptListData = res.data.records
                } else {
                    this.$Message.error(res.msg);
                }
            }
            )
        },
        getBudgetProjectList(query) {
            let params = {
                current: 1,
                size: 20,
                budgetDeptName: query
            };
            budgetProjectList(params, res => {
                if (res.code == 0) {
                    this.budgetProjectListData = res.data.records
                } else {
                    this.$Message.error(res.msg);
                }
            }
            )
        },
        ok() {
            let { newBdgt } = this;
            console.log(newBdgt);
            saveBdgt(newBdgt, res => {
                if (res.code == 0) {
                    this.$Message.success(res.msg);
                    this.getBdgtList();
                    this.cancel();
                } else {
                    this.$Message.error(res.msg);
                }
            });
        },
        cancel() {
            this.addBdgt = false;

        },
        delCategory(id) {
            let params = {
                categoryId: id
            }
            delCategory(params, res => {
                if (res.code == 0) {
                    this.$Message.success(res.msg);
                    this.getGroupList();
                } else {
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
.content_company {
    margin-top: 20px;
}
.ivu-tree-title {
    width: 100%;
}
.tableBtnHead {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 10px;
}
</style>
