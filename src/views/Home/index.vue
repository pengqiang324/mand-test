<template>
  <div class="home needsclick" v-cloak>
        <template v-if="showNetwork">
          <ry-result-network class="ry-network"/>
        </template>
        <template v-if="!showNetwork">
          <ry-error-info v-show="showError"/>
          <div v-show="!showError">
            <div>
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
            </div>
            <div class="card-box">
              <div class="swiper-icon">
                  <ul class="swiper-list">
                    <li v-for="(key, i) in swiperIcon.imgs" :key="i">
                      <h2><img v-lazy="key.img" alt=""></h2>
                      <p>{{key.title}}</p>
                    </li>
                  </ul>
              </div>
              <div class="ry-tt">
                <div class="ry-title">
                  <span>融溢头条:</span>
                </div>
                <div class="ry-news">
                  <swiper class="roll-ul" :options="swiperOption" ref="mySwiper" v-if="topMovieLists.length>0" >
                      <swiper-slide v-for="(item,index) in topMovieLists" :key="index" >
                        <span>{{item.content}}</span>
                      </swiper-slide>
                    </swiper>
                </div>
              </div>
            </div>
            <div class="ry-banner" v-lazy:background-image="bannerImg">
            </div>
            <div class="bank-list">
              <h1 class="tj-bank">推荐银行</h1>
              <div class="bank-loading">
                <ry-m-loading 
                  class="loading" 
                  size="20px"
                  v-if="showLoading"
                />
                <ul v-else>
                  <li v-for="(item, index) in bankList" :key="index">
                    <h2 class="lazyload" v-lazy:background-image="item.picName" key="1"></h2>
                    <h4>{{item.name}}</h4>
                    <div class="bank-lable">
                      <span :class="['bank-span', 'border', { 'bank-fro': !item.isonline }]">{{item.onlineClerk}}</span>
                    </div>
                    <div v-if="!item.isonline">
                      <p class="bank-descri">{{item.oflineClerk}}</p>
                      <p>{{item.oflineLowerclerk}}</p>
                    </div>
                    <div v-if="item.isonline">
                      <p>{{item.onlineLowerclerk}}</p>
                    </div>
                    <div :class="['rj-sq', { 'rj-sq-on': !item.isonline }]">
                      <span v-if="item.isonline">立即申请</span>
                      <span v-else>待定</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import mixins from '@/libs/mixins'
import { getBankList, getNewNews } from '@/api/home'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: "ry-home",

  mixins: [mixins],

  components: {
    swiper,
    swiperSlide
  },

  data() {
    return {
      count: 0,
      showLoading: false,
      bannerImg: require('@/assets/images/home/ry-banner01.png'),
      swiperImg: require('@/assets/images/home/swiper01.png'),
      swiperIcon: {
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
      bankList: [],
      topMovieLists: [],
      bounce: {
        top: false,
        bottom: false,
        right: false,
        left: false
      },
      swiperOption: {
          notNextTick: true,
          direction: "vertical",   //控制滚动的方向
          paginationClickable: true,
          autoplay: {
              delay:3000  //这里需要注意，如果想每2秒去自动切换，直接autoplay:2000是失效的，
          },
          loop: true,
          
      },
    }
  },

  computed: {
    ...mapState([
      'showNetwork',
      'showError'
    ])
  },

  created() {
      this.showLoading = true
      this.showDiaLog() // 是否显示完善信息弹窗
      this.getBankList()
  },

  mounted() {
  },


  methods: {
    getNews() {
      getNewNews()
      .then((res) => {
        const { data, success } = res.data
        if (success) {
          this.topMovieLists = data
        } 
      })
    },

    getBankList() {
      const data = {
        city_name: '长沙',
      }
      getBankList(data)
      .then((res) => {
        const { data, success } = res.data
        if (success) {
            this.getNews() // 获取新闻信息
            const arr1 = data.online.map((item) => {
              item.isonline = 1
              return item
            })

            const arr2 = data.offline.map((item) => {
              item.isonline = 0
              return item
            })
            
            this.bankList = this.bankList.concat(arr1, arr2)
        }
        this.showLoading = false
      })
    }
  },
};
</script>

<style lang="stylus">
.ry-network {
 setPadding()
}


.home {
  width 100%
  height auto
  position absolute
  top 0
  left 0
  right 0
  bottom 100px
  font-size 28px
  background #f2f2f2
}

.home-wrapper {
  height 100%
  overflow hidden
}

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
    float left
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

.card-box {
  padding 0 40px 8px
  .swiper-icon {
    padding-bottom 38px
    .swiper-list {
      h2 {
        width 120px
        height 120px
        margin auto
      }
    }
    ul {
      display flex
      align-items center
      li {
        flex 1
        img {
          display block
          margin-bottom 10px
          width 100%
          height 100%
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
  padding  0 22px 0 30px
  height 56px
  line-height 28px
  border-radius 28px
  background #fff
  box-sizing border-box
  span {
    display flex
    padding 15px 0 14px
    align-items center
    display block
    margin-right 15px
    color #f00
    font-weight bold
    line-height 28px
    font-size 28px
  }
  .ry-news {
    display flex
    flex 1
    color #101010
    overflow hidden
    padding 15px 0
    align-items center
    .news-slider {
      height 56px
      line-height 56px
      overflow hidden
      box-sizing border-box
    }
    .swiper-container {
      height 56px
      line-height 56px
      overflow hidden
    }
    span {
      margin-right 0
      color #000
      font-weight 100
      font-size 28px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis 
      transform: translate3d(0,0,0)
      backface-visibility: hidden
      box-sizing border-box
    }
  }
}

.ry-banner {
  margin 0 auto 20px 
  width 716px
  height 222px
  background-size 100% 100%
  box-sizing border-box 
  &[lazy='loading'] {
    background-color #eee
  }
}

.bank-list {
  padding 0 40px 228px
  .tj-bank {
    padding-bottom 10px
    font-size 32px
    font-family Noto Sans S Chinese
    line-height 32px
  }
  .bank-loading {
    .loading {
      padding 50px 0 30px
    }
    img {
      width 120px
    }
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
      margin auto
      width 90px
      height 90px
      background-repeat no-repeat
      background-size 100% 100%
      &[lazy='loading'] {
        border-radius 50%
        transform scale(.7)
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
      margin auto
      display table
      padding-bottom 16px
      .bank-span {
        display: table-cell
        text-align center
        vertical-align middle
        background #fff
        min-width 52px
        padding 5px 4px
        height 20px
        color #FF5E00
        font-size 20px
        &:first-child {
          margin-right 8px
        }
        &.border:before {
          border-radius 8px
          border-color rgba(255,94,0,1)
        }
        &.bank-fro {
          color #989898
          &.border:before {
            border-color #989898
          }
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
      border-radius 0 0 10px 10px
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
