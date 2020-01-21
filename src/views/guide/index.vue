<template>
<div class="guide-box">
    <ry-scroll-view
        :bounce="false"
    >
        <div class="guide-box-info">
            <h2>常见问题</h2>
            <div class="guide-list">
                <template v-if="showNetWork">
                    <ry-result-network class="ry-network"/>
                </template>
                <template v-if="!showNetWork">
                    <ry-error-info v-show="showErrorIn" class="guide-errorIn"/>
                    <div v-show="!showErrorIn">
                        <ry-loading v-show="showloading" class="guide-loading"/>
                        <van-cell-group
                            v-show="!showloading"
                        >
                            <van-cell 
                                v-for="(item,index) in data"
                                :key="index"
                                :title="item.title"
                                :to="{path: '/courseArticle', query: {id: item.id,name: item.title}}" 
                                is-link 
                            >
                                <template slot="title">
                                    <span class="custom-title">{{index+1}}.</span>
                                    <span>{{item.title}}</span>
                                </template>
                            </van-cell>
                        </van-cell-group>
                    </div>
                </template>
            </div>
        </div>
    </ry-scroll-view>
</div>
</template>

<script>
import mixins from '@/libs/mixins'
import { getArticalList } from '@/api/article/article'

export default {
    name: 'ry-guide',

    mixins: [mixins],

    data() {
        return {
            data: [],
            page: 1,
            size: 50
        }
    },

    created() {
        this.initData()
    },
    
    methods: {
        initData() { 
            this.showloading = true
            const { id } = this.$route.query
            const params = {
                nbId: id,
                page: this.page,
                size: this.size
            }
            getArticalList(params)
            .then((res) => {
                const { success, queryResult } = res.data
                if (success) {
                    this.data = queryResult.list
                    this.hideErrorTip()
                } else {
                    this.showErrorTip(res)
                }
                this.showloading = false
            })
        }
    }
}
</script>

<style lang="stylus">
.guide-box {
    .guide-loading {
        height 500px
        img {
            width 130px 
        }
    }
}
</style>

<style lang="stylus" scoped>
.ry-network {
    position static
    padding 120px 0 200px
}

.guide-errorIn {
    padding 120px 0
}

.guide-box {
    setBg()
    background #f5f5f5
}

.guide-box-info {
    padding 40px 40px 0
    box-sizing border-box
    h2 {
        margin-bottom 30px
        height 32px
        line-height 32px
        font-size 32px
        color #3A3A3A
    }
    .guide-list {
        width 100%
        background #fff
        border-radius 10px
        box-sizing border-box
    }
}
</style>