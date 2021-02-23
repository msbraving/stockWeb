<template>
    <div class="index">
        <Form :model="form" :label-width="100">
            <div class="title">
                <div class="line"></div>
                <h2>协议基本信息</h2>
            </div>
            <Row>
                <Col span="12">
                <FormItem label="协议编号">
                    <Input v-model="form.contractCode" placeholder="请输入协议编号" readonly></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="协议名称">
                    <Input v-model="form.contractName" placeholder="请输入协议名称" readonly></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="租户">
                    <Input v-model="form.tenantName" placeholder="请输入协议名称" readonly></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="采购员">
                    <Input v-model="form.buyerName" placeholder="请输入协议名称" readonly></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="开始时间">
                    <DatePicker v-model="form.startTime" type="date" placeholder="开始时间" style="width: 100%" readonly></DatePicker>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="结束时间">
                    <DatePicker v-model="form.endTime" type="date" placeholder="开始时间" style="width: 100%" readonly></DatePicker>
                </FormItem>
                </Col>
            </Row>
            <div class="title">
                <div class="line"></div>
                <h2>协议产品信息</h2>
            </div>
            <Row style="padding-left:30px">
                <Col span="24">
                <Table border :columns="columns1" :data="form.lineList" v-if="form.lineList.length!=0">
                    <template slot-scope="{ row, index }" slot="imageUrl">
                        <img :src="row.imageUrl" alt="" style="width:30px;height:30px">
                    </template>
                    <template slot-scope="{ row, index }" slot="status">
                        <span v-if="row.status ==1">{{'审核中'}}</span>
                        <span v-if="row.status ==2">{{'通过'}}</span>
                        <span v-if="row.status ==3">{{'拒绝'}}</span>
                    </template>
                </Table>
                </Col>
            </Row>
        </Form>
        <div class="submit_btn" v-if="isShow">
            <Button type="primary" @click="visible=true">审批</Button>
        </div>
        <Modal v-model="visible" title="协议审批" width="500" class="approveForm">
            <Form :model="approveForm" :label-width="100" :rules="ruleForm" ref="approveForm">
                <FormItem label="协议审核" prop="status">
                    <Select v-model="approveForm.status">
                        <Option v-for="item in approveList" :value="item.id" :key="item.id">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="审核意见" prop="msg">
                    <Input type="textarea" :rows="3" v-model="approveForm.msg" placeholder="请输入审核意见"></Input>
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
import { getContractDetail, contractApply } from '../../service/supplier/supplier';
export default {
    data() {
        return {
            form: {
                lineList: []
            },
            buyerList: [],
            columns1: [
                { title: '规格', key: 'skuName', align: 'center' },
                { title: '市场价', key: 'marketPrice', align: 'center' },
                { title: '库存', key: 'normalQuantity', align: 'center' },
                { title: '图片', slot: 'imageUrl', align: 'center' },
                { title: '状态', slot: 'status', align: 'center' },
            ],
            tableData1: [],
            isShow: false,
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
        this.getContractDetail()
        if (this.$route.query.form) {
            this.isShow = true
        }
    },
    mounted() { },
    methods: {
        getContractDetail() {
            getContractDetail({ id: this.$route.query.id }, res => {
                this.form = res.data
            })
        },
        submitModal() {
            this.$refs['approveForm'].validate(valid => {
                if (valid) {
                    contractApply(this.approveForm, res => {
                        if (res.msg == 'success') {
                            this.visible = false
                            this.$Message.success('提交成功即将跳转审批列表页');
                            setTimeout(() => {
                                this.$router.push({ path: '/supplier/approve_protocol' })
                            }, 2000);
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
    .title {
        background-color: #ffffff;
        padding: 20px;
        display: flex;
        align-items: center;
        .line {
            width: 6px;
            height: 20px;
            margin-right: 10px;
            background-color: #d91422;
        }
    }
    .submit_btn {
        display: flex;
        justify-content: center;
        margin: 30px 0;
    }
}
</style>
