<template>
  <div class="courseArticle-box">
        <ry-artical
            :banner-img="headImg"
        />
  </div>
</template>

<script>
import RyArticalDetail from '@/components/ArticalDetail'
export default {
    name: 'ry-courseArticle',

    components: {
        [RyArticalDetail.name]: RyArticalDetail
    },

    data() {
        const headImg = require('../../assets/images/banner/swiper01.png')
        return {
            headImg
        }
    },
}
</script>

<style lang="stylus" scoped>
.courseArticle-box {
    background #f5f5f5
}
</style>