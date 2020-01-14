<template>
  <ry-scroll-view
    :bounce="false"
>
    <div class="perfectApply-info">
        <div class="perfectApply-form">  
            <div>
                <h2>后续填写融溢表单须<span>与您注册平台信息保持一致，否侧影响提现</span></h2>
                <slot></slot>
            </div>
        </div>
        <div class="perfectApply-btn">
            <ry-button
                btn-title="提交"
                :loading="Loading"
                @touchafter="touchafter"
            />
        </div>
    </div>
</ry-scroll-view>
</template>

<script>
import mixins from '@/libs/mixins'

export default {
    name: 'ry-perfect',

    mixins: [mixins],

    props: {
        Loading: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        touchafter() {
            this.$emit('touchafter')
        }
    }
}
</script>

<style lang="stylus">
.perfectApply-info {
    padding 60px 42px 
    box-sizing border-box
}

.perfectApply-form {
    padding 50px 40px 0
    width 100%
    background #fff
    border-radius 20px
    box-sizing border-box
    h2 {
        padding 0 32px
        line-height 40px
        text-align center
        font-size 28px
        color #000
        letter-spacing 2px
        span {
            color #E90000
        }
    }
}

.perfectApply-btn {
    padding 100px 82px 0
}
</style>