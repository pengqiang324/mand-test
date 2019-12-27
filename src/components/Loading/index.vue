/*
* 加载中组件
*/

<template>
    <div class="loading-box">
        <img :src="imgLoading" alt="">
    </div>
</template>

<script>
import { ActivityIndicator } from 'mand-mobile'

export default {
    name: 'ry-loading',

    components: {
        [ActivityIndicator.name]: ActivityIndicator
    },

    data() {
        return {
            imgLoading: require('@/assets/images/ry-loading.gif')
        }
    }
}
</script>

<style lang="stylus">
.loading-box {
    height 100%
    display flex 
    justify-content center
    align-items center
    img {
        display block;
        width 180px
    }
}
</style>