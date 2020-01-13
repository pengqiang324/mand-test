<template>
    <div class="purchase-box">
        <ry-scroll-view
            :bounce="false"
            class="purchase-scroll"
        >
            <div class="pusrchase-info">
                <div class="pusrchase-head">
                    <div class="pusrchase-con" v-lazy:background-image="bgImg">
                        <h2>名师咨询</h2>
                        <p>专属顾问:<span>罗文</span></p>
                        <p>咨询业务:<span>5000-50000信用卡快速办理</span></p>
                        <div class="pusrchase-jg">
                            <span>
                                <md-icon
                                    name="rmb"
                                    size="lg"
                                    class="icon-rmb"
                                ></md-icon>
                                199/
                                <i>次</i>
                            </span>
                        </div>
                        <div class="pusrchase-pri">
                            <span>订单号码：201912189101</span>
                            <span>订单日期：2019-12-18</span>
                        </div>
                    </div>
                </div>
                <!-- 选择支付通道 start -->
                <ry-payselect/>
                <!-- 选择支付通道 end -->
                <p class="purchase-zf">
                    <ry-button
                        btn-title="立即付款"
                        :loading="loading"
                        @touchafter="paymentNext"
                    />
                </p>
            </div>
        </ry-scroll-view>
  </div>
</template>

<script>
import mixins from '@/libs/mixins'
import RyPayselect from '@/components/PaySelect'

export default {
    name: 'ry-purchase',

    mixins: [mixins],

    components: {
        [RyPayselect.name]: RyPayselect
    },

    data() {
        const bgImg = require('../../assets/images/payment/ry-bg.png')
        return {
            bgImg,
        }
    },

    methods: {
        paymentNext() {
            this.changeLoading()
            setTimeout(() => {
                this.loading = false
                this.$router.replace('/paySuccess')
            }, 2000)
        }
    }
}
</script>

<style lang="stylus" scoped>
.purchase-box {
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    background #f5f5f5
}

.pusrchase-info {
    padding 60px 40px 50px
    box-sizing border-box
}

.pusrchase-head {
    padding 0  20px
    box-sizing border-box
}

.pusrchase-con {
    width 100%
    height 169*2px
    padding 0 40px
    box-shadow 0 10px 6px rgba(0,0,0,0.4)
    border-radius 20px
    background-repeat no-repeat
    background-position center
    background-size 100% 100%
    overflow hidden
    box-sizing border-box
    &[lazy='loading'] {
        background-color #eee
    }
    h2 {
        padding 40px 0 30px
        height 40px
        line-height 40px
        font-size 40px
        text-align center
        color #FFCE48
        letter-spacing 5px
        text-align center
        font-weight bold
    }
    p {
        display flex
        align-items baseline
        padding-bottom 8px
        font-size 28px
        height 28px
        font-weight 400
        color #FFCE48
        span {
            display block
            margin-left 6px
            height 24px
            font-size 24px
        }
    }
    .pusrchase-jg {
        display flex
        justify-content flex-end
        margin-bottom 20px
        padding 32px 0 22px
        color #FFCE48
        border-bottom 2px solid rgba(255,206,72,1)
        span {
            display flex
            align-items baseline
            height 40px
            font-size 40px
            font-weight bold
            letter-spacing 1px
            .icon-rmb {
                height 32px
                font-size 32px
                font-weight bold
            }
            i {
                height 28px
                font-size 28px
                font-style normal
            }
        }
    }

    .pusrchase-pri {
        display flex
        justify-content space-between
        height 20px
        line-height 20px
        font-size 20px 
        color #FFCE48
        span {
            display block
        }
    }
}



.purchase-zf {
    padding 120px 90px 0
}
</style>