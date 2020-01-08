<template>
  <div class="paySuccess-box">
       <ry-scroll-view
            :bounce="false"
            class="paySuccess-scroll"
        >
            <ry-payment
                title="支付成功"
                content="恭喜您成功购买名师咨询"
                @touchafter="touchafter"
            />
        </ry-scroll-view>
  </div>
</template>

<script>
export default {
    name: 'ry-paySuccss',

    methods: {
        touchafter() {
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
</style>