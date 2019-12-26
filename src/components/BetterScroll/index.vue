<template>
  <div ref="wrapper">
    <div>
      <!-- 刷新提示信息 -->
      <div class="top-tip" v-if="pulldown">
          <span class="refresh-hook">{{pullDownMsg}}</span>
      </div>
      <slot></slot>
      <!-- 底部提示信息 -->
      <div class="bottom-tip" v-if="pullup">
          <span class="loading-hook">{{pullUpMsg}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

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
        default: null
      },
      /**
       * 是否派发滚动到底部的事件，用于上拉加载
       */
      pullup: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发顶部下拉的事件，用于下拉刷新
       */
      pulldown: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发列表滚动开始的事件
       */
      beforeScroll: {
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
     * 下拉刷新文案
     */  
     pullDownMsg: {
       type: String,
       default: '下拉刷新'
     },
     /*
     * 上拉加载文案
     */  
     pullUpMsg: {
       type: String,
       defalut: '加载更多'
     }
    },

    data() {
      return {
        timer: null
      }
    },

    mounted() {
      // 保证在DOM渲染完毕后初始化better-scroll
      this.timer = setTimeout(() => {
        this._initScroll()
      }, 20)
    },

    deactivated() {
      clearTimeout(this.timer)
      this.timer = null
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
          scrollX: this.scrollX,
          listenScroll: this.listenScroll,
          pullDownRefresh: this.pullDownRefresh,
          pullUpLoad: this.pullUpLoad,
          scrollbar: this.scrollbar
        })

        // 是否派发滚动事件
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos)
          })
        }

        // 是否派发滚动到底部事件，用于上拉加载
        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            // 滚动到底部
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd', this.scroll)
            }
          })
        }

        // 是否派发顶部下拉事件，用于下拉刷新
        if (this.pulldown) {
          this.scroll.on('touchEnd', (pos) => {
            // 下拉动作
            if (pos.y > 50) {
              this.$emit('pulldown', this.scroll)
            } 
          })
        }

        // 是否派发列表滚动开始的事件
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable() {
        // 代理better-scroll的disable方法
        this.scroll && this.scroll.disable()
      },
      enable() {
        // 代理better-scroll的enable方法
        this.scroll && this.scroll.enable()
      },
      refresh() {
        // 代理better-scroll的refresh方法
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        // 代理better-scroll的scrollTo方法
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        // 代理better-scroll的scrollToElement方法
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },

    watch: {
      // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>

<style lang="stylus">

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
      text-align: center;
      color: #989898;
      position: absolute;
      bottom: -60px;
      left: 0;
  }
</style>