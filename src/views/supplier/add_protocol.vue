<template>
    <div class="index">
        <Form :model="form" :label-width="100" ref="form" :rules="ruleForm">
            <div class="title">
                <div class="line"></div>
                <h2>协议基本信息</h2>
            </div>
            <Row>
                <Col span="12">
                <FormItem label="协议编号" prop="contractCode">
                    <Input v-model="form.contractCode" placeholder="请输入协议编号"></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="协议名称" prop="contractName">
                    <Input v-model="form.contractName" placeholder="请输入协议名称"></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="租户" prop="tenantId">
                    <Select v-model="form.tenantId" @on-change="changeTenant">
                        <Option v-for="item in tenantList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="采购员" prop="buyerId">
                    <Select v-model="form.buyerId" placeholder="请先选择租户" :disabled="isDisabled" ref="resetSelect" @on-change="changeBuyer">
                        <Option v-for="item in buyerList" :value="item.id" :key="item.id">{{ item.displayName}}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="开始时间" prop="startTime">
                    <DatePicker v-model="form.startTime" type="date" placeholder="开始时间" style="width: 100%"></DatePicker>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="结束时间" prop="endTime">
                    <DatePicker v-model="form.endTime" type="date" placeholder="开始时间" style="width: 100%"></DatePicker>
                </FormItem>
                </Col>
            </Row>
            <div class="title">
                <div class="line"></div>
                <h2>协议产品信息</h2>
            </div>
            <Row style="padding-left:30px">
                <Col span="24">
                <Button type="primary" @click="selectSku" style="margin-bottom:10px">选择产品</Button>
                </Col>
                <Col span="24">
                <Table border :columns="columns1" :data="form.lineList" class="columns1Form">
                    <template slot-scope="{ row, index }" slot="price">
                        <FormItem :label-width="0" :prop="'lineList.'+index+'.price'" :rules="[{ required:true, message:'请输入',trigger: 'blur' }]">
                            <Input v-model="row.price" placeholder="协议价" @on-blur="(e)=>changeInput('price',index,e)"></Input>
                        </FormItem>
                    </template>
                    <template slot-scope="{ row, index }" slot="normalQuantity">
                        <FormItem :label-width="0" :prop="'lineList.'+index+'.normalQuantity'" :rules="[{ required:true,message:'请输入',trigger:'blur'}]">
                            <Input type="number" v-model="row.normalQuantity" placeholder="库存" @on-blur="(e)=>changeInput('normalQuantity',index,e)"></Input>
                        </FormItem>
                    </template>
                    <template slot-scope="{ row, index }" slot="skuImage">
                        <img :src="row.skuImage" alt="" style="width:30px;height:30px">
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="warning" size="small" @click="delRow(index)">删除</Button>
                    </template>
                </Table>
                </Col>
            </Row>
        </Form>
        <div class="submit_btn">
            <Button type="primary" @click="submit">提交并上架</Button>
        </div>
        <Modal v-model="visible" title="添加批次SKU" @on-ok="selectTable" @on-cancel="closeModal" width="900">
            <Form :model="searchForm" :label-width="80">
                <Row>
                    <Col span="21">
                    <Col span="8">
                    <FormItem label="品牌编号">
                        <Input v-model="searchForm.brandCode" placeholder="请输入品牌编号"></Input>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="品牌名称">
                        <Input v-model="searchForm.brandName" placeholder="请输入品牌名称"></Input>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="货号">
                        <Input v-model="searchForm.itemNo" placeholder="请输入货号"></Input>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="型号名称">
                        <Input v-model="searchForm.skuName" placeholder="请输入型号名称"></Input>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="产品名称">
                        <Input v-model="searchForm.spuName" placeholder="请输入产品名称"></Input>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="条码">
                        <Input v-model="searchForm.barcode" placeholder="请输入条码"></Input>
                    </FormItem>
                    </Col>
                    </Col>
                    <Col span="3" style="text-align:right;">
                    <Button style="height:71px" type="primary" @click="getSkuList">搜索</Button>
                    </Col>
                </Row>
            </Form>
            <Table border :columns="columns2" :data="tableData2" ref="tableData2">
                <template slot-scope="{ row, index }" slot="imageUrl">
                    <img :src="row.imageUrl" alt="" style="width:30px;height:30px">
                </template>
            </Table>
            <div class="common-table-bottom" v-if=" tableData2.length > 0">
                <div style="float: right;">
                    <Page :total="pageInfo.total" class-name="pagination-content" show-total show-sizer @on-change="pageChange" :current="pageInfo.current"
                          :page-size="pageInfo.size" @on-page-size-change="sizeChange" style="float:right" size="small"></Page>
                </div>
            </div>
        </Modal>
        <Modal v-model="visible2" title="提示">
            <Icon type="md-checkmark-circle" color="#19be6b" size="24" />
            <span>新增成功,是否跳协议列表页?</span>
            <div slot="footer">
                <div style="display:flex;justify-content:center">
                    <Button type="default" @click="visible2=false">取消</Button>
                    <Button type="primary" @click="$router.push({path:'/supplier/protocol_list'})">确定</Button>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import { createContract, tenantList, getBuyerList, getSkuList } from '../../service/supplier/supplier';
export default {
    data() {
        return {
            visible2: false,
            form: {
                lineList: []
            },
            ruleForm: {
                contractCode: [
                    { required: true, message: '请输入协议编号', trigger: 'blur' }
                ],

                contractName: [
                    { required: true, message: '请输入协议名称', trigger: 'blur' }
                ],
                tenantId: [
                    { required: true, type: 'number', message: '请选择租户', trigger: 'change' }
                ],
                buyerId: [
                    { required: true, type: 'number', message: '请选择租户', trigger: 'change' }
                ],
                startTime: [
                    { required: true, type: 'date', message: '请选择开始时间', trigger: 'change' }
                ],
                endTime: [
                    { required: true, type: 'date', message: '请选择结束时间', trigger: 'change' }
                ],
            },
            tenantList: [],
            buyerList: [],
            isDisabled: true,
            visible: false,
            columns1: [
                { title: '名称', key: 'spuName', align: 'center', width: 300 },
                { title: '条码', key: 'skuBarcode', align: 'center' },
                { title: '市场价', key: 'marketPrice', align: 'center' },
                { title: '供货价', key: 'supplyPrice', align: 'center' },
                { title: '协议价', slot: 'price', align: 'center' },
                { title: '库存', slot: 'normalQuantity', align: 'center' },
                { title: '图片', slot: 'skuImage', align: 'center' },
                { title: '操作', slot: 'action', align: 'center' },
            ],
            searchForm: {
                barcode: "",
                brandCode: "",
                brandName: "",
                skuName: "",
                spuName: "",
                itemNo: "",
            },
            pageInfo: {
                total: 10,
                current: 1,
                size: 10
            },
            columns2: [
                { type: 'selection', width: 60, align: 'center' },
                { title: '品牌', key: 'brandName', align: 'center' },
                { title: '名称', key: 'spuName', align: 'center' },
                { title: '条码', key: 'skuBarcode', align: 'center' },
                { title: '市场价', key: 'marketPrice', align: 'center' },
                { title: '供货价', key: 'supplyPrice', align: 'center' },
                { title: '图片', slot: 'imageUrl', align: 'center' },
            ],
            tableData2: []
        }
    },
    components: {},
    watch: {},
    created() {
        this.getenantList()
    },
    mounted() { },
    methods: {
        getenantList() {
            tenantList({ current: 1, size: 999 }, res => {
                this.tenantList = res.data.records
            })
        },
        changeTenant(tenantId) {
            this.tenantList.find(item => {
                if (item.id == tenantId) {
                    this.form.tenantName = item.name
                }
            })
            this.isDisabled = false
            this.$refs.resetSelect.clearSingleSelect();
            this.form.buyerId = ""
            this.getBuyerList(tenantId)
        },
        getBuyerList(tenantId) {
            getBuyerList({ tenantId: tenantId }, res => {
                this.buyerList = res.data
            })
        },
        changeBuyer(buyerId) {
            this.buyerList.find(item => {
                if (item.id == buyerId) {
                    this.form.buyerName = item.displayName
                }
            })
        },
        selectSku() {
            this.getSkuList()
            this.visible = true
        },
        getSkuList() {
            this.searchForm.current = this.pageInfo.current
            this.searchForm.size = this.pageInfo.size
            getSkuList(this.searchForm, res => {
                this.tableData2 = res.data.records
                this.tableData2.forEach(item => {
                    item.skuId = item.id
                    item.skuBarcode = item.barcode
                    item.skuImage = item.imageUrl
                    item.price = ''
                })
                this.pageInfo.total = res.data.total
                this.pageInfo.current = res.data.current
                this.pageInfo.size = res.data.size
            })
        },
        selectTable() {
            let selectData = this.$refs.tableData2.getSelection();
            let repeatArray = [...this.form.lineList, ...selectData]
            let map = new Map()
            this.form.lineList = repeatArray.filter((item) => !map.has(item.skuId) && map.set(item.skuId, 1)); //去重
            this.$refs.tableData2.selectAll(false);
        },
        closeModal() {
            this.searchForm = {
                barcode: "",
                brandCode: "",
                brandName: "",
                skuName: "",
                spuName: "",
                itemNo: "",
            }
            this.pageInfo = {
                total: 10,
                current: 1,
                size: 10
            }
            this.$refs.tableData2.selectAll(false);
        },
        pageChange(page) {
            this.pageInfo.current = page;
            this.getSkuList();
        },
        sizeChange(size) {
            this.pageInfo.size = size;
            this.getSkuList();
        },
        delRow(index) {
            this.form.lineList.splice(index, 1)
        },
        changeInput(key, index, e) {
            this.form.lineList[index][key] = e.currentTarget.value
        },
        submit() {
            let form_clone = JSON.parse(JSON.stringify(this.form))
            this.$refs['form'].validate(valid => {
                if (valid) {
                    form_clone.forEach(item => {
                        this.$delete(item, 'id')
                        this.$delete(item, 'imageUrl')
                        this.$delete(item, 'barcode')
                        item.price = item.price * 100
                    })
                    createContract(form_clone, res => {
                        if (res.msg == 'success') {
                            this.visible2 = true
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
    .ivu-form-item {
        margin-bottom: 20px;
    }
    .columns1Form {
        .ivu-form-item {
            margin-bottom: 7px;
        }
    }
    .submit_btn {
        display: flex;
        justify-content: center;
        margin: 30px 0;
    }
}
</style>
