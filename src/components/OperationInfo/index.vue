
<!-- 操作指南公用组件 -->
<template>
    <ry-scroll-view
        :bounce="false"
        class="Cognos-scroll"
    >
        <div class="Cognos-info">
            <div class="Cognos-swiper">
                <swiper :options="swiperOption" ref="mySwiperA" class="swiper-business-img">
                    <swiper-slide 
                        v-for="item in imgData" 
                        :key="item.id" 
                        class="swiper-business-box"
                    >
                        <img :src="item.picUrl" alt=""/>
                    </swiper-slide> 
                    <div class="swiper-business-pagination"  slot="pagination"></div>
                </swiper>
            </div>
            <div class="Cognos-list">
                <div class="Cognos-head">
                    <van-divider :style="{borderColor: '#dcdcdc'}">{{headTitle}}</van-divider>
                </div>
                <div class="Cognos-list-data">
                    <div class="Cognos-list-box">
                        <ry-loading v-show="!data.length" class="Cognos-loading"/>
                        <ry-scroll
                            v-show="data.length"
                            :total="total"
                            :bounce="bounce"
                            :data="data"
                            :scrollbar="true"
                            :pullUpLoad="true"
                            @pullingUp="pullUpLoad"
                        >
                            <ul>
                                <router-link 
                                    v-for="item in data"
                                    :key="item.id"
                                    :to="{path: '/courseArticle', query: {id: item.id}}"
                                    tag="li"
                                >
                                    <div class="Cognos-list-left">
                                        <h4>{{item.title}}</h4>
                                        <p>{{item.createTime}}</p>
                                    </div>
                                    <h2 v-lazy:background-image="item.imageUrl"></h2>
                                </router-link>
                            </ul>
                        </ry-scroll>
                    </div>
                </div>
            </div>
        </div>
    </ry-scroll-view>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { Divider } from 'vant'

export default {
    name: 'ry-operation',

    components: {
        [Divider.name]: Divider,
        swiper,
        swiperSlide
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
        imgData: {
            type: Array,
            default: () => {
                return []
            }
        },
        // 分割线标题
        headTitle: {
            type: String,
            default: ''
        }
    },

    data() {
        const headImg = require('../../assets/images/cognos/banner-head.png')
        return {
            headImg,
            bounce: {
                top: false,
                bottom: false,
                left: false,
                right: false
            },
            swiperOption: {
                notNextTick: true,
                pagination: {
                    el: '.swiper-business-pagination',
                },
                paginationClickable: true,
                autoplay: {
                    delay:3000  //这里需要注意，如果想每2秒去自动切换，直接autoplay:2000是失效的，
                },
                loop: true,
            }
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
.Cognos-swiper {
    background #eee
    h2 {
        width 100%
        img {
            width 100%
            height 320px
            display block
        }
    }
}

.Cognos-list-box {
    height 100%
}

.Cognos-info {
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
                    background-size cover
                    &[lazy='loading'] {
                        background-color #eee
                    }
                }
            }
        }
    }
}

.swiper-business-img {
    height 320px
}
</style>