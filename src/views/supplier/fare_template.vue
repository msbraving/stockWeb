<template>
    <div class="index">
        <Button type="primary" @click="$router.push({path:'/supplier/add_fare'})">新建运费模板</Button>
        <div class="table">
            <Table border :columns="columns1" :data="tableData">
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="success" size="small" @click="toDetail(row.id)">详情</Button>
                    <Button type="warning" size="small" @click="del(row.id)">删除</Button>
                </template>
            </Table>
        </div>
    </div>
</template>

<script>
import { getShipplingList, deleteShipping } from '../../service/supplier/supplier';
export default {
    data() {
        return {
            columns1: [
                {
                    title: '模板名称',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '操作',
                    slot: 'action',
                    align: 'center'
                },
            ],
            tableData: [],
        }
    },
    components: {},
    watch: {},
    created() {
        this.getShipplingList()
    },
    mounted() { },
    methods: {
        getShipplingList() {
            getShipplingList(undefined, res => {
                this.tableData = res.data
            })
        },
        toDetail(id) {
            this.$router.push({
                path: '/supplier/fare_detail',
                query: {
                    id: id
                }
            })
        },
        del(id) {
            deleteShipping({ headId: id }, res => {
                if (res.msg == 'success') {
                    this.$Message.success('删除成功');
                    this.getShipplingList()
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
    .table {
        margin-top: 20px;
    }
}
</style>
