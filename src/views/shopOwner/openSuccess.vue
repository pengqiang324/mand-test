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

    beforeRouteLeave(to, from, next) {
        // 解决在用户更新客户，店主时我的数据不更新问题
        this.$store.commit('shopOwner/REFRESH_USER_INFO', true)
        next()
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