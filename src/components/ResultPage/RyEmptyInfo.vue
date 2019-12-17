/*
* 空信息反馈组件
*/
<template>
  <div class="ry-result-page-2">
    <ry-scroll-view
      :showRefresh="true"
      @onRefresh="$_onRefresh"
    >
      <md-result-page/>
    </ry-scroll-view>
  </div>
</template>

<script>
import {ResultPage} from 'mand-mobile'

export default {
    name: 'ry-result-empty',

    components: {
        [ResultPage.name]: ResultPage,
    },

    methods: {
      $_onRefresh({finishRefresh}) {
        setTimeout(() => {
          finishRefresh();
        }, 2000);
      }
    }
}
</script>

<style lang="stylus">
.ry-result-page-2
  width 100%
  height 100%
  background #FFF
  .scroll-view-container 
    height 100%
</style>