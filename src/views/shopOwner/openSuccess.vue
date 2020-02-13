<template>
    <div class="openSuccess-box">
        <ry-scroll-view
            :bounce="false"
            class="paySuccess-scroll"
        >
            <ry-payment
                title="开通成功"
                content="恭喜您成为融溢店主"
                @touchafter="touchafter"
            />
        </ry-scroll-view>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'ry-openSuccess',

    computed: {
        ...mapState('shopOwner', ['redirect_url'])
    },

    methods: {
        touchafter() {
            this.$router.replace(this.redirect_url) // 重定向地址
        }
    }
}
</script>

<style lang=stylus>
.openSuccess-box {
    background #f5f5f5
}
</style>