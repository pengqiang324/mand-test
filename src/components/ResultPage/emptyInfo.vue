/*
* 空信息反馈组件
*/
<template>
  <div class="ry-result-page-2">
    <md-result-page></md-result-page>
  </div>
</template>

<script>
import {ResultPage} from 'mand-mobile'

export default {
    name: 'ry-result-empty',
    components: {
        [ResultPage.name]: ResultPage,
    },
}
</script>

<style lang="stylus">
.ry-result-page-2
  background #FFF
</style>