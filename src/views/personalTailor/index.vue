<template>
  <div class="box">
        <div class="per-box">
        <ry-scroll-view 
            :showMore="true"
            :bounce="false"
            :data="data"
            :total="total"
            @onEndReached="loadMore"
            @scroll="scroll"
            class="per-scroll"
        >
            <div>
                <ry-banner-head 
                    :data="imgData"
                    class="banner-box"
                />
                <div class="ry-box">
                    <h2 
                        class="ry-fuwu" 
                        ref="fuwu"
                    >推荐服务
                    </h2>
                    <div class="ry-nav">
                        <van-tabs 
                            v-model="active" 
                            title-active-color="#FB701F"
                            color="#FB701F"
                            background="#f5f5f5"
                            line-width="20%"
                            title-inactive-color="#000"
                            animated
                            :border="false"
                            @click="changeTab"
                        >
                            <van-tab 
                                v-for="(item, index) in tabList" 
                                :key="index" 
                                :name="index"
                                :title="item"
                                :title-style="active == index ? 'font-weight:bold;' : 'font-weight:500;'"
                                class="ry-nav-text"
                            >
                                <div 
                                    ref="wrapperList"
                                    v-if="active === index"
                                    class="wrapper-list" 
                                >
                                    <template>
                                        <ry-result-network class="ry-network"  v-show="showNetWork"/>
                                    </template>
                                    <template v-show="!showNetWork">
                                        <ry-error-info v-show="showErrorIn" class="error-result"/>
                                        <div v-show="!showErrorIn" class="wrapper-list-box">
                                            <ry-loading v-show="showLoading" class="per-loading"/>
                                            <component 
                                                v-show="!showLoading"
                                                :is="component" 
                                                :data="data"
                                            />
                                        </div>
                                    </template>
                                </div>
                            </van-tab>
                        </van-tabs>
                    </div>
                </div>
            </div>
        </ry-scroll-view>
        <div 
            :class="['tabTop', {'tabVisible': isFixed }]" 
        >
            <h2 
                class="ry-fuwu" 
            >推荐服务
            </h2>
            <div class="ry-nav">
                <van-tabs 
                    v-model="active2" 
                    title-active-color="#FB701F"
                    color="#FB701F"
                    background="#f5f5f5"
                    line-width="20%"
                    title-inactive-color="#000"
                    animated 
                    swipeable
                    :border="false"
                    @click="changeTab2"
                >
                    <van-tab 
                        v-for="(item, index) in tabList" 
                        :key="index" 
                        :name="index"
                        :title="item"
                        :title-style="active == index ? 'font-weight:bold;' : 'font-weight:500;'"
                        class="ry-nav-text"
                    >
                    </van-tab>
                </van-tabs>
            </div>
        </div>
        </div>
  </div>
</template>

<script>
import Card from '@/views/card'
import Expect from '@/views/expect'
import mixins from '@/libs/mixins'
import { getHomeAdviserByServiceType } from '@/api/personalTailor/personalTailor'

export default {
    name: 'ry-personal-tailor',

    mixins: [mixins],

    components: {
        [Card.name]: Card,
        [Expect.name]: Expect
    },

    data() {
        const imgUrl = require('@/assets/images/banner/ry-banner.png')
        return {
            imgData: [imgUrl, imgUrl],
            scrollY: 0,
            offsetTop: 0,
            active: 0,
            active2: 0,
            height: 0,
            total: 0,
            bounce: {
                top: false,
                bottom: false,
                left: false,
                right: false
            },
            page: 1,   // 请求页数
            size: 5 
            ,  // 显示多少条数据
            data: [],
            tabList: ['信用卡','信贷','融资规划','征信服务'],
            component: 'ry-card',
            isFixed: false,
            showLoading: false
        }
    },

    watch: {
        scrollY() {
            if(this.scrollY >= this.offsetTop) {
               this.isFixed = true
           } else {
               this.isFixed = false
           }
        }
    },

    mounted() {
        this.init()
    },

    methods: {
        init() {
            const oBox = document.querySelector('.banner-box')
            this.offsetTop = oBox.offsetHeight

            this.setHeight()
            this.getCardList()
        },

        setHeight() {
            // 初始化每个tab最小高度，确保正常滑动
            this.$nextTick(() => {
                const oWrapper = document.querySelector('.wrapper-list')

                if (!oWrapper) return

                const oTab = document.querySelector('.tabTop')
                const more = document.querySelector('.scroll-view-more')
                const dHeight = document.querySelector('.per-scroll').offsetHeight
                const tHeight = oTab.offsetHeight
                const moreHeight = more ? more.offsetHeight : 0
                const height = dHeight - tHeight - moreHeight
             
                oWrapper.style.cssText = `min-height:${height}px`
            })
        },

        changeTab(name) {
            this.active2 = name
            this.changeCommon(name)
        },

        changeTab2(name) {
            this.active = name
            this.changeCommon(name)
        },


        changeCommon(name) {
            this.setHeight()
            this.showLoading = false
            this.showNetWork = false
            this.showErrorIn = false
            switch(name) {
                case 0:
                    this.component = 'ry-card'
                    this.page = 1
                    this.getCardList()
                    break
                default:
                    this.component = 'ry-expect'
                    this.data = []
            }
        },

        loadMore() {
            switch(this.active) {
                case 0: 
                    // 异步更新数据
                    this.page ++
                    this.getCardList()
                    break;
                default:
                    this.data = []
                    return
            }
        },

        scroll({scrollTop}) {
            this.scrollY = scrollTop
        },

        getCardList() {
            if (this.page === 1) this.showLoading = true
            const data = {
                serviceType: 0, // 类别：信用卡
                page: this.page,
                size: this.size
            }
            getHomeAdviserByServiceType(data)
            .then((res) => {
                const { success, queryResult } = res.data
                if(this.page === 1) this.showLoading = false
                if (success) {
                    this.total = queryResult.total
                    this.data = this.data.concat(queryResult.list)
                
                    this.hideErrorTip()
                } else {
                    this.showErrorTip(res)
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>

.per-box {
  height 100%
  setPadding()
  display flex
  flex 1
  flex-direction column
  background #f5f5f5
}

.head-box {
    height 350px
}

.ry-box {
    position relative
    flex 1
}

.ry-fuwu {
    padding 30px 40px 0
    height 28px
    font-size 28px
    line-height 28px
    color #000
    letter-spacing 3px
}

.ry-nav {
    .van-tabs__wrap {
        padding 0 40px
    }
}

.error-result {
    padding-top 90px
}

.ry-network {
    height auto
}

.wrapper-list {
    padding-top 34px
    overflow hidden
    box-sizing border-box
    .wrapper-li {
       
    }
}

.ry-nav {
    .ry-nav-text {
        font-size 28px
    }
}

.tabTop {
    width 100%
    position absolute
    top 0
    left 0
    z-index 2
    background #f5f5f5
    visibility hidden
    .van-tabs__line {
        transition visibility 0s, transform 0.3s !important
    }
    &.tabVisible {
        visibility visible
    }
}

</style>