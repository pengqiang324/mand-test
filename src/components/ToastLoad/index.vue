<!-- 数据加载中提示组件 -->
<template>
<div></div>
</template>

<script>
export default {
    name: 'ry-toast-loading',

    props: {
        show: {
            type: Boolean,
            default: false
        }
    },

    created() {
        if (this.show) {
            this.$toast.loading({
                message: '努力加载中...',
                forbidClick: true,
                duration: 0
            })
        } 
    },

    watch: {
        show(newval) {
            if (!newval) {
                this.$toast.clear()
            }
        }
    },

    beforeDestroy() {
        this.$toast.clear()
    }
}
</script>