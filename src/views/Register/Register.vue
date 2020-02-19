<template>
  <div class="register-box">
    <div>
        <div class="logo-header">
            <img src="../../assets/images/ry_logo@2x.png" alt="">
            <h4 class="title">征信不良 融溢帮忙</h4>
        </div>
        <div class="user-info">
            <div class="user-name border-input">
                <input 
                    type="tel" 
                    placeholder="请输入手机号码" 
                    v-model="phoneNumber"
                    @blur="onBlur"
                />
            </div>
            <div class="user-number border-input">
                <input 
                    type="tel" 
                    placeholder="请输入6位验证码"
                    v-model="indtyCode"
                    ref="indtyCode"
                    @blur="onBlur"
                />
                <span
                    class="getcode" 
                    :disabled="disabled"
                    @click.stop="getCode"
                >
                    <van-icon 
                        v-show="reget"
                        name="replay" 
                        color="#ff6f00"
                        size="16"
                    />
                    <van-loading
                        v-show="codeLoad" 
                        size="16px" 
                        color="#ff6f00" 
                        class="van-load"
                    />
                    <b v-html="btnTitle"></b>
                </span>
            </div>
            <p class="register-tips">若您未注册，验证后自动注册并登陆</p>
            <div class="register-agree">
                <van-checkbox 
                    class="register-checkbox"
                    v-model="checked" 
                    checked-color="#ff4300"
                    shape="square"
                    icon-size="15px"
                    :label-disabled="true"
                >
                    <span class="login-agree" @click="onCheck">登录即同意</span>
                    <span class="register-span" @click="onReAgree">《用户注册协议》</span>
                    <span class="register-span register-icon" @click="onReProtocol">《用户隐私保护协议》</span>
                </van-checkbox>
            </div>
        </div>
        <div class="register-login">
            <ry-button
                    btn-title="登录"
                    :loading="loading"
                    @touchbefore="btnTouchBefore"
                    @touchafter="onLogin"
                />
        </div>
    </div>
  </div>
</template>

<script>
import { Checkbox, Icon } from 'vant'
import { validatePhone } from '@/libs/validate'
import mixins from '@/libs/mixins'
import qs from 'qs'
import { mapState } from 'vuex'
import {
  USER_GETVALIDATECODE,
  USER_VALIDATESMSCODE,
  USER_REGISTE,
  USER_LOGIN,
  USER_USERWXINFO
} from '@/actions/user'

export default {
    name: 'ry-register',

    mixins: [mixins],

    components: {
        [Checkbox.name]: Checkbox,
        [Icon.name]: Icon
    },

    data() {
        return {
            checked: false,
            disabled: false,
            btnShow: false,
            codeLoad: false,
            reget: false,
            phoneNumber: '',
            indtyCode: '', // 验证码
            smsCode: '',
            btnTitle: '获取验证码',
            timer: null
        }
    },

    computed: {
        isClick() {
            let resultData = {}
            if(!this.phoneNumber || !this.indtyCode) {
                resultData = {
                    isClick: false,
                    message: '手机号或验证码不能为空'
                }
                return resultData
            } else if (!this.checked) {
                resultData = {
                    isClick: false,
                    message: '请同意用户注册、隐私保护协议'
                }
                return resultData
            } else {
                resultData = {
                    isClick: true,
                    message: ''
                }
                return resultData
            }
        },

        ...mapState({
            userWxInfo: state => state.user.userWxInfo,
            showNetwork: 'showNetwork'
        })
    },

    created() {
        this.showDiaLog() // 是否显示完善信息弹窗
    },

    methods: {
        onCheck() {
            this.checked = !this.checked
        },

        async getCode() {
            const { success, message } = validatePhone(this.phoneNumber)
            if (!success) {
                this.$toast({
                    message,
                    duration: 3000,
                    position: 'bottom'
                })
            } else {
                if (this.btnTitle == '获取验证码' || this.btnTitle == '重新获取') {
                    this.codeLoad = true
                    this.reget = false
                    this.indtyCode = ''
                    const content = `验证码已发送至 ${this.phoneNumber.substr(0, 3)}****${this.phoneNumber.substr(7, 4)}`
                    const response = await this.$store.dispatch(USER_GETVALIDATECODE({tel: this.phoneNumber}))
                    if (response.data.success) {
                        this.smsCode = response.data.data.smsCode
                        
                        this.$notify({
                            message: content,
                            color: '#fff',
                            background: 'rgba(0,0,0,.7)'
                        })
            
                        this.$refs.indtyCode.focus()
                        this.validateBtn()
                    } else {
                        this.codeLoad = false
                        if (this.btnTtile == '重新获取') this.reget = true
                    }
                } else {
                    return
                }
            }
        },

        validateBtn(){
            this.codeLoad = false
            //倒计时
            let time = 120
            this.timer = setInterval(() => {
                if(time == 0) {
                    clearInterval(this.timer)
                    this.disabled = false
                    this.reget = true
                    this.btnTitle = `重新获取`
                } else {
                    this.btnTitle =`<i>${time}</i>秒后重试`
                    this.disabled = true
                    this.reget = false
                    time--
                }
            },1000)
        },

        async onLogin() {
           const { isClick, message } = this.isClick()

           if (!isClick) {
               this.$toast({
                   message,
                   duration: 3000,
                   position: 'bottom'
               })
               return
           }
            if (this.loading) return

            this.loading = true
            
            const response = await this.$store.dispatch(USER_VALIDATESMSCODE({
                smsCode: this.smsCode, 
                validCode: this.indtyCode
            }))

            if (response.data && response.data.success) {
                this.submit()
            } else {
                this.loading = false
            }
        },

        // 提交
        async submit() {
            if (!this.userWxInfo.openId) return this.getUserInfo()
            const response = await this.$store.dispatch(USER_REGISTE({
                tel: this.phoneNumber,
                nickName: this.userWxInfo.nickname,
                wxOpen: this.userWxInfo.openId,
                headImage: this.userWxInfo.headImgUrl
            }));
            if (response.data.success) {
                this.login() // 登录
            } else {
                this.loading = false
            }
        },

        async login() {
            const response = await this.$store.dispatch(USER_LOGIN({
                username: this.phoneNumber
            }));
            if (response.data.success) {
                const { isCert } = response.data.data
                this.loading = false
                if (!isCert) {
                    this.$store.dispatch('showDiaLog', true) // 显示完善信息
                } else {
                    this.$store.dispatch('showDiaLog', false)
                    this.$router.push('/')
                }
            } 
            
        },

        // 获取微信code
        async getUserInfo() {
            const search = qs.parse(location.search.split('?')[1]);
            if (search.code) this.$store.dispatch(USER_USERWXINFO({code: search.code}))
        },

        onReAgree() {
            this.$router.push('/reagree')
        },

        onReProtocol() {
            this.$router.push('/reprotocol')
        },
    }
}
</script>

<style lang="stylus">
.register-box {
    background #F5F5F5
    .logo-header {
        display flex
        justify-content center
        align-items center
        flex-direction column
        padding 198px 0 86px
        img {
            display block
            width 150px
        }
    }
    .title {
        padding-top 50px
        line-height 36px
        text-align center
        font-size 32px
        color #b8b8b8
    }
    .user-info {
        padding 0 70px
        .border-input {
            border-bottom 2px solid #ddd
        }
        input {
            display block
            width 100%
            padding 6*2px 0
            font-size 16*2px
            line-height 23*2px
            color #666
            caret-color #ff8324
            background none
            &::-webkit-input-placeholder {
                font-size 28px
                color #b4b4b4
            }
        }
        .user-number {
            position: relative
            margin-top 37*2px
            .getcode {
                display flex
                align-items center
                position absolute
                right 0
                bottom 6*2px
                padding 5*2px 8*2px
                line-height 30px
                font-size 12*2px
                color #b5b5b5
                background none
                border 1px solid #dcdcdc
                border-radius 20*2px
                .van-load {
                    margin-right 6px
                }
                &:active {
                    border-color #ff6f00
                    color #ff6f00
                }
                b {
                    font-weight 100
                    i {
                        font-style normal
                        color #ff6f00
                        margin-right 6px
                        font-size 28px
                    }
                }
            }
        }
        .register-tips {
            padding 10*2px 0 15*2px
            color #292929
            font-size 12*2px
        }
        .register-agree {
        .register-checkbox {
            display flex
            justify-content center
            font-size 12*2px
            color #707070
            line-height 23*2px
            .register-span {
                color #FF4400
                .register-icon {
                    position relative
                    display inline
                    font-style normal
                    left -10px
                }
            }
            .van-icon {
                border-radius 4px
            }
        }
    }
    }
    .register-login {
        margin 0 76px
        padding-top 60*2px
        text-align center
        .login-button {
            display inline-block
            width 290*2px
            height 42*2px
            line-height 42*2px
            font-size 18*2px
            color #fff
            background: linear-gradient(left, #ff6f00, #ff3d00)
            border-radius 42*2px
        }
    }
}
</style>