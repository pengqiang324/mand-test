<template>
  <div class="myorder">
    <div class="myorder-head">
      <van-search
        v-model="searchValue"
        shape="round"
        background="#f5f5f5"
        placeholder="请输入姓名/手机号码"
        left-icon=""
        class="myorder-search"
        @search="onSearch"
      >
        <van-icon 
          name="search" 
          slot="right-icon" 
          @click="onSearch"
        />
      </van-search>
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
        @click="activeChange"
        class="tabs-tab"
      >
        <van-tab 
          v-for="(item,index) in tabList1"
          :key="index"
          :title="item" 
          title-style="font-weight:bold;font-size:16px;"
        >
          <!-- 会员卡订单 申卡贷款订单 start -->
          <div v-show="active !== 1">
            <!-- 二级tabs start -->
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
                  @click="cardChange"
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
            <!-- 二级tabs end -->
            <!-- 滚动区域内容 start -->
            <div
              :class="'tabs-scroll'+index"
            >
              <template v-if="showNetWork">
                <ry-result-network class="ry-network"/>
              </template>
              <template v-if="!showNetWork">
                <ry-error-info v-if="showErrorIn"/>
                <div class="myorder-view" v-if="!showErrorIn">
                  <ry-loading v-show="showloading" class="myorder-loading"/>
                  <!-- 空数据 start -->
                  <ry-result-empty 
                    v-if="!showloading && !data.length"
                    class="myOrder-empty"
                  />
                  <!-- 空数据 end -->
                  <ry-scroll-view 
                    v-show="!showloading &&data.length"
                    :showMore="true"
                    :bounce="false"
                    :data="data"
                    :total="total"
                    @onEndReached="loadMore"
                  >
                    <ul
                      class="data-list"
                    >
                      <li 
                        v-for="(item,index) in data"
                        :key="index"
                      >
                        <div class="order-user">
                          <h2>
                            <span v-lazy:background-image="item.headImage" ></span>
                            <i>{{item.name}}</i>
                          </h2>
                          <p>
                            <span 
                              v-if="item.memberLevel !== 'A'"
                              v-clipboard:copy="item.wxNo"
                              v-clipboard:success="onCopyWeixin"
                              v-clipboard:error="onError"
                              @click="setWxNo(item.wxNo)"
                            >
                              <img 
                                :src="item.wxNo ? weixinImg : weixinImgOffline"
                              >
                            </span>
                            <span
                              @click="showTelDialog(item.tel)"
                            >
                              <img :src="telImg" alt="">
                            </span>
                          </p>
                        </div>
                        <div class="order-pri">
                          <div class="order-member">
                            <h3>{{active ? item.cardName : '购买会员卡'}}</h3>
                            <span>{{statusMessage}}</span>
                          </div>
                          <div class="order-time" v-show="item.recommendTime">加入时间：{{item.recommendTime}}</div>
                          <div class="order-time" v-show="!item.recommendTime">加入时间：{{ item.applyTime*1000 | msgDateFormat}}</div>
                        </div>
                      </li>
                    </ul>
                  </ry-scroll-view>
                </div>
              </template>
            </div>
            <!-- 滚动区域内容 end -->
          </div>
          <!-- 会员卡订单 申卡贷款订单 end -->
          <!-- 服务订单 start -->
          <div 
            v-show="active == 1"
            class="fuwu-order"
          >
            <span>敬请期待</span>
          </div>
          <!-- 服务订单 end -->
        </van-tab>
      </van-tabs>
    </div>
    <!-- 微信，手机号组件 start -->
    <van-dialog 
      v-model="showSocket" 
      :show-cancel-button="showCancel"
      :showConfirmButton="showConfirm"
      :confirmButtonText="btnText"
      :confirmButtonColor="btnColor"
      :closeOnClickOverlay="true"
      @confirm="confirm"
    >
      <div class="weixin-box" v-if="showCancel" >
        <h2><img :src="weixinImg2" alt=""></h2>
        <h4>复制成功</h4>
        <div class="weixin-box-pri">
          <p>微信号：{{weixinNum}}</p>
          <p>已复制，可直接粘贴</p>
        </div>
      </div>
      <div class="tel-box" v-else>
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
        <!-- <a :href="'wtai://wp/ap;'+iphone+'#mp.weixin.qq.com'" class="telAp">添加到手机通讯录</a> -->
      </div>
    </van-dialog>
    <!-- 微信，手机号组件 end -->
  </div>
</template>

<script>
import { Search, Dialog, Icon } from 'vant'
import mixins from '@/libs/mixins'
import { getOrders, creditOrder } from '@/api/myOrder/myOrder'

export default {
    name: 'ry-myOrder',

    mixins: [mixins],

    components: {
      [Icon.name]: Icon,
      [Search.name]: Search,
      [Dialog.Component.name]: Dialog.Component
    },

    filters: {
        msgDateFormat: function(msg,pattern=''){
            // 将字符串转换为Date类型
            var mt = new Date(msg)
            // 获取年份
            var y = mt.getFullYear()
            // 获取月份 从0开始 
            var m = (mt.getMonth()+1).toString().padStart(2,"0")
            // 获取天数
            var d = mt.getDate();
            if(pattern === 'yyyy-mm-dd'){
                return y+"-"+m+"-"+d
            }
            // 获取小时
            var h = mt.getHours().toString().padStart(2,"0")
            // 获取分钟
            var mi = mt.getMinutes().toString().padStart(2,"0")
            // 获取秒
            var s = mt.getSeconds().toString().padStart(2,"0")
            // 拼接为我们需要的各式
            return y+"-"+m+"-"+d+" "+h+":"+mi+":"+s
        }
    },

    data() {
      const weixinImg = require('@/assets/images/myOrder/weixin.png')
      const weixinImgOffline = require('@/assets/images/myOrder/weixin-offline.png')
      const weixinImg2 = require('@/assets/images/myOrder/weixin02.png')
      const telImg = require('@/assets/images/myOrder/tel.png')
      const telImg2 = require('@/assets/images/myOrder/tel02.png')
      const txImg = require('@/assets/images/ry_logo@2x.png')
      return {
        weixinImg,
        weixinImg2,
        weixinImgOffline,
        telImg,
        telImg2,
        txImg,
        showSocket: false,
        showCancel: true,
        showConfirm: true,
        searchField: '',
        searchValue: '',
        weixinNum: 'pq17773191626',
        iphone: '17773191626',
        btnText: '去黏贴',
        btnColor: '#FF6F00',
        statusMessage: '开通店主',
        orderNum: 0, // 会员卡订单
        applyStatus: 8, // 申卡贷款查询 8 待激活
        tabsHeight1: 0,
        tabsHeight2: 0,
        setHeight: 0,
        active: 0,
        active2: 2,
        page: 1,
        size: 5,
        total: 0,
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

    created() {
      // 初始化 会员卡订单
      this.getData()
    },

    mounted() {
      this.initHeight()
    },

    methods: {
      getData() {
        this.page = 1 
        let paramsData = {}
        switch(this.active) {
          case 0:
            paramsData = {
              page: this.page,
              size: this.size,
              searchField: this.searchField
            }
            this.showloading = true
            getOrders(paramsData)
            .then((res) => {
              const { success, queryResult } = res.data
              if (success) {
                this.total = queryResult.total
                this.data = queryResult.list
              }
              this.showloading = false
            })
            break
          case 1:
            break
          default:
            paramsData = {
              page: this.page,
              size: this.size,
              applyStatus: this.applyStatus,
              searchField: this.searchField
            }
            this.showloading = true
            creditOrder(paramsData)
            .then((res) => {
              const { success, queryResult } = res.data
              if (success) {
                this.total = queryResult.total
                this.data = queryResult.list
              }
              this.showloading = false
            })
        }
      },

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

      setWxNo(wxNo) {
        if (!wxNo) return
        this.weixinNum = wxNo
      },

      /* 搜索 */
      onSearch() {
        this.searchField = this.searchValue
        switch(this.active) {
          case 0:
            this.getData()
            break
          case 1:
            break
          default:
            this.getData()
        }
      },

      /* 加载更多 */ 
      loadMore() {
        this.page ++
        var paramsData = {}
        switch(this.active) {
          case 0:
            paramsData = {
              page: this.page,
              size: this.size,
              searchField: this.searchField
            }
            getOrders(paramsData)
            .then((res) => {
              const { success, queryResult } = res.data
              if (success) {
                this.data = this.data.concat(queryResult.list)
              }
            })
            break;
          case 1:
            break;
          default:
            paramsData = {
              page: this.page,
              size: this.size,
              applyStatus: this.applyStatus,
              searchField: this.searchField
            }
            creditOrder(paramsData)
            .then((res) => {
              const { success, queryResult } = res.data
              if (success) {
                this.data = this.data.concat(queryResult.list)
              }
            })
        }
      },

      // 会员卡订单 服务订单 申卡贷款订单 tabs切换
      activeChange(index,name) {
        document.title = name
        /* 清空搜索参数 searchField */ 
        this.searchField = ''
        this.searchValue = ''
        this.page = 1
        switch(index) {
          case 0:
            this.statusMessage = '开通店主'
            break;
          case 1:
            this.statusMessage = '已完成'
            this.data = []
            break;
          default:
            this.statusMessage = '待激活'
        }
        this.getData()
      },

      // 申卡贷款订单 tabs切换
      cardChange(index,name) {
        this.statusMessage = name
        /* 清空搜索参数 searchField */ 
        this.searchField = ''
        this.searchValue = ''
        this.page = 1
        switch(name) {
          case '待查询':
            this.applyStatus = 0
            break
          case '待再查':
            this.applyStatus = 1
            break
          case '待激活':
            this.applyStatus = 8
            break
          case '已完成':
            this.applyStatus = 2
            break
          case '未通过':
            this.applyStatus = 3
            break
          default:
            this.applyStatus = 4
        }
        this.getData()
      },

      showTelDialog(tel) {
        this.showCancel = false
        this.showConfirm = false
        this.showSocket = true
        this.iphone = tel
      },

      onCopy() {
        this.$toast({
          message: '已复制',
          position: 'bottom'
        })
        this.showSocket = false
      },
      // 微信复制成功
      onCopyWeixin() {
        this.showCancel = true
        this.showConfirm = true
        this.showSocket = true
      },

      onError() {
        this.$toast({
          message: '复制失败',
          position: 'bottom'
        })
      },

      confirm() {
        window.WeixinJSBridge.call('closeWindow') //关闭微信公众号
      }
    }
}
</script>

<style lang="stylus">
.myorder {
    padding 0 40px
    height 100%
    background #f5f5f5
    box-sizing border-box

    .myorder-view {
      height 100%
    }

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

    .fuwu-order {
      padding-top 120px
      text-align center
      span {
        font-size 34px
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
        &:last-child {
          margin-bottom 0
        }
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
            span {
              display block
              width 49px
              height 40px
              &:nth-child(2) {
                margin-left 50px
                width 40px
              }
            }
            img {
              display block
              width 100%
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
        &.telAp {
          padding-bottom 50px
          color #FF6F00
        }
      }
      
      h4,a {
        margin 0 60px
        padding 20px 0
        border-bottom 2px solid #ececec
      }

      h4 {
        padding-bottom 50px
      }
    }

    [class*='van-hairline']::after {
      position static
    }

    /*网络连接反馈组件 融溢图标加载 无数据组件*/ 
    .ry-network {
      position static
    }

    .myorder-loading {
      align-items flex-start
      img {
        width 140px
      }
    }

    .myOrder-empty {
      padding-top 204px
    }
}
</style>