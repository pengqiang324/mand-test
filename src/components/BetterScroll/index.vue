<template>
  <div class="wrapper-box" ref="wrapper">
    <div class="wrapper-li">
      <!-- 刷新提示信息 -->
      <div class="top-tip" v-if="pullDownRefresh">
          <span class="refresh-hook">{{pullDownMsg}}</span>
      </div>
      <slot></slot>
      <!-- 底部提示信息 -->
      <div class="bottom-tip" v-if="pullUpLoad">
          <span class="loading-hook">{{pullUpMsg}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from '@better-scroll/core'
  import ScrollBar from '@better-scroll/scroll-bar'
  import PullDown from '@better-scroll/pull-down'
  import Pullup from '@better-scroll/pull-up'
  import ObserveDom from '@better-scroll/observe-dom'
  import NestedScroll from '@better-scroll/nested-scroll'

  BScroll.use(NestedScroll)  // 解决 BetterScroll 双层嵌套的滚动行为
  BScroll.use(ObserveDom)
  BScroll.use(Pullup)
  BScroll.use(PullDown)
  BScroll.use(ScrollBar)

  export default {
    name: 'ry-scroll',

    props: {
      /**
       * 1 滚动的时候会派发scroll事件，会截流。
       * 2 滚动的时候实时派发scroll事件，不会截流。
       * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
       */
      probeType: {
        type: Number,
        default: 1
      },
      /**
       * 点击列表是否派发click事件
       */
      click: {
        type: Boolean,
        default: true
      },
      /**
       * 是否开启横向滚动
       */
      scrollX: {
        type: Boolean,
        default: false
      },
      /**
       * 是否开启纵向滚动
       */
      scrollY: {
        type: Boolean,
        default: true
      },
      /**
       * 是否派发滚动事件
       */
      listenScroll: {
        type: Boolean,
        default: false
      },
      /**
       * 列表的数据
       */
      data: {
        type: Array,
        default: () => {
          return []
        }
      },
      /**
       * 是否派发列表滚动开始的事件
       */
      beforeScroll: {
        type: Boolean,
        default: false
      },
      /**
       * 是否横向与纵向滚动同时存在
       */
      freeScroll: {
        type: Boolean,
        default: false
      },
      /**
       * 当数据更新后，刷新scroll的延时。
       */
      refreshDelay: {
        type: Number,
        default: 20
      },
      /*
      * 下拉刷新功能 正在加载中功能
      */ 
      pullDownRefresh: {
        type: Boolean,
        default: false
      },
      /*
      * 上拉加载功能
      */ 
      pullUpLoad: {
        type: Boolean,
        default: false
      },
      /*
      * 是否开启滚动条
      */ 
     scrollbar: {
       type: Boolean,
       default: false
     },

      /*
      * 是否回弹动画
      */  
      bounce: {
        type: Object,
        default: () => {
          return {
            top: true,
            left: true,
            bottom: true,
            right: true
          }
        }
      },
      /*
      * 是否监测DOM变化 侦测refresh方法
      */ 
      observeDom: {
        type: Boolean,
        default: true
      },
      /*
      * 双层嵌套滚动问题
      */ 
      nestedScroll: {
        type: Boolean,
        default: true
      },
      /*
      * 数据总长度
      */ 
     total: {
       type: Number
     }
    },

    data() {
      return {
        scroll: null,
        pullUpMsg: '加载更多',
        pullDownMsg: '下拉刷新',
        isScrollUp: false,
      }
    },

    watch: {
      data() {
        this.pullUpMsg = '加载更多'
        if (this.data.length >= this.total) {
          this.pullUpMsg = '没有更多了'
          this.scroll.closePullUp() // 关闭上拉加载功能
        } 

        if (this.data.length === 0) this.scroll && this.scroll.openPullUp(true) // 开启上拉加载
        
        setTimeout(() => {
          this.scroll.finishPullUp() // 完成一次下拉加载
          this.scroll.refresh()
        }, 20)
      }
    },

    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },

    updated() {
      // this.scroll.refresh()
    },

    activated() {
      this.scroll && this.scroll.refresh()
    },

    deactivated() {
    },

    beforeDestroy() {
      this.scroll && this.scroll.destroy() 
    },

    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        // better-scroll的初始化
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          bounce: this.bounce,
          scrollX: this.scrollX,
          pullDownRefresh: this.pullDownRefresh,
          pullUpLoad: this.pullUpLoad,
          scrollbar: this.scrollbar,
          observeDom: this.observeDom,
          nestedScroll: this.nestedScroll
        })
        // 上拉加载
        if (this.pullUpLoad) {
          this.scroll.on('pullingUp', () => {
            // this.isScrollUp = true
            this.pullUpMsg = '玩命加载中...'
            this.$emit('pullingUp')  // 滚动到底部
          })
        }

        // 下拉刷新
        if (this.pullDownRefresh) {
          this.scroll.on('pullingDown', () => {
            // this.isScrollUp = false
            this.pullDownMsg = '刷新数据中'
            this.$emit('pullingDown')
          })
        }
      },
    },
  }
</script>

<style lang="stylus">
.wrapper-box {
  height 100%
  overflow hidden
}
/* 下拉、上拉提示信息 */
.top-tip{
    position: absolute;  
    top: -50px;  
    left: 0;
    z-index: 1;  
    width: 100%;  
    height:40px;  
    line-height:40px;  
    text-align:center;
    color: #989898;
} 

.bottom-tip{
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size 24px
      text-align: center;
      color: #989898;
      padding 15px 0
  }
</style>