<template> 
    <div class="slider"
        ref="slide">
        <div class="slider-content"
            ref="sliderContent">
            <slot></slot>
        </div>
        <div class="docs-wrapper" v-if="isShowDoc">
            <span
                class="doc"
                v-for="(item, index) in dots"
                :key="index"
                :class="{'active': currentPageIndex === index}"
            />
        </div>
    </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import ObserveDom from '@better-scroll/observe-dom'

BScroll.use(ObserveDom)
BScroll.use(Slide)
export default {
    name: 'ry-slider-scroll' ,

    props: {
        // 是否循环播放
        loop: {
            type: Boolean,
            default: true
        },

        // 是否自动播放
        autoPlay: {
            type: Boolean,
            default: true
        },

        // 播放间隔
        interval: {
            type: Number,
            default: 3000
        },

        // 横向滚轮
        scrollX: {
            type: Boolean,
            default: true
        },

        // 纵向滚轮
        scrollY: {
            type: Boolean,
            default: false
        },

        // 是否显示doc点
        isShowDoc: {
            type: Boolean,
            default: true
        },

        // 是否禁用滚轮
        isDisable: {
            type: Boolean,
            defautl: false
        }
    },

    data() {
        return {
            slide: null,
            playTimer: 0,
            currentPageIndex: 0,
            dots: 0
        }
    },

    mounted() {
        this.init()
    },

    activated() {
        this.init()
    },

    deactivated() {
        clearTimeout(this.playTimer)
        console.log(this.slide)
        this.slide && this.slide.destroy()
    },

    beforeDestroy() {
        clearTimeout(this.playTimer)
        this.slide && this.slide.destroy()
    },

    methods: {
        init() {
            clearTimeout(this.playTimer)
            this.dots = this.$refs.sliderContent.children.length
   
            this.slide = new BScroll(this.$refs.slide, {
                scrollX: this.scrollX,
                scrollY: this.scrollY,
                slide: {
                    loop: this.loop,
                    threshold: 100
                },
                useTransition: true,
                momentum: false,
                bounce: false,
                stopPropagation: true,
                probeType: 2
            })
            this.slide.on('scrollEnd', this._onScrollEnd)

            // user touches the slide area
            this.slide.on('beforeScrollStart', () => {
                clearTimeout(this.playTimer)
            })
            // user touched the slide done
            this.slide.on('scrollEnd', () => {
                this.autoGoNext()
            })
            this.slide.on('slideWillChange', (page) => {
                this.currentPageIndex = page.pageX
            })
            this.autoGoNext()
      },
      nextPage() {
        this.slide.next()
      },
      _onScrollEnd() {
        this.autoGoNext()
      },
      autoGoNext() {
        clearTimeout(this.playTimer)
        this.playTimer = setTimeout(() => {
          this.nextPage()
        }, 4000)
      }
    }
}
</script>

<style lang="stylus">
.slider-content {
    &:after {
        content ''
        display block
        clear both
    }
}

.docs-wrapper
    position absolute
    bottom 4px
    left 50%
    transform translateX(-50%)
    .doc
      display inline-block
      margin 0 6px
      width 12px
      height 12px
      border-radius 50%
      background #eee
      &.active
        width 28px
        border-radius 6px
</style>