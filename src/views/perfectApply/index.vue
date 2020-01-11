<template>
  <div class="perfectApply-box">
        <ry-scroll-view
            :bounce="false"
        >
            <div class="perfectApply-info">
                <div class="perfectApply-form">  
                    <div>
                        <h2>后续填写融溢表单须<span>与您注册平台信息保持一致，否侧影响提现</span></h2>
                        <div class="perfectApply-form-list">
                            <div class="perfectApply-form-div">
                                <span>申请人姓名：</span>
                                <p class="perfectApply-input"><input type="text" v-model="form.name" readonly/></p>
                            </div>
                            <div class="perfectApply-form-div">
                                <span>身份证号码：</span>
                                <p class="perfectApply-input"><input type="text" v-model="form.card" readonly/></p>
                            </div>
                            <div class="perfectApply-form-div">
                                <span><i>手</i><i>机</i><i>号</i>码：</span>
                                <p class="perfectApply-input"><input type="text" v-model="form.phone" readonly/></p>
                            </div>
                            <div class="perfectApply-form-div">
                                <span>微<i>信</i>号：</span>
                                <p class="perfectApply-input"><input type="text" v-model="form.weixin" @focus="showTips" @blur="hideTips"/></p>
                                <p class="perfectApply-brook" v-if="showtip">请填写本人真实微信号,以免影响售后服务</p>
                            </div>
                            <div class="perfectApply-form-div">
                                <span>邀<i>请</i>码：</span>
                                <p class="perfectApply-input"><input type="text" v-model="form.identy" readonly/></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="perfectApply-btn">
                    <ry-button
                        btn-title="提交"
                        :loading="loading"
                        @touchbefore="btnTouchBefore"
                        @touchafter="touchafter"
                    />
                </div>
            </div>
        </ry-scroll-view>
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

export default {
    name: 'ry-perfectApply',

    mixins: [mixins],

    components: {
        [Icon.name]: Icon
    },

    data() {
        return {
            showtip: false,
            form: {
                name: '彭元帅',
                card: '431024199004102434',
                phone: '17773191626',
                weixin: '',
                identy: '999999'
            },
            message: '',
            showDialog: false
        }
    },

    methods: {
        showTips() {
            this.showtip = true
        },

        hideTips() {
            this.showtip = false
            this.onBlur()
        },
        // 提交完善信息
        touchafter() {
            if(this.loading) return
            if(!this.validateWeixin()) {
                this.$toast({
                    message: this.message,
                    position: 'bottom'
                })
                return
            }
            this.loading = true
            
            setTimeout(() => {
                this.loading = false
                this.showDialog = true
            }, 1000)
        },
        // 验证微信
        validateWeixin() {
            if (this.form.weixin == '') {
                this.message = '微信号不能为空'
                return false
            } else {
                const { success, message } = weiXin(this.form.weixin)
                if (!success) {
                    this.message = message
                    return false
                }
            }
            return true
        },
        // 确认
        onConfirm() {
            // this.$router.replace()
        }
    }
}
</script>

<style lang="stylus">
.perfectApply-box {
    background #f5f5f5
}

.perfectApply-info {
    padding 60px 42px 
    box-sizing border-box
}

.perfectApply-form {
    padding 50px 40px 0
    width 100%
    height 770px
    background #fff
    border-radius 20px
    box-sizing border-box
    h2 {
        padding 0 32px
        margin-bottom 80px
        line-height 40px
        text-align center
        font-size 28px
        color #000
        letter-spacing 2px
        span {
            color #E90000
        }
    }
    .perfectApply-form-list  {
        .perfectApply-form-div {
            position relative
            margin-bottom 66px
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
                    padding 0 25px
                }
            }
            span {
                display block
                height 28px
                font-size 28px
                color #707070
                
            }
            .perfectApply-input {
                display flex
                flex 1
                height 35px
                border-bottom 1px solid #ddd
                input {
                    flex 1
                    font-size 28px
                    color #333
                    caret-color #FF6F00
                }
            }
            .perfectApply-brook {
                position absolute
                left 162px
                bottom -28px
                color #f00
                font-size 22px
            }
        }
    }
}

.perfectApply-btn {
    padding 100px 82px 0
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