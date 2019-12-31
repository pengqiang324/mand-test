/*
* 网络连接出错组件
*/
<template>
  <div 
    class="ry-result-page-1"
    ref="RyNetwork"
  >
    <md-result-page
      class="resultPage"
      type="network"
      subtext="点击屏幕，重新加载">
    </md-result-page>
  </div>
</template>

<script>
import {ResultPage} from 'mand-mobile'

export default {
  name: 'ry-result-network',

  components: {
    [ResultPage.name]: ResultPage,
  },

  inject: [ 'reload' ],

  mounted() {
    this.$refs.RyNetwork.addEventListener('click', this.$ry_onrefresh)
  },


  beforeDestroy() {
    this.$refs.RyNetwork.removeEventListener('click', this.$ry_onrefresh)
  },

  methods: {
    $ry_onrefresh() {
      // this.$router.go(0) //ios中无效果
      // location.reload()
      this.reload()
    }
  }
}
</script>

<style lang="stylus">
.ry-result-page-1 
  position fixed
  width 100%
  height 100%
  background #FFF
</style>