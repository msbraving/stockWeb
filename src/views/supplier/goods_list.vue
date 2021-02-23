<template>
    <div class="index">
        <Button type="primary" @click="$router.push({path:'/supplier/product_release'})">新增产品</Button>
        <div class="search">
            <Form :model="searchForm" :label-width="100">
                <Row>
                    <Col span="7">
                    <FormItem label="产品分类">
                        <Input v-model="searchForm.categoryName2" placeholder="请输入产品分类"></Input>
                    </FormItem>
                    </Col>
                    <Col span="7">
                    <FormItem label="产品编码">
                        <Input v-model="searchForm.item_no" placeholder="请输入产品编码"></Input>
                    </FormItem>
                    </Col>
                    <Col span="7">
                    <FormItem label="产品名称">
                        <Input v-model="searchForm.spuName" placeholder="请输入产品名称"></Input>
                    </FormItem>
                    </Col>
                    <Col span="3" style="text-align:right">
                    <Button type="primary" @click="getProductList">查询</Button>
                    </Col>
                </Row>
            </Form>
        </div>
        <div class="table">
            <Table border :columns="columns1" :data="tableData">
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="success" size="small" @click="toDetail(row.id)">详情</Button>
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
import { getProductList } from '../../service/supplier/supplier';
export default {
    data() {
        return {
            searchForm: {
                item_no: '',
                categoryName2: '',
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
                    title: "产品编码",
                    key: "itemNo",
                    align: "center",
                },
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
                    title: "操作",
                    align: "center",
                    slot: 'action'
                }
            ],
        };
    },
    components: {},
    watch: {},
    created() {
        this.getProductList()
    },
    mounted() { },
    methods: {
        getProductList() {
            this.searchForm.current = this.pageInfo.current
            this.searchForm.size = this.pageInfo.size
            getProductList(this.searchForm, res => {
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
            this.getProductList();
        },
        sizeChange(size) {
            this.pageInfo.size = size;
            this.getProductList();
        },
        toDetail(id) {//详情
            this.$router.push({
                path: '/supplier/goods_detail',
                query: {
                    id: id
                }
            })
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
