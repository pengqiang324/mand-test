<template>
  <div class="home" v-cloak>
    <ry-scroll 
      class="home-wrapper"
      :pulldown="true"
      :pullup="true"
      :listen-scroll="true"
      :pull-up-load="true"
      :pull-down-refresh="true"
      :pull-up-msg="pullupMsg"
      :pull-down-msg="pulldownMsg"
      @pulldown="loadData"
      @scroll="onscroll"
      @scrollToEnd="onscrollend"
    >
      
        <template v-if="showNetwork">
          <ry-result-network/>
        </template>
        <template v-if="!showNetwork">
          <div class="head">
            <img src="../../assets/images/home/ry-bg01.png" alt="">
          </div>
          <ry-slider-scroll class="swiper-img">
              <div class="swiper-box">
                <img :src="swiperImg" alt="">
              </div>
              <div class="swiper-box">
                <img :src="swiperImg" alt="">
              </div>
              <div class="swiper-box">
                <img :src="swiperImg" alt="">
              </div>
          </ry-slider-scroll>
          <div class="card-box">
            <div class="swiper-icon">
              <ry-slider-scroll
                :loop="false"
                :auto-play="false"
                :is-show-doc="false"
              >
                <ul class="swiper-list" v-for="(item, index) in swiperIcon" :key="index">
                  <li v-for="(key, i) in item.imgs" :key="i">
                    <img :src="key.img" alt="">
                    <p>{{key.title}}</p>
                  </li>
                </ul>
              </ry-slider-scroll>
            </div>
            <div class="ry-tt">
              <span>融溢头条:</span>
              <ul>
                <li>我是文案！~我是文案！~我是文案！~</li>
              </ul>
            </div>
          </div>
          <div class="ry-banner">
            <img src="../../assets/images/home/ry-banner01.png" alt="">
          </div>
          <div class="bank-list">
            <h1 class="tj-bank">推荐银行</h1>
            <ul>
              <li>
                <h2><img src="../../assets/images/home/ry-bank01.png" alt=""></h2>
                <h4>花旗银行</h4>
                <div class="bank-lable">
                  <span class="bank-fro">自动结算</span>
                  <span>秒批</span>
                </div>
                <p class="bank-descri">消费即得36%返现</p>
                <p>餐饮购物5折优惠</p>
                <div class="rj-sq">
                  <span>立即申请</span>
                  <!-- <span>待定</span> -->
                </div>
              </li>
              <li>
                <h2><img src="../../assets/images/home/ry-bank01.png" alt=""></h2>
                <h4>花旗银行</h4>
                <div class="bank-lable">
                  <span class="bank-fro">自动结算</span>
                  <span>秒批</span>
                </div>
                <p class="bank-descri">消费即得36%返现</p>
                <p>餐饮购物5折优惠</p>
                <div class="rj-sq rj-sq-on">
                  <span>立即申请</span>
                  <!-- <span>待定</span> -->
                </div>
              </li>
              <li>
                <h2><img src="../../assets/images/home/ry-bank01.png" alt=""></h2>
                <h4>花旗银行</h4>
                <div class="bank-lable">
                  <span class="bank-fro">自动结算</span>
                  <span>秒批</span>
                </div>
                <p class="bank-descri">消费即得36%返现</p>
                <p>餐饮购物5折优惠</p>
                <div class="rj-sq rj-sq-on">
                  <span>立即申请</span>
                  <!-- <span>待定</span> -->
                </div>
              </li>
              <li>
                <h2><img src="../../assets/images/home/ry-bank01.png" alt=""></h2>
                <h4>花旗银行</h4>
                <div class="bank-lable">
                  <span class="bank-fro">自动结算</span>
                  <span>秒批</span>
                </div>
                <p class="bank-descri">消费即得36%返现</p>
                <p>餐饮购物5折优惠</p>
                <div class="rj-sq rj-sq-on">
                  <span>立即申请</span>
                  <!-- <span>待定</span> -->
                </div>
              </li>
              <li>
                <h2><img src="../../assets/images/home/ry-bank01.png" alt=""></h2>
                <h4>花旗银行</h4>
                <div class="bank-lable">
                  <span class="bank-fro">自动结算</span>
                  <span>秒批</span>
                </div>
                <p class="bank-descri">消费即得36%返现</p>
                <p>餐饮购物5折优惠</p>
                <div class="rj-sq rj-sq-on">
                  <span>立即申请</span>
                  <!-- <span>待定</span> -->
                </div>
              </li>
              <li>
                <h2><img src="../../assets/images/home/ry-bank01.png" alt=""></h2>
                <h4>花旗银行</h4>
                <div class="bank-lable">
                  <span class="bank-fro">自动结算</span>
                  <span>秒批</span>
                </div>
                <p class="bank-descri">消费即得36%返现</p>
                <p>餐饮购物5折优惠</p>
                <div class="rj-sq rj-sq-on">
                  <span>立即申请</span>
                  <!-- <span>待定</span> -->
                </div>
              </li>
            </ul>
          </div>
        </template>
    </ry-scroll>
  </div>
</template>

<script>
import {
  Swiper, 
  ActionBar, 
  SwiperItem, 
} from 'mand-mobile'

import { mapState } from 'vuex'
import mixins from '@/libs/mixins'

export default {
  name: "ry-home",

  mixins: [mixins],

  components: {
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem,
    [ActionBar.name]: ActionBar,
  },

  data() {
    return {
      swiperImg: require('@/assets/images/home/swiper01.png'),
      swiperIcon: [
        {
          imgs: [
            {
              img: require('@/assets/images/home/ry-icon01.png'),
              bgColor: '#fff',
              title: '3-50万信用卡'
            },
            {
              img: require('@/assets/images/home/ry-icon02.png'),
              bgColor: '#fff',
              title: '积分兑换'
            },
            {
              img: require('@/assets/images/home/ry-icon03.png'),
              bgColor: '#fff',
              title: '信用卡管家'
            }
          ]
        },
        {
          imgs: [
            {
              img: require('@/assets/images/home/ry-icon01.png'),
              bgColor: '#fff',
              title: '3-50万信用卡'
            },
            {
              img: require('@/assets/images/home/ry-icon02.png'),
              bgColor: '#fff',
              title: '积分兑换'
            },
            {
              img: require('@/assets/images/home/ry-icon03.png'),
              bgColor: '#fff',
              title: '信用卡管家'
            }
          ]
        },
      ],
      data: [],
      pulldown: true,
      pulldownMsg: '下拉刷新',
      pullupMsg: '上拉加载'
    }
  },

  computed: {
    ...mapState([
      'showNetwork',
    ])
  },

  created() {
     this.showDiaLog() // 是否显示完善信息弹窗
  },

  mounted() {
  },


  methods: {
    loadData(scroll) {
      this.pulldownMsg = "正在努力更新..."
      setTimeout(() => {
        this.pulldownMsg = '下拉刷新'
        scroll.finishPullDown() //数据加载完毕
      }, 3000)
    },

    onscroll(pos) {
      if(pos.y > 50){
          this.pulldownMsg = '释放立即刷新'
      } else {
        if (this.pulldownMsg !== '下拉刷新') {
          this.pulldownMsg = '正在努力更新...'
        }
      }
    },

    onscrollend(scroll) {
      this.pullupMsg='玩命加载中...'
      setTimeout(() => {
        this.pullupMsg = '加载更多'
        scroll.finishPullUp()
      }, 3000)
    }
  },
};
</script>

<style lang="stylus">
.home {
  overflow hidden
  padding-bottom 180px
  box-sizing border-box
  position relative
  width 100%
  font-size 28px
  background #f2f2f2
}

.home-wrapper {
  height 100%
}

.head {
  padding-bottom 124px
  img {
    display block
    width 100%
  }
}

.swiper-img {
  position absolute
  top 60px
  left 40px
  width 670px
  height 280px
  box-shadow 0px 6px 12px rgba(0,0,0,0.16)
  border-radius 16px
  z-index 1
  overflow hidden
  .swiper-box {
    float left
    width 100%
    height 280px
  }
  img {
    display block
    width 100%
    height 100%
  }
}

.card-box {
  padding 0 40px
  .swiper-icon {
    .swiper-list {
      float left
    }
    ul {
      display flex
      align-items center
      li {
        flex 1
        img {
          display block
          margin-bottom 10px
          width 120px
          margin auto
        }
        p {
          padding-top 10px
          line-height 24px
          text-align center
          font-size 24px
          color #000
          font-weight 400
        }
      }
    }
  }
}

.ry-tt {
  display flex
  margin 38px 0 8px
  padding  14px 22px 14px 30px
  height 56px
  line-height 28px
  border-radius 28px
  background #fff
  box-sizing border-box
  span {
    margin-right 15px
    line-height 28px
    color #f00
    font-weight bold
    font-size 28px
  }
  ul {
    flex 1
    color #101010
  }
}

.ry-banner {
  padding 0 16px 20px 18px
  img {
    width 100%
    height 222px
  }
}

.bank-list {
  padding 0 40px
  .tj-bank {
    margin-bottom 10px
    font-size 32px
    font-family Noto Sans S Chinese
    line-height 32px
  }
  ul {
    &:after {
      display block
      content ''
      clear both
    }
  }
  li {
    position relative
    float left
    margin-right 20px
    margin-top 20px
    width 210px
    height 310px
    background #fff
    border-radius 10px
    overflow hidden
    box-shadow:0px 8px 14px rgba(0,0,0,0.1);
    box-sizing border-box
    &:nth-child(3n) {
      margin-right 0
    }
    h2 {
      img {
        display block
        margin auto
        width 90px
        height 90px
      }
    }
    h4 {
      margin-bottom 30px
      font-size 30px
      font-family Noto Sans S Chinese
      line-height 30px
      text-align center
      color #3a3a3a
    }
    .bank-lable {
      display flex
      justify-content space-evenly
      margin-bottom 16px
      line-height 26px
      span {
        display block
        padding 3px 4px 0
        line-height 20px
        color #FF5E00
        font-size 20px
        border 1px solid rgba(255,94,0,1)
        border-radius 4px
        box-sizing border-box
        &.bank-fro {
          border-color #989898
          color #989898
        }
      }
    }
    p {
      line-height 20px
      text-align center
      font-size 20px
      color #989898
      &.bank-descri {
        margin-bottom 10px
      }
    }
    .rj-sq {
      position absolute
      bottom 0
      width 100%
      height 48px
      line-height 48px
      text-align center
      background #FC2F20
      &.rj-sq-on {
        background #989898
      }
      span {
        line-height 24px
        font-size 24px
        font-family Noto Sans S Chinese
        color #fff
        letter-spacing 2px
      }
    }
  }
}

[v-cloak] {
  display none
}

</style>
