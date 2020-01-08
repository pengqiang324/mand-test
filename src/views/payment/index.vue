<template>
    <div class="purchase-box">
        <ry-scroll-view
            :bounce="false"
            class="purchase-scroll"
        >
            <p class="purchase-zf">
                <ry-button
                    btn-title="立即付款"
                    :loading="loading"
                    @touchbefore="btnTouchBefore"
                    @touchafter="paymentNext"
                />
            </p>
        </ry-scroll-view>
  </div>
</template>

<script>
import mixins from '@/libs/mixins'


export default {
    name: 'ry-purchase',

    mixins: [mixins],

    methods: {
        paymentNext() {
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

.purchase-zf {
    padding 120px 90px 0
}
</style>