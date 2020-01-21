<template>
    <ry-scroll-view
        :bounce="false"
        class="courseArticle-scroll"
    >
        <div class="courseArticle-info">
            <div 
                v-if="data.imageUrl"
                ref="img"
                class="courseArticle-info-head"
            >
                <img v-lazy="data.imageUrl" alt="">
            </div>
            <div class="courseArticle-info-con" ref="courseArticleInfo">
                <ry-scroll-view
                    :bounce="false"
                    class="courseArticle-info-scroll"
                >
                    <div class="courseArticle-info-list">
                        <h2>{{data.title}}</h2>
                        <p class="courseArticle-info-time">{{data.createTime}}</p>
                        <div
                            class="courseArticle-info-detail"
                        >
                            {{data.content}}
                        </div>
                    </div>
                </ry-scroll-view>
            </div>
        </div>
    </ry-scroll-view>
</template>

<script>
export default {
    name: 'ry-artical',

    props: {
        data: {
            type: Object,
            default: () => {
                return  {}
            }
        }
    },
}
</script>

<style lang="stylus">
.courseArticle-scroll {
    .scroll-view-container {
        height 100%
    }
    .courseArticle-info-scroll {
        .scroll-view-container {
            height auto
        }
    }
}
</style>

<style lang="stylus" scoped>
.courseArticle-info {
    height 100%
    .courseArticle-info-head {
        width 100%
        height 320px
        img {
            width 100%
            height  100%
            display block
        }
    }
}

.courseArticle-info-con {
    padding 0px 40px 0
    width 100%
    height calc(100% - 320px)
    box-sizing border-box
    .courseArticle-info-list {
        padding-top 40px
    }
    h2 {
        height 32px
        line-height 32px
        font-size 32px
        color #3A3A3A
    }
    .courseArticle-info-time {
        padding 10px 0
        height 24px
        line-height 24px
        font-size 24px
        text-align right
        color #bbb
        border-bottom 2px solid rgba(238,238,238,1)
    }
    .courseArticle-info-detail {
        padding 40px 0 
        line-height 36px
        font-size 28px
        color #707070
    }
}
</style>