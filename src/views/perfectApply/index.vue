<template>
  <div class="perfectApply-box">
        <!-- 完善申请人信息 start -->
        <ry-perfect
            :Loading="loading"
            @touchafter="touchafter"
        >
            <div class="perfectApply-form-list">
                <div class="perfectApply-form-div">
                    <span>申请人姓名：</span>
                    <p class="perfectApply-input"><input type="text" v-model="form.name" readonly/></p>
                </div>
                <div class="perfectApply-form-div">
                    <span>身份证号码：</span>
                    <p class="perfectApply-input"><input type="text" v-model="form.cardNo" readonly/></p>
                </div>
                <div class="perfectApply-form-div">
                    <span><i>手</i><i>机</i><i>号</i>码：</span>
                    <p class="perfectApply-input"><input type="text" v-model="form.tel" readonly/></p>
                </div>
                <div class="perfectApply-form-div">
                    <span>微<i>信</i>号：</span>
                    <p class="perfectApply-input"><input type="text" v-model="form.wxNo" @focus="showTips" @blur="hideTips"/></p>
                    <p class="perfectApply-brook" v-show="showtip">请填写本人真实微信号,以免影响售后服务</p>
                </div>
                <div class="perfectApply-form-div">
                    <span>邀<i>请</i>码：</span>
                    <p class="perfectApply-input"><input type="text" v-model="form.inviteCode" readonly/></p>
                </div>
            </div>
        </ry-perfect>
        <!-- 完善申请人信息 end -->
        <!-- 信息提交成功 start -->
        <van-overlay :show="showDialog">
            <div class="perfectApply-wrapper">
                <div class="perfectApply-block">
                    <h4><van-icon name="success" /></h4>
                    <h2>提交申请信息成功</h2>
                    <ry-button
                        btn-title="确认"
                        @touchafter="onConfirm"
                    />
                </div>
            </div>
        </van-overlay>
        <!-- 信息提交成功过 end -->
  </div>
</template>

<script>
import mixins from '@/libs/mixins'
import { weiXin } from '@/libs/validate'
import { Icon } from 'vant'
import RyPerfect from '@/components/PerfectInfo'
import { getEchOwnerInfo, updateInfo } from '@/api/perfectApply/perfectApply'

export default {
    name: 'ry-perfectApply',

    mixins: [mixins],

    components: {
        [Icon.name]: Icon,
        [RyPerfect.name]: RyPerfect
    },

    data() {
        return {
            showtip: false,
            form: {
                name: '彭元帅',
                cardNo: '431024199004102434',
                tel: '17773191626',
                wxNo: '',
                inviteCode: '999999'
            },
            message: '',
            showDialog: false
        }
    },

    created() {
        this.initData()
    },

    methods: {
        initData() {
            getEchOwnerInfo()
            .then((res) => {
                const { success, data } = res.data
                if (success) {
                    this.form = Object.assign(this.form, data)
                }
            })
        },

        showTips() {
            this.showtip = true
        },

        hideTips() {
            this.showtip = false
            this.onBlur()
        },
        // 提交完善信息
        touchafter() {
            if(!this.validateWeixin()) {
                this.$toast({
                    message: this.message,
                    position: 'bottom'
                })
                return
            }
            this.changeLoading()
            this.loading = true
            // 申请人信息修改
            updateInfo({
                wxNo: this.form.wxNo
            })
            .then((res) => {
                const { success } = res.data
                if (success) {
                    this.showDialog = true
                }
                this.loading = false
            })
        },
        // 验证微信
        validateWeixin() {
            if (this.form.wxNo == '') {
                this.message = '微信号不能为空'
                return false
            } else {
                const { success, message } = weiXin(this.form.wxNo)
                if (!success) {
                    this.message = message
                    return false
                }
            }
            return true
        },
        // 确认
        onConfirm() {
            this.$router.replace('/shopOwner')
        }
    }
}
</script>

<style lang="stylus" scoped>
.perfectApply-box {
    background #f5f5f5
}

.perfectApply-form-list  {
    margin-top 80px
    .perfectApply-form-div {
        position relative
        padding-bottom 66px
        display flex
        align-items baseline
        height 40px
        &:nth-child(3) {
            i {
                display inline-block
                font-style normal
                padding-right 8px
            }
        }
        &:nth-child(4),
        &:nth-child(5) {
            i {
                display inline-block
                font-style normal
                padding 0 28px
            }
        }
        span {
            display block
            height 30px
            font-size 30px
            color #707070
            
        }
        .perfectApply-input {
            display flex
            flex 1
            height 35px
            border-bottom 1px solid #ddd
            input {
                flex 1
                font-size 30px
                color #707070
                caret-color #FF6F00
            }
        }
        .perfectApply-brook {
            position absolute
            left 175px
            top 45px
            color #f00
            font-size 22px
        }
    }
}


.perfectApply-wrapper {
    display flex 
    align-items center
    justify-content center
    height 100%
}

.perfectApply-block {
    padding 100px 76px 0
    width 664px
    height 592px
    background #fff
    border-radius 20px
    box-sizing border-box
    h4 {
        display flex
        align-items center
        justify-content center
        margin auto
        width 62*2px
        height 62*2px
        border-radius 50%
        background #06BC25
        font-weight bold
        color #fff
    }
    h2 {
        padding 60px 0 80px
        height 44px
        line-height 44px
        text-align center
        font-size 44px
        letter-spacing 6px
        color #000
    }
}
</style>