<template>
  <div class="box">
        <div class="per-box">
        <ry-scroll-view 
            :bounce="false"
            class="per-scroll"
        >
            <ry-banner-head 
                :data="imgData"
            />
            <div class="ry-box">
                <h2 class="ry-fuwu" ref="fuwu">推荐服务</h2>
                <div class="ry-nav">
                    <van-tabs 
                        v-model="active" 
                        title-active-color="#FB701F"
                        color="#FB701F"
                        background="#f5f5f5"
                        line-width="20%"
                        title-inactive-color="#000"
                        animated 
                        swipeable
                        :border="false"
                        @change="changeTab"
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
                                :style="{height: height}"
                                class="wrapper-list" 
                            >
                                <component :is="component"></component>
                            </div>
                        </van-tab>
                    </van-tabs>
                </div>
            </div>
        </ry-scroll-view>
        </div>
  </div>
</template>

<script>
import Card from '@/views/card'
import Credit from '@/views/credit'

export default {
    name: 'ry-personal-tailor',

    components: {
        [Card.name]: Card,
        [Credit.name]: Credit
    },

    data() {
        const imgUrl = require('@/assets/images/banner/ry-banner.png')
        return {
            imgData: [imgUrl, imgUrl],
            active: 0,
            height: 0,
            loading: false,
            finished: false,
            bounce: {
                top: false,
                bottom: false,
                left: false,
                right: false
            },
            list: [],
            tabList: ['信用卡','信贷','融资规划','征信服务'],
            component: 'ry-card'
        }
    },

    mounted() {
        this.init()
    },

    methods: {
        init() {
            this.$nextTick(() => {
                const titleHead = document.querySelector('.van-tabs__wrap').offsetHeight
                const headHeight = document.querySelector('.head-box').offsetHeight
                const dHeight = document.querySelector('.per-scroll').offsetHeight
                const fuwuHeight = this.$refs.fuwu.offsetHeight
                this.height =  (dHeight - (fuwuHeight + titleHead + headHeight)) + 'px'
            })
        },

        onLoad() {
            // 异步更新数据
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    this.list.push(this.list.length + 1)
                }
                // 加载状态结束
                this.loading = false

                // 数据全部加载完成
                if (this.list.length >= 40) {
                this.finished = true
                }
            }, 500)
        },

        changeTab(name) {
            switch(name) {
                case 0:
                    this.component = 'ry-card'
                    break
                default:
                    this.component = 'ry-credit'
            }
        },
    }
}
</script>

<style lang="stylus" scope>

.per-box {
  height 100%
  setPadding()
  display flex
  flex 1
  flex-direction column
  background #f5f5f5
}

.head-box {
    height 380px
}

.ry-box {
    position relative
    flex 1
    .ry-fuwu {
        padding 0 40px
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
}

.per-scroll {
    .scroll-view-container {
        height 100% !important
    }
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

</style>