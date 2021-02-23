<template>
    <div class="index">
        <Form :model="form" :label-width="100">
            <div class="title">
                <div class="line"></div>
                <h2>模板基础信息</h2>
            </div>
            <FormItem label="模板名称">
                <div>{{form.name}}</div>
            </FormItem>
            <div class="title">
                <div class="line"></div>
                <h2>包邮配送区域</h2>
            </div>
            <div class="free_shipping">
                <Checkbox v-for="(item, index) in form.lineList" :key="item.provinceId" class="ckeck_item" :value="true" v-if="item.billingType==0?true:false" disabled>
                    {{item.province}}
                </Checkbox>
            </div>
            <div class="title">
                <div class="line"></div>
                <h2>买家付邮费区域</h2>
            </div>
            <div class="free_shipping">
                <Checkbox v-for="(item, index) in form.lineList" v-if="item.billingType!=0?true:false" :key="item.provinceId" class="ckeck_item" :value="true" disabled>
                    {{item.province}}
                </Checkbox>
                <FormItem label="计算方式" :label-width="100">
                    <span v-if="billType==1?true:false">按件数计费</span>
                    <span v-if="billType==2?true:false">按重量计费</span>
                </FormItem>
                <Row v-for="(ele,index) in form.lineList" v-if="ele.billingType!=0?true:false" :key="index">
                    <Col span="3">
                    <div style="height:35px;line-height:35px;color:#19e;background-color:#eef7ff;text-align:center">{{ele.province}}</div>
                    </Col>
                    <Col span="6" offset="1">
                    <FormItem label="" :label-width="0">
                        <Input v-model="ele.firstNum" class="free_shipping_input" readonly></Input>
                        {{billType==1?'件':'千克'}}内
                        <Input v-model="ele.firstMoney" class="free_shipping_input" readonly></Input>
                        元
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="" :label-width="0">
                        每增加
                        <Input v-model="ele.continuousNum" class="free_shipping_input" readonly></Input>
                        {{billType==1?'件':'千克'}}，增加运费
                        <Input v-model="ele.continuousMoney" class="free_shipping_input" readonly></Input>
                        元
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="" :label-width="0">
                        满 <Input v-model="ele.fullDelivery" class="free_shipping_input" readonly></Input> 件包邮
                    </FormItem>
                    </Col>
                </Row>
            </div>
        </Form>
    </div>
</template>

<script>
import { getShipplingDetail } from '../../service/supplier/supplier';
export default {
    data() {
        return {
            visible2: false,
            form: {
                name: '',
                lineList: [],
            },
            billType: 1,
            indeterminate: true,
        }
    },
    components: {},
    watch: {},
    created() {
        this.fareDetail()
    },
    mounted() { },
    methods: {
        fareDetail() {
            getShipplingDetail({ headId: this.$route.query.id }, res => {
                this.form = res.data
                this.form.lineList.filter(item => {
                    if (item.billingType != 0) {
                        this.billType = item.billingType
                    }
                })
            })
        },
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
}
</style>
