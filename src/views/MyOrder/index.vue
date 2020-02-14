<template>
  <div class="myorder">
    <div class="myorder-head">
      <van-search
        v-model="searchValue"
        shape="round"
        background="#f5f5f5"
        placeholder="请输入手机号码"
        left-icon=""
        right-icon="search"
        class="myorder-search"
        @search="onSearch"
      />
    </div>
    <div class="myorder-tabs">
      <van-tabs 
        v-model="active"
        background="#f5f5f5"
        color="#000"
        title-active-color="#FF6600"
        title-inactive-color="#000"
        line-width="33.3%"
        :border="false"
        @click="acitveChange"
        class="tabs-tab"
      >
        <van-tab 
          v-for="(item,index) in tabList1"
          :key="index"
          :title="item" 
          title-style="font-weight:bold;font-size:16px;"
        >
          <div 
            :class="'tabs-box'+index"
          >
            <div
              v-show="active == 2"
              class="tabs-head-list"
            >
              <van-tabs 
                v-model="active2"
                background="#f5f5f5"
                color="#FF6600"
                title-active-color="#000"
                title-inactive-color="#000"
                line-width="16.6%"
                :border="false"
              >
                <van-tab 
                  v-for="(value,key) in tabList2"
                  :key="key"
                  :title="value" 
                  :title-style="active2 == key ? 'font-weight:bold;font-size: 16px;' : 'font-size: 14px;'"
                >
                </van-tab>
              </van-tabs>
            </div>
          </div>
          <div
            :class="'tabs-scroll'+index"
          >
            <ry-scroll-view 
              :showMore="true"
              :bounce="false"
              :data="data"
              :total="total"
              @onEndReached="loadMore"
            >
              <ul class="data-list">
                <li 
                  v-for="(item,index) in 10"
                  :key="index"
                >
                  <div class="order-user">
                    <h2>
                      <span v-lazy:background-image="txImg" ></span>
                      <i>周勇</i>
                    </h2>
                    <p>
                      <img :src="weixinImg" alt="">
                      <img :src="telImg" alt="">
                    </p>
                  </div>
                  <div class="order-pri">
                    <div class="order-member">
                      <h3>购买会员卡</h3>
                      <span>开通店主</span>
                    </div>
                    <div class="order-time">加入时间：2019-09-23  17:45:28</div>
                  </div>
                  <div class="order-proccess">
                    <p class="proccess-btn">进度查询</p>
                  </div>
                </li>
              </ul>
            </ry-scroll-view>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 微信，手机号组件 start -->
    <van-dialog 
      v-model="showSocket" 
      :show-cancel-button="showCancel"
      :confirmButtonText="btnText"
      :confirmButtonColor="btnColor"
      :closeOnClickOverlay="true"
    >
      <div class="weixin-box" v-if="!true">
        <h2><img :src="weixinImg2" alt=""></h2>
        <h4>复制成功</h4>
        <div class="weixin-box-pri">
          <p>微信号：123456789</p>
          <p>已复制，可直接粘贴</p>
        </div>
      </div>
      <div class="tel-box">
        <h2><img :src="telImg2" alt=""></h2>
        <h3>{{tel}}</h3>
        <a :href="'tel:'+iphone">呼叫</a>
        <h4
          v-clipboard:copy="iphone"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >
          复制
        </h4>
      </div>
    </van-dialog>
    <!-- 微信，手机号组件 end -->
  </div>
</template>

<script>
import { Search, Dialog } from 'vant'

export default {
    name: 'ry-myOrder',

    components: {
      [Search.name]: Search,
      [Dialog.Component.name]: Dialog.Component
    },

    data() {
      const weixinImg = require('@/assets/images/myOrder/weixin.png')
      const weixinImg2 = require('@/assets/images/myOrder/weixin02.png')
      const telImg = require('@/assets/images/myOrder/tel.png')
      const telImg2 = require('@/assets/images/myOrder/tel02.png')
      const txImg = require('@/assets/images/ry_logo@2x.png')
      return {
        weixinImg,
        weixinImg2,
        telImg,
        telImg2,
        txImg,
        showSocket: true,
        showCancel: false,
        searchValue: '',
        iphone: '17773191626',
        btnText: '添加到手机通讯录',
        btnColor: '#FF6F00',
        tabsHeight1: 0,
        tabsHeight2: 0,
        setHeight: 0,
        active: 0,
        active2: 2,
        page: 1,
        size: 5,
        total: 20,
        tabList1: ['会员卡订单','服务订单','申卡贷款订单'],
        tabList2: ['待查询','待再查','待激活','已完成','未通过','失效'],
        data: []
      }
    },

    watch: {
      active(index) {
        this.$nextTick(() => {
          if (index == 2) {
            this.tabsHeight2 = document.querySelector(`.tabs-box${index}`).offsetHeight
          } else {
            this.tabsHeight2 = 0
          }
          this.SetHeight(index)
        })
      }
    },

    computed: {
      tel() {
        return `${this.iphone.substr(0, 3)}****${this.iphone.substr(7, 4)}`
      }
    },

    mounted() {
      this.initHeight()
    },

    methods: {
      initHeight() {
        this.$nextTick(() => {
          const bodyHeight = document.body.offsetHeight
          const searchHeight = document.querySelector('.myorder-head').offsetHeight
          this.setHeight = (bodyHeight - searchHeight)
          this.tabsHeight1 = document.querySelector('.van-tabs__wrap').offsetHeight
          document.querySelector('.myorder-tabs').style.height = this.setHeight + 'px'
          this.SetHeight(0)
        })
      },

      SetHeight(index) {
        document.querySelector(`.tabs-scroll${index}`).style.height = this.setHeight - this.tabsHeight1 - this.tabsHeight2  + 'px'
      },

      onSearch(value) {
        console.log(value)
      },

      loadMore() {
          
      },

      acitveChange() {
        // console.log(index)
      },

      onCopy() {
        this.$toast.success('复制成功')
      },

      onError() {
        this.$toast.fail('复制失败')
      },
    }
}
</script>

<style lang="stylus">
.myorder {
    padding 0 40px
    height 100%
    background #f5f5f5
    box-sizing border-box
    .myorder-head {
      padding-top 30px
    }
    .myorder-search {
      .van-search__content--round {
        padding-left 30px
        box-shadow:0px 6px 12px rgba(0,0,0,0.1)
      }
      .van-field__right-icon {
        margin-right 0
      }
      input {
        caret-color #ff8324
      }
    }
    .myorder-tabs {
      .tabs-span {
        font-size 32px
      }
      .van-tabs__wrap  {
        padding-bottom 30px
      }
      .tabs-scroll {
        height 100%
      }
    }

    .data-list {
      li {
        margin-bottom 20px
        padding 20px 20px 0
        box-sizing border-box
        background #fff
        border-radius 10px
        box-shadow:0px 2px 14px rgba(0,0,0,0.05)
        .order-user {
          display flex
          justify-content space-between
          padding-bottom 10px
          border-bottom 2px solid rgba(236,236,236,1)
          h2 {
            display flex
            span {
              display block
              margin-right 20px
              width 40px
              height 40px
              background-size cover
              background-position center
              background-repeat no-repeat
              border-radius 50%
              border 2px solid rgba(112,112,112,1)
              &[lazy="loading"] {
                background-color #eee
              }
            }
            i {
              display flex
              align-items center
              font-style normal
              font-size 24px
              color #000
            }
          }

          p {
            flex 1
            display flex
            justify-content flex-end
            img {
              display block
              width 49px
              height 40px
              &:nth-child(2) {
                margin-left 50px
                width 40px
              }
            }
          }
        }
        .order-pri {
          .order-member {
            display flex
            align-items center
            justify-content space-between
            padding 20px 0
            h3 {
              font-size 28px
            }
            span {
              display block
              font-size 24px
              color #FC8720
            }
          }
          .order-time {
            padding-bottom 30px
            height 20px
            line-height 20px
            font-size 20px
            color #959595
          }
        }
        .order-proccess {
          display flex
          justify-content flex-end
          padding 20px 0
          border-top 2px solid rgba(236,236,236,1)
          .proccess-btn {
            display flex
            align-items center
            justify-content center
            width 188px
            height 48px
            font-size 24px
            font-weight 400
            border 2px solid rgba(255,102,0,1)
            box-sizing border-box
            border-radius 24px
          }
        }
      }
    }

    .weixin-box {
      padding-top 40px
      h2 {
        img {
          margin auto
          display block
          width 96px
          height 78px
        }
      }

      h4 {
        padding 28px 0 38px
        height 44px
        line-height 44px
        text-align center
        font-size 44px
        color #3A3A3A
      }

      .weixin-box-pri {
        margin 0 60px
        padding-bottom 78px
        border-bottom 2px solid #ececec
        p {
          height 24px
          line-height 24px
          text-align center
          font-size 24px
          color #3A3A3A
          &:first-child {
            padding-bottom 10px
          }
        }
      }
    }
    
    .tel-box {
      h2 {
        img {
          display block
          margin auto
          width 88px
          height 88px
          padding 50px 0 30px
        }
      }
      h3,h4,a {
        height 40px
        line-height 40px
        text-align center
        color #3a3a3a
      }
      h3 {
        padding-bottom 14px
      }
      a {
        display block
        font-weight bold
      }
      h4,a {
        margin 0 60px
        padding 20px 0
        border-bottom 2px solid #ececec
      }
    }

    [class*='van-hairline']::after {
      position static
    }
}
</style>