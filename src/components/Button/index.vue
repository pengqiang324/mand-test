/*
** 通用按钮组件
** @props {Boolean} btnShow 是否显示按钮遮罩层
** @events @touchbefore 点击按钮开始事件
** @events @touchafter 点击按钮后事件
*/ 
<template>
    <div class="perfect-btn">
        <p 
            @touchstart="onComfirm" 
            @touchend="onTouchend"
            class="perfect-confirm"
        >
            <md-activity-indicator
                v-if="loading"
                type="carousel"
                color="#fff"
                :size="10"
            />
            <span v-else>{{btnTitle}}</span>
        </p>
        <p class="btn-smark" v-show="btnShow"></p>
    </div>
</template>

<script>
export default {
    name: 'ry-button',

    props: {
        btnShow: {
            type: Boolean,
            default: false
        },

        btnTitle: {
            type: String,
            default: '确认'
        },

        loading: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        onComfirm() {
            this.$emit('touchbefore', true)
        },

        onTouchend() {
            this.$emit('touchafter', false)
        }
    }
}
</script>

<style lang="stylus">
.perfect-btn {
      position relative
      user-select none
      .perfect-confirm {
        display flex
        align-items center
        justify-content center
        width 100%
        height 84px
        line-height 84px
        text-align center
        font-size 36px
        color #fff
        border-radius 50px
        background linear-gradient(left, #FF6F00, #FF3D00)
    }
    .btn-smark {
        position absolute
        top 0
        left 0
        width 100%
        height 84px
        background rgba(0,0,0,.1)
        border-radius 50px
    }
}
</style>