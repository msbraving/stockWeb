<template>
    <div class="u-overview" :style="{minHeight:clientHeight}">
        <div class="u-tle">
            <router-link to="/main/index">首页</router-link> / 产品目录
        </div>
        <div class="inner-header" style="border-bottom: 1px solid #e5e5e5;">
            <div class="page-title">
                <Icon type="android-radio-button-off" size="15" class="icon"></Icon> 产品目录
            </div>
        </div>
        <div class="content_head">
            <Form ref="completeInfoModal" :label-width="100" label-position="right">
                <Row>

                    <Col span="7">
                    <FormItem label="分类名称">
                        <Input type="text" v-model="categoryName" :maxlength="50" placeholder="请输入分类编号"></Input>
                    </FormItem>
                    </Col>

                    <Col span="7">
                    <FormItem label="分类级别">
                        <Select v-model="level">
                            <Option value="">全部</Option>
                            <Option value="1">一级</Option>
                            <Option value="2">二级</Option>
                            <Option value="3">三级</Option>
                        </Select>
                    </FormItem>
                    </Col>

                    <Col span="8">
                    <FormItem label="分类级别">
                        <Select v-model="level">
                            <Option value="">全部</Option>
                            <Option value="1">一级</Option>
                            <Option value="2">二级</Option>
                            <Option value="3">三级</Option>
                        </Select>
                    </FormItem>
                    </Col>

                    <Col span="7">
                    <FormItem label="上级分类名称">
                        <Input type="text" v-model="parentCategoryName" :maxlength="50" placeholder="请输入上级分类名称"></Input>
                    </FormItem>
                    </Col>
                    <Col span="24" style="text-align: right;">
                    <div>
                        <Button type="primary" @click="getCategoryList">
                            <Icon type="md-search" />&ensp;查询
                        </Button>
                        <Button @click="resetForm">
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
            <Table :columns="columns" :data="categoryListData" class="table-editcontent"></Table>
            <div class="common-table-bottom" v-if="categoryListData && categoryListData.length > 0">
                <div style="float: right;">
                    <Page :total="pageInfo.totalItems" show-elevator class-name="pagination-content" show-total @on-change="pageChange" :current="pageInfo.currentPage"
                          :page-size="pageInfo.limit" style="float:right" size="small"></Page>
                </div>
            </div>
        </div>
        <Modal v-model="addCategory" title="新增分类" width="600px" @on-ok="ok" @on-cancel="cancel">
            <div class="">
                <Form ref="completeInfoModal" :label-width="160">
                    <Row>
                        <Col span="16">
                        <FormItem label="分类名称" prop="name">
                            <Input type="text" v-model="newCategory.categoryName" :maxlength="50" placeholder="请输入分类名称"></Input>
                        </FormItem>
                        </Col>

                    </Row>
                    <Row>
                        <Col span="16">
                        <FormItem label="上级分类">
                            <Select v-model="newCategory.parentCategory" v-if="newCategory.id == ''" clearable filterable remote :remote-method="chooseCategory">
                                <Option v-for="item in parentCategoryList" @click.native="changeCategory(item)" :value="item.id" :key="item.id">{{ item.categoryName }}</Option>
                            </Select>

                            <Input type="text" v-model="newCategory.parentCategoryName" disabled v-if="newCategory.id != ''" :maxlength="10"></Input>

                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="16">
                        <FormItem label="排序">
                            <Input type="text" v-model="newCategory.displayIndex" :maxlength="10" placeholder="排序"></Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="16">
                        <FormItem label="是否显示在导航栏">
                            <RadioGroup v-model="newCategory.show">
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

                    <row>
                        <Col span="16">
                        <FormItem label="分类logo">
                            <div class="demo-upload-list" v-for="item in uploadList">
                                <img width="30%" :src="item.url">
                                <div class="demo-upload-list-cover">
                                    <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                </div>
                            </div>
                            <Upload ref="upload" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048"
                                    :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple type="drag"
                                    action="/api/system/file/upload" style="display: inline-block;width:58px;">
                                <div style="width: 58px;height:58px;line-height: 58px;">
                                    <Icon type="ios-camera" size="20"></Icon>
                                </div>
                            </Upload>
                            <Modal title="预览" v-model="visible">
                                <img :src=imgName v-if="visible" style="width: 100%">
                            </Modal>
                        </FormItem>
                        </Col>
                    </row>

                    <row>
                        <Col span="16">
                        <FormItem label="关键词">
                            <Input type="text" v-model="newCategory.keyword" :maxlength="50" placeholder="请输入关键词"></Input>
                        </FormItem>
                        </Col>
                    </row>

                    <row>
                        <Col span="16">
                        <FormItem label="关联平台分类" v-if="this.newCategory.level>2">
                            <Cascader :data="treeListData" v-model="pCategoryId" change-on-select></Cascader>
                        </FormItem>
                        </Col>
                    </row>
                </Form>
            </div>
        </Modal>
    </div>
</template>

<script>

import { categoryList, delCategory, saveCategory, editCategory, parentCategoryList, treeList } from '../../service/system/category.service.js';

export default {
    computed: {

    },
    props: {
        index: '',
        content: {}
    },
    mounted() {
        this.getCategoryList();
    },
    data() {
        return {
            clientHeight: document.body.clientHeight + 'px',
            addCategory: false,
            buttonProps: {
                type: 'default',
                size: 'small'
            },
            categoryListData: [],
            treeListData: [],
            uploadList: [],
            parentCategoryList: [],
            imgName: '',
            visible: false,
            categoryCode: '',
            categoryName: '',
            level: '',
            parentCategoryName: '',
            parentCategoryCode: '',
            name: '',
            pCategoryId: [],
            newCategory: {
                id: '',
                categoryCode: '',
                categoryName: '',
                parentCategory: null,
                level: '',
                keyword: '',
                displayIndex: '',
                enableFlag: 'Y',
                show: 'Y'
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
                title: '分类名称',
                align: 'center',
                key: 'categoryName'
            }, {
                title: '上级分类',
                align: 'center',
                render: (h, params) => {
                    let hcategoryName = '';
                    if (params.row.parentCategoryName != null) {
                        hcategoryName = params.row.parentCategoryName
                    }
                    if (params.row.topCategoryName != null) {
                        hcategoryName = params.row.topCategoryName + '>' + hcategoryName;
                    }
                    return h('span', hcategoryName);
                }
            }, {
                title: '级别',
                align: 'center',
                key: 'level'
            }, {
                title: '排序',
                align: 'center',
                key: 'displayIndex'
            }, {
                title: '关键词',
                align: 'center',
                key: 'keyword'
            }, {
                title: '操作',
                key: 'action',
                align: 'center',
                render: (h, params) => {
                    return h('div', { style: { marginBottom: '5px', marginTop: '5px' } }, [
                        h('a', {
                            style: { display: 'block' },
                            on: {
                                click: () => {
                                    this.parentCategoryName = params.row.categoryName;
                                    this.getCategoryList();
                                }
                            }
                        }, '下级'),
                        h('a', {
                            style: { display: 'block' },
                            on: {
                                click: () => {
                                    this.uploadList = [];
                                    this.newCategory = Object.assign({}, this.categoryListData[params.index]);
                                    this.newCategory.parentCategoryName = this.categoryListData[params.index].parentCategoryName;
                                    if (this.categoryListData[params.index].isShow) {
                                        this.newCategory.show = 'Y';
                                    } else {
                                        this.newCategory.show = 'N';
                                    }
                                    this.uploadList.push({ url: this.newCategory.logo })
                                    this.addCategory = true;
                                }
                            }
                        }, '编辑'),
                        h('a',
                            [
                                h('Poptip',
                                    {
                                        props: { title: '确认删除吗？', confirm: true, placement: 'left' },
                                        on: {
                                            'on-ok': () => {
                                                this.delCategory(params.row.id);
                                            }
                                        }
                                    },
                                    ' 删除')
                            ]
                        )

                    ])
                }
            }]
        }
    },
    methods: {
        getCategoryList() {
            let { categoryName, level, parentCategoryName, pageInfo } = this;

            let params = {
                current: pageInfo.currentPage,
                size: pageInfo.limit,
                categoryName: categoryName,
                level: level,
                parentCategoryName: parentCategoryName
            };

            categoryList(params, res => {
                if (res.code == 0) {
                    this.categoryListData = res.data.records
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
        pageChange(index) {
            this.pageInfo.currentPage = index;
            this.getCategoryList();
        },
        add() {
            this.addCategory = true;
            this.reset();
            this.getParentCategoryList(null);
            this.getTreeList();
        },
        getTreeList() {
            let params = {};

            treeList(params, res => {
                if (res.code == 0) {
                    this.treeListData = res.data
                    console.log(this.treeListData)
                } else {
                    this.$Message.error(res.msg);
                }
            }
            )
        },
        ok() {
            if (this.pCategoryId.length < 1 && this.newCategory.level == 3) {
                this.$Message.warning('末级产品目录必须关联平台产品分类');
            }

            let { newCategory } = this;

            if (this.uploadList.length > 0) {
                newCategory.logo = this.uploadList[0].url;
            };

            if (newCategory.show == 'Y') {
                newCategory.isShow = true;
            } else {
                newCategory.isShow = false;
            }

            if (this.newCategory.level == 3) {
                const a = this.pCategoryId.length - 1;
                newCategory.list = [this.pCategoryId[a]];
            } else {
                newCategory.list = []
            }

            if (newCategory.id) {
                editCategory(newCategory, res => {
                    if (res.code == 0) {
                        this.$Message.success(res.msg);
                        this.getCategoryList();
                        this.cancel();
                    } else {
                        this.$Message.error(res.msg);
                    }
                });
            } else {
                saveCategory(newCategory, res => {
                    if (res.code == 0) {
                        this.$Message.success(res.msg);
                        this.getCategoryList();
                        this.cancel();
                    } else {
                        this.$Message.error(res.msg);
                    }
                });
            }
            this.reset();
        },
        chooseCategory(query) {
            this.getParentCategoryList(query);
        },
        getParentCategoryList(query) {
            let params = {
                categoryName: query,
                current: 1,
                size: 20
            }
            parentCategoryList(params, res => {
                if (res.code == 0) {
                    this.parentCategoryList = res.data.records;
                } else {
                    this.$Message.error(res.msg);
                }
            }
            );
        },
        changeCategory(item) {
            this.newCategory.level = item.level + 1;
        },
        cancel() {
            this.addCategory = false;
            this.reset();
        },
        reset() {
            this.newCategory = {
                id: '',
                categoryCode: '',
                categoryName: '',
                parentCategory: null,
                level: '',
                keyword: '',
                displayIndex: '',
                enableFlag: 'Y',
                show: 'Y'
            }
            // this.uploadList = [];
        },
        resetForm() {
            this.categoryName = '';
            this.parentCategoryName = '';
        },
        delCategory(id) {
            let params = {
                id: id
            }
            delCategory(params, res => {
                if (res.code == 0) {
                    this.$Message.success(res.msg);
                    this.getCategoryList();
                } else {
                    this.$Message.error(res.msg);
                }
            }
            );
        },
        handleView(url) {
            this.imgName = url;
            this.visible = true;
        },
        handleRemove(file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            this.uploadList = [];
        },
        handleSuccess(res, file) {
            file.url = res.data;
            this.uploadList = [];
            this.uploadList.push(file);
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: 'The file format is incorrect',
                desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
            });
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: 'Exceeding file size limit',
                desc: 'File  ' + file.name + ' is too large, no more than 2M.'
            });
        },
        handleBeforeUpload() {
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
