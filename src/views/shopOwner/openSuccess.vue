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
export default {
    name: 'ry-openSuccess',

    methods: {
        touchafter() {
        }
    }
}
</script>

<style lang=stylus>
.openSuccess-box {
    background #f5f5f5
}
</style>