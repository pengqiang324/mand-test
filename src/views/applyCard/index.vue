<template>
  <div class="applyCard-box">
    <ry-scroll-view 
        :bounce="false"
    >
        <div class="applyCard-top"> 
            <h2>{{title}}申请信息</h2>
            <van-cell-group class="applyCard-cell">
                <van-field 
                    v-model="form.name"
                    placeholder="请输入申请人姓名"
                    clearable 
                    :readonly="readOnly"
                >
                    <span slot="label" class="name">姓<i></i>名</span>
                </van-field>
                <van-field 
                    v-model="form.card" 
                    placeholder="请输入申请人身份证"
                    clearable 
                    :error="errorCard"
                    :error-message="errorCardMessage"
                    :readonly="readOnly"
                    @input="onCardInput"
                >
                    <span slot="label" class="card">身<i>份</i>证</span>
                </van-field>
                <van-field 
                    v-model="form.tel" 
                    type="tel" 
                    placeholder="请输入申请人手机号"
                    :error-message="errorMessage" 
                    clearable 
                    :error="errorTel"
                    :readonly="readOnly"
                    @input="onInput"
                >
                    <span slot="label" class="card">手<i>机</i>号</span>
                </van-field>
                <van-field 
                    v-if="showTel ? true: false"
                    v-model="form.indenty"
                    ref="indenty" 
                    type="tel" 
                    label="手机验证码" 
                    placeholder="请输入验证码"
                    :error-message="errorIndentyMessage" 
                    @input="onIndentyInput"
                >
                    <span 
                        slot="button" 
                        @click="getCode"
                        class="indenty"
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
                </van-field>
                <van-field 
                    v-if="showIndenty"
                    v-model="form.inviteCode" 
                    type="Number" 
                    label="推荐邀请码" 
                    :readonly="true"
                />
            </van-cell-group>
            <p>个人信息将影响审核及收入现金，请确保信息真实有效</p>
        </div>
        <div class="applyCard-btn">
            <ry-button
                btn-title="提交"
                :loading="loading"
                @touchafter="confirm"
            />
        </div>
    </ry-scroll-view>
  </div>
</template>

<script>
import { Field, Icon } from 'vant'
import mixins from '@/libs/mixins'
import { validatePhone, idCard } from '@/libs/validate'
import { getApplyCardInfo, nologin, nameAndCardNoAuth, applyForOthers } from '@/api/applyCard/applyCard'
import { mapState } from 'vuex'
import { SEND_VALIDCODE } from '@/actions/applyCard'
import { USER_VALIDATESMSCODE } from '@/actions/user'

export default {
    name: 'ry-applyCard',

    mixins: [mixins],

    components: {
        [Field.name]: Field,
        [Icon.name]: Icon
    },

    data() {
        return {
            form: {
                name: '',
                card: '',
                tel: '',
                indenty: '',  // 验证码
                inviteCode: '333333'
            },
            title: '本人',
            btnTitle: '发送验证码',
            redirectUrl: '',  // 重定向新世界url
            errorMessage: '',
            errorIndentyMessage: '',
            errorCardMessage: '',
            smsCode: '',
            errorTel: false,
            errorCard: false,
            codeLoad: false,
            readOnly: false,
            showTel: false,
            reget: false
        }
    },

    computed: {
        ...mapState('applyCard', ['isGetInfo']),
        status() {
            const STATUS = JSON.parse(window.localStorage.getItem('userStatus')) || this.$store.state.shopOwner.status
            return STATUS
        }
    },

    created() {
        this.init()
        if (!this.isGetInfo) {
            // 在用户状态未改变时，只请求一次
            this.getTailInfo()
        } else {
            const INFODATA = JSON.parse(window.localStorage.getItem('applyInfo'))
            this.changeInfo(INFODATA)
        }
    },

    methods: {
        init() {
            const { readOnly, showTel, showIndenty, title } = this.$route.query
            if (readOnly !== undefined) {
                this.readOnly = JSON.parse(readOnly)
                this.showTel = JSON.parse(showTel)
                this.showIndenty = JSON.parse(showIndenty)
            }
            if (title) this.title = title
        },

        getTailInfo() {
            getApplyCardInfo()
            .then((res) => {
                const { success, data } = res.data
                if (success) {
                    this.$store.commit('applyCard/REFRESH_INFO_STATUS', true)
                    window.localStorage.setItem('applyInfo',JSON.stringify(data))
                    this.changeInfo(data)
                }
            })
        },

        async getCode() {
            const { success, message } = validatePhone(this.form.tel)
            if (!success) {
                if (message !== '手机号不能为空') this.errorTel = true
                this.errorMessage = message
            } else {
                if (this.btnTitle == '发送验证码'|| this.btnTitle == '重新发送') {
                    this.codeLoad = true
                    this.reget = false
                    this.indenty = ''

                    const content = `验证码已发送至 ${this.form.tel.substr(0, 3)}****${this.form.tel.substr(7, 4)}`
                    const response = await this.$store.dispatch(SEND_VALIDCODE({tel: this.form.tel}))
                    if (response.data.success) {
                        this.smsCode = response.data.data.smsCode
                        this.$notify({
                            message: content,
                            color: '#fff',
                            background: 'rgba(0,0,0,.7)'
                        })
                        this.validateBtn()
                        this.$refs.indenty.focus()
                    } else {
                        this.codeLoad = false
                        if (this.btnTtile == '重新发送') this.reget = true
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
            let timer = setInterval(() => {
                if(time == 0) {
                    clearInterval(timer)
                    this.reget = true
                    this.btnTitle = "重新发送"
                } else {
                    this.reget = false
                    this.btnTitle =`<i>${time}</i>秒后重试`
                    time--
                }
            },1000)
        },

        onInput(value) {
            if (!value) {
                this.errorTel = false
                this.errorMessage = ''
            }

            const { success } = validatePhone(value)
            if(success) {
                this.errorTel = false
                this.errorMessage = ''
            } else {
                if (this.errorMessage == '请输入正确的手机号') return
                if (value && this.errorMessage ) {
                    this.errorTel = false
                    this.errorMessage = ''
                    return
                }
            }
        },

        onIndentyInput(value) {
            if (value) {
                this.errorIndentyMessage = ''
            }
        },

        onCardInput(value) {
            if (!value) {
                this.errorCard = false
                this.errorCardMessage = ''
                return
            }
            const { success, message } = idCard(value)
            if (!success) {
                this.errorCard = true
                this.errorCardMessage = message
            } else {
                this.errorCard = false
                this.errorCardMessage = ''
            }
        },

        isClick() {
            let resultData = {}
            if (!this.form.name) {
                resultData = {
                    isClick: false,
                    message: '姓名不能为空'
                }
                return resultData
            } else if (!this.form.card) {
                resultData = {
                    isClick: false,
                    message: '身份证不能为空'
                }
                return resultData
            } else if(!this.form.tel) {
                resultData = {
                    isClick: false,
                    message: '手机号不能为空'
                }
                return resultData
            } else if(!this.form.indenty) {
                resultData = {
                    isClick: false,
                    message: '手机验证码不能为空'
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

        changeInfo(data) {
            if (!this.status) {
                // 普通用户
                this.form.name = data.name
                this.form.card = data.cardNo
                this.form.tel = data.tel
                this.form.inviteCode = data.reInviteCode // 上级邀请码
                delete this.form.indenty // 删除验证码字段
            } else {
                if (!this.showIndenty) {
                    // 店主状态 本人申请
                    this.form.name = data.name
                    this.form.card = data.cardNo
                    this.form.tel = data.tel
                    delete this.form.indenty // 删除验证码字段
                    delete this.form.inviteCode // 删除邀请码
                } else {
                    // 亲友申请
                    this.form.inviteCode = data.inviteCode //自身邀请码
                }
            }
        },

        NoLogin() {
            const applyCode = '782rfi'
            const ParamsData = JSON.parse(window.sessionStorage.getItem('paramsData'))

            nologin()
            .then((res) => {
                const { success, data } = res.data
                if (success) {
                    this.redirectUrl = data
                    window.location.href = `${this.redirectUrl}&bank_id=${ParamsData.bankId}&is_rec=${ParamsData.isRec}&apply_code=${applyCode}`
                } 
                this.loading = false
            })
        },

        // 提交
        async confirm() {
            if (this.showTel) { // 当亲友申请时才校验数据
                const { isClick, message } = this.isClick()
                if (!isClick) {
                    switch(message) {
                        case '姓名不能为空':
                            this.$toast({
                                message,
                                duration: 2000,
                                position: 'bottom'
                            })
                            break
                        case '身份证不能为空':
                            this.$toast({
                                message,
                                duration: 2000,
                                position: 'bottom'
                            })
                            break
                        case '手机号不能为空':
                            this.errorTel = true
                            this.errorMessage = message
                            break
                        default:
                            this.errorIndentyMessage = message
                    }
                    return
                }
                this.changeLoading()
                const res1 = await nameAndCardNoAuth({
                    cardNo: this.form.card,
                    name: this.form.name
                })
                if (res1.data && res1.data.success) {
                    const res2 = await this.$store.dispatch(USER_VALIDATESMSCODE({
                        smsCode: this.smsCode, 
                        validCode: this.form.indenty
                    }))
                    if (res2.data && res2.data.success) {
                        const res3 = await applyForOthers({
                            cardNo: this.form.card,
                            name: this.form.name,
                            tel: this.form.tel
                        })
                        if ( res3.data && res3.data.success ) {
                            this.NoLogin()
                        }
                    }  
                } 
                this.loading = false
            } else {
                // 本人申请
                this.changeLoading()
                this.NoLogin()
            }
        }
    }
}
</script>

<style lang="stylus">
.applyCard-box {
    background #f5f5f5
    .applyCard-top {
        margin 40px 0 120px
        background #fff
        h2 {
            padding 70px 0 50px
            font-size 36px
            height 36px
            line-height 36px
            text-align center
        }
        .applyCard-cell {
            padding 0 0 0 20px
            input {
                caret-color #FF8324
            }
        }
        p {
            padding 20px 0 90px
            height 24px
            line-height 24px
            text-align center
            font-size 24px
            color #f00
        }
    }
    .applyCard-btn {
        padding 0 90px
    }
    .name {
        i {
            display inline-block
            padding 0 42px
        }
    }
    .card {
        i {
            font-style normal
            padding 0 29px
        }
    }
    .indenty {
        display flex
        align-items center
        justify-content center
        padding 0 15px
        height 50px
        color #b5b5b5
        font-size 24px
        border 1px solid #dcdcdc
        border-radius 20*2px
        box-sizing border-box
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

</style>