<template> 
    <div class="slider"
        ref="slider">
        <div class="slider-content"
            ref="sliderContent">
            <slot></slot>
        </div>
        <div class="docs-wrapper" v-if="isShowDoc">
            <span
                class="doc"
                v-for="(item, index) in 3"
                :key="index"
                :class="{'active': currentPageIndex === index}"
            />
        </div>
    </div>
</template>

<script>
 import BScroll from 'better-scroll'

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
        }
    },

    data() {
        return {
            timer1: null,
            timer2: null,
            slider: null,
            children: null,
            currentPageIndex: 0,
            length: 0
        }
    },

    mounted() {
        this.timer1 = setTimeout(() => {
            this.setSliderWidth()
            this.initSlider()
        }, 20)
    },

    deactivated() {
        clearTimeout(this.timer1)
        clearTimeout(this.timer2)
        this.timer1 = null
        this.timer2 = null
    },

    beforeDestroy() {
        this.slider.destroy()
    },

    methods: {
        initSlider: function () {
            this.slider = new BScroll(this.$refs.slider, {
                scrollX: this.scrollX,
                scrollY: this.scrollY,
                momentum: false,
                snap: {
                    loop: this.loop,
                    threshold: 0.3,
                    speed: 400
                },
                click: true
            })

            this.slider.on('scrollEnd', () => {
                let page = this.slider.getCurrentPage().pageX
                this.currentPageIndex = page
                if (this.autoPlay) {
                    // 当滚动结束以后 如果是自动播放的话 那么首先要清除定时器(防止手动拖动轮播图以后图片无法正确显示)然后再次执行方法 才能实现轮播
                    clearTimeout(this.timer2)
                    this.play()
                }
            })
        },

        setSliderWidth: function () {
            // 获取slider里的所有的子元素
            this.children = this.$refs.sliderContent.children
            this.length = this.children.length
            // 计算宽度  = 图片个数+每张图片的宽度
            let width = 0
            // 获取手机屏幕的宽度
            let sliderWidth = this.$refs.slider.clientWidth
            
            for (let i = 0; i < this.length; i++) {
                // 获取children里的每一项内容 
                let child = this.children[i]
        
                child.style.width = sliderWidth + 'px'
                width += sliderWidth
            }
            if (this.loop) {
                width += 2 * sliderWidth
            }
            this.$refs.sliderContent.style.width = width + 'px'
        },

        play: function () {
            let playPage = this.currentPageIndex + 1

            if (playPage === this.children.length - 2) {
                playPage = 0
            }

            this.timer2 = setTimeout(() => {
                this.slider.goToPage(playPage, 0, 400)
            }, this.interval)
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