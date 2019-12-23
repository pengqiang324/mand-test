/*
* 加载中组件
*/

<template>
  <md-activity-indicator
      v-if="showLoading"
      type="carousel"
      color="#FF8324"
      :size="14"
    ></md-activity-indicator>
</template>

<script>
import { ActivityIndicator } from 'mand-mobile'
import { mapState } from 'vuex'

export default {
    name: 'ry-loading',

    components: {
        [ActivityIndicator.name]: ActivityIndicator
    },

    computed: {
        ...mapState[
            'showLoading'
        ]
    }
}
</script>

<style lang="stylus">

</style>