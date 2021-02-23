<template>
    <div class="index">
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
                        <Select v-model="searchForm.status" clearable>
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
                    <Button type="warning" size="small" @click="approve(row)">审批</Button>
                </template>
            </Table>
        </div>
        <div class="common-table-bottom" v-if=" tableData.length > 0">
            <div style="float: right;">
                <Page :total="pageInfo.total" class-name="pagination-content" show-total show-sizer @on-change="pageChange" :current="pageInfo.current" :page-size="pageInfo.size"
                      @on-page-size-change="sizeChange" style="float:right" size="small"></Page>
            </div>
        </div>
        <Modal v-model="visible" title="协议审批" width="800">
            <Form :model="approveForm" :label-width="80" ref="approveForm" :rules="ruleForm" class="approveForm">
                <FormItem label="协议名称">
                    <div>{{approveForm.contractName}}</div>
                </FormItem>
                <FormItem label="协议审核" prop="status">
                    <Select v-model="approveForm.status">
                        <Option v-for="item in approveList" :value="item.id" :key="item.id">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="审核意见" prop="msg">
                    <Input type="textarea" :rows='3' v-model="approveForm.msg" placeholder="请输入审核意见"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <div style="display:flex;justify-content:center">
                    <Button type="default" @click="visible=false">取消</Button>
                    <Button type="primary" @click="submitModal">确定</Button>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import { getApplyContractList, contractApply } from '../../service/supplier/supplier';
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
                { title: '操作', slot: 'action', align: 'center' },
            ],
            visible: false,
            approveForm: {},
            ruleForm: {
                status: [
                    { required: true, type: 'number', message: '请选择协议审核', trigger: 'change' }
                ],
                msg: [
                    { required: true, message: '请输入审核意见', trigger: 'blur' }
                ],
            },
            approveList: [
                { label: '同意', id: 2 },
                { label: '拒绝', id: 3 },
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
            getApplyContractList(this.searchForm, res => {
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
        toDetail(id) {//详情
            this.$router.push({
                path: '/supplier/protocol_detail',
                query: {
                    id: id,
                    form: 'approve',
                }
            })
        },
        approve(row) {
            this.approveForm.contractName = row.contractName
            this.approveForm.id = row.id
            this.visible = true
        },
        submitModal() {
            this.$refs['approveForm'].validate(valid => {
                if (valid) {
                    this.$delete(this.approveForm, 'contractName')
                    contractApply(this.approveForm, res => {
                        if (res.msg == 'success') {
                            this.visible = false
                            this.approveForm = {
                                status: '',
                                msg: ''
                            }
                            this.$Message.success('提交成功');
                        }
                    })
                }
            })



        }
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
