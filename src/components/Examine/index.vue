<template>
    <div class="adviseApply-examine">
        <van-overlay :show="showOverlay">
            <div class="adviseApply-wrapper" @click.stop>
                <div class="adviseApply-block">
                    <h2>已通过</h2>
                </div>
            </div>
        </van-overlay>
    </div>
</template>

<script>
export default {
    name: 'ry-examine',

    props: {
        showOverlay: {
            type: Boolean,
            default: false
        },

        examineStatus: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="stylus">
.adviseApply-examine {
    .adviseApply-wrapper {
        width 100%
        height 100%
        display flex
        align-items center
        justify-content center
        .adviseApply-block {
            padding-top 60px
            width 664px
            height 656px
            background #fff
            border-radius 20px
            box-sizing border-box
            h2 {
                height 44px
                line-height 44px
                font-size 44px
                text-align center
            }
        }
    }
}
</style>