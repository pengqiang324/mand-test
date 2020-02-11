<template>
  <div class="mine-box">
      <ry-scroll-view
        :bounce="false"
      >
        <div class="mine-info">
            <div :class="['mine-top',{'mine-customer-active': isCustomer}]">
                <div
                  v-lazy:background-image="star ? bgImg : ''"
                  class="mine-top-box lazyBg"
                >
                  <div class="mine-info-head">
                    <div class="mine-head-top">
                      <h2><img v-lazy="consumerData.headImage" alt=""></h2>
                      <div class="mine-head-right">
                        <h4><b>{{consumerData.name}}<font v-if="isCustomer">信用卡专员</font></b><span><img src="../assets/images/mine/icon.png" alt=""><i>2</i></span></h4>
                        <!-- 不是顾问状态显示 -->
                        <div v-if="!isCustomer">
                          <p class="mine-head-phone">{{consumerData.tel}}
                            <span v-if="star">店主</span>
                            <span v-if="!star">客户</span>
                            <img 
                              v-lazy="starImg"
                              v-for="(item,index) in star"
                              :key="index"
                            />
                          </p>
                          <p 
                            v-if="star"
                            class="mine-head-indenty"
                          >
                            邀请码：{{consumerData.inviteCode}}
                            <span
                              v-clipboard:copy="consumerData.inviteCode"
                              v-clipboard:success="onCopy"
                              v-clipboard:error="onError"
                            >复制</span>
                          </p>
                          <router-link 
                            v-if="!star"
                            to="/learnCourse"
                            tag="p"
                            class="mine-get-indenty"
                          >
                            获取我的邀请码
                          </router-link>
                        </div>
                        <!-- 不是顾问状态显示 -->
                        <!-- 顾问状态显示 start -->
                        <div v-if="isCustomer" class="mine-head-customer">专业：<span>3-50万信用卡私人定制</span></div>
                        <!-- 顾问状态显示 end-->
                      </div>
                    </div>
                    <div class="mine-head-bottom">
                      <h3>可提现收入</h3>
                      <h4>
                          <md-icon
                            name="rmb"
                            size="xs"
                            class="mine-rmb"
                          />
                          <span>{{consumerData.usedAmount}}</span>
                      </h4>
                      <div class="mine-bottom-pri">
                        <i>（总收入 {{consumerData.totalAmount}}元）</i>
                        <div class="mine-bottom-btn">
                          <div class="mine-pri-tx"><span>提现</span></div>
                          <div class="mine-pri-mx"><span>明细</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 店主显示内容且不是顾问状态 start -->
                  <div 
                    v-if="star && !isCustomer"
                    class="mine-info-pri"
                  >
                    <div class="mine-info-pri-left">
                      <h4>店主</h4>
                      <p v-if="star === 1">您还需要销售20张会员卡可晋升为店主<img v-for="(item,index) in 2" :key="index" v-lazy="starImg"/></p>
                      <p v-if="star === 2">您还需要培养5名店主<img v-lazy="starImg"/><img v-lazy="starImg"/>，会员卡总业绩还需销售750张晋升为店主<img v-for="(item,index) in 3" :key="index" v-lazy="starImg"/></p>
                      <p v-if="star === 3">您可以申请加盟实体门店免加盟费免第一年服务费</p>
                    </div>
                    <div :class="['mine-info-pri-right', {'mine-info-on': star === 2}, {'mine-info-one': star === 1}]">
                      <van-icon 
                        name="arrow" 
                        class="min-arrow"
                      />
                    </div>
                  </div>
                  <!-- 店主显示内容且不是顾问状态 end -->
                </div>
            </div>

            <!-- 顾问状态显示 start -->
            <div v-if="isCustomer" class="mine-customer-info">
                <p>回复率：<span>100%</span></p>
                <p>咨询人数：<span>76</span></p>
                <p>好评率：<span>100%</span></p>
            </div>
            <!-- 顾问状态显示 end -->

            <div class="mine-list-box">
              <div 
                v-for="(item,index) in list"
                :key="index"
                class="mine-cell-list"
              >
                <van-cell 
                  v-for="(value,key) in item.data"
                  :key="key"
                  :to="value.url ? value.url : ''"
                  is-link
                  class="mine-cell"
                >
                  <template slot="title">
                    <p>
                      <img v-lazy="value.icon" alt="">
                      <span v-if="value.isshow">2</span>
                    </p>
                    <span class="custom-title">{{value.title}}</span>
                    <i 
                      v-if="index === 1 && key === 2"
                      class="mine-cell-icon"
                    >
                      必看
                    </i>
                  </template>
                </van-cell>
              </div>
            </div>
        </div>
        <div class="mine-cell-list">
          <van-cell>
            <!-- 使用 title 插槽来自定义标题 -->
            <template slot="title">
              <div role="button" class="ry-logout" @click="loginOut">清除缓存</div>
            </template>
          </van-cell>
        </div>
      </ry-scroll-view>
  </div>
</template>

<script>
import { logout } from '@/api/user/user'
import { Icon } from 'vant'
import { refreshUserInfo } from '@/api/user/user'

export default {
    name: 'ry-mine',

    components: {
      [Icon.name]: Icon
    },

    data() {
      const txImg = require('../assets/images/ry_logo@2x.png')
      const starImg = require('../assets/images/mine/icon-star.png')
      const bgImg = require('../assets/images/mine/bg.png')
      return {
        txImg,
        starImg,
        bgImg,
        grade: 'A',
        isCustomer: false,
        iconList: [
          {
            data: [
              {
                icon: require('../assets/images/mine/icon01.png'),
                title: '我的订单'
              },
              {
                icon: require('../assets/images/mine/icon02.png'),
                title: '客户管理'
              },
              {
                icon: require('../assets/images/mine/icon03.png'),
                title: '我的团队'
              },
              {
                icon: require('../assets/images/mine/icon04.png'),
                title: '我的顾问',
                isshow: true
              },
              {
                icon: require('../assets/images/mine/icon05.png'),
                title: '商学院',
                url: '/business'
              }
            ]
          },
          {
            data: [
              {
                icon: require('../assets/images/mine/icon06.png'),
                title: '推广海报'
              },
              {
                icon: require('../assets/images/mine/icon07.png'),
                title: '推广教程'
              },
              {
                icon: require('../assets/images/mine/icon08.png'),
                title: '联系推荐人'
              },
              {
                icon: require('../assets/images/mine/icon09.png'),
                title: '联系客服'
              },
              {
                icon: require('../assets/images/mine/icon10.png'),
                title: '设置',
                url: '/setting'
              }
            ]
          }
        ],
        aIconList: [
          {
            data: [
              {
                icon: require('../assets/images/mine/icon01.png'),
                title: '我的订单'
              },
              {
                icon: require('../assets/images/mine/icon04.png'),
                title: '我的顾问',
                isshow: true
              },
              {
                icon: require('../assets/images/mine/icon08.png'),
                title: '联系推荐人'
              },
              {
                icon: require('../assets/images/mine/icon05.png'),
                title: '商学院'
              },
              {
                icon: require('../assets/images/mine/icon10.png'),
                title: '设置',
                url: '/setting'
              },
            ]
          }
        ],
        customerList: [
          {
            data: [
              {
                icon: require('../assets/images/mine/icon03.png'),
                title: '我的客户'
              },
              {
                icon: require('../assets/images/mine/icon11.png'),
                title: '融溢头条'
              },
              {
                icon: require('../assets/images/mine/icon02.png'),
                title: '个人信息'
              },
              {
                icon: require('../assets/images/mine/icon10.png'),
                title: '设置',
                url: '/setting'
              }
            ]
          }
        ],
        consumerData: {}
      }
    },

    computed: {
      star() {
        switch(this.grade) {
          case 'A':
            return 0
          case 'D':
            return 1
          case 'H':
            return 3 
          default:
            return 2  // Z ZH 2星店主 2星半店主
        }
      },
      list() {
        if(this.isCustomer) {
          // 顾问状态
          return this.customerList
        } else {
          // 不是顾问状态
          switch(this.grade) {
            case 'a':
              return this.aIconList
            default:
              return this.iconList
          }
        }
      }
    },

    created() {
      this.initData()
    },

    methods: {
      initData() {
        refreshUserInfo()
        .then((res) => {
          const { success, data } = res.data
          if (success) {
              this.consumerData = data
              this.grade = data.memberLevel
              if (data.memberLevel !== 'A') {
                window.localStorage.setItem('userStatus', 1)
                this.$store.dispatch('shopOwner/updateStatus', 1) 
              }
          }
        })
      },

      onCopy() {
        this.$toast.success('复制成功')
      },

      onError() {
        this.$toast.fail('复制失败')
      },

      loginOut() {
        logout()
        .then((res) => {
            if (res.status == 200) {
              localStorage.removeItem('token') // 清token
              localStorage.removeItem('userStatus') //用户状态
              this.$router.push({
                path: '/',
                query: {
                  delCode: 1,
                },
              });
            }
          });
      }
    }
}
</script>

<style lang="stylus">
  .mine-box {
    setPadding()
    background #f5f5f5
  }

  .mine-font {
    font-size 32px
  }

  .ry-logout {
    text-align center
  }

  .mine-top {
    margin-bottom 50px
    padding-top 40px
    background url('../assets/images/banner/ry-bg01.png') top center no-repeat
    background-size 100%
    &.mine-customer-active {
      margin-bottom 40px
    }
  }

  .mine-top-box {
    position relative
    left 50%
    transform translateX(-50%)
    width 690px
    box-shadow 0 10px 18px rgba(0,0,0,0.05)
    background-size 100% 
    background-repeat no-repeat
    background-position bottom center
    border-radius 10px
    overflow hidden
    .mine-info-head {
      padding 30px
      width 100%
      height 338px
      background #fff
      border-radius 0 0 10px 10px
      box-sizing border-box
      .mine-head-top {
        display flex
        align-items center
        justify-content space-between
        margin-bottom 30px
        h2 {
          margin-right 30px
          width 128px
          height 128px
          box-shadow 0 2px 10px rgba(0,0,0,0.16)
          border-radius 50%
          overflow hidden
          img {
            width 128px
            height 128px
            display block
          }
        }
        .mine-head-right {
          flex 1
          h4 {
            display flex
            justify-content space-between
            align-items center
            padding-bottom 10px
            b {
              display flex 
              align-items flex-end
              height 40px
              line-height 40px
              font-size 40px
              color #000
              font {
                margin-left 30px
                height 28px
                font-size 28px
              }
            }
            span {
              position relative
              display block
              img {
                width 33px
                display block
              }
              i {
                position absolute
                right -12px
                top -8px
                width 24px
                height 24px
                line-height 24px
                text-align center
                border-radius 100%
                color #fff
                font-size 14px
                font-weight bold
                background #FF1010
                font-style normal
              }
            }
          }
          .mine-head-phone {
            display flex
            align-items center
            padding-bottom 20px
            height 24px
            line-height 24px
            font-size 24px
            color #888
            span {
              margin 0 10px 0 34px
              height 24px
              line-height 24px
              font-size 24px
              color #000
            }
            img {
              margin-right 4px
              width 28px
              display block
              position relative
              top -3px
            }
          }
          .mine-head-indenty {
            color #888
            span {
              display flex
              align-items center
              justify-content center
              margin-left 26px
              width 74px
              height 24px
              padding 5px 0
              font-size 24px
              border-radius 20px
              background rgba(255,136,0,0.3)
              color #D41C1C
              &:active {
                background #eee
              }
            }
          }
          .mine-head-indenty,
          .mine-get-indenty {
            display flex
            align-items center
            height 24px
            line-height 24px
            font-size 24px
          }
          .mine-get-indenty {
            color #FF5E00
          }
          .mine-head-customer {
            padding-top 28px
            height 28px
            line-height 28px
            font-size 28px
            span {
              color #FF5E00
            }
          }
        }
      }
      .mine-head-bottom {
        h3 {
          padding-bottom 8px
          height 24px
          line-height 24px
          font-size 24px
          color #000
        }
        h4 {
          display flex
          align-items baseline
          padding-bottom 10px
          height 44px
          .mine-rmb {
            display block
            font-weight bold
            font-size 24px
          }
          span {
            display block
            height 44px
            font-size 44px
          }
        }
        .mine-bottom-pri {
          display flex
          justify-content space-between
          align-items center
          i {
            height 24px
            line-height 24px
            font-size 24px
            font-style normal
            color #888
          }
          .mine-bottom-btn {
            flex 1
            display flex
            justify-content flex-end
            align-items center
          }
          .mine-pri-tx {
            display flex
            align-items center
            justify-content center
            margin-right 10px
            width 96px
            height 36px
            background #ccc
            border-radius 18px
            span {
              display block
              height 24px
              font-size 24px
              color #fff
            }
          }
          .mine-pri-mx {
            display flex
            align-items center
            justify-content center
            width 96px
            height 36px
            background #fff
            border 1px solid #FF6811
            border-radius 20px
            box-sizing border-box
            span {
              display block
              height 24px
              font-size 24px
              color #FF5E00
            }
          }
        }
      }
    }

    .mine-info-pri {
      display flex
      justify-content space-between
      height 144px
      padding 20px 32px 22px 40px
      box-sizing border-box
      .mine-info-pri-left {
        flex 1
        h4 {
          padding-bottom 12px
          height 36px
          line-height 36px
          font-size 36px
          color #fff
          letter-spacing 4px
        }
        p {
          line-height 30px
          font-size 24px
          color #fff
          letter-spacing 4px
          img {
            width 28px
            height 27px
            vertical-align text-top
            margin-left 5px
          }
        }
      }
      .mine-info-pri-right {
        display flex
        position relative
        top 18px
        margin-left 102px
        height 36px
        &.mine-info-on {
          margin-left 84px
        }
        &.mine-info-one {
          margin-left 30px
        }
        .min-arrow {
          font-size 36px
          color #fff
        }
      }
    }
  }

  .mine-cell-list {
    margin-bottom 50px
    box-shadow 0 10px 18px rgba(0,0,0,0.05)
    .mine-cell {
      align-items center
      .van-cell__title {
        display flex
        align-items center
      }
      p {
        position relative
        width 56px
        height 56px
        margin-right 40px
        img {
          width 56px
          height 56px
          display block
        }
        span {
          position absolute
          right -5px
          top -5px
          line-height 0
          padding 10px 0
          width 20px
          text-align center
          font-size 14px
          color #fff
          background #FF1010
          border-radius 50%
        }
      }
      .mine-cell-icon {
        margin-left 10px
        display flex
        align-items center
        justify-content center
        width 42px
        padding 4px
        height 18px
        text-align center
        font-size 18px
        font-style normal
        color #fff
        background #FE2300
        border-radius 10px 0 10px 10px
      }
    }
  }

  .mine-customer-info {
    display flex
    align-items center
    justify-content space-between
    padding 0 30px
    margin 0 auto 40px
    width 690px
    height 90px
    box-shadow 0 6px 14px rgba(0,0,0,0.25)
    border-radius 10px
    background #fff
    box-sizing border-box
    p {
      height 24px
      font-size 24px
      span {
        color #FF5E00
      }
    }
  }
</style>