<template>
    <div class='login-container'>
        <div class='main-content-wrapper'>
            <div class='login-mainbox'>
                <div class='login-left'>
                    <img src='https://s.dodoca.com/aicard_mch/images/login-img-2.png' alt />
                </div>
                <div class='login-wrap'>
                    <div class='login-header-text'>
                        <h1 class='login-logo'>数字化采购平台</h1>
                    </div>
                    <Form ref='formCustom' :model='formCustom' label-position='right' :rules='ruleCustom'>
                        <Form-item prop='username' class='input-box'>
                            <Input type='text' v-model='formCustom.username' placeholder='用户名' class='login-input'></Input>
                        </Form-item>
                        <Form-item prop='password' class='input-box'>
                            <Input type='password' v-model='formCustom.password' placeholder='登录密码' class='login-input'></Input>
                        </Form-item>
                        <div class='btnbox' style="x">
                            <Button type='primary' @click="handleSubmit('formCustom','SH')" long class='login-btn'>商户登录</Button>
                            <Button type='success' @click="handleSubmit('formCustom','00')" long class='login-btn' style="margin-left: 20px">供应商登录</Button>
                        </div>
                        <div class="tip" @click="$router.push({path:'/supplier_settled'})">供应商入驻</div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { login } from '../../service/auth/login';
import store from '../../store/index';

export default {
    data() {
        return {
            formCustom: {
                username: '',
                password: '',
            },
            ruleCustom: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入登录密码', trigger: 'blur' }
                ],
            }
        };
    },
    mounted() {

    },
    methods: {
        handleSubmit(name, client_type) {
            let params = {
                client_id: 'sino-mall',
                client_secret: '123456',
                client_type: client_type,
                grant_type: 'password',
                username: this.formCustom.username,
                password: this.formCustom.password
            }
            // this.$refs[name].validate(valid => {
                // if (valid) {
                    login(params, res => {
                        if (res.code == 0) {
                            this.$Message.success(res.errmsg || '登录成功');
                            store.dispatch('setGlobal', res.data)
                            window.localStorage.setItem('store', JSON.stringify(res.data))
                            // console.log()
                            if (client_type == 'SH') {
                                this.$router.push({ name: 'home' });
                            } else {
                                this.$router.push({ name: 'index', params: { login: true } });
                            }
                        } else {
                            // this.changeCaptcha()
                            this.$Message.error(res.msg || '登录失败,请重新登录');
                        }
                    } );
                // }
            // });
        },

    }
};
</script>
<style scoped>
.login-container {
    position: absolute;
    width: 100%;
    min-width: 1200px;
    height: 100%;
    background: url("https://s.dodoca.com/aicard_mch/images/login-bg-2.jpg")
        no-repeat center center;
    background-size: 100% 100%;
    overflow-x: hidden;
    overflow-y: scroll;
}
.login-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 71px;
}
.login-header .login-logo {
    float: left;
    width: 130px;
    height: 51px;
    /*background-image: url('http://img01.mall.cmbchina.com/images/CM/P430/S24-I07-0CK_01.jpg');*/
    /*background:url('https://s.dodoca.com/aicard_mch/images/login-logo.png') no-repeat center center;*/
    background-size: 100% 100%;
    margin: 15px 0 0 31px;
}
.link-groups {
    width: 873px;
    height: 50px;
    /*background-color: red;*/
    margin-top: 10px;
    /*position: absolute;*/
    /*margin-left: -437px;*/
    /*left: 50%;
    bottom: 0;*/
}

.link-groups .other {
    width: 310px;
    height: 50px;
    background-color: #efeeeb;
    line-height: 50px;
    float: right;
}
.link-groups .other a {
    width: 98px;
    display: inline-block;
    text-align: center;
    font-size: 16px;
    color: #373232;
}
.link-groups .link-item img {
    width: 184px;
    height: 50px;
}
.main-content-wrapper {
    width: 873px;
    position: absolute;
    left: 50%;
    height: auto;
    top: 18%;
    margin-left: -437px;
    z-index: 9999;
}
.login-mainbox {
    width: 873px;
    height: 482px;
    /*overflow: hidden;*/
    /*position: absolute;*/
    /*left: 50%;
    top: 18%;*/
    /*margin-left: -437px;*/
    background-color: rgba(255, 255, 255, 0.5);
}
.login-left {
    float: left;
    width: 507px;
    height: 482px;
}
.login-left img {
    margin-left: 32px;
    margin-top: 45px;
}
.login-wrap {
    float: right;
    padding: 20px 0;
    width: 366px;
    height: 482px;
    z-index: 9;
    background-color: rgba(255, 255, 255, 255.5);
}
.login-wrap .login-header-text {
    margin-top: 23px;
    margin-bottom: 38px;
}
.login-wrap .login-logo {
    /* width: 157px; */
    height: 42px;
    margin-left: 104px;
    /*background:url('https://s.dodoca.com/aicard_mch/images/logo-applet-2.png') no-repeat center center;*/
    background-size: 100% 100%;
}
.login-wrap .input-box {
    padding: 20px 40px 0 42px;
}
.login-wrap .input-box-1 {
    padding: 0 40px 0 42px;
    margin-bottom: 10px;
}
.login-wrap .login-input {
    background-color: #fff;
    border-radius: 2px;
}
.login-wrap .captcha-img {
    width: 88px;
    margin: -6px -7px;
    height: 30px;
    border: none;
    border-radius: 0 0 2px 2px;
}
.login-wrap .login-auto {
    color: #666;
}
.login-wrap .login-btn {
    /* padding: 10px 15px; */
    font-size: 14px;
    font-weight: bold;
    border-radius: 2px;
    margin-top: 100px;
}
.login-wrap .login-btn:hover {
    background-color: #3698ee;
    border-color: #3698ee;
}
.login-footer {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 99;
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    padding-bottom: 14px;
}
.btnbox {
    width: 366px;
    display: flex;
    padding: 0 40px 0 42px;
    justify-content: center;
}
.tip {
    margin: 20px 0 0 42px;
    width: 60px;
    cursor: pointer;
}
.tip:hover {
    text-decoration: underline;
    color: #3698ee;
}
</style>
