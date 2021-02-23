<template>
    <div class="index">
        <Button type="primary" @click="$router.push({path:'/supplier/product_release'})">新增产品</Button>
        <div class="search">
            <Form :model="searchForm" :label-width="100">
                <Row>
                    <Col span="10">
                    <FormItem label="品牌名称">
                        <Input v-model="searchForm.brandName" placeholder="请输入品牌名称"></Input>
                    </FormItem>
                    </Col>
                    <Col span='10'>
                    <FormItem label="产品名称">
                        <Input v-model="searchForm.spuName" placeholder="请输入产品名称"></Input>
                    </FormItem>
                    </Col>
                    <Col span="4" style="text-align:right">
                    <Button type="primary" @click="getSpuList">查询</Button>
                    </Col>
                </Row>
            </Form>
        </div>
        <div class="table">
            <Table border :columns="columns1" :data="tableData">
                <template slot-scope="{ row, index }" slot="skulist">
                    <Poptip placement="left" trigger="click" transfer @on-popper-show="showPoptip(row.id)" width="700">
                        <Button>查看规格</Button>
                        <div slot="content">
                            <Table border :columns="columns2" :data="skuTableData"> </Table>
                        </div>
                    </Poptip>
                </template>
                <template slot-scope="{ row, index }" slot="isOnline">
                    <span>{{row.isOnline ==1?'上架':'下架'}}</span>
                </template>
            </Table>
        </div>
        <div class="common-table-bottom" v-if=" tableData.length > 0">
            <div style="float: right;">
                <Page :total="pageInfo.total" class-name="pagination-content" show-total show-sizer @on-change="pageChange" :current="pageInfo.current" :page-size="pageInfo.size"
                      @on-page-size-change="sizeChange" style="float:right" size="small"></Page>
            </div>
        </div>
    </div>
</template>

<script>
import { getSpuList, getHSkuList, changeIsOnline } from '../../service/supplier/supplier';
export default {
    data() {
        return {
            searchForm: {
                brandName: '',
                spuName: '',
            },
            pageInfo: {
                total: 10,
                current: 1,
                size: 10
            },
            tableData: [],
            columns1: [
                {
                    title: "产品名称",
                    key: "spuName",
                    align: "center",
                },
                {
                    title: "品牌",
                    key: "brandName",
                    align: "center",
                },
                {
                    title: "分类",
                    key: "categoryName_add",
                    align: "center",
                },
                {
                    title: "产品规格",
                    slot: "skulist",
                    align: "center",
                },
                {
                    title: "状态",
                    slot: "isOnline",
                    align: "center",
                    width: 80,
                },
                {
                    title: "操作",
                    align: "center",
                    width: 110,
                    render: (h, { row, index }) => {
                        return h('i-switch', {
                            props: {
                                size: 'large',
                                value: row.isOnline == 1 ? true : false,
                            },
                            scopedSlots: {
                                open: () => h('span', '下架'),
                                close: () => h('span', '上架')
                            },
                            on: {
                                'on-change': (e) => {
                                    let form = { id: row.id }
                                    if (e == true) {
                                        form.isOnline = 1
                                    } else {
                                        form.isOnline = 2
                                    }
                                    changeIsOnline(form, res => {
                                        this.getSpuList()
                                    })
                                }
                            }
                        })
                    }
                }
            ],
            columns2: [
                {
                    title: "规格",
                    key: "skuName",
                    align: "center",
                },
                {
                    title: "描述",
                    key: "specName",
                    align: "center",
                },
                {
                    title: "供货价",
                    key: "supplyPrice",
                    align: "center",
                },
                {
                    title: "市场价",
                    key: "marketPrice",
                    align: "center",
                },
                {
                    title: "库存",
                    key: "normalQuantity",
                    align: "center",
                },
                {
                    title: "重量",
                    key: "weight",
                    align: "center",
                },
                {
                    title: "单位",
                    key: "unit",
                    align: "center",
                },
                {
                    title: "图片",
                    key: "imageUrl",
                    align: "center",
                    render: (h, { row, index }) => {
                        return h('img', {
                            attrs: {
                                src: row.imageUrl
                            },
                            style: {
                                width: '30px',
                                height: '30px',
                            },
                        })
                    }
                },
            ],
            skuTableData: [],
        };
    },
    components: {},
    watch: {},
    created() {
        this.getSpuList()
    },
    mounted() { },
    methods: {
        getSpuList() {
            this.searchForm.current = this.pageInfo.current
            this.searchForm.size = this.pageInfo.size
            getSpuList(this.searchForm, res => {
                this.tableData = res.data.records
                this.tableData.forEach(item => {
                    item.categoryName_add = item.categoryName1 + '>' + item.categoryName2 + '>' + item.categoryName
                });
                this.pageInfo.total = res.data.total
                this.pageInfo.current = res.data.current
                this.pageInfo.size = res.data.size
            })
        },
        pageChange(page) {
            this.pageInfo.current = page;
            this.getSpuList();
        },
        sizeChange(size) {
            this.pageInfo.size = size;
            this.getSpuList();
        },
        showPoptip(spuId) {
            let form = {
                spuId: spuId,
                current: 1,
                size: 10
            }
            getHSkuList(form, res => {
                this.skuTableData = res.data.records
            })
        },
        handleBeforeChange() {
            return new Promise((resolve) => {
                this.$Modal.confirm({
                    title: '切换确认',
                    content: '您确认要切换开关状态吗？',
                    onOk: () => {
                        resolve();
                    }
                });
            });
        }
    },
};
</script>

<style scoped lang="less">
.index {
    padding: 15px;
    background-color: #ffffff;
    .search {
        padding: 20px 0;
    }
}
</style>
