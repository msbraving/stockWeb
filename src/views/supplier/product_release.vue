<template>
    <div class="index">
        <Row>
            <Col span="24" style="text-align: right">
            <Button type="primary">批量导入</Button>
            </Col>
            <Col span="24">
            <div class="input_search">
                <Input v-model="value1" suffix="md-search" placeholder="请输入关键词搜索分类"></Input>
            </div>
            </Col>
            <Col span="8" class="tree_col">
            <Input v-model="value2" suffix="md-search" @on-enter="searchTree" placeholder="一级分类,名称检索" clearable>
            </Input>
            <Tree :data="dataOne" @on-select-change="(v)=>selectChange(0,v)"></Tree>
            </Col>
            <Col span="8" class="tree_col">
            <Input v-model="value3" suffix="md-search" placeholder="二级分类,名称检索">
            </Input>
            <Tree :data="dataTwo" @on-select-change="(v)=>selectChange(1,v)"></Tree>
            </Col>
            <Col span="8" class="tree_col">
            <Input v-model="value4" suffix="md-search" placeholder="三级分类,名称检索">
            </Input>
            <Tree :data="dataThree" @on-select-change="(v)=>selectChange(2,v)"></Tree>
            </Col>
        </Row>
    </div>
</template>

<script>
import { getreeList } from '../../service/supplier/supplier';
export default {
    data() {
        return {
            value1: '',
            value2: '',
            value3: '',
            value4: '',
            dataOne: [],
            dataTwo: [],
            dataThree: [],
        }
    },
    components: {},
    watch: {},
    created() {
        this.allTree()
    },
    mounted() { },
    methods: {
        allTree() {
            getreeList(undefined, res => {
                this.dataOne = this.getTree(res.data)
            })
        },
        getTree(tree = []) {
            let arr = [];
            if (!!tree && tree.length !== 0) {
                tree.forEach(item => {
                    let obj = {};
                    obj.title = item.categoryName;
                    obj.expand = false;
                    obj.id = item.id
                    obj.child = item.childList
                    arr.push(obj);
                });
            }
            return arr;
        },
        selectChange(index, v) {
            switch (index) {
                case 0:
                    this.dataTwo = this.getTree(v[0].child)
                    this.dataThree = []
                    break;
                case 1:
                    this.dataThree = this.getTree(v[0].child)
                    break;
                case 2:
                    this.$router.push({
                        path: '/supplier/productInfo_release',
                        query: {
                            id: v[0].id
                        }
                    })
                    break;
                default:
                    break;
            }
        },
        searchTree() {
        },
    },
}
</script>

<style scoped lang="less">
.index {
    padding: 15px;
    background-color: #ffffff;
    .input_search {
        margin: 20px 0;
    }
    .tree_col {
        padding: 15px;
    }
}
</style>
