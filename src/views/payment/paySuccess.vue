<template>
  <div class="paySuccess-box">
       <ry-scroll-view
            :bounce="false"
            class="paySuccess-scroll"
        >
            <div class="paySuccess-head">
                <div class="paySuccess-info">
                    <h2>支付成功</h2>
                    <h4><van-icon name="success" /></h4>
                    <p>恭喜您成功购买名师咨询</p>
                </div>
            </div> 
            <p class="paySuccess-define">
                <ry-button
                    btn-title="确定"
                    @touchbefore="btnTouchBefore"
                    @touchafter="paymentNext"
                />
            </p>
        </ry-scroll-view>
  </div>
</template>

<script>
import { Icon } from 'vant'
import mixins from '@/libs/mixins'

export default {
    name: 'ry-paySuccss',

    mixins: [mixins],

    components: {
        [Icon.name]: Icon
    },

    methods: {
        paymentNext() {
        }
    }
}
</script>

<style lang="stylus" scoped>
.paySuccess-box {
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    background #f5f5f5
}

.paySuccess-head {
    padding 40px
    box-sizing border-box
    .paySuccess-info {
        width 100%
        height 198*2px
        background #fff
        box-shadow 0px 2px 14px rgba(0,0,0,0.05)
        border-radius 10px
        h2 {
            padding 60px 0 40px
            height 48px
            line-height 48px
            text-align center
            color #1e1e1e
            font-weight bold
            letter-spacing 2px
            font-size 48px
        }
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
        p {
            padding 50px 0
            height 24px
            line-height 24px
            text-align center
            font-size 24px
            color #1E1E1E
        }
    }
}

.paySuccess-define {
    padding 80px 90px 0
}
</style>