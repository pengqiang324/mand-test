<template>
  <div class="business-box">
        <template v-if="showNetWork">
            <ry-result-network class="ry-network"/>
        </template>
        <template v-if="!showNetWork">
            <ry-error-info v-show="showErrorIn"/>
            <ry-scroll-view
                v-show="!showErrorIn"
                :bounce="false"
                ref="scroll"
                @scroll="scroll"
                class="business-scroll"
            >
                <ry-toast-loading :show="showloading"/>
                <div class="business-info">
                    <div class="business-head">
                        <div class="business-swiper">
                            <swiper :options="swiperOption" ref="mySwiperA" class="swiper-business-img">
                                <swiper-slide 
                                    v-for="(item, index) in imgData" 
                                    :key="index" 
                                    class="swiper-business-box"
                                >
                                    <img :src="item" alt=""/>
                                </swiper-slide> 
                                <div class="swiper-business-pagination"  slot="pagination"></div>
                            </swiper>
                        </div>
                        <div class="business-slide">
                            <ry-slider-scroll
                                :loop="false"
                                :isShowDoc="false"
                            >
                                <router-link
                                    v-for="(item,index) in slideData"
                                    :key="index"
                                    :to="item.url"
                                    tag="div"
                                    class="business-list"
                                >
                                    <div class="business-list-info">
                                        <h2><img v-lazy="item.img" alt=""></h2>
                                        <p>{{item.name}}</p>
                                    </div>
                                </router-link>
                            </ry-slider-scroll>
                        </div>
                    </div>

                    <div class="business-introduce">
                        <h2>公司介绍</h2>
                        <div class="business-introduce-info">
                            <h4>
                                <img v-lazy="companyData.imageUrl" alt="">
                            </h4>
                            <div
                                class="businesss-info-right"
                                @click="pushInfo(companyData.id)"
                            >
                                <h3>{{companyData.name}}</h3>
                                <p class="businesss-info-con">{{companyData.description}}</p>
                                <p class="businesss-info-time">
                                    <span>
                                        观看次数:
                                        {{companyData.viewTotal}}
                                    </span>
                                    <i>查看详情</i>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="business-special">
                        <h2>专题栏</h2>
                        <ry-m-loading
                            v-if="showEnter"
                            class="business-m-loading"
                        />
                        <div
                            v-else
                            class="business-special-list"
                        >
                            <ul>
                                <li
                                    v-for="(item,index) in subjectData"
                                    :key="index"
                                    @click="pushSubject(item.id)"
                                >
                                    <h4><img v-lazy="item.imageUrl" alt=""></h4>
                                    <h5>{{item.name}}</h5>
                                    <p>{{item.viewTotal}}人已学习</p>
                                </li>
                            </ul>
                        </div> 
                    </div>  
                </div>
            </ry-scroll-view>
      </template>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import mixins from '@/libs/mixins'
import { getAll, addView } from '@/api/business/business'

export default {
    name: 'ry-business',

    mixins: [mixins],

    components: {
        swiper,
        swiperSlide
    },

    data() {
        const imgUrl = require('@/assets/images/banner/swiper01.png')
        const bgImg = require('../../assets/images/business/business-bg.png')
        return {
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
            },
            imgData: [imgUrl, imgUrl, imgUrl],
            slideData: [
                {
                    url: '/guide',
                    img: require('@/assets/images/business/business01.png'),
                    name: '融溢指南'
                },
                {
                    url: '/Cognos',
                    img: require('@/assets/images/business/business02.png'),
                    name: '新手入门'
                },
                {
                    url: '/guide',
                    img: require('@/assets/images/business/business03.png'),
                    name: '初级必学'
                },
                {
                    url: '/guide',
                    img: require('@/assets/images/business/business04.png'),
                    name: '中级进阶'
                },
                {
                    url: '/guide',
                    img: require('@/assets/images/business/business05.png'),
                    name: '大咖风采'
                },
                {
                    url: '/guide',
                    img: require('@/assets/images/business/business06.png'),
                    name: '早安晚语'
                }
            ],
            subjectData: [],
            companyData: {},
            bgImg: bgImg,
            showEnter: false
        }
    },

    created() {
        this.initData()
    },

    methods: {
        async initData() {
            const params1 = {
                subject: 1 
            }
            const params2 = {
                subject: 0
            }
            this.showloading = true
            this.showEnter = true
            const res =  await getAll(params1)
            const { success, data } = res.data
            
            if (success) {
                this.companyData= data[0]
                this.hideErrorTip()
                this.showloading = false
                getAll(params2)
                .then((res2) => {
                    const { success, data } = res2.data
                    if (success) {
                        this.subjectData = data
                        this.showEnter = false
                    }
                })
            } else {
                this.showloading = false
                this.showErrorTip(res)
            }
        },

        async pushInfo(id) {
            const res = await this.updateView(id)
            const { success } = res.data
            if (success) {
                this.$router.push({
                    path: '/businessInfo',
                    query: {
                        id,
                        view: this.companyData.viewTotal // 观看次数
                    }
                })
            }
        },

        async pushSubject(id) {
            const res = await this.updateView(id)
            const { success } = res.data
            if (success) {
                this.$router.push({
                    path: '/courseList',
                    query: {
                        id
                    }
                })
            }
        },

        async updateView(id) {
            return addView({id})
        }
    }
}
</script>

<style lang="stylus" scoped>
.business-m-loading {
    padding 80px 0
}

.business-box {
    position absolute
    top 0
    bottom 0
    right 0
    left 0
    
    background #f6f6f6
    
}

.business-swiper {
    background #eee
}

.business-info {
    padding 40px 40px 120px
    box-sizing border-box
    .business-head {
        width 100%
        height 450px
        background #fff
        box-shadow 0px 10px 18px rgba(0,0,0,0.05)
        overflow hidden
        border-radius 10px
        backface-visibility hidden
        transform translate3d(0, 0, 0)
    }
}

.business-list {
    width 25%
    display inline-block
}


.business-slide {
    padding-top 20px
    width 100%
    .business-list-info {
        display flex
        flex-direction column
        align-items center
        justify-content center
        width 100%
        h2 {
            width 96px
            height 96px
            background #eee
            img {
                display block
                width 100%
                height 100%
            }
        }
        p {
            height 24px
            line-height 24px
            color #4B4B4B
            font-size 24px
        }
    }
}

.business-introduce {
    margin-top 40px
    h2 {
        margin-bottom 20px
        height 36px
        line-height 36px
        font-size 36px
    }
    .business-introduce-info {
        display flex
        align-items center
        justify-content space-between
        margin-bottom 40px
        padding 20px
        width 100%
        background #fff
        box-shadow 0 10px 18px rgba(0,0,0,0.05)
        border-radius 10px
        box-sizing border-box
        h4 {
            display block
            margin 0 58px 0 50px
            width 108px
            height 108px
            img {
                width 108px
                height 108px
                display block
            }
        }
        .businesss-info-right {
            flex 1
            h3 {
                padding-bottom 20px
                height 32px
                line-height 32px
                font-size 32px
                color #4B4B4B
            }
            .businesss-info-con {
                margin-bottom 20px
                height 60px
                line-height 30px
                font-size 24px
                color #4B4B4B
                display -webkit-box
                -webkit-line-clamp 2
                overflow hidden
                text-overflow ellipsis
                -webkit-box-orient vertical
                word-wrap break-word
                word-break break-all
            }
            .businesss-info-time {
                display flex
                justify-content space-between
                align-items center
                color #BBBBBB
                span,
                i {
                    height 24px
                    font-size 24px
                }
                i {
                    font-style normal
                }
            }
        }
    }
}

.business-special {
    width 100%
    background #fff
    box-shadow 0px 10px 18px rgba(0,0,0,0.05)
    border-radius 10px
    h2 {
        padding 40px 0 30px
        height 36px
        line-height 36px
        text-align center
        font-size 36px
    }
    .business-special-list {
        padding 0 20px
        ul {
            display flex
            flex-wrap wrap
            justify-content space-between
            li {
                margin-bottom 20px
                width 310px
                h4 {
                    margin-bottom 20px
                    width 100%
                    height 170px
                    border-radius 10px
                    overflow hidden
                    img {
                        width 100%
                        height 170px
                        display block
                    }
                }
                h5 {
                    padding-bottom 10px
                    font-weight bold
                    font-size 32px
                    color #4B4B4B
                    overflow hidden
                    text-overflow ellipsis
                    word-wrap break-word
                    word-break break-all
                }
                p {
                    padding-bottom 10px
                    height 24px
                    line-height 24px
                    color #BBB
                    font-size 24px
                }
            }
        }
    }
}

.swiper-business-img {
  position relative
  width 670px
  height 280px
  background #eee
  overflow hidden
  .swiper-business-box {
    width 100%
    height 280px
    transform: translate3d(0,0,0)
    backface-visibility: hidden
  }
  img {
    display block
    width 100%
    height 100%
  }
}

.swiper-wrapper {
    height 100%
}

.swiper-business-pagination {
    position absolute
    display flex
    align-items center
    justify-content center
    bottom 10px !important
    height 40px
    z-index 1000
    text-align center
}

.swiper-pagination-bullet {
    width 14px
    height 14px
    background #4a4a4a
    margin 0 8px !important
    opacity 1 
}
.swiper-pagination-bullet-active {
    width 30px
    border-radius 15px
    background #fff
}
</style>