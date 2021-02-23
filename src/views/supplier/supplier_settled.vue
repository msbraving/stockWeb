<template>
    <div class="supplier_settled">
        <div class="title">
            <div class="line"></div>
            <h2>供应商用户注册</h2>
        </div>
        <div class="content">
            <div class="step">
                <Steps :current="current" status="process">
                    <Step title="手机验证"></Step>
                    <Step title="填写供应商"></Step>
                    <Step title="完成注册"></Step>
                </Steps>
            </div>
            <div class="step_every" v-if="isStep == 1">
                <Form ref="formValidate_one" :model="formValidate_one" :rules="ruleValidate_one" :label-width="100">
                    <h2 class="step_title">请填写手机号进行验证</h2>
                    <FormItem label="手机号码" prop="tel">
                        <Input v-model="formValidate_one.tel" placeholder="请输入手机号" type="tel"></Input>
                    </FormItem>
                    <FormItem label="短信验证码" prop="code">
                        <Input class="step_SMcode" v-model="formValidate_one.code" placeholder="短信验证码"></Input>
                        <Button v-if="isShowCode" @click="getCode">获取验证码</Button>
                        <Button v-else class="step_time" disabled>{{reciprocal}}秒</Button>
                    </FormItem>
                </Form>
                <div class="step_button">
                    <Button type="error" @click="next('formValidate_one')">下一步</Button>
                </div>
            </div>
            <div class="step_every" v-if="isStep == 2">
                <Form ref="formValidate_two" :model="formValidate_two" :rules="ruleValidate_two" :label-width="150">
                    <h2 class="step_title">请设置用户账号信息</h2>
                    <FormItem label="联系人姓名" prop="userName">
                        <Input v-model="formValidate_two.userName" placeholder="请输入联系人姓名"></Input>
                    </FormItem>
                    <FormItem label="设置登录名" prop="loginName">
                        <Input v-model="formValidate_two.loginName" placeholder="请输入登录名"></Input>
                    </FormItem>
                    <FormItem label="请设置密码" prop="password">
                        <Input v-model="formValidate_two.password" placeholder="请设置密码" type="password" password></Input>
                    </FormItem>
                    <FormItem label="再次输入密码" prop="rpassword">
                        <Input v-model="formValidate_two.rpassword" placeholder="请再次输入密码" type="password" password></Input>
                    </FormItem>
                    <h2 class="step_title">请填写供应商企业信息</h2>
                    <FormItem label="企业名称" prop="vendorName">
                        <Input v-model="formValidate_two.vendorName" placeholder="请输入企业名称"></Input>
                    </FormItem>
                    <FormItem label="统一社会信用代码" prop="registrationCode">
                        <Input v-model="formValidate_two.registrationCode" placeholder="请输入统一社会信用代码 "></Input>
                    </FormItem>
                    <FormItem prop="isAgree">
                        <div class="step_protocol">
                            <CheckboxGroup v-model="formValidate_two.isAgree">
                                <Checkbox label="我已经阅读并同意"></Checkbox>
                            </CheckboxGroup>
                            <span>《阳光协议》《测试协议》</span>
                        </div>
                    </FormItem>
                </Form>
                <div class="step_button">
                    <Button type="error" @click="submitForm('formValidate_two')">提交</Button>
                </div>
            </div>
            <div class="step_every" v-if="isStep == 3">
                <h2 class="step_topic">注册成功,即将返回登录页</h2>
                <div class="step_button">
                    <Button type="error" @click="$router.replace('/login')">返回首页</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { CSddeemnoss, checkCode, register } from '../../service/supplier/supplier';
export default {
    data() {
        let checkPhone = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("手机号不能为空"));
            } else {
                const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
                if (reg.test(value)) {
                    callback();
                } else {
                    return callback(new Error("请输入正确的手机号"));
                }
            }
        };
        let checkPass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                if (this.formValidate_two.rpassword !== "") {
                    this.$refs.formValidate_two.validateField("rpassword");
                }
                callback();
            }
        };
        let checkPass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.formValidate_two.password) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            current: 0,
            isStep: 1,
            isShowCode: true,
            reciprocal: 60,
            formValidate_one: {
                tel: "",
                code: ""
            },
            ruleValidate_one: {
                tel: [
                    {
                        required: true,
                        validator: checkPhone,
                        trigger: "blur"
                    }
                ],
                code: [
                    {
                        required: true,
                        message: "请输入短信验证码",
                        trigger: "blur"
                    }
                ]
            },
            formValidate_two: {
                userName: "",
                loginName: "",
                password: "",
                rpassword: "",
                vendorName: "",
                registrationCode: "",
                isAgree: []
            },
            ruleValidate_two: {
                userName: [
                    {
                        required: true,
                        message: "请输入联系人姓名",
                        trigger: "blur"
                    }
                ],
                loginName: [
                    {
                        required: true,
                        message: "请输入登录名",
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        validator: checkPass,
                        trigger: "blur"
                    }
                ],
                rpassword: [
                    {
                        required: true,
                        validator: checkPass2,
                        trigger: "blur"
                    }
                ],
                vendorName: [
                    {
                        required: true,
                        message: "请输入企业名称",
                        trigger: "blur"
                    }
                ],
                registrationCode: [
                    {
                        required: true,
                        message: "请输入统一社会信用代码",
                        trigger: "blur"
                    }
                ],
                isAgree: [
                    {
                        required: true,
                        type: "array",
                        min: 1,
                        message: "请勾选同意协议",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    methods: {
        getCode() {
            if (this.formValidate_one.tel == '') {
                this.$Message.success('请输入手机号码')
                return false
            }
            CSddeemnoss({
                tel: this.formValidate_one.tel
            }
                , res => {
                    if (res.msg == 'success') {
                        this.$Message.success(res.errmsg || '发送成功');
                        this.isShowCode = false
                        let time = null
                        time = setInterval(() => {
                            if (this.reciprocal > 0) {
                                this.reciprocal--
                            } else {
                                clearInterval(time);
                                time = null
                                this.isShowCode = true
                                this.reciprocal = 50
                            }
                        }, 1000)
                    } else {
                        this.$Message.error(res.errmsg || '发送失败,请稍后重试');
                    }
                })
        },
        next(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    checkCode(this.formValidate_one, res => {
                        if (res.code == '0') {
                            this.current = 1;
                            this.isStep = 2;
                        } else {
                            this.$Message.error(res.errmsg || '验证码错误,请稍后重试');
                        }
                    })
                }
            });
        },
        submitForm(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    let form = {
                        poVendorDesc: { registrationCode: this.formValidate_two.registrationCode },
                        poVendorUser: {
                            userTel: this.formValidate_one.tel,
                            userName: this.formValidate_two.userName,
                            loginName: this.formValidate_two.loginName,
                            password: this.formValidate_two.password,
                        },
                        vendorName: this.formValidate_two.vendorName
                    }
                    register(form, res => {
                        if (res.code == '0') {
                            this.current = 2;
                            this.isStep = 3;
                            setTimeout(() => {
                                this.$router.replace('/login')
                            }, 5000);
                        } else {
                            this.$Message.error(res.msg);
                        }
                    })
                }
            });
        }
    }
};
</script>

<style scoped lang="less">
.supplier_settled {
    width: 1200px;
    margin: auto;
    height: 100%;
    padding: 15px;
    background-color: #ffffff;
    .ivu-form-item {
        margin-bottom: 24px;
    }
    .title {
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
    .content {
        padding: 20px;
        .step {
            width: 700px;
            margin: 50px auto;
        }
        .step_every {
            width: 800px;
            margin: auto;
            padding-right: 100px;
            .step_title {
                position: relative;
                left: -60px;
                margin-bottom: 24px;
            }
            .step_button {
                margin: auto;
                display: flex;
                justify-content: center;
            }
            .step_SMcode {
                width: 82%;
            }
            .step_time {
                width: 17%;
            }
            .step_protocol {
                display: flex;
                span {
                    font-size: 14px;
                    color: rgba(86, 159, 224, 1);
                    cursor: pointer;
                }
            }
            .step_topic {
                text-align: center;
                margin-bottom: 24px;
            }
        }
    }
}
</style>
