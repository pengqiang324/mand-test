<template>
  <div class="ry-error-info" @click="$ry_onrefresh">
    <md-result-page
      img-url="//manhattan.didistatic.com/static/manhattan/do1_JX7bcfXqLpStKRv31xlp"
      text="不太确定自己错在了哪里..."
      subtext="要不然刷新试试？">
    </md-result-page>
  </div>
</template>

<script>
import { ResultPage } from 'mand-mobile'

export default {
  name: 'ry-error-info',

  inject: [ 'reload' ],

  components: {
    [ResultPage.name]: ResultPage,
  },

  methods: {
    $ry_onrefresh() {
      this.reload()
    }
  }
}

</script>

<style lang="stylus">
.ry-error-info {
    height 100%
}
</style>