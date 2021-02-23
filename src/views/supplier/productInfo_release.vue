<template>
    <div class="index">
        <Form :model="form" :label-width="100" class="goods_form" ref="form" :rules="ruleForm">
            <div class="title">
                <div class="sort_number">1</div>
                <div class="title_desc">商品基本信息</div>
            </div>
            <FormItem label="商品分类" class="form_classify">
                <div class="form_classify_content">
                    <Breadcrumb separator="<b style='color:#515a6e'>></b>" class="breadcrumb">
                        <BreadcrumbItem>{{form.categoryName1}}</BreadcrumbItem>
                        <BreadcrumbItem>{{form.categoryName2}}</BreadcrumbItem>
                        <BreadcrumbItem>{{form.categoryName}}</BreadcrumbItem>
                    </Breadcrumb>
                    <span class="edit_classify" @click="$router.go(-1)">修改分类</span>
                </div>
            </FormItem>
            <FormItem label="商品标题" prop="spuName">
                <Input v-model="form.spuName" placeholder="请输入商品标题"></Input>
            </FormItem>
            <FormItem label="商品编码">
                <Input v-model="form.itemNo" placeholder="请输入商品编码"></Input>
            </FormItem>
            <FormItem label="品牌" prop="brandCode">
                <Select v-model="form.brandCode" @on-change="changeBrand">
                    <Option v-for="item in brandList" :value="item.brandCode" :key="item.id">{{ item.brandName }}</Option>
                </Select>
            </FormItem>
            <FormItem label="商品属性">
                <span>请准确填写商品属性,有利于商品的搜索和推荐</span>
            </FormItem>
            <Row style="margin-left:100px">
                <Col span="12" v-for="(item,index) in form.spuAttrList" :key="item.id">
                <FormItem :label="item.attrName" :prop="'spuAttrList.'+index+'.attrValue'" :rules="[{ required: true, message: ' 请输入'+item.attrName , trigger: 'blur' }]">
                    <Input v-model="item.attrValue" placeholder="请输入属性"></Input>
                </FormItem>
                </Col>
                <Col span="24" style="text-align:right">
                <FormItem :label-width="0">
                    <Button type="default" icon="md-add" @click="addTtr">自定义属性</Button>
                </FormItem>
                </Col>
                <Col span="24">
                <FormItem v-for="(item,index) in attrList_add" :key="index">
                    <Col span="10">
                    <Input v-model="item.attrName" placeholder="请输入自定义属性标题"></Input>
                    </Col>
                    <Col span="10" offset="1">
                    <Input v-model="item.attrValue" placeholder="请输入自定义属性内容"></Input>
                    </Col>
                    <Col span="3" style="text-align:right">
                    <Button type="default" icon="md-trash" @click="delAttr(index)" style="right:0">删除</Button>
                    </Col>
                </FormItem>
                </Col>
            </Row>
            <FormItem label="商品轮播图" prop="spuImageList">
                <Upload action="api/vendor/updateFile" :format="['jpg','jpeg','png']" multiple :on-success="(res)=> uploadSuccess(1, res)" :headers='{"Authorization":headers }'
                        :show-upload-list='false'>
                    <Button icon="ios-cloud-upload-outline">点击上传</Button>
                </Upload>
                <div class="form_upload">
                    <div class="form_upload_item" v-for="(item,index) in form.spuImageList" :key="index" v-if="item.type==1?true:false">
                        <img :src="item.imageUrl">
                        <div class="form_upload_item_cover">
                            <Icon type="ios-eye-outline" @click.native="handleView(item.imageUrl)"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleRemove(1,index)"></Icon>
                        </div>
                    </div>
                </div>
            </FormItem>
            <FormItem label="商品详情图" prop="spuImageList_type2">
                <Upload action="api/vendor/updateFile" :format="['jpg','jpeg','png']" multiple :on-success="(res)=> uploadSuccess(2, res)" :headers='{"Authorization":headers }'
                        :show-upload-list='false'>
                    <Button icon="ios-cloud-upload-outline">点击上传</Button>
                </Upload>
                <div class="form_upload">
                    <div class="form_upload_item" v-for="(item,index) in form.spuImageList_type2" :key="index" v-if="item.type==2?true:false">
                        <img :src="item.imageUrl">
                        <div class="form_upload_item_cover">
                            <Icon type="ios-eye-outline" @click.native="handleView(item.imageUrl)"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleRemove(2,index)"></Icon>
                        </div>
                    </div>
                </div>
            </FormItem>
            <div class="title">
                <div class="sort_number">2</div>
                <div class="title_desc">商品规格与价格</div>
            </div>
            <FormItem label="商品规格">
                <div v-for="(item,index) in skuSpecList" :key="index">
                    <Row>
                        <Col span="17" class="form_sku">
                        <Select v-model="item.specId" @on-change="changeSpec($event,index)">
                            <Option v-for="ele in specList" :value="ele.id" :key="ele.id">{{ ele.specName }}</Option>
                        </Select>
                        </Col>
                        <Col span="6" offset="1" class="form_sku">
                        <Button type="default" icon="md-add" @click="addSku_ele(index)">添加</Button>
                        <Button type="default" icon="md-trash" v-if="index!=0" @click="delSku(index)">删除</Button>
                        </Col>
                        <Col span="17" class="form_sku" v-for="(e,i) in item.sku_ele" :key="i">
                        <Col span="20">
                        <Input v-model="e.specValue" placeholder="请输入规格属性"></Input>
                        </Col>
                        <Col span="4" style="text-align:right">
                        <Button type="default" icon="md-trash" v-if="i!=0" @click="delSku_ele(index,i)">删除</Button>
                        </Col>
                        </Col>
                    </Row>
                </div>
                <Button type="default" icon="md-add" class="form_sku" @click="addSku">商品规格</Button>
                <Button type="default" class="form_sku" @click="composeSku">组合生成</Button>
                <Button type="default" class="form_sku" @click="batchAction">批量操作</Button>
                <Table border :columns="columns1" :data="form.skuList" class="columns1Form" ref="columns1Form">
                    <template slot-scope="{ row, index }" slot="skuName">
                        <FormItem :label-width="0" :prop="'skuList.'+index+'.skuName'" :rules="[{ required:true, message:'请输入',trigger: 'blur' }]">
                            <Input v-model="row.skuName" placeholder="名称" @on-blur="(e)=>changeInput('skuName',index,e)"></Input>
                        </FormItem>
                    </template>
                    <template slot-scope="{ row, index }" slot="weight">
                        <FormItem :label-width="0" :prop="'skuList.'+index+'.weight'" :rules="[{ required:true, message:'请输入',trigger: 'blur' }]">
                            <Input v-model="row.weight" placeholder="重量" @on-blur="(e)=>changeInput('weight',index,e)"></Input>
                        </FormItem>
                    </template>
                    <template slot-scope="{ row, index }" slot="barCode">
                        <FormItem :label-width="0">
                            <Input v-model="row.barCode" placeholder="条码" @on-blur="(e)=>changeInput('barCode',index,e)"></Input>
                        </FormItem>
                    </template>
                    <template slot-scope="{ row, index }" slot="marketPrice">
                        <FormItem :label-width="0" :prop="'skuList.'+index+'.marketPrice'" :rules="[{ required:true, message:'请输入',trigger: 'blur' }]">
                            <Input v-model="row.marketPrice" type="number" placeholder="市场价" @on-blur="(e)=>changeInput('marketPrice',index,e)"></Input>
                        </FormItem>
                    </template>
                    <template slot-scope="{ row, index }" slot="supplyPrice">
                        <FormItem :label-width="0" :prop="'skuList.'+index+'.supplyPrice'" :rules="[{ required:true, message:'请输入',trigger: 'blur' }]">
                            <Input v-model="row.supplyPrice" type="number" placeholder="供货价" @on-blur="(e)=>changeInput('supplyPrice',index,e)"></Input>
                        </FormItem>
                    </template>
                    <template slot-scope="{ row, index }" slot="unit">
                        <FormItem :label-width="0" :prop="'skuList.'+index+'.unit'" :rules="[{ required:true, message:'请输入',trigger: 'blur' }]">
                            <Input v-model="row.unit" placeholder="单位" @on-blur="(e)=>changeInput('unit',index,e)"></Input>
                        </FormItem>
                    </template>
                    <template slot-scope="{ row, index }" slot="imageUrl">
                        <FormItem :label-width="0" :prop="'skuList.'+index+'.imageUrl'" :rules="[{ required:true, message:'请输入',trigger: 'change' }]">
                            <div style="display:flex;align-items: center;justify-content:space-between">
                                <Upload action="api/vendor/updateFile" :format="['jpg','jpeg','png']" :on-success="(res)=> uploadRowSuccess(index, res)"
                                        :headers='{"Authorization":headers }' :show-upload-list='false'>
                                    <Input readonly value="点击上传" style="width:70px"></Input>
                                </Upload>
                                <img :src="row.imageUrl" alt="" v-if="row.imageUrl==''?false:true" style="width:30px;height:30px" @click="handleView(row.imageUrl)">
                            </div>
                        </FormItem>
                    </template>
                </Table>
            </FormItem>
            <div class="title">
                <div class="sort_number">3</div>
                <div class="title_desc">服务与承诺</div>
            </div>
            <FormItem label="运费模板" prop="shippingId">
                <Row>
                    <Col span="20">
                    <Select v-model="form.shippingId" @on-change="changeShip">
                        <Option v-for="item in shipplingList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                    </Col>
                    <Col span="3" offset="1">
                    <div class="edit_classify" @click="goFare">新建运费模板</div>
                    </Col>
                </Row>
            </FormItem>
        </Form>
        <div class="submit_btn">
            <Button type="primary" @click="submit">提交并上架</Button>
        </div>
        <Modal title="预览" v-model="visible">
            <img :src="imgUrl" v-if="visible" style="width: 100%">
        </Modal>
        <Modal v-model="visible1" title="批量操作">
            <Form :model="batchForm" :label-width="80" ref="batchForm">
                <FormItem label="重量">
                    <Input v-model="batchForm.weight" placeholder="请输入重量"></Input>
                </FormItem>
                <FormItem label="条码">
                    <Input v-model="batchForm.barCode" placeholder="请输入条码"></Input>
                </FormItem>
                <FormItem label="市场价">
                    <Input type="number" v-model="batchForm.marketPrice" placeholder="请输入市场价"></Input>
                </FormItem>
                <FormItem label="供货价">
                    <Input type="number" v-model="batchForm.supplyPrice" placeholder="请输入供货价"></Input>
                </FormItem>
                <FormItem label="单位">
                    <Input v-model="batchForm.unit" placeholder="请输入单位"></Input>
                </FormItem>
                <FormItem label="展示图">
                    <div style="display:flex;align-items: center;justify-content:space-between">
                        <Upload action="api/vendor/updateFile" :format="['jpg','jpeg','png']" multiple :on-success="(res)=> uploadSuccess(3, res)"
                                :headers='{"Authorization":headers }' :show-upload-list='false'>
                            <Button icon="ios-cloud-upload-outline">点击上传</Button>
                        </Upload>
                        <img :src="batchForm.imageUrl" alt="" v-if="batchForm.imageUrl==''?false:true" style="width:30px;height:30px" @click="handleView(batchForm.imageUrl)">
                    </div>
                </FormItem>
            </Form>
            <div slot="footer">
                <div style="display:flex;justify-content:center">
                    <Button type="default" @click="visible1=false">取消</Button>
                    <Button type="primary" @click="submitBatch">确定</Button>
                </div>
            </div>
        </Modal>
        <Modal v-model="visible2" title="提示">
            <Icon type="md-checkmark-circle" color="#19be6b" size="24" />
            <span>新增成功,是否列表页?</span>
            <div slot="footer">
                <div style="display:flex;justify-content:center">
                    <Button type="default" @click="visible2=false">取消</Button>
                    <Button type="primary" @click="$router.push({path:'/supplier/goods_list'})">确定</Button>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import { getBrandListALL, getAttrListByCategoryId, getCategoryDetail, getSpecList, saveProduct, getShipplingList } from '../../service/supplier/supplier';
export default {
    data() {
        return {
            visible1: false,
            visible2: false,
            form: {
                skuList: [],
                spuImageList: [],
                spuImageList_type2: [],
                spuAttrList: [],
            },
            ruleForm: {
                spuName: [
                    { required: true, message: '请输入商品标题', trigger: 'blur' }
                ],
                brandCode: [
                    { required: true, message: '请选择品牌', trigger: 'change' }
                ],
                spuImageList: [
                    { required: true, type: 'array', message: '请上传轮播图', trigger: 'change' }
                ],
                spuImageList_type2: [
                    { required: true, type: 'array', message: '请上详情图', trigger: 'change' }
                ],
                shippingId: [
                    { required: true, type: 'number', message: '请选择运费模板', trigger: 'change' }
                ],
            },
            attrList_add: [],
            // headers: "Bearer " + this.$store.state.GLOBAL.token,
            headers: "Bearer " + JSON.parse(window.localStorage.getItem('store')).token,
            brandList: [],
            visible: false,
            imgUrl: '',
            specList: [],
            skuSpecList: [
                {
                    specId: '',
                    sku_ele: [{ specValue: '' }]
                }
            ],
            shipplingList: [],
            columns1: [
                { type: 'selection', width: 60, align: 'center' },
                { title: "规格名称", slot: "skuName", align: "center", },
                { title: "重量", slot: "weight", align: "center", },
                { title: "条码", slot: "barCode", align: "center", },
                { title: "市场价", slot: "marketPrice", align: "center", },
                { title: "供货价", slot: "supplyPrice", align: "center", },
                { title: "单位", slot: "unit", align: "center", },
                { title: "展示图", slot: "imageUrl", align: "center", width: 150, }
            ],
            batchForm: { weight: '', barCode: '', marketPrice: '', supplyPrice: '', unit: '', imageUrl: '' },
            selectIndex: []
        };
    },
    components: {},
    watch: {},
    created() {
        this.getCategoryDetail()
        this.getCategory()
        this.getBrandAll()
        this.getSpecList()
        this.getShipplingList()
    },
    mounted() {
    },
    methods: {
        getCategoryDetail() {
            getCategoryDetail({ id: this.$route.query.id }, res => {
                this.form.category1 = res.data[2].id
                this.form.categoryCode1 = res.data[2].categoryCode
                this.form.categoryName1 = res.data[2].categoryName
                this.form.category2 = res.data[1].id
                this.form.categoryCode2 = res.data[1].categoryCode
                this.form.categoryName2 = res.data[1].categoryName
                this.form.category = res.data[0].id
                this.form.categoryCode = res.data[0].categoryCode
                this.form.categoryName = res.data[0].categoryName
            })
        },
        getBrandAll() {
            getBrandListALL(undefined, res => {
                this.brandList = res.data
            })
        },
        getCategory() {
            getAttrListByCategoryId({ id: this.$route.query.id }, res => {
                res.data.forEach(item => {
                    this.form.spuAttrList.push({
                        attrId: item.id,
                        attrName: item.attrName,
                        attrValue: item.attrValue,
                    })
                })
            })
        },
        getSpecList() {
            getSpecList(undefined, res => {
                this.specList = res.data
            })
        },
        getShipplingList() {
            getShipplingList(undefined, res => {
                this.shipplingList = res.data
            })
        },
        changeBrand(code) {
            this.brandList.forEach(item => {
                if (item.brandCode == code) {
                    this.form.brand = item.id
                    this.form.brandName = item.brandName
                }
            })
        },
        changeShip(id) {
            this.shipplingList.forEach(item => {
                if (item.id == id) {
                    this.form.shippingName = item.name
                }
            })
        },
        addTtr() {
            let params = {
                attrName: '',
                attrValue: '',
            }
            this.attrList_add.push({ ...params })
        },
        delAttr(index) {
            this.attrList_add.splice(index, 1)
        },
        uploadSuccess(index, res) {
            console.log(index)
            switch (index) {
                case 1:
                    this.form.spuImageList.push({
                        type: 1,
                        imageUrl: res.data
                    })
                    break;
                case 2:
                    this.form.spuImageList_type2.push({
                        type: 2,
                        imageUrl: res.data
                    })
                    break;
                case 3:
                    this.batchForm.imageUrl = res.data
                    break;
                default:
                    break;
            }
        },
        handleView(imgUrl) {
            this.imgUrl = imgUrl
            this.visible = true
        },
        handleRemove(key, index) {
            switch (key) {
                case 1:
                    this.form.spuImageList.splice(index, 1)
                    break;
                case 2:
                    this.form.spuImageList_type2.splice(index, 1)
                    break;
                default:
                    break;
            }
        },
        addSku() {
            if (this.skuSpecList.length >= 3) {
                this.$Message.error('商品规格最多三个')
                return false
            }
            this.skuSpecList.push({
                specId: '',
                sku_ele: [{ specValue: '' }],
            })
        },
        changeSpec(e, index) {
            this.specList.forEach(item => {
                if (item.id == e) {
                    this.skuSpecList[index].specName = item.specName
                }
            })
        },
        addSku_ele(index) {
            if (this.skuSpecList[index].sku_ele.length >= 6) {
                this.$Message.error('商品规格属性最多6个')
                return false
            }
            this.skuSpecList[index].sku_ele.push({
                specValue: ''
            })
        },
        delSku(index) {
            this.skuSpecList.splice(index, 1)
        },
        delSku_ele(index, i) {
            this.skuSpecList[index].sku_ele.splice(i, 1)
        },
        composeSku() {
            let allArray = []
            let index = null
            this.columns1.find((e, i) => {
                if (e.title == '重量') {
                    index = i
                }
            })
            this.columns1.splice(2, index - 2)
            this.skuSpecList.forEach(item => {
                item.sku_ele.forEach(ele => {
                    this.$set(ele, 'specId', item.specId)
                    this.$set(ele, 'specName', item.specName)
                })
                allArray.push(item.sku_ele)
            })
            this.skuSpecList.forEach((item, index) => {
                this.columns1.splice(index + 2, 0, {
                    title: item.specName,
                    key: 'newCol_' + index,
                    align: "center",
                })
            })
            let sku = this.cartesianProductOf.apply(this, allArray)
            this.form.skuList = []
            sku.forEach((item, index) => {
                let rowValue = ''
                item.forEach((ele) => {
                    rowValue += ele.specValue
                })
                this.form.skuList.push({
                    id: index,
                    imageUrl: "",
                    marketPrice: '',
                    supplyPrice: '',
                    unit: '',
                    skuName: rowValue,
                    weight: '',
                    skuSpecList: item,
                    barCode: ''
                })
            })
            this.form.skuList.forEach(i => {
                i.skuSpecList.forEach((ele, index) => {
                    i['newCol_' + index] = ele.specValue
                })
            })
        },
        cartesianProductOf() {
            return Array.prototype.reduce.call(arguments, function(a, b) {
                var ret = [];
                a.forEach(function(a) {
                    b.forEach(function(b) {
                        ret.push(a.concat([b]));
                    });
                });
                return ret;
            }, [[]]);
        },
        uploadRowSuccess(index, res) {
            this.form.skuList[index].imageUrl = res.data;
        },
        goFare() {
            let { href } = this.$router.resolve({ path: '/supplier/add_fare' })
            window.open(href, '_blank')
        },
        changeInput(key, index, e) {
            this.form.skuList[index][key] = e.currentTarget.value
        },
        batchAction() {
            let selectData = this.$refs.columns1Form.getSelection();
            if (selectData.length != 0) {
                selectData.forEach(item => {
                    this.selectIndex.push(item.id)
                })
                this.visible1 = true
            } else {
                this.$Message.error('请先勾选')
            }
        },
        submitBatch() {
            this.selectIndex.forEach(item => {
                this.form.skuList[item].weight = this.batchForm.weight
                this.form.skuList[item].barCode = this.batchForm.barCode
                this.form.skuList[item].marketPrice = this.batchForm.marketPrice
                this.form.skuList[item].supplyPrice = this.batchForm.supplyPrice
                this.form.skuList[item].unit = this.batchForm.unit
                this.form.skuList[item].imageUrl = this.batchForm.imageUrl
            })
            this.visible1 = false
        },
        submit() {
            this.$refs['form'].validate(valid => {
                if (valid) {
                    let form_clone = JSON.parse(JSON.stringify(this.form))
                    form_clone.spuImageList = [...form_clone.spuImageList, ...form_clone.spuImageList_type2]
                    this.$delete(form_clone, 'spuImageList_type2')
                    form_clone.skuList.forEach((item, index) => {
                        let itemKeys = Object.keys(item)
                        itemKeys.forEach(ele => {
                            if (ele.substring(0, 7) == 'newCol_') {
                                this.$delete(item, ele)
                            }
                        })
                        this.$delete(item, 'id')
                        item.marketPrice = item.marketPrice * 100
                        item.supplyPrice = item.supplyPrice * 100
                    })
                    saveProduct(form_clone, res => {
                        if (res.msg == 'success') {
                            this.visible2 = true
                        }
                    })
                }
            })
        }
    }
};
</script>

<style scoped lang="less">
.index {
    padding: 15px;
    background-color: #ffffff;
    .goods_form {
        .ivu-form-item {
            margin-bottom: 20px;
        }
        .columns1Form {
            .ivu-form-item {
                margin-bottom: 7px;
            }
        }
        .title {
            display: flex;
            margin-bottom: 10px;
            .sort_number {
                font-size: 24px;
                color: #69b4eb;
            }
            .title_desc {
                font-size: 18px;
                padding-top: 6px;
                padding-left: 10px;
            }
        }
        .form_classify_content {
            display: flex;
            span {
                color: #515a6e;
                font-weight: normal;
            }
            .edit_classify {
                color: #2d8cf0;
                cursor: pointer;
                padding-left: 20px;
            }
        }
        .form_upload {
            display: flex;
            flex-wrap: wrap;
            .form_upload_item {
                margin-top: 3px;
                width: 102px;
                height: 102px;
                margin-right: 20px;
                border: 1px solid #dcdee2;
                position: relative;
                img {
                    width: 100px;
                    height: 100px;
                }
                .form_upload_item_cover {
                    display: none;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: rgba(0, 0, 0, 0.6);
                    text-align: center;
                    line-height: 100px;
                    i {
                        color: #fff;
                        font-size: 20px;
                        cursor: pointer;
                        margin: 0 2px;
                    }
                }
            }
            .form_upload_item:hover .form_upload_item_cover {
                display: block;
            }
        }
        .form_sku {
            margin-bottom: 10px;
        }
        .edit_classify {
            color: #2d8cf0;
            cursor: pointer;
        }
    }
    .submit_btn {
        display: flex;
        justify-content: center;
    }
}
</style>
