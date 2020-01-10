
<!-- 操作指南公用组件 -->
<template>
    <ry-scroll-view
        :bounce="false"
        class="Cognos-scroll"
    >
        <div class="Cognos-info">
            <h2><img v-lazy="bannerImg" alt=""></h2>
            <div class="Cognos-list">
                <div class="Cognos-head">
                    <van-divider :style="{borderColor: '#dcdcdc'}">新手入门</van-divider>
                </div>
                <div class="Cognos-list-data">
                    <template v-if="showNetWork">
                        <ry-result-network class="ry-network"/>
                    </template>
                    <template v-if="!showNetWork">
                        <ry-error-info v-show="showErrorIn"/>
                        <div v-show="!showErrorIn" class="Cognos-list-box">
                            <ry-loading v-show="showloading" class="Cognos-loading"/>
                            <ry-scroll
                                v-show="!showloading"
                                :total="total"
                                :bounce="bounce"
                                :data="data"
                                :scrollbar="true"
                                :pullUpLoad="true"
                                @pullingUp="pullUpLoad"
                            >
                                <ul>
                                    <router-link 
                                        v-for="(item,index) in data"
                                        :key="index"
                                        :to="item.url"
                                        tag="li"
                                    >
                                        <div class="Cognos-list-left">
                                            <h4>新手发圈必备要领</h4>
                                            <p>2019-07-09</p>
                                        </div>
                                        <h2 v-lazy:background-image="bgImg"></h2>
                                    </router-link>
                                </ul>
                            </ry-scroll>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </ry-scroll-view>
</template>

<script>
import mixins from '@/libs/mixins'
import { Divider } from 'vant'

export default {
    name: 'ry-operation',

    mixins: [mixins],

    components: {
        [Divider.name]: Divider
    },

    props: {
        // 列表数据
        data: {
            type: Array,
            default: () => {
                return []
            }
        },
        // 数据总数
        total: {
            type: Number,
            required: true
        },
        // 顶部banner
        bannerImg: {
            type: String,
            required: true
        }
    },

    data() {
        const bgImg = require('../../assets/images/banner/swiper01.png')
        return {
            bgImg,
            bounce: {
                top: false,
                bottom: false,
                left: false,
                right: false
            },
        }
    },

    methods: {
         pullUpLoad() {
            this.$emit('pullUpLoad')
        },
    }
}
</script>

<style lang="stylus">
.Cognos-scroll {
    .scroll-view-container {
        height 100%
    }
}
.Cognos-list-data {
    .ry-network {
        position static
    }
    .Cognos-loading {
        img {
            width 150px
        }
    }
}
</style>

<style lang="stylus" scoped>
.Cognos-list-box {
    height 100%
    img {

    }
}

.Cognos-info {
    h2 {
        width 100%
        height 320px
        img {
            width 100%
            height 100%
            display block
        }
    }
    .Cognos-list {
        position absolute
        top 320px
        width 100%
        height calc(100% - 320px)
        overflow hidden
        box-sizing border-box
        .Cognos-head {
            padding 0 40px 
        }
        .Cognos-list-data {
            position relative
            padding 0 40px 0
            height calc(100% - 112px)
            overflow hidden
            box-sizing border-box
            li {
                display flex
                align-items center
                margin-bottom 20px
                padding 20px 30px
                background #fff
                box-shadow 0 10px 18px rgba(0,0,0,0.05)
                border-radius 10px
                box-sizing border-box
                .Cognos-list-left {
                    flex 1
                    h4 {
                        height 36px
                        line-height 36px
                        font-size 36px
                        color #3A3A3A
                    }
                    p {
                        padding-top 52px
                        height 28px
                        line-height 28px
                        font-size 28px
                        color #BBB
                    }
                }
                h2 {
                    width 168px
                    height 112px
                    border-radius 10px
                    &[lazy='loading'] {
                        background-color #eee
                    }
                }
            }
        }
    }
}
</style>