<template>
    <div>
        <Row>
            <Col span="24">
            <div class="u-title">
                <h3>
                    <Icon type="ios-circle-outline"></Icon> 账号中心
                </h3>
            </div>
            </Col>
        </Row>
        <Row>
            <Col span="24">
            <div class="flex center align column">
                <single-select-img :img="accountInfo.logo" @updateImgList="(val) => {accountInfo.logo = val.url}" :maxSize="1024" :width="100" :height="100"></single-select-img>
                <div class="font14 customPop">
                    <Poptip trigger="hover" title="" placement="bottom" content="该Logo将显示在企管后台，以及作为企业动态中公司的头像">
                        <span class="blue">点击图片修改</span>
                        <Icon type="ios-help" size='18' color='#f90' class='cursor'></Icon>
                    </Poptip>
                </div>
            </div>
            <div class="flex center align">
                <p class="aTle">企业简称</p>
                <div class="flex_main bb align">
                    <div class="height flex align font14 c666">
                        <div class="flex_main">
                            {{accountInfo.company_shortname}}
                        </div>
                        <div class="font14 blue customPop">
                            <a href="javascript:;" @click='showCompay'>修改</a>
                            <Poptip trigger="hover" title="" placement="bottom-end" content="企业简称将显示在企业动态、后台名称、AI名片姓名下">
                                <Icon type="ios-help" size='18' color='#f90' class='cursor'></Icon>
                            </Poptip>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex center align">
                <p class="aTle">企业名称</p>
                <div class="flex_main bb align">
                    <div class="height flex align font14 c666">
                        <div class="flex_main">
                            {{accountInfo.company}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex center align">
                <p class="aTle">名片数量</p>
                <div class="flex_main bb align">
                    <div class="height flex align font14 c666">
                        <div class="flex_main">
                            {{accountInfo.visitingCard_opened}}/{{accountInfo.visitingCard_max}}
                        </div>
                        <div class="font14 blue customPop">
                            <Poptip trigger="hover" title="" placement="bottom-end" content="数值为“已开通数/最大开通数”，若需要增加最大开通数，请联系你的代理商">
                                <Icon type="ios-help" size='18' color='#f90' class='cursor'></Icon>
                            </Poptip>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex center align">
                <p class="aTle">到期时间</p>
                <div class="flex_main bb align">
                    <div class="height flex align font14 c666">
                        <div class="flex_main">
                            {{accountInfo.expire_days}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex center align">
                <p class="aTle">公司地址</p>
                <div class="flex_main bb align">
                    <div class="height flex align font14 c666">
                        <div class="flex_main">
                            {{accountInfo.address}}
                        </div>
                        <div class="font14 blue">
                            <a href="javascript:;" @click='showAddress'>修改</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex center align">
                <p class="aTle">手机号（登录账号）</p>
                <div class="flex_main bb align">
                    <div class="height flex align font14 c666">
                        <div class="flex_main">
                            {{accountInfo.user_mobile}}
                        </div>
                        <div class="font14 blue customPop">
                            <a href="javascript:;" @click='showMobile'>修改</a>
                            <Poptip trigger="hover" title="" placement="bottom-end" content="该手机同时作为本账号的登录账号，成功修改后登录账号也将被修改">
                                <Icon type="ios-help" size='18' color='#f90' class='cursor'></Icon>
                            </Poptip>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex center align mb50">
                <p class="aTle">登录密码</p>
                <div class="flex_main bb align">
                    <div class="height flex align font14 c666">
                        <div class="flex_main">
                        </div>
                        <div class="font14 blue">
                            <a href="javascript:;" @click='showPass'>修改</a>
                        </div>
                    </div>
                </div>
            </div>
            </Col>
        </Row>

        <!--修改企业简称-->
        <Modal v-model="modalCompany" :width="500" title="修改企业简称" @on-ok="editCompany" @on-cancel='cancelCompany'>
            <div class="modBox">
                <div class="mb20 flex align center">
                    <p class="mr20">企业简称</p>
                    <Input v-model="accountInfo.company_shortname" placeholder="输入企业简称" style="width: 350px"></Input>
                </div>
            </div>
        </Modal>

        <!--修改地址-->
        <Modal v-model="modalAddress" :width="500" title="修改地址" @on-ok="editAddress" @on-cancel='cancelAddress'>
            <div class="modBox">
                <div class="mb20 flex align center">
                    <p class="mr20">公司地址</p>
                    <Input v-model="accountInfo.address" placeholder="输入公司地址" style="width: 350px"></Input>
                </div>
            </div>
        </Modal>

        <!--修改手机号-->
        <Modal v-model="modalMobile" :width="500" title="修改手机号" @on-cancel='cancel'>
            <div class="modBox" v-if='modifyStep === 1'>
                <p class="font14 c666 mb15">手机号修改需要进行身份验证,请根据指示完成验证</p>
                <div class="mb20 flex align center">
                    <p class="mr20">图形验证码</p>
                    <Input v-model="imgCode" placeholder="输入验证码" style="width: 200px;margin-right:16px"></Input>
                    <img :src="captcha_src" alt="验证码" class="captcha-img" @click="changeCaptcha">
                </div>
                <div class="mb20 flex align center">
                    <p class="mr20">短信验证码</p>
                    <Input v-model="code" placeholder="输入验证码" style="width: 270px"></Input>
                    <Button v-show="show" type="ghost" class='ml10' @click="getCode(5)">获取</Button>
                    <Button v-show="!show" type="ghost" class='ml10'>{{count}}秒</Button>
                </div>
                <p v-if='reSend === true' class="codeBox">验证码已发送到<span class="blue">{{accountInfo.user_mobile}}</span>中，请查收</p>
            </div>
            <div class="modBox" v-if='modifyStep === 2'>
                <div class="mb20 flex align center">
                    <p class="mr20">图形验证码</p>
                    <Input v-model="imgCode" placeholder="输入验证码" style="width: 200px;margin-right:16px"></Input>
                    <img :src="captcha_src" alt="验证码" class="captcha-img" @click="changeCaptcha">
                </div>
                <div class="mb20 flex align">
                    <p class="mr20">新手机号码</p>
                    <Input v-model="accountInfo.user_mobile" placeholder="输入手机号" style="width: 270px"></Input>
                    <Button v-show="show" type="ghost" class='ml10' @click="getCode(2)">获取</Button>
                    <Button v-show="!show" type="ghost" class='ml10'>{{count}}秒</Button>
                </div>
                <div class="mb20 flex align">
                    <p class="mr20">验证码</p>
                    <Input v-model="code" placeholder="输入验证码" style="width: 337px;margin-left: 27px;"></Input>
                </div>
            </div>
            <div slot="footer">
                <Button type="text" @click="cancel">取消</Button>
                <Button v-if='modifyStep === 1' type="primary" @click="next">下一步</Button>
                <Button v-if='modifyStep === 2' type="primary" @click="editMobile">完成</Button>
            </div>
        </Modal>

        <!--修改密码-->
        <Modal v-model="modalPass" :width="500" title="修改密码" @on-ok="editPass">
            <div class="modBox">
                <div class="mb20 flex align">
                    <p class="mr20 w100">旧密码</p>
                    <Input v-model="oldpassword" type='password' placeholder="输入旧密码" style="width: 300px"></Input>
                </div>
                <div class="mb20 flex align">
                    <p class="mr20 w100">新密码</p>
                    <Input v-model="password" type='password' placeholder="输入新密码" style="width: 300px"></Input>
                </div>
                <div class="mb20 flex align">
                    <p class="mr20 w100">确认密码</p>
                    <Input v-model="confirmpassword" type='password' placeholder="确认密码" style="width: 300px"></Input>
                </div>
            </div>
        </Modal>

    </div>
</template>
<script>
import { editMerchant, sendVerfity, verfityMobile, adminMobile, modifyPass } from '../../service/account/account'
import singleSelectImg from '../common/singleSelectImg'
import { baseUrl } from '../../service/config/env'
export default {
    components: {
        singleSelectImg
    },
    data() {
        return {
            accountInfo: {
                logo: '',
                company_shortname: '',
                company: '',
                visitingCard_opened: '',
                visitingCard_max: '',
                expire_days: '',
                address: '',
                user_mobile: ''
            },
            oldpassword: '',
            password: '',
            confirmpassword: '',
            code: '',
            modalCompany: false,
            modalAddress: false,
            modalMobile: false,
            modalPass: false,
            modifyStep: 1,
            reSend: false,
            captcha_src: baseUrl + '/captcha?' + Math.random(),
            imgCode: '',
            show: true,
            count: '',
            timer: null,
            originalMobile: '',
            originalName: '',
            originalAddress: ''
        }
    },
    created() {
        this.getMerchant()
        this.getAuthCode()
    },
    methods: {
        getAuthCode() {
            this.captcha_src = baseUrl + '/captcha?' + Math.random()
        },
        changeCaptcha() {
            this.captcha_src = baseUrl + '/captcha?' + Math.random()
        },
        getMerchant() {
            this.accountInfo = this.$store.state.GLOBAL
            if (this.accountInfo.logo === '') {
                this.accountInfo.logo = '2018/6/5/dQZ6ApgXMdqeVYko01mvaiQPiUAk.png'
            }
            this.originalMobile = this.$store.state.GLOBAL.user_mobile
            this.originalName = this.$store.state.GLOBAL.company_shortname
            this.originalAddress = this.$store.state.GLOBAL.address
        },
        showCompay() {
            this.modalCompany = true
        },
        editCompany() {
            editMerchant({
                company_shortname: this.accountInfo.company_shortname
            }, (res) => {
                if (res.errcode === 0) {
                    this.getMerchant()
                    this.$Message.success(res.errmsg)
                } else {
                    this.$Message.error(res.errmsg)
                }
            })
        },
        cancelCompany() {
            this.accountInfo.company_shortname = this.originalName
        },
        showAddress() {
            this.modalAddress = true
        },
        editAddress() {
            editMerchant({
                address: this.accountInfo.address
            }, (res) => {
                if (res.errcode === 0) {
                    this.getMerchant()
                    this.$Message.success(res.errmsg)
                } else {
                    this.$Message.error(res.errmsg)
                }
            })
        },
        cancelAddress() {
            this.accountInfo.address = this.originalAddress
        },
        showMobile() {
            this.modalMobile = true
            this.changeCaptcha()
        },
        getCode(type) {
            var parmas;
            var check = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (this.imgCode === '') {
                this.$Message.success('请输入图形验证码')
                return false
            }
            if (this.accountInfo.user_mobile === '') {
                this.$Message.success('请输入新的手机号码')
                return false
            }
            if (!check.test(this.accountInfo.user_mobile)) {
                this.$Message.error('请填写正确的绑定微信手机号')
                return false
            }
            if (type === 5) {
                parmas = {
                    type: type,
                    captcha: this.imgCode
                }
            } else if (type === 2) {
                parmas = {
                    type: type,
                    captcha: this.imgCode,
                    mobile: this.accountInfo.user_mobile
                }
            }
            sendVerfity(parmas, (res) => {
                if (res.errcode === 0) {
                    this.reSend = true
                    this.$Message.success(res.errmsg)
                } else {
                    this.$Message.error(res.errmsg)
                }
            })
            const TIME_COUNT = 60;
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--;
                    } else {
                        this.show = true;
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 1000)
            }
        },
        next() {
            this.imgCode = ''
            verfityMobile({
                type: 5,
                old_code: this.code
            }, (res) => {
                if (res.errcode === 0) {
                    this.modifyStep = 2
                    this.code = ''
                    this.accountInfo.user_mobile = ''
                    this.show = true;
                    clearInterval(this.timer);
                    this.changeCaptcha()
                    this.$Message.success(res.errmsg)
                } else {
                    this.$Message.error(res.errmsg)
                }
            })
        },
        cancel() {
            this.modalMobile = false
            this.modifyStep = 1
            this.code = ''
            this.show = true;
            this.imgCode = '';
            this.reSend = false
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
            this.accountInfo.user_mobile = this.originalMobile
        },
        editMobile() {
            var parmas = {
                type: 2,
                code: this.code,
                mobile: this.accountInfo.user_mobile
            }
            adminMobile(parmas, (res) => {
                if (res.errcode === 0) {
                    this.modalMobile = false
                    this.modifyStep = 1
                    this.code = ''
                    this.show = true;
                    this.imgCode = '';
                    this.$Message.success(res.errmsg)
                    this.changeCaptcha()
                } else {
                    this.$Message.error(res.errmsg)
                    this.accountInfo.user_mobile = this.originalMobile
                }
            })
        },
        showPass() {
            this.modalPass = true
        },
        editPass() {
            var parmas = {
                oldpassword: this.oldpassword,
                password: this.password,
                confirmpassword: this.confirmpassword
            }
            if (this.oldpassword === '') {
                this.$Message.success('请输入原登录密码')
                return false
            }
            if (this.password === '') {
                this.$Message.success('请输入新登录密码')
                return false
            }
            if (this.confirmpassword === '') {
                this.$Message.success('请输入确认新密码')
                return false
            }
            if (this.password !== this.confirmpassword) {
                this.$Message.success('新登录密码和确认新密码不一致')
                return false
            }
            modifyPass(parmas, (res) => {
                if (res.errcode === 0) {
                    this.modalMobile = false
                    this.oldpassword = ''
                    this.password = ''
                    this.confirmpassword = ''
                    this.$Message.success(res.errmsg)
                } else {
                    this.$Message.error(res.errmsg)
                }
            })
        }
    },
    watch: {
        'accountInfo.logo': {
            handler(newValue, oldValue) {
                if (oldValue === '') {
                    return false
                } else {
                    if (newValue !== oldValue) {
                        editMerchant({
                            logo: newValue
                        }, (res) => {
                            if (res.errcode === 0) {
                                this.getMerchant()
                                this.$Message.success(res.errmsg)
                            } else {
                                this.$Message.error(res.errmsg)
                            }
                        })
                    }
                }
            },
            deep: true
        }
    }
}
</script>
<style scoped>
.captcha-img {
    width: 120px;
    height: 32px;
}
.cursor {
    cursor: pointer;
}
.hide {
    color: #f00;
}
.aTle {
    width: 150px;
    font-size: 14px;
    color: #666;
}
.bb {
    border-bottom: 1px solid #ddd;
}
.height {
    height: 80px;
}
.mb15 {
    margin-bottom: 15px;
}
.ml10 {
    margin-left: 10px;
}
.mb50 {
    margin-bottom: 50px;
}
.w100 {
    width: 80px;
}
.codeBox {
    padding: 10px;
    background: #eee;
    font-size: 14px;
}
.tle {
    font-size: 16px;
    font-weight: normal;
}
.workBox {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px;
    height: 200px;
    justify-content: center;
    width: 300px;
    align-items: center;
    flex-direction: column;
    font-size: 16px;
    line-height: 20px;
}
.workBox p {
    margin-bottom: 30px;
    color: #999;
}
.workBox b {
    color: #333;
}
.codeImg {
    width: 180px;
    height: 180px;
    display: block;
    margin: 0 auto;
    margin-bottom: 20px;
}
.code {
    position: relative;
    font-size: 14px;
    display: inline-block;
    margin-left: 20px;
    line-height: 20px;
    cursor: pointer;
}
.code > div {
    display: none;
}
.code:hover > div {
    display: block;
    position: absolute;
    top: 25px;
    left: 0;
    z-index: 1;
    text-align: center;
    width: 180px;
    padding: 15px;
    background: #fff;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}
.code > div p {
    line-height: 30px;
    color: #666;
}
.code > div img {
    width: 120px;
    height: 120px;
}
.flex {
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
}
.flex_line {
    display: -webkit-inline-flex;
    display: -moz-inline-flex;
    display: -ms-inline-flex;
    display: -o-inline-flex;
    display: inline-flex;
}
.flex_main {
    flex: 1;
}
.column {
    flex-direction: column;
}
.blue {
    color: #2d8cf0;
}
.w80 {
    width: 80px;
}
.align {
    align-items: center;
}
.fr {
    float: right;
}
.fl {
    float: left;
}
.ml20 {
    margin-left: 20px;
}
.mb20 {
    margin-bottom: 20px;
}
.ml30 {
    margin-left: 30px;
}
.mr30 {
    margin-right: 30px;
}
.mt30 {
    margin-top: 30px;
}
.mr20 {
    margin-right: 20px;
}
.mr15 {
    margin-right: 15px;
}
.mr5 {
    margin-right: 5px;
}
.font16 {
    font-size: 16px;
}
.font14 {
    font-size: 14px;
}
.c666 {
    color: #666;
}
.inner-header {
    margin-bottom: 20px;
}
.showFuc .frameFuc {
    display: none;
}
.showFuc:hover .frameFuc {
    position: absolute;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    top: 15px;
    right: 5px;
    z-index: 10;
}
.mr10 {
    margin-right: 10px;
}
.mr5 {
    margin-right: 5px;
}
.menuWd {
    display: inline-block;
    max-width: 130px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.u-table {
    margin: 10px 0;
}
.u-page {
    text-align: right;
}
.modBox {
    padding: 20px;
    font-size: 14px;
    color: #666;
}
.orange {
    color: #f90;
}
.importBox {
    height: 70px;
    background: #fffbe3;
    margin-bottom: 20px;
}
.importBox p {
    color: #f60;
    font-size: 14px;
    padding-left: 20px;
}
.uploadBox {
    padding: 100px 0;
}
.center {
    justify-content: center;
}
</style>