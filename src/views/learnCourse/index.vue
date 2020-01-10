<template>
  <div class="learnCourse-box">
        <ry-scroll-view
            :bounce="false"
            class="learnCourse-scroll"
        >
            <div class="learnCourse-info">
                <div class="learnCourse-list">
                    <div class="learnCourse-list-info">
                        <div
                            :style="{height: isUp ? 'auto': ''}" 
                            class="learnCourse-list-top"
                        >
                            <ul>
                                <li>100万信用额度大咖是怎样练成的？</li>
                                <li><span>1.</span>申卡前有哪些致命的注意事项？</li>
                                <li><span>1.</span>申卡前有哪些致命的注意事项？</li>
                                <li><span>1.</span>申卡前有哪些致命的注意事项？</li>
                                <li><span>1.</span>申卡前有哪些致命的注意事项？</li>
                                <li><span>1.</span>申卡前有哪些致命的注意事项？</li>
                                <li><span>1.</span>申卡前有哪些致命的注意事项？</li>
                                <li><span>1.</span>申卡前有哪些致命的注意事项？</li>
                                <li><span>1.</span>申卡前有哪些致命的注意事项？</li>
                                <li><span>1.</span>申卡前有哪些致命的注意事项？</li>
                                <li><span>1.</span>申卡前有哪些致命的注意事项？</li>
                            </ul>
                        </div>
                        <p :class="['down',{'up': isUp}]" @click="changeDown"></p>
                    </div>
                </div>
            </div> 
        </ry-scroll-view>
  </div>
</template>

<script>
export default {
    name: 'ry-learnCourse',

    data() {
        return {
            isUp: false
        }
    },

    methods: {
        changeDown() {
            this.isUp = !this.isUp
        }
    }
}
</script>

<style lang="stylus">
.learnCourse-scroll {
    .scroll-view-container {
        height 100%
    }
}
</style>

<style lang="stylus" scoped>
.learnCourse-box {
    background #f5f5f5
}

.learnCourse-list {
    padding 206px 40px 0
    box-sizing border-box
    .learnCourse-list-info {
        .down {
            padding-top 10px
            margin 10px auto 0
            width 0
            height 0
            border-top 16px solid #FE9101
            border-left 22px solid transparent
            border-right 22px solid transparent
            border-bottom 0
            &.up {
                border-top 0
                border-bottom 16px solid #FE9101
            }
        }
    }
    .learnCourse-list-top {
        position relative
        height 228*2px
        overflow hidden
        ul {
            border 2px solid #000
        }
        li {
            padding 18px 0
            height 24px
            line-height 24px
            font-size 24px
            font-weight bold
            color #000
            letter-spacing 3px
            border-bottom 2px solid #000
            box-shadow 0px 6px 14px rgba(146,146,146,0.25)
            &:nth-child(1) {
                padding 26px 0
                height 30px
                line-height 30px
                text-align center
                color #FE9103
                font-weight bold
                font-size 30px
            }
            &:last-child {
                border none
            }
            &:nth-child(2n) {
                background #F2F2F2
            }
            span {
                margin 0 30px 0 20px
            }
        }
    }
}

.learnCourse-info {
    height 100%
    background url('../../assets/images/learnCourse/learnBg.png') center top no-repeat
    background-size 100%
}

/* iphone5 */

@media screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2){
    .learnCourse-list-top {
        height 226*2px !important
    }
}
</style>