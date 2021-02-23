<template>
    <div class="index">
        <div class="info_form">
            <Form :model="infoForm" :label-width="100">
                <Row>
                    <Col span="6">
                    <FormItem label="申请人">
                        <Input v-model="infoForm.code" placeholder="请输入协议编号"></Input>
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="申请编号">
                        <Select v-model="infoForm.classify">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="所属公司">
                        <Select v-model="infoForm.classify">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="业务大类">
                        <Select v-model="infoForm.classify">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="状态">
                        <Select v-model="infoForm.classify">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="申请时间">
                        <Row>
                            <Col span="9">
                            <Input type="text" v-model="infoForm.user" placeholder="Username" />
                            </Col>
                            <Col span="2" style="text-align: center">-</Col>
                            <Col span="9">
                            <Input type="text" v-model="infoForm.user" placeholder="Username" />
                            </Col>
                        </Row>
                    </FormItem>
                    </Col>
                    <Col span="6" style="text-align:right">
                    <Button type="primary">搜索</Button>
                    <Button type="default">导出</Button>
                    <Button type="default">批量发货导入</Button>
                    </Col>
                </Row>
            </Form>
        </div>
        <div class="table">
            <Table border :columns="columns1" :data="data1">
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="primary" size="small" @click="show(index)">删除</Button>
                </template>
            </Table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            infoForm: {},
            cityList: [],
            columns1: [
                {
                    title: '申请日期',
                    key: 'name',
                    align: 'center',
                },
                {
                    title: '申请编号',
                    key: 'age',
                    align: 'center',
                },
                {
                    title: '申请人',
                    key: 'age',
                    align: 'center',
                },
                {
                    title: '所属公司',
                    key: 'age',
                    align: 'center',
                },
                {
                    title: '部门',
                    key: 'age',
                    align: 'center',
                },
                {
                    title: '业务大类',
                    key: 'age',
                    align: 'center',
                },
                {
                    title: '采购总金额',
                    key: 'age',
                    align: 'center',
                },
                {
                    title: '状态',
                    key: 'age',
                    align: 'center',
                },
                {
                    title: '操作',
                    slot: 'action',
                    align: 'center',
                },
            ],
            data1: [
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    date: '2016-10-03',
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    date: '2016-10-01',
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    date: '2016-10-02',
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    date: '2016-10-04',
                },
            ],
        }
    },
    components: {},
    watch: {},
    created() { },
    mounted() { },
    methods: {},
}
</script>

<style scoped lang="less">
.index {
    padding: 15px;
    background-color: #ffffff;
}
</style>
