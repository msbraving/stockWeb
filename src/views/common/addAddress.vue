<template>
    <!-- 新增/编辑地址 -->
    <div>
        <Form ref="completeInfoModal" :label-width="100" label-position="right">
            <FormItem label="所在地区" style="margin-bottom:12px;">
                <Cascader v-model="addressValue" :data="areaList" style="width:300px" filterable></Cascader>
            </FormItem>
            <FormItem label="收货人" style="margin-bottom:12px">
                <Input v-model="address.userName" style="width:300px"></Input>
            </FormItem>
            <FormItem label="详细地址" style="margin-bottom:12px">
                <Input v-model="address.address" style="width:300px"> </Input>
            </FormItem>
            <FormItem label="手机号码" style="margin-bottom:12px">
                <Input v-model="address.mobile" style="width:300px"></Input>
            </FormItem>
            <FormItem label="" style="margin-bottom:5px">
                <Checkbox v-model="address.isDefault" style="">设为默认地址</Checkbox>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import {getAllArea} from '../../service/mall/greatOrder.service'; 
    export default {
        name: '',
        props: ['showAddress', 'addressProps', 'addressValueProps'],
        mounted () {
            this.getAllAreaFun()
        },
        data() {
            return {
                address: this.addressProps || {
                    userName: '',
                    address: '',
                    mobile: '',
                    isDefault: false
                },
                addressValue: this.addressValueProps,
                areaList: [],
            }
        },
        methods: {
            getAllAreaFun (){
                let params = {}
                getAllArea (params, (res) => {
                    if ( res.code == 0){
                        this.makeList(res.data)
                    } else {
                        this.$Message.error(res.msg);
                    }
                }, (res) => {
                    this.$Message.error(res.msg);
                })
            },
            makeList (res) {
                let arr = res;
                arr.map((item, index) => {
                    if (item.provinceName || item.cityName || item.districtName ) {
                        item.label = item.provinceName || item.cityName || item.districtName 
                        item.value = item.id
                    }
                    if (item.children) {
                        this.makeList(item.children)
                    }
                })
                this.areaList = arr
                // console.log(this.areaList)
            }
        },
    }
</script>

<style scoped>
    
</style>