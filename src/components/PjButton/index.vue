<!-- 评价按钮组件 -->
<template>
    <div class="btn-box">
        <div 
            @touchstart="publishStart"
            @touchend="publishEnd"
            :class="['personalInfo-pj-Publish', {'btn-active': isActive}]"
        >
            <img src="../../assets/images/personalInfo/ry-pj-btn.png" alt="">
            发表评价
        </div>
    </div>
</template>

<script>
import mixins from '@/libs/mixins'

export default {
    name: 'ry-pj-button',

    mixins: [mixins],
}
</script>

<style lang="stylus">
.personalInfo-pj-Publish {
        display flex
        align-items center
        justify-content center
        margin 54px auto 150px
        width 572px
        height 84px
        line-height 32px
        font-size 32px
        color #FF6A00
        border 2px solid rgba(255,106,0,1)
        border-radius 42px
        img {
            width 68px
            height 68px
            display block
        }
    }
</style>