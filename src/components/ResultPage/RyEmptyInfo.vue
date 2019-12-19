/*
** 暂无数据组件
*/
<template>
  <div class="empty-box">
        <md-result-page
            text="暂无数据"
            :img-url="img"
        />
  </div>
</template>

<script>
import { ResultPage } from 'mand-mobile'

export default {
    name: 'ry-result-empty',

    components: {
        [ResultPage.name]: ResultPage
    },

    data() {
        return {
            img: require('@/assets/images/emptyInfo@2x.png')
        }
    },
}
</script>

<style lang="stylus">
.empty-box {
    .md-result {
      .md-result-image {
        img {
          margin-bottom 0
        }
      }
      .md-result-text {
        margin-top 0
        color #9e9da2
      }
    }
  }
</style>