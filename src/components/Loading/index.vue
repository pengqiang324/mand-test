/*
* 加载中组件
*/

<template>
  <md-activity-indicator
      type="carousel"
      color="#FF8324"
      :size="14"
    ></md-activity-indicator>
</template>

<script>
import { ActivityIndicator } from 'mand-mobile'

export default {
    name: 'ry-loading',

    components: {
        [ActivityIndicator.name]: ActivityIndicator
    }
}
</script>

<style lang="stylus">

</style>