<template>
  <div class="box">
      <template v-if="showNetWork">
        <ry-result-network class="ry-network"/>
      </template>
      <template v-if="!showNetWork">
          <ry-error-info v-show="showError"/>
          <div class="per-box" v-show="!showError">
            <ry-scroll-view 
              ref="scroll" 
              :bounce="false"
              @scroll="scroll"
              class="per-scroll"
            >
                <ry-banner-head 
                    :data="imgData"
                />
                <div class="ry-box">
                    <h2 class="ry-fuwu" ref="fuwu">推荐服务</h2>
                    <div class="ry-nav">
                        <van-tabs 
                            v-model="active" 
                            title-active-color="#FB701F"
                            color="#FB701F"
                            background="#f5f5f5"
                            line-width="20%"
                            title-inactive-color="#000"
                            animated 
                            swipeable
                            :border="false"
                        >
                            <van-tab 
                                v-for="(item, index) in tabList" 
                                :key="index" 
                                :title="item"
                                :title-style="active == index ? 'font-weight:bold;' : 'font-weight:500;'"
                                class="ry-nav-text"
                            >
                                <div 
                                    ref="wrapperList" 
                                    :style="{height: height}"
                                    class="wrapper-list" 
                                >
                                    <ry-loading v-if="false" class="per-loading"/>
                                    <ry-scroll 
                                        v-else
                                        :bounce="bounce"
                                        class="scroll-list" 
                                    >
                                        <div class="per-list">
                                            <div class="per-list-head">
                                                <h2></h2>
                                                <div class="per-lhead-pri">
                                                    <div class="per-pri-head">
                                                        <span class="per-pri-name">罗文</span>
                                                        <span class="per-pri-lname">花名:&nbsp;无崖子</span>
                                                        <span class="per-pri-zwei">首席融资规划师</span>
                                                        <van-icon name="arrow" class="per-icon-arrow" />
                                                    </div>
                                                    <p class="per-pri-middle">专业：5000-50000信用卡快速办理</p>
                                                    <p class="per-pri-bottom">回复时间：周一至周六<span>9:00 — 18:00</span></p>
                                                </div>
                                            </div>
                                            <div class="per-info-pri">
                                                <p>回复率<span>100%</span></p>
                                                <p class="per-info-fuwu">服务人数<span>85</span></p>
                                                <p class="per-info-pj">好评率<span>100%</span></p>
                                            </div>
                                            <div class="per-info-taste">
                                                <p><span>擅长:</span>大额信用卡办理、无抵押信用担保、资产抵押、征信解析。从事金融行业六年，擅长高额信用卡办理、信用资产打造，解析个人征信上万份；多家金融公司风控特邀顾问。专业无抵押信用贷款、抵押担保类贷款知识。</p>
                                            </div>
                                            <div class="per-info-jg">
                                                <span class="per-jg-active">
                                                    <md-icon
                                                        name="rmb"
                                                        size="sm"
                                                        class="per-jg-icon"
                                                    ></md-icon>199
                                                </span>
                                                <span class="per-jg-inatice">
                                                    <md-icon
                                                        name="rmb"
                                                        size="xs"
                                                    ></md-icon>299
                                                </span>
                                            </div>
                                            <p class="per-hold per-hold-active">名师咨询</p>
                                            <p class="per-online per-online-active">可指导</p>
                                        </div>
                                    </ry-scroll>
                                </div>
                            </van-tab>
                        </van-tabs>
                    </div>
                </div>
            </ry-scroll-view>
          </div>
      </template>
  </div>
</template>

<script>
import mixins from '@/libs/mixins'
import { Icon } from 'vant'

export default {
    name: 'ry-personal-tailor',

    mixins: [mixins],

    components: {
        [Icon.name]: Icon
    },

    data() {
        const imgUrl = require('@/assets/images/banner/ry-banner.png')
        return {
            imgData: [imgUrl, imgUrl],
            active: 0,
            height: 0,
            loading: false,
            finished: false,
            showNetWork: false,
            bounce: {
                top: false,
                bottom: false,
                left: false,
                right: false
            },
            list: [],
            tabList: ['信用卡','信贷','融资规划','征信服务']
        }
    },

    mounted() {
        this.$nextTick(() => {
            const titleHead = document.querySelector('.van-tabs__wrap').offsetHeight
            const headHeight = document.querySelector('.head-box').offsetHeight
            const dHeight = document.querySelector('.per-scroll').offsetHeight
            const fuwuHeight = this.$refs.fuwu.offsetHeight
            console.log(dHeight,titleHead,headHeight, fuwuHeight)
            this.height =  (dHeight - (fuwuHeight + titleHead + headHeight)) + 'px'
        })
    },

    methods: {
        onLoad() {
            // 异步更新数据
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    this.list.push(this.list.length + 1)
                }
                // 加载状态结束
                this.loading = false

                // 数据全部加载完成
                if (this.list.length >= 40) {
                this.finished = true
                }
            }, 500)
        }
    }
}
</script>

<style lang="stylus" scope>
.per-box {
  height 100%
  setPadding()
  display flex
  flex 1
  flex-direction column
  background #f5f5f5
}

.head-box {
    height 380px
}

.ry-box {
    position relative
    flex 1
    .ry-fuwu {
        padding 0 40px
        height 28px
        font-size 28px
        line-height 28px
        color #000
        letter-spacing 3px
    }
    .ry-nav {
        .van-tabs__wrap {
            padding 0 40px
        }
    }
}

.per-scroll {
    .scroll-view-container {
        height 100% !important
    }
}

.wrapper-list {
    padding-top 34px
    overflow hidden
    .wrapper-li {
        padding-bottom 332px
    }
}

.scroll-list {
    padding 0 40px
    line-height 60px
}

.per-list {
    position relative
    margin-bottom 30px
    padding 54px 30px 0
    width 100%
    height 428px
    border-radius 20px
    background #fff
    box-sizing border-box
    box-shadow 0px 6px 12px rgba(0,0,0,0.16)
    .per-list-head {
        display flex
        h2 {
            margin-right 20px
            width 100px
            height 100px
            border-radius 50%
            border 2px solid #707070
            background-image url('../../assets/images/default_bg01.png')
            background-size 100% 100%
            box-sizing border-box
        }
        .per-lhead-pri {
            flex 1
            .per-pri-head {
                position relative
                display flex
                align-items flex-end
                padding-bottom 10px
                height 32px
                span {
                    display block
                    padding-right 20px
                    letter-spacing 2px
                    font-weight 600
                }
                .per-pri-name {
                    height 32px
                    font-size 32px
                    font-weight bold
                    line-height 32px
                    color #000
                }
                .per-pri-lname {
                    color #999
                    height 24px
                    line-height 24px
                    font-size 24px
                    font-weight 500
                }
                .per-pri-zwei {
                    height 24px
                    line-height 24px
                    font-size 24px
                    color #000
                    padding-right 0
                    span {
                        margin-left 20px
                    }
                }
                .per-icon-arrow {
                    position absolute
                    right 0
                    top 1px
                    font-size 32px
                    font-weight bold
                }
            }
            .per-pri-middle {
                padding-bottom 14px
                line-height 24px
                font-size 24px
                font-weight 400
                color #FF5700
            }
            .per-pri-bottom {
                font-size 20px
                line-height 20px
                color #999
            }
        }

    }
    .per-info-pri {
        display flex
        padding 30px 0
        height 20px
        p {
            flex 1
            height 20px
            line-height 20px
            color #999
            font-size 24px
            &.per-info-fuwu {
                text-align center
            }
            &.per-info-pj {
                text-align right
            }
            span {
                margin-left 10px
                color #FF5700
            }
        }
    }
    .per-info-taste {
        width 100%
        padding-bottom 20px
        font-size 24px
        color #000
        line-height 30px
        border-bottom 1px solid rgba(112,112,112,.2)
        p {
            display -webkit-box
            -webkit-line-clamp 3
            overflow hidden
            text-overflow ellipsis
            /* autoprefixer: off */
            -webkit-box-orient: vertical
            word-wrap break-word
            word-break break-all
        }
        span {
            margin-right 10px
        }
    }
    .per-info-jg {
        display flex
        align-items flex-end
        padding-top 22px
        height 28px
        span {
            display block
            color #aeaeae
            font-size 22px
            line-height 22px
            height 22px
            &.per-jg-active {
                margin-right 20px
                font-size 28px
                height 28px
                line-height 28px
                font-weight bold
                color #FF5700
                .per-jg-icon {
                    font-weight bold
                }
            }
            &.per-jg-inatice {
                position relative
                &:after {
                    content ''
                    display block
                    width 100%
                    height 1px
                    background #aeaeae
                    position absolute
                    left 50%
                    top 45%
                    transform translate(-50%, -50%)
                }
            }
        }
    }
    .per-hold {
        position absolute
        bottom 30px
        right 28px
        width 120px
        height 24px
        line-height 24px
        text-align center
        padding 6px 0
        font-size 24px
        background #AEAEAE
        border-radius 4px
        color #000
        display flex
        align-items center
        justify-content center
        &.per-hold-active {
            color #5A0101
            background linear-gradient(left,#FFE3AE,#E17000)
        }
    }
    .per-online {
        position absolute
        top 0
        left 0
        padding 4px 0
        width 120px
        height 28px
        font-size 28px
        line-height 28px
        color #fff
        text-align center
        font-weight bold
        border-radius 10px 0px 20px 0px
        background #AEAEAE
        &.per-online-active {
            background linear-gradient(left, #FCB836, #FB671C)
        }
    }
}

.ry-nav {
    .ry-nav-text {
        font-size 28px
    }
}

.per-loading {
    img {
        width 130px !important
    }
}
</style>