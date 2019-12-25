/*
* 加载中组件
*/

<template>
<<<<<<< HEAD
  <md-activity-indicator
      v-if="showLoading"
      type="carousel"
      color="#FF8324"
      :size="14"
    ></md-activity-indicator>
=======
    <div class="loading-box">
        <img :src="imgLoading" alt="">
    </div>
>>>>>>> 993b5ad23bd2b49551ede51a9e6c5ef18b072e17
</template>

<script>
import { ActivityIndicator } from 'mand-mobile'
import { mapState } from 'vuex'

export default {
    name: 'ry-loading',

    components: {
        [ActivityIndicator.name]: ActivityIndicator
    },

<<<<<<< HEAD
=======
    data() {
        return {
            imgLoading: require('@/assets/images/ry-loading.gif')
        }
    },

>>>>>>> 993b5ad23bd2b49551ede51a9e6c5ef18b072e17
    computed: {
        ...mapState[
            'showLoading'
        ]
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