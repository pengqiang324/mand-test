<template>
  <div class="courseArticle-box">
        <ry-toast-loading :show="showloading"/>
        <ry-artical
            :data="data"
        />
  </div>
</template>

<script>
import RyArticalDetail from '@/components/ArticalDetail'
import { getArticalInfo } from '@/api/article/article'
export default {
    name: 'ry-courseArticle',

    components: {
        [RyArticalDetail.name]: RyArticalDetail
    },

    data() {
        return {
            data: {}
        }
    },

    beforeRouteEnter(to,from,next) {
        const { name } = to.query
        to.meta.title = name
        next()
    },

    created() {
        this.initData()
    },

    methods: {
        initData() {
            const { id } = this.$route.query
            this.showloading = true
            getArticalInfo({id})
            .then((res) => {
                const { success, data } = res.data
                if (success) {
                    this.data = data
                }
                this.showloading = false
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.courseArticle-box {
    background #f5f5f5
}
</style>