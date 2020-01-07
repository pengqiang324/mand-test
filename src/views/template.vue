<template>
  <div class="box">
      <template v-if="showNetWork">
        <ry-result-network class="ry-network"/>
      </template>
      <template v-if="!showNetWork">
          <ry-error-info v-show="showErrorIn"/>
          <div class="home-box" v-show="!showErrorIn">
          </div>
      </template>
  </div>
</template>

<script>
import mixins from '@/libs/mixins'

export default {
    name: 'ry-##',

    mixins: [mixins]
}
</script>

<style lang="stylus">
.home-box {
  position absolute
  left 0
  right 0
  bottom 0
  top 0 
}
</style>