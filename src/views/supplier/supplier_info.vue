<template>
    <div class="index">
        <!-- <Tabs type="card" value="info">
            <TabPane label="供应商档案" name="info"> -->
        <Form :model="infoForm" ref="infoForm" :rules="ruleForm" :label-width="135">
            <div class="title">企业信息</div>
            <Row>
                <Col span="12">
                <FormItem label="供应商名称" prop="vendorName">
                    <Input v-model="infoForm.vendorName" placeholder="请输入供应商名称"></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="供应商简称" prop="poVendorDesc.vendorSortName">
                    <Input v-model="infoForm.poVendorDesc.vendorSortName" placeholder="请输入供应商简称"></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="统一社会信用代码" prop="poVendorDesc.registrationCode">
                    <Input v-model="infoForm.poVendorDesc.registrationCode" placeholder="请输入统一社会信用代码"></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="供应商编码" prop="vendorCode">
                    <Input v-model="infoForm.vendorCode" placeholder="请输入供应商编码"></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="纳税人类型" prop="poVendorDesc.taxpayerType">
                    <Select v-model="infoForm.poVendorDesc.taxpayerType">
                        <Option v-for="item in typeList.taxpayer.flexValues" :value="item.name" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="企业类型" prop="poVendorDesc.enterprisesType">
                    <Select v-model="infoForm.poVendorDesc.enterprisesType">
                        <Option v-for="item in typeList.enterprises.flexValues" :value="item.name" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="机构类型" prop="poVendorDesc.mechanismType">
                    <Select v-model="infoForm.poVendorDesc.mechanismType">
                        <Option v-for="item in typeList.mechanism.flexValues" :value="item.name" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="法人姓名" prop="poVendorDesc.legalName">
                    <Input v-model="infoForm.poVendorDesc.legalName" placeholder="请输入法人姓名"></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="法人手机号" prop="poVendorDesc.legalMobile">
                    <Input v-model="infoForm.poVendorDesc.legalMobile" placeholder="请输入法人手机号"></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="法人身份证号" prop="poVendorDesc.legalIdNo">
                    <Input v-model="infoForm.poVendorDesc.legalIdNo" placeholder="请输入法人身份证号"></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="注册资金（万）">
                    <Col span="14">
                    <FormItem prop="poVendorDesc.registeredCapital">
                        <Input v-model="infoForm.poVendorDesc.registeredCapital" placeholder="请输入注册资金"></Input>
                    </FormItem>
                    </Col>
                    <Col span="8" offset="2">
                    <FormItem prop="poVendorDesc.registeredCapitalType">
                        <Select v-model="infoForm.poVendorDesc.registeredCapitalType">
                            <Option v-for="item in typeList.registered.flexValues" :value="item.name" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="营业期限">
                    <Col span="8">
                    <FormItem prop="poVendorDesc.businessTermStart">
                        <DatePicker v-model="infoForm.poVendorDesc.businessTermStart" format="yyyy-MM-dd" type="date" placeholder="开始时间" @on-change="(date)=>changeTerm(0,date)">
                        </DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="2" style="text-align:center">
                    <span> 至 </span>
                    </Col>
                    <Col span="8">
                    <DatePicker v-model="infoForm.poVendorDesc.businessTermEnd" type="date" format="yyyy-MM-dd" placeholder="结束时间" @on-change="(date)=>changeTerm(1,date)"
                                :disabled="infoForm.poVendorDesc.businessTermType == 1 ? true : false"></DatePicker>
                    </Col>
                    <Col span="4" offset="1">
                    <Checkbox v-model="infoForm.poVendorDesc.businessTermType ==1?true:false" @on-change="changeTermType">永久</Checkbox>
                    </Col>
                </FormItem>
                </Col>
                <Col span="24">
                <FormItem label="营业范围" prop="poVendorDesc.businessScope">
                    <Input v-model="infoForm.poVendorDesc.businessScope" type="textarea" placeholder="请输入营业范围" />
                </FormItem>
                </Col>
                <Col span="24">
                <FormItem label="营业执照" prop="poVendorDesc.registrationImg">
                    <div class="form_upload">
                        <Upload action="api/vendor/updateFile" :on-success="(res)=> uploadSuccess(0, res)" :headers='{"Authorization":headers }' :show-upload-list='false'>
                            <Button icon="ios-cloud-upload-outline">上传图片</Button>
                        </Upload>
                        <span>（文件大小5M以内）</span>
                    </div>
                    <img :src="infoForm.poVendorDesc.registrationImg" v-if="infoForm.poVendorDesc.registrationImg!=''&& infoForm.poVendorDesc.registrationImg!=null" alt=""
                         style="width:100px;height:100px" @click="handleView(infoForm.poVendorDesc.registrationImg)">
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="法人身份证" prop="poVendorDesc.legalIdImg">
                    <div class="form_upload">
                        <Upload action="api/vendor/updateFile" :on-success="(res)=> uploadSuccess(1, res)" :headers='{"Authorization":headers }' :show-upload-list='false'>
                            <Button icon="ios-cloud-upload-outline">上传图片</Button>
                        </Upload>
                        <span>（文件大小5M以内）</span>
                    </div>
                    <img :src="infoForm.poVendorDesc.legalIdImg" v-if="infoForm.poVendorDesc.legalIdImg!=''&& infoForm.poVendorDesc.legalIdImg!=null" alt=""
                         style="width:100px;height:100px" @click="handleView(infoForm.poVendorDesc.legalIdImg)">
                </FormItem>
                </Col>
            </Row>
            <div class="title">业务信息</div>
            <Row>
                <Col span="12">
                <FormItem label="办公电话" prop="poVendorDesc.officeMobile">
                    <Input v-model="infoForm.poVendorDesc.officeMobile" placeholder="请输入办公电话"></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <!-- 数组判断 -->
                <FormItem label="办公地址" prop="areaArray">
                    <Cascader :data="dataAddress" v-model="infoForm.areaArray" filterable @on-change="selectArea"></Cascader>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="售后服务电话" prop="poVendorDesc.afterSalesMobile">
                    <Input v-model="infoForm.poVendorDesc.afterSalesMobile" placeholder="请输入售后服务电话"></Input>
                </FormItem>
                </Col>
            </Row>
            <div class="title">银行信息</div>
            <Table border :columns="columns1" :data="infoForm.accountsList">
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="warning" size="small" @click="delTableRow(0,index)">删除</Button>
                </template>
            </Table>
            <Button type="text" icon="md-add" class="new_add" @click="addTableRow(0)">新增一行</Button>
            <div class="title">证件信息</div>
            <Table border :columns="columns2" :data="infoForm.poVendorCertificatesList">
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="warning" size="small" @click="delTableRow(1,index)">删除</Button>
                </template>
            </Table>
            <Button type="text" icon="md-add" class="new_add" @click="addTableRow(1)">新增一行</Button>
            <div class="title">退货地址</div>
            <Table border :columns="columns3" :data="infoForm.poVendorReturnAddressList">
                <!-- <template slot-scope='{row,index}' slot='accountNumber'>
                            <Form :ref='"coupon" + index' :model='row'>
                                <FormItem prop='accountNumber' :rules="[{ required: true, message: ' 请输入收货人' , trigger: 'blur' }]">
                                    <Input v-model='row.accountNumber' placeholder='请输入收货人' />
                                </FormItem>
                            </Form>
                        </template> -->
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="warning" size="small" @click="delTableRow(2,index)">删除</Button>
                </template>
            </Table>
            <Button type="text" icon="md-add" class="new_add" @click="addTableRow(2)">新增一行</Button>
        </Form>
        <div class="submit_btn">
            <Button type="primary" @click="submitForm">提交</Button>
            <Button type="default">取消</Button>
        </div>
        <Modal title="预览" v-model="visible1">
            <img :src="imgUrl" v-if="visible1" style="width: 100%">
        </Modal>
        <!-- </TabPane>
        <TabPane label="合作关系" name="relation">合作关系</TabPane>
        </Tabs> -->
        <Modal v-model="visible2" title="提示">
            <Icon type="md-checkmark-circle" color="#19be6b" size="24" />
            <span>信息更新成功,是否跳转首页?</span>
            <div slot="footer">
                <div style="display:flex;justify-content:center">
                    <Button type="default" @click="visible2=false">取消</Button>
                    <Button type="primary" @click="$router.push({path:'/'})">确定</Button>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import { getVendorDetail, getVendorFlex, updateVendor } from '../../service/supplier/supplier';
import { areaCopy } from '../../utils/areaCopy.js'
export default {
    data() {
        let checkPhone = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("请输入法人手机号"));
            } else {
                const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
                if (reg.test(value)) {
                    callback();
                } else {
                    return callback(new Error("请输入正确的手机号"));
                }
            }
        };
        let checkLegalIdNo = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("请输入法人身份证号"));
            } else {
                const reg = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
                if (reg.test(value)) {
                    callback();
                } else {
                    return callback(new Error("请输入正确的身份证号"));
                }
            }
        };
        return {
            visible2: false,
            infoForm: {
                poVendorDesc: {},
                accountsList: [],
                poVendorCertificatesList: [],
                poVendorReturnAddressList: []
            },
            typeList: {
                enterprises: { flexValues: [] },
                mechanism: { flexValues: [] },
                registered: { flexValues: [] },
                taxpayer: { flexValues: [] },
            },
            uploadList1: [],
            uploadList2: [],
            uploadList3: [],
            dataAddress: areaCopy(),
            // headers: "Bearer " + this.$store.state.GLOBAL.token,
            headers: "Bearer " + JSON.parse(window.localStorage.getItem('store')).token,
            visible1: false,
            ruleForm: {
                vendorName: [
                    { required: true, message: '请输入供应商名称', trigger: 'blur' }
                ],
                'poVendorDesc.vendorSortName': [
                    { required: true, message: '请输入供应商简称', trigger: 'blur' }
                ],
                'poVendorDesc.registrationCode': [
                    { required: true, message: '请输入统一社会信用代码', trigger: 'blur' }
                ],
                vendorCode: [
                    { required: true, message: '请输入供应商编码', trigger: 'blur' }
                ],
                'poVendorDesc.taxpayerType': [
                    { required: true, message: '请选择纳税人类型', trigger: 'change' }
                ],
                'poVendorDesc.enterprisesType': [
                    { required: true, message: '请选择企业类型', trigger: 'change' }
                ],
                'poVendorDesc.mechanismType': [
                    { required: true, message: '请选择机构类型', trigger: 'change' }
                ],
                'poVendorDesc.legalName': [
                    { required: true, message: '请输入法人姓名', trigger: 'blur' }
                ],
                'poVendorDesc.legalMobile': [
                    { required: true, validator: checkPhone, trigger: 'blur' }
                ],
                'poVendorDesc.legalIdNo': [
                    { required: true, validator: checkLegalIdNo, trigger: 'blur' }
                ],
                'poVendorDesc.registeredCapital': [
                    { required: true, message: '请输入注册资金', trigger: 'blur' }
                ],
                'poVendorDesc.registeredCapitalType': [
                    { required: true, message: '请选择资金类型', trigger: 'change' }
                ],
                'poVendorDesc.businessTermStart': [
                    { required: true, type: 'date', message: '请选择开始时间', trigger: 'change' }
                ],
                'poVendorDesc.businessScope': [
                    { required: true, message: '请输入营业范围', trigger: 'blur' }
                ],
                'poVendorDesc.registrationImg': [
                    { required: true, message: '请上传营业执照', trigger: 'blur' }
                ],
                'poVendorDesc.legalIdImg': [
                    { required: true, message: '请上传法人身份证', trigger: 'blur' }
                ],
                'poVendorDesc.officeMobile': [
                    { required: true, message: '请输入办公电话', trigger: 'blur' }
                ],
                areaArray: [
                    { required: true, type: 'array', message: '请输入办公地址', trigger: 'change' }
                ],
                'poVendorDesc.afterSalesMobile': [
                    { required: true, message: '请输入售后服务电话', trigger: 'blur' }
                ],

            },
            columns1: [
                {
                    title: '银行账户',
                    key: 'accountNumber',
                    align: 'center',
                    render: (h, { row, index }) => {
                        return h('Input', {
                            props: {
                                value: row.accountNumber,
                                placeholder: '请输入银行账户'
                            },
                            on: {
                                'on-blur': (e) => {
                                    this.infoForm.accountsList[index].accountNumber = e.currentTarget.value;
                                }
                            }
                        });
                    }
                },
                {
                    title: "开户名",
                    key: "accountName",
                    align: "center",
                    render: (h, { row, index }) => {
                        return h('Input', {
                            props: {
                                value: row.accountName,
                                placeholder: '请输入开户名'
                            },
                            on: {
                                'on-blur': (e) => {
                                    this.infoForm.accountsList[index].accountName = e.currentTarget.value;
                                }
                            }
                        });
                    }
                },
                {
                    title: "银行名称",
                    key: "bankName",
                    align: "center",
                    render: (h, { row, index }) => {
                        return h('Input', {
                            props: {
                                value: row.bankName,
                                placeholder: '请输入银行名称'
                            },
                            on: {
                                'on-blur': (e) => {
                                    this.infoForm.accountsList[index].bankName = e.currentTarget.value;
                                }
                            }
                        });
                    }
                },
                {
                    title: "开户行名称",
                    key: "branchBank",
                    align: "center",
                    render: (h, { row, index }) => {
                        return h('Input', {
                            props: {
                                value: row.branchBank,
                                placeholder: '请输入开户行名称'
                            },
                            on: {
                                'on-blur': (e) => {
                                    this.infoForm.accountsList[index].branchBank = e.currentTarget.value;
                                }
                            }
                        });
                    }
                },
                {
                    title: "联行号",
                    key: "cnapNumber",
                    align: "center",
                    render: (h, { row, index }) => {
                        return h('Input', {
                            props: {
                                value: row.cnapNumber,
                                placeholder: '请输入联行号'
                            },
                            on: {
                                'on-blur': (e) => {
                                    this.infoForm.accountsList[index].cnapNumber = e.currentTarget.value;
                                }
                            }
                        });
                    }
                },
                {
                    title: "默认账号",
                    key: "mainAccountFlag",
                    align: "center",
                    align: 'center',
                    render: (h, { row, index }) => {
                        return h('Radio', {
                            props: {
                                value: JSON.parse(row.mainAccountFlag),
                            },
                            style: {
                                marginRight: '0'
                            },
                            on: {
                                'on-change': () => {
                                    this.infoForm.accountsList.forEach(item => {
                                        item.mainAccountFlag
                                        this.$set(item, 'mainAccountFlag', false)
                                    });
                                    this.infoForm.accountsList[index].mainAccountFlag = true
                                }
                            }
                        })
                    }
                },
                {
                    title: '操作',
                    slot: 'action',
                    align: 'center',
                    width: '80'
                }
            ],
            columns2: [
                {
                    title: '证件名称',
                    key: 'certificatesName',
                    align: 'center',
                    render: (h, { row, index }) => {
                        return h('Input', {
                            props: {
                                value: row.certificatesName,
                                placeholder: '请输入证件名称'
                            },
                            on: {
                                'on-blur': (e) => {
                                    this.infoForm.poVendorCertificatesList[index].certificatesName = e.currentTarget.value;
                                }
                            }
                        });
                    }
                },
                {
                    title: "生效时间",
                    key: "certificatesStartTime",
                    align: "center",
                    render: (h, { row, index }) => {
                        return h('DatePicker', {
                            props: {
                                value: row.certificatesStartTime,
                                placeholder: '生效时间',
                                type: 'date',
                                transfer: true
                            },
                            on: {
                                'on-change': (e) => {
                                    this.infoForm.poVendorCertificatesList[index].certificatesStartTime = e + ' 00:00:00';
                                }
                            }
                        });
                    }
                },
                {
                    title: "截止时间",
                    key: "certificatesEndTime",
                    align: "center",
                    render: (h, { row, index }) => {
                        return h('DatePicker', {
                            props: {
                                value: row.certificatesEndTime,
                                placeholder: '截止时间',
                                type: 'date',
                                transfer: true,
                                disabled: this.infoForm.poVendorCertificatesList[index].certificatesTimeType == 1 ? true : false
                            },
                            on: {
                                'on-change': (e) => {
                                    this.infoForm.poVendorCertificatesList[index].certificatesEndTime = e + ' 00:00:00';
                                }
                            }
                        });
                    }
                },
                {
                    title: "是否永久",
                    key: "certificatesTimeType",
                    align: "center",
                    render: (h, { row, index }) => {
                        return h('i-switch', {
                            props: {
                                value: row.certificatesTimeType == 1 ? true : false,
                            },
                            scopedSlots: {
                                open: () => h('span', '是'),
                                close: () => h('span', '否')
                            },
                            on: {
                                'on-change': (e) => {
                                    if (e == true) {
                                        this.infoForm.poVendorCertificatesList[index].certificatesTimeType = 1
                                        this.infoForm.poVendorCertificatesList[index].certificatesEndTime = ''
                                    } else {
                                        this.infoForm.poVendorCertificatesList[index].certificatesTimeType = 2
                                    }
                                }
                            }
                        })
                    }
                },
                {
                    title: "附件",
                    key: "certificatesUrl",
                    align: "center",
                    render: (h, { row, index }) => {
                        return h('div',
                            {
                                style: {
                                    display: 'flex',
                                    'align-items': 'center',
                                    'justify-content': 'space-between'
                                }
                            },
                            [

                                h('Upload', {
                                    props: {
                                        action: 'api/vendor/updateFile',
                                        headers: { 'Authorization': this.headers },
                                        'show-upload-list': false,
                                        'on-success': (res) => this.uploadRowSuccess(index, res),
                                    },
                                    style: {
                                        display: 'flex',
                                    }
                                },
                                    [
                                        h('Button', {
                                            props: {
                                                icon: 'ios-cloud-upload-outline'
                                            }
                                        }, '选择图片')

                                    ],
                                ),
                                h('img', {
                                    attrs: {
                                        src: row.certificatesUrl,
                                    },
                                    style: {
                                        width: '30px',
                                        height: '30px',
                                        display: row.certificatesUrl == '' ? 'none' : 'block'
                                    },
                                    on: {
                                        'click': (e) => {
                                            this.handleView(row.certificatesUrl)
                                        }
                                    }
                                },
                                ),
                            ])
                    }
                },
                {
                    title: '操作',
                    slot: 'action',
                    align: 'center',
                    width: '80'
                }
            ],
            columns3: [
                {
                    title: '收货人',
                    key: 'userName',
                    align: 'center',
                    render: (h, { row, index }) => {
                        return h('Input', {
                            props: {
                                value: row.userName,
                                placeholder: '请输入收货人'
                            },
                            on: {
                                'on-blur': (e) => {
                                    this.infoForm.poVendorReturnAddressList[index].userName = e.currentTarget.value;
                                }
                            }
                        });
                    }
                },
                {
                    title: "联系电话",
                    key: "userMobile",
                    align: "center",
                    render: (h, { row, index }) => {
                        return h('Input', {
                            props: {
                                value: row.userMobile,
                                placeholder: '请输入联系电话'
                            },
                            on: {
                                'on-blur': (e) => {
                                    this.infoForm.poVendorReturnAddressList[index].userMobile = e.currentTarget.value;
                                }
                            }
                        });
                    }
                },
                {
                    title: "所在地区",
                    key: "areArr",
                    align: "center",
                    render: (h, { row, index }) => {
                        return h('Cascader', {
                            props: {
                                value: row.areArr,
                                data: this.dataAddress,
                                placeholder: '所在地区',
                                transfer: true
                            },
                            on: {
                                'on-change': (e) => {
                                    this.infoForm.poVendorReturnAddressList[index].areArr = e
                                    this.infoForm.poVendorReturnAddressList[index].province = e[0]
                                    this.infoForm.poVendorReturnAddressList[index].city = e[1]
                                    this.infoForm.poVendorReturnAddressList[index].area = e[2]
                                }
                            }
                        });
                    }
                },
                {
                    title: "详细地址",
                    key: "address",
                    align: "center",
                    render: (h, { row, index }) => {
                        return h('Input', {
                            props: {
                                value: row.address,
                                placeholder: '请输入详细地址'
                            },
                            on: {
                                'on-blur': (e) => {
                                    this.infoForm.poVendorReturnAddressList[index].address = e.currentTarget.value;
                                }
                            }
                        });
                    }
                },
                {
                    title: '操作',
                    slot: 'action',
                    align: 'center',
                    width: '80'
                }
            ],
        };
    },
    components: {},
    watch: {},
    created() {
        this.vendorDetail()
        this.vendorFlex()
    },
    mounted() { },
    methods: {
        vendorDetail() {//供应商信息
            getVendorDetail(null, res => {
                this.infoForm = {
                    vendorName: res.data.vendorName,
                    vendorCode: res.data.vendorCode,
                    poVendorDesc: res.data.poVendorDesc,
                    accountsList: res.data.accountsList,
                    poVendorCertificatesList: res.data.poVendorCertificatesList,
                    poVendorReturnAddressList: res.data.poVendorReturnAddressList,
                    areaArray: [res.data.poVendorDesc.addressProvince, res.data.poVendorDesc.addressCity, res.data.poVendorDesc.addressArea,]//后台返回省市区赋值
                }
                this.infoForm.poVendorReturnAddressList.forEach(item => {
                    item.areArr = [item.province, item.city, item.area]
                })
                this.infoForm.poVendorDesc.registeredCapital = String(this.infoForm.poVendorDesc.registeredCapital)
                this.infoForm.poVendorDesc.businessTermEnd = this.infoForm.poVendorDesc.businessTermType == 1 ? '' : this.infoForm.poVendorDesc.businessTermEnd
            })
        },
        toType(a, v) {
            switch (a) {
                case 1:
                    if (v == '' || v == null) {
                        return v = ''
                    }
                    break;
                default:
                    if (v == '' || v == null) {
                        return v = []
                    }
                    break;
            }
        },
        vendorFlex() {
            getVendorFlex(null, res => {
                this.typeList = res.data
            })
        },
        changeTerm(index, data) {
            this.infoForm.poVendorDesc.businessTermType = 2
        },
        changeTermType(v) {
            if (v == true) {
                this.infoForm.poVendorDesc.businessTermType = 1
                this.infoForm.poVendorDesc.businessTermEnd = ''
            } else {
                this.infoForm.poVendorDesc.businessTermType = 2
            }
        },
        selectArea(value, selectedData) {
            //办公地址
            this.$set(this.infoForm.poVendorDesc, 'addressProvince', value[0])
            this.$set(this.infoForm.poVendorDesc, 'addressCity', value[1])
            this.$set(this.infoForm.poVendorDesc, 'addressArea', value[2])
        },
        uploadSuccess(index, res) {
            //图片上传成功
            switch (index) {
                case 0:
                    this.infoForm.poVendorDesc.registrationImg = res.data
                    break;
                case 1:
                    this.infoForm.poVendorDesc.legalIdImg = res.data
                    break;
                default:
                    break;
            }
        },
        uploadRowSuccess(index, res) {
            //证件信息上传成功
            this.infoForm.poVendorCertificatesList[index].certificatesUrl = res.data;
        },
        addTableRow(key) {
            //增加一行
            let rowTableDate = null
            switch (key) {
                case 0:
                    if (this.infoForm.accountsList.length > 5) {
                        this.$Message.error('银行账户信息最多添加6个');
                        return false
                    }
                    rowTableDate = {
                        accountNumber: '',
                        accountName: '',
                        bankName: '',
                        branchBank: '',
                        cnapNumber: '',
                        mainAccountFlag: false
                    }
                    this.infoForm.accountsList.push({ ...rowTableDate })
                    break;
                case 1:
                    if (this.infoForm.poVendorCertificatesList.length > 5) {
                        this.$Message.error('证件信息最多添加6个');
                        return false
                    }
                    rowTableDate = {
                        certificatesName: '',
                        certificatesStartTime: '',
                        certificatesEndTime: '',
                        certificatesTimeType: 2,
                        certificatesUrl: '',
                    }
                    this.infoForm.poVendorCertificatesList.push({ ...rowTableDate })
                    break;
                case 2:
                    if (this.infoForm.poVendorReturnAddressList.length > 5) {
                        this.$Message.error('退货地址信息最多添加6个');
                        return false
                    }
                    rowTableDate = {
                        userName: '',
                        userMobile: '',
                        areArr: [],
                        address: '',
                        province: '',
                        city: '',
                        area: ''
                        // mainAccountFlag: false
                    }
                    this.infoForm.poVendorReturnAddressList.push({ ...rowTableDate })
                    break;
                default:
                    break;
            }
            console.log(this.infoForm.poVendorReturnAddressList)
        },
        delTableRow(key, index) {
            //删除表格 row
            switch (key) {
                case 0:
                    this.infoForm.accountsList.splice(index, 1)
                    break;
                case 1:
                    this.infoForm.poVendorCertificatesList.splice(index, 1)
                    break;
                case 2:
                    this.infoForm.poVendorReturnAddressList.splice(index, 1)
                    break;
                default:
                    break;
            }
        },
        handleView(imgUrl) {//预览图片
            this.imgUrl = imgUrl
            this.visible1 = true
        },
        toDate(date) {
            var d = new Date(date)
            var y = d.getFullYear();
            var m = d.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = d.getDate();
            d = d < 10 ? ('0' + d) : d;
            return y + '-' + m + '-' + d + ' ' + '00:00:00'
        },
        submitForm() {
            let form = JSON.parse(JSON.stringify(this.infoForm))
            this.$delete(form, 'areaArray')
            form.poVendorReturnAddressList.forEach(item => {
                this.$delete(item, 'areArr')
            })
            form.poVendorDesc.businessTermStart = this.toDate(form.poVendorDesc.businessTermStart)
            if (this.infoForm.poVendorDesc.businessTermType == 2) {
                form.poVendorDesc.businessTermEnd = this.toDate(form.poVendorDesc.businessTermEnd)
            }
            this.$refs['infoForm'].validate((valid) => {
                if (valid) {
                    updateVendor(form, res => {
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
    .ivu-form-item {
        margin-bottom: 24px;
    }
    .title {
        position: relative;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        font-size: 14px;
        color: #d60413;
        border-bottom: 1px solid #dcdee2;
        margin-bottom: 24px;
    }
    .title::after {
        content: "";
        position: absolute;
        width: 100px;
        height: 1px;
        left: 0;
        bottom: -1px;
        background-color: #d60413;
    }
    .form_upload {
        display: flex;
    }
    .new_add {
        margin: 10px 0 0 3px;
        color: #2b85e4;
    }
    .submit_btn {
        display: flex;
        justify-content: center;
        margin-bottom: 50px;
        .ivu-btn {
            margin: 0 20px;
        }
    }
}
</style>
