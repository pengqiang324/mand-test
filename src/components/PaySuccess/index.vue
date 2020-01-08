<template>
    <div class="payment-component">
        <div class="paySuccess-head">
            <div class="paySuccess-info">
                <h2>{{title}}</h2>
                <h4><van-icon name="success" /></h4>
                <p>{{content}}</p>
            </div>
        </div> 
        <p class="paySuccess-define">
            <ry-button
                :btn-title="btnTitle"
                @touchbefore="btnTouchBefore"
                @touchafter="touchafter"
            />
        </p>
    </div>
</template>

<script>
import { Icon } from 'vant'
import mixins from '@/libs/mixins'

export default {
    name: 'ry-payment',

    mixins: [mixins],

    components: {
        [Icon.name]: Icon
    },

    props: {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        btnTitle: {
            type: String,
            default: '确定'
        }
    },

    methods: {
        touchafter() {
            this.$emit('touchafter') // 点击后触发事件
        }
    }
    
}
</script>

<style lang="stylus">
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