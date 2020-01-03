<template>
  <div class="box">
      <template v-if="showNetwork">
        <ry-result-network class="ry-network"/>
      </template>
      <template v-if="!showNetwork">
          <ry-error-info v-show="showError"/>
          <div class="home-box" v-show="!showError">
          </div>
      </template>
  </div>
</template>

<script>
export default {
    name: 'ry-##',
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