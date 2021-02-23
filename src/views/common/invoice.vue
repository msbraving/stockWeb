<template>
    <!-- 新增/编辑发票 -->
    <div>
        <Modal
            title="发票信息"
            v-model="showAddress"
           width="700px"
            @on-ok="ok"
            @on-cancel="cancel">
            <div>
                <Form ref="completeInfoModal" :label-width="100" label-position="right">
                    <FormItem label="所在地区" style="margin-bottom:12px;">
                        <Cascader :data="data" style="width:300px"></Cascader>
                    </FormItem>
                    <FormItem label="收货人" style="margin-bottom:12px">
                        <Input placeholder="" style="width:300px"></Input>
                    </FormItem>
                    <FormItem label="详细地址" style="margin-bottom:12px">
                        <Input placeholder="" style="width:300px"> </Input>
                    </FormItem>
                    <FormItem label="手机号码" style="margin-bottom:12px">
                        <Input placeholder="" style="width:300px"></Input>
                    </FormItem>
                    <FormItem label="固定电话" style="margin-bottom:12px">
                        <Input placeholder="" style="width:300px"></Input>
                    </FormItem>
                    <FormItem label="邮箱地址" style="margin-bottom:5px">
                        <Input placeholder="" style="width:300px"></Input>
                    </FormItem>
                    <div style="color: #999;font-size:12px;margin-bottom:12px;margin-left:100px">用来接收订单提醒邮件，便于您及时了解订单状态</div>
                    <FormItem label="地址别名">
                        <Input placeholder="" style="width:300px"></Input>
                    </FormItem>
                </Form>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                showAddress: true,
                data: [{
                    value: 'beijing',
                    label: '北京',
                    children: [
                        {
                            value: 'gugong',
                            label: '故宫'
                        },
                        {
                            value: 'tiantan',
                            label: '天坛'
                        },
                        {
                            value: 'wangfujing',
                            label: '王府井'
                        }
                    ]
                }]
            }
        },
        methods: {
            ok () {

            },
            cancel (){

            }
        }
    }
</script>

<style scoped>
    
</style>