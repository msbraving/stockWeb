<template>
    <div class="index">
        <Button type="primary" @click="$router.push({path:'/supplier/add_protocol'})">新建协议</Button>
        <div class="search">
            <Form :model="searchForm" :label-width="100">
                <Row>
                    <Col span="7">
                    <FormItem label="协议编号">
                        <Input v-model="searchForm.contractCode" placeholder="请输入协议编号"></Input>
                    </FormItem>
                    </Col>
                    <Col span="7">
                    <FormItem label="协议名称">
                        <Input v-model="searchForm.contractName" placeholder="请输入协议名称"></Input>
                    </FormItem>
                    </Col>
                    <Col span="7">
                    <FormItem label="状态">
                        <Select v-model="searchForm.status">
                            <Option v-for="item in statusList" :value="item.id" :key="item.id">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="3" style="text-align:right">
                    <Button type="primary" @click="getContractList">查询</Button>
                    </Col>
                </Row>
            </Form>
        </div>
        <div class="table">
            <Table border :columns="columns1" :data="tableData">
                <template slot-scope="{ row, index }" slot="status">
                    <span v-if="row.status ==1">{{'审核中'}}</span>
                    <span v-if="row.status ==2">{{'通过'}}</span>
                    <span v-if="row.status ==3">{{'拒绝'}}</span>
                </template>
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
import { getContractList } from '../../service/supplier/supplier';
export default {
    data() {
        return {
            searchForm: {
                contractCode: '',
                contractName: '',
                status: null,
            },
            statusList: [
                { label: '审核中', id: 1 },
                { label: '通过', id: 2 },
                { label: '拒绝', id: 3 },
            ],
            pageInfo: {
                total: 10,
                current: 1,
                size: 10
            },
            tableData: [],
            columns1: [
                { title: '协议编号', key: 'contractCode', align: 'center', },
                { title: '协议名称', key: 'contractName', align: 'center', },
                { title: '状态', slot: 'status', align: 'center', },
                { title: '创建时间', key: 'createTime', align: 'center', },
            ],
        }
    },
    components: {},
    watch: {},
    created() {
        this.getContractList()
    },
    mounted() { },
    methods: {
        getContractList() {
            this.searchForm.current = this.pageInfo.current
            this.searchForm.size = this.pageInfo.size
            getContractList(this.searchForm, res => {
                this.tableData = res.data.records
                this.pageInfo.total = res.data.total
                this.pageInfo.current = res.data.current
                this.pageInfo.size = res.data.size
            })
        },
        restSearch() {
            this.searchForm = {
                contractCode: '',
                contractName: '',
                status: null,
            }
            this.getProductList();
        },
        pageChange(page) {
            this.pageInfo.current = page;
            this.getProductList();
        },
        sizeChange(size) {
            this.pageInfo.size = size;
            this.getProductList();
        },
        toDetail(id) {
            this.$router.push({
                path: '/supplier/protocol_detail',
                query: {
                    id: id
                }
            })
        },
    },
}
</script>

<style scoped lang="less">
.index {
    padding: 15px;
    background-color: #ffffff;
    .search {
        margin: 10px 0;
    }
}
</style>
