<!-- 头部banner组件 -->
<template>
  <div class="head-box">
        <div class="head">
            <img src="../../assets/images/banner/ry-bg01.png" alt="">
        </div>
        <swiper :options="swiperOption" ref="mySwiperA" class="swiper-img">
            <swiper-slide 
                v-for="(item, index) in data" 
                :key="index" 
                class="swiper-box"
            >
                <img :src="item" alt=""/>
            </swiper-slide> 
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    name: 'ry-banner-head',

    components: {
        swiper,
        swiperSlide
    },

    props: {
        data: {
            type: Array,
            default: () => {
                return []
            }
        }
    },

    data() {
        return {
            swiperOption: {
                notNextTick: true,
                pagination: {
                    el: '.swiper-pagination',
                },
                paginationClickable: true,
                // autoplay: {
                //     delay:3000  //这里需要注意，如果想每2秒去自动切换，直接autoplay:2000是失效的，
                // },
                loop: true,
                
            }
        }
    },
}
</script>

<style lang="stylus">
.head {
  height 256px
  padding-bottom 124px
  img {
    display block
    height 100%
    width 100%
  }
}

.swiper-img {
  position absolute
  top 60px
  left 50%
  transform translateX(-50%)
  width 670px
  height 280px
  box-shadow 0px 6px 12px rgba(0,0,0,0.16)
  border-radius 16px
  z-index 1
  overflow hidden
  .swiper-box {
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

.swiper-pagination {
    bottom 10px !important
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