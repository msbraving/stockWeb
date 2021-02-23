<template>
    <div class="index">
        <Form :model="form" :label-width="100" class="goods_form">
            <div class="title">
                <div class="sort_number">1</div>
                <div class="title_desc">产品基本信息</div>
            </div>
            <FormItem label="产品分类" class="form_classify">
                <div class="form_classify_content">
                    <Breadcrumb separator="<b style='color:#515a6e'>></b>" class="breadcrumb">
                        <BreadcrumbItem>{{form.categoryName1}}</BreadcrumbItem>
                        <BreadcrumbItem>{{form.categoryName2}}</BreadcrumbItem>
                        <BreadcrumbItem>{{form.categoryName}}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </FormItem>
            <FormItem label="产品标题">
                <div>{{form.spuName}}</div>
            </FormItem>
            <FormItem label="品牌">
                <div>{{form.brandName}}</div>
            </FormItem>
            <FormItem label="产品属性">
                <Row>
                    <Col span="12" v-for="item in form.spuAttrList" :key="item.id">
                    <FormItem :label="item.attrName">
                        <div>{{item.attrValue}}</div>
                    </FormItem>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="产品轮播图">
                <div class="form_upload">
                    <div class="form_upload_item" v-for="(item,index) in form.spuImageList" :key="index" v-if="item.type==1?true:false">
                        <img :src="item.imageUrl">
                        <div class="form_upload_item_cover">
                            <Icon type="ios-eye-outline" @click.native="handleView(item.imageUrl)"></Icon>
                        </div>
                    </div>
                </div>
            </FormItem>
            <FormItem label="产品详情图">
                <div class="form_upload">
                    <div class="form_upload_item" v-for="(item,index) in form.spuImageList" :key="index" v-if="item.type==2?true:false">
                        <img :src="item.imageUrl">
                        <div class="form_upload_item_cover">
                            <Icon type="ios-eye-outline" @click.native="handleView(item.imageUrl)"></Icon>
                        </div>
                    </div>
                </div>
            </FormItem>
            <div class="title">
                <div class="sort_number">2</div>
                <div class="title_desc">产品规格与价格</div>
            </div>
            <FormItem label="产品规格">
                <Table border :columns="columns1" :data="form.skuList" v-if="form.skuList.length!=0">
                </Table>
            </FormItem>
            <div class="title">
                <div class="sort_number">3</div>
                <div class="title_desc">服务与承诺</div>
            </div>
            <FormItem label="运费模板">
                <div>{{form.shippingName}}</div>
            </FormItem>
        </Form>
        <Modal title="预览" v-model="visible">
            <img :src="imgUrl" v-if="visible" style="width: 100%">
        </Modal>
    </div>
</template>

<script>
import { getProductDetail, getShipplingList } from '../../service/supplier/supplier';
export default {
    data() {
        return {
            form: {
                skuList: [],
                spuImageList: [],
                spuAttrList: [],
            },
            visible: false,
            imgUrl: '',
            shipplingList: [],
            columns1: [
                {
                    title: "规格名称",
                    key: "skuName",
                    align: "center",
                },
                {
                    title: "重量",
                    key: "weight",
                    align: "center",
                },
                {
                    title: '市场价',
                    key: 'marketPrice',
                    align: 'center',
                },
                {
                    title: "展示图",
                    key: "imageUrl",
                    align: "center",
                    render: (h, { row, index }) => {
                        return h('img', {
                            attrs: {
                                src: row.imageUrl,
                            },
                            style: {
                                width: '30px',
                                height: '30px',
                            },
                            on: {
                                'click': (e) => {
                                    this.handleView(row.imageUrl)
                                }
                            }
                        })
                    }
                },
            ],
        };
    },
    components: {},
    watch: {},
    created() {
        this.productDetail()
    },
    mounted() {
    },
    methods: {
        productDetail() {
            getProductDetail({ id: this.$route.query.id }, res => {
                this.form = res.data
                this.form.skuList.forEach(i => {
                    i.skuSpecList.forEach(j => {
                        i[j.specName] = j.specValue
                    })
                })
                for (var i = this.form.skuList[0].skuSpecList.length - 1; i >= 0; i--) {
                    this.columns1.splice(1, 0, {
                        title: this.form.skuList[0].skuSpecList[i].specName,
                        key: this.form.skuList[0].skuSpecList[i].specName,
                        align: "center",
                    })
                }
                this.getShipplingList()
            })
        },
        handleView(imgUrl) {
            this.imgUrl = imgUrl
            this.visible = true
        },
    }
};
</script>

<style scoped lang="less">
.index {
    padding: 15px;
    background-color: #ffffff;
    .goods_form {
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
            margin-top: 10px;
            display: flex;
            flex-wrap: wrap;
            .form_upload_item {
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
