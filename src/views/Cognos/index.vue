<template>
  <div class="Cognos-box">
        <ry-operation
            :banner-img="headImg"
            :data="data"
            :total="total"
            @pullUpLoad="pullUpLoad"
        />
  </div>
</template>

<script>
import RyOperation from '@/components/OperationInfo'

export default {
    name: 'ry-Cognos',

    components: {
        [RyOperation.name]: RyOperation
    },

    data() {
        const headImg = require('../../assets/images/cognos/banner-head.png')
        return {
            headImg,
            data: [
                {
                    url: '/courseArticle'
                },
                {
                    url: '/courseArticle'
                },
                {
                    url: '/courseArticle'
                },
                {
                    url: '/courseArticle'
                },
                {
                    url: '/courseArticle'
                },
                {
                    url: '/courseArticle'
                },
                {
                    url: '/courseArticle'
                },
                {
                    url: '/courseArticle'
                },
            ],
            page: 1,   // 请求页数
            size: 5,  // 显示多少条数据
            total: 40,
        }
    },

    methods: {
        pullUpLoad() {
            this.page ++
            // 异步更新数据
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    this.data.push({
                        url: '/courseArticle'
                    })
                }
            }, 500)
        },
    }
}
</script>

<style lang="stylus" scoped>
.Cognos-box {
    background #f5f5f5
}

</style>