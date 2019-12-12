<template>
  <div class="ry-result-page-0">
    <md-result-page
      type="lost">
    </md-result-page>
  </div>
</template>

<script>
import {ResultPage} from 'mand-mobile'
export default {
    name: 'ry-result-page',
    components: {
        [ResultPage.name]: ResultPage,
    },
}
</script>

<style lang="stylus">
.ry-result-page-0
  background #FFF
</style>