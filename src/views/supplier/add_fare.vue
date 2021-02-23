<template>
    <div class="index">
        <Form :model="form" :label-width="100" ref="form">
            <div class="title">
                <div class="line"></div>
                <h2>模板基础信息</h2>
            </div>
            <FormItem label="模板名称" prop='name' :rules="[{ required:true, message:'请输入模板名称',trigger: 'blur' }]">
                <Input v-model="form.name" placeholder="请输入模板名称" maxlength="50" show-word-limit></Input>
            </FormItem>
            <div class="title">
                <div class="line"></div>
                <h2>包邮配送区域</h2>
            </div>
            <div class="free_shipping">
                <Checkbox v-for="(item, index) in form.lineList" :key="item.provinceId" class="ckeck_item" :value="item.selected==1?true:false"
                          @on-change="(bool)=>changeSelect(0,item,bool)">
                    {{item.province}}
                </Checkbox>
            </div>
            <div class="title">
                <div class="line"></div>
                <h2>买家付邮费区域</h2>
            </div>
            <div class="free_shipping">
                <Checkbox v-for="(item, index) in form.lineList" v-if="item.selected==2?true:false" :key="item.provinceId" class="ckeck_item" :value="item.selected==2?true:false"
                          :label="item.province" @on-change="(bool)=>changeSelect(1,item,bool)">
                    {{item.province}}
                </Checkbox>
                <FormItem label="计算方式" :label-width="100">
                    <RadioGroup v-model="billType" @on-change="billTypeChange">
                        <Radio label="1">按件数计费</Radio>
                        <Radio label="2">按重量计费</Radio>
                    </RadioGroup>
                    <div>
                        生效范围,合并支付时生效范围,合并支付时生效范围,合并支付时生效范围,合并支付时生效范围,合并支付时生效范围,合并支付时
                    </div>
                </FormItem>
                <Row v-for="(ele,index) in form.lineList" v-if="ele.selected==2?true:false" :key="index">
                    <Col span="3">
                    <div style="height:35px;line-height:35px;color:#19e;background-color:#eef7ff;text-align:center">{{ele.province}}</div>
                    </Col>
                    <Col span="6" offset="1">
                    <FormItem label="" :label-width="0">
                        <Input v-model="ele.firstNum" class="free_shipping_input"></Input>
                        {{billType==1?'件':'千克'}}内
                        <Input v-model="ele.firstMoney" class="free_shipping_input"></Input>
                        元
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="" :label-width="0">
                        每增加
                        <Input v-model="ele.continuousNum" class="free_shipping_input"></Input>
                        {{billType==1?'件':'千克'}}，增加运费
                        <Input v-model="ele.continuousMoney" class="free_shipping_input"></Input>
                        元
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="" :label-width="0">
                        满 <Input v-model="ele.fullDelivery" class="free_shipping_input"></Input> 件包邮
                    </FormItem>
                    </Col>
                </Row>
            </div>
            <div class="title">
                <div class="line"></div>
                <h2>不配送区域</h2>
            </div>
            <div class="free_shipping">
                <Checkbox v-for="(item, index) in form.lineList" v-if="item.selected==3?true:false" :key="item.provinceId" class="ckeck_item" :value="item.selected==3?true:false"
                          @on-change="(bool)=>changeSelect(2,item,bool)">
                    {{item.province}}
                </Checkbox>
            </div>
            <div class="submit_btn">
                <Button type="primary" @click="submit">提交</Button>
                <Button type="default">取消</Button>
            </div>
        </Form>
        <Modal v-model="visible2" title="提示">
            <Icon type="md-checkmark-circle" color="#19be6b" size="24" />
            <span>新增成功,是否跳转运费列表页?</span>
            <div slot="footer">
                <div style="display:flex;justify-content:center">
                    <Button type="default" @click="visible2=false">取消</Button>
                    <Button type="primary" @click="$router.push({path:'/supplier/fare_template'})">确定</Button>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import { saveShipping } from '../../service/supplier/supplier';
export default {
    data() {
        return {
            visible2: false,
            form: {
                name: '',
                lineList: [
                    { provinceId: '110000', province: '北京', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 1 },
                    { provinceId: '120000', province: '天津', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 1 },
                    { provinceId: '130000', province: '河北省', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 1 },
                    { provinceId: '140000', province: '山西省', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 1 },
                    { provinceId: '150000', province: '内蒙古自治区', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 1 },
                    { provinceId: '210000', province: '辽宁省', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 1 },
                    { provinceId: '220000', province: '吉林省', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 1 },
                    { provinceId: '230000', province: '黑龙江省', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 1 },
                    { provinceId: '310000', province: '上海', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 1 },
                    { provinceId: '320000', province: '江苏省', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 1 },
                    { provinceId: '330000', province: '浙江省', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 1 },
                    { provinceId: '340000', province: '安徽省', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 1 },
                    { provinceId: '350000', province: '福建省', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 1 },
                    { provinceId: '360000', province: '江西省', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 1 },
                    { provinceId: '370000', province: '山东省', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 1 },
                    { provinceId: '410000', province: '河南省', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 1 },
                    { provinceId: '420000', province: '湖北省', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 1 },
                    { provinceId: '430000', province: '湖南省', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 1 },
                    { provinceId: '440000', province: '广东省', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 1 },
                    { provinceId: '450000', province: '广西壮族自治区', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 1 },
                    { provinceId: '460000', province: '海南省', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 1 },
                    { provinceId: '500000', province: '重庆', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 1 },
                    { provinceId: '510000', province: '四川省', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 1 },
                    { provinceId: '520000', province: '贵州省', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 1 },
                    { provinceId: '530000', province: '云南省', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 1 },
                    { provinceId: '540000', province: '西藏自治区', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 1 },
                    { provinceId: '610000', province: '陕西省', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 1 },
                    { provinceId: '620000', province: '甘肃省', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 1 },
                    { provinceId: '630000', province: '青海省', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 1 },
                    { provinceId: '640000', province: '宁夏回族自治区', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 1 },
                    { provinceId: '650000', province: '新疆维吾尔自治区', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 1 },
                    { provinceId: '710000', province: '台湾省', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 3 },
                    { provinceId: '810000', province: '香港特别行政区', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 3 },
                    { provinceId: '820000', province: '澳门特别行政区', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 3 },
                    { provinceId: '990000', province: '海外', firstNum: '', firstMoney: '', continuousNum: '', continuousMoney: '', billingType: 0, fullDelivery: '', selected: 3 },
                ],
            },
            billType: '1',
            indeterminate: true,
        }
    },
    components: {},
    watch: {},
    created() {
    },
    mounted() { },
    methods: {
        changeSelect(key, item, bool) {
            switch (key) {
                case 0:
                    if (bool) {
                        item.selected = 1
                    } else {
                        item.selected = 2
                        item.billingType = 1
                    }
                    break;
                case 1:
                    if (bool) {
                        item.selected = 2
                    } else {
                        item.selected = 3
                    }
                    break;
                case 2:
                    item.selected = 2
                    break;
                default:
                    break;
            }
        },
        billTypeChange(type) {
            this.form.lineList.forEach(item => {
                if (item.selected == 2) {
                    item.billingType = type
                }
            })
        },
        submit() {
            this.$refs['form'].validate(valid => {
                if (valid) {
                    let form_clone = JSON.parse(JSON.stringify(this.form))
                    let form_submit = {
                        name: form_clone.name,
                        lineList: []
                    }
                    form_clone.lineList.forEach((ele, index) => {
                        if (ele.selected != 3) {
                            form_submit.lineList.push(ele)
                        }
                    })
                    form_submit.lineList.forEach(item => {
                        this.$delete(item, 'selected')
                    })
                    saveShipping(form_submit, res => {
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
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        .line {
            width: 6px;
            height: 20px;
            margin-right: 10px;
            background-color: #d91422;
        }
    }
    .free_shipping {
        padding-left: 30px;
        .ckeck_item {
            margin-right: 40px;
            margin-bottom: 20px;
        }
        .ckeck_all {
            display: flex;
            justify-content: flex-end;
        }
        .free_shipping_input {
            width: 70px;
        }
    }
    .submit_btn {
        margin-bottom: 50px;
        display: flex;
        justify-content: center;
        .ivu-btn {
            margin: 0 20px;
        }
    }
}
</style>
