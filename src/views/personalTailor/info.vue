<template>
  <div class="personalInfo-box">
        <template v-if="showNetWork">
            <ry-result-network class="ry-network"/>
        </template>
        <template v-if="!showNetWork">
            <ry-error-info v-if="showErrorIn"/>
            <div 
                v-if="!showErrorIn"
                class="personalInfo-con-info"
            >
                <ry-toast-loading :show="showloading"/>
                <ry-scroll-view 
                    ref="scroll"
                    :bounce="false"
                    @scroll="scroll"
                >
                    <div class="personalInfo-top">
                        <div class="personalInfo-head">
                            <div class="per-list-head">
                                <h2 class="lazyload">
                                    <img v-if="data.headImage == null" src="../../assets/images/common/ry-ts.png" alt="">
                                    <img v-else :src="data.headImage"/>
                                </h2>
                                <div class="per-lhead-pri">
                                    <div class="per-pri-head">
                                        <span class="per-pri-name">{{data.name}}</span>
                                        <span class="per-pri-lname">花名:&nbsp;{{data.flowerName}}</span>
                                        <span class="per-pri-zwei">{{data.levelName}}</span>
                                    </div>
                                    <p class="per-pri-middle">专业：{{data.majorName}}</p>
                                    <p class="per-pri-bottom">回复时间：周一至周六<span>9:00 — 18:00</span></p>
                                </div>
                            </div>
                            <div class="per-info-pri">
                                <p>回复率<span>{{data.recoveryRate}}%</span></p>
                                <p class="per-info-fuwu">服务人数<span>{{data.totalService}}</span></p>
                                <p class="per-info-pj">好评率<span>{{data.favorableRate}}%</span></p>
                            </div>
                            <div 
                                ref="perBox"
                                :style="{height: isAuto ? 'auto': ''}"
                                class="per-info-taste" 
                            >
                                <p ref="perCon"><span>擅长:</span>{{data.expert}}</p>
                            </div>
                            <p 
                                v-if="isShow"
                                @click="clickInfo"
                                class="personalInfo-info-btn" 
                            >
                                <span>{{btnTitle}}<i :class="{'up': isUp}"></i></span>
                            </p>
                        </div>
                    </div>

                    <div class="personalInfo-zx">
                        <h3>名师咨询</h3>
                        <div class="personalInfo-js">
                            <div class="personalInfo-js-top">
                                <h2></h2>
                                <div class="personalInfo-pri">
                                    <div class="personalInfo-priHead">
                                        <span class="personalInfo-priName">名师咨询</span>
                                        <p class="personalInfo-xx">
                                            <md-icon
                                                name="rmb"
                                                size="sm"
                                                class="personalInfo-icon"
                                            />
                                            {{data.price}}/<span>次</span></p>
                                    </div>
                                    <p class="personalInfo-priMiddle">7个工作日内可追问咨询</p>
                                </div>
                            </div>
                            <div class="personalInfo-js-middle">
                                <ul>
                                    <li
                                        v-for="(item,index) in list"
                                        :key="index"
                                    >
                                        <span>{{item.labelkey}}</span>
                                        <i></i>
                                        <p>{{item.labelvalue}}</p>
                                    </li>
                                </ul>
                            </div>
                            <div 
                                v-show="isShowInfo"
                                class="personalInfo-js-bottom"
                            >
                                <div class="personalInfo-js-img">
                                    <img src="../../assets/images/personalInfo/ry-sc01.png" alt="">
                                </div>
                                <div class="personalInfo-js-lc">
                                    <h4>服务流程</h4>
                                    <div class="personalInfo-js-ul">
                                        <ul>
                                            <li class="personalInfo-li">
                                                <div class="personalInfo-js-icon">
                                                    <img 
                                                        src="../../assets/images/personalInfo/ry-lc-01.png" 
                                                        alt=""
                                                        class="personalInfo-js-img1"
                                                    />
                                                </div>
                                                <p>购买支付</p>
                                            </li>
                                            <li>
                                                <van-icon name="arrow" class="ry-personalInfo-arrow"/>
                                            </li>
                                            <li class="personalInfo-li">
                                                <div class="personalInfo-js-icon">
                                                    <img 
                                                        src="../../assets/images/personalInfo/ry-lc-02.png" 
                                                        alt=""
                                                        class="personalInfo-js-img2"
                                                    />
                                                </div>
                                                <p>收集需求信息</p>
                                            </li>
                                            <li>
                                                <van-icon name="arrow" class="ry-personalInfo-arrow"/>
                                            </li>
                                            <li class="personalInfo-li">
                                                <div class="personalInfo-js-icon">
                                                    <img 
                                                        src="../../assets/images/personalInfo/ry-lc-03.png" 
                                                        alt=""
                                                        class="personalInfo-js-img3"
                                                    />
                                                </div>
                                                <p>使用服务</p>
                                            </li>
                                            <li>
                                                <van-icon name="arrow" class="ry-personalInfo-arrow"/>
                                            </li>
                                            <li class="personalInfo-li">
                                                <div class="personalInfo-js-icon">
                                                    <img 
                                                        src="../../assets/images/personalInfo/ry-lc-04.png" 
                                                        alt=""
                                                        class="personalInfo-js-img4"
                                                    />
                                                </div>
                                                <p>服务评价</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="personalInfo-js-ts">
                                    <h4>温馨提示</h4>
                                    <div class="personalInfo-js-priInfo">
                                        <p>1.<span>支付成功后，请您及时配合名师完善需求信息资料，使名师能全面了解您的情况和需求，尽快给出回复。</span></p>

                                        <p>2.<span>名师再工作时间内会尽快联系您（9:00-18:00），如非工作时间请耐心等待。</span></p>

                                        <p>3.<span>服务时间以名师与您开始进行服务时算起，以服务评价完为止，7个工作日内可追问咨询，逾期服务自动结束。</span></p>

                                        <p>4.<span>为提高服务质量，请您针对需求与名师进行充分沟通。</span></p>

                                        <p>5.<span>名师为融溢平台签约顾问，不会以任何理由向客户收取任何其它费用，欢迎广大用户共同监督。</span></p>
                                    </div>
                                </div>
                            </div>
                            <p 
                                class="personalInfo-info-btn" 
                                @click="clickInfoZx"
                            >
                                <span>{{btnInfoTitle}}<i :class="{'up': isInfoUp}"></i></span>
                            </p>
                        </div>
                    </div>

                    <div class="personalInfo-pj">
                        <div class="personalInfo-pj-title">
                            <h2>客户评价<span>({{pjTotal.count}})</span></h2>
                            <router-link 
                                :to="{path: '/evaluateInfo', query: {memberId, pjTotal: JSON.stringify(pjTotal)}}" 
                                tag="p"
                            >全部
                                <md-icon
                                    name="arrow-right"
                                    size="md"
                                    class="personalInfo-pj-arrow"
                                />
                            </router-link>
                        </div>
                        <ry-m-loading v-if="isShowMLoading"/>
                        <ry-pj-list
                            v-else
                            :data="pjList"
                        />
                    </div>
                </ry-scroll-view>
                <div class="personalInfo-payment">
                    <ry-button
                        btn-title="去支付"
                        :loading="loading"
                        @touchbefore="btnTouchBefore"
                        @touchafter="btnTouchAfter"
                    />
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import Vue from 'vue';
import { Icon } from 'vant'
import mixins from '@/libs/mixins'
import RyPjButton from '@/components/PjButton'
import RyPjList from '@/components/PjList'
import { 
    getAdviserInfoById, 
    getAdviserNewComment, 
    getAdviserCountComment,
    judgeByCustomerId
} from '@/api/personalTailor/personalTailor'
Vue.use(Icon)

export default {
    name: 'ry-personalInfo',

    mixins: [mixins],

    components: {
        [RyPjButton.name]: RyPjButton,
        [RyPjList.name]: RyPjList
    },

    data() {
        return {
            isUp: false,
            isInfoUp: false,
            isShow: false,
            isAuto: false,
            isShowInfo: false,
            btnShow: false,
            showloading: false,
            isShowMLoading: false,
            btnTitle: '展开详情',
            btnInfoTitle: '展开详情',
            timer: null,
            pjList: [],
            data: {},
            pjTotal: {},
            memberId: 0
        }
    },

    computed: {
        list() {
            const { serviceStandard } = this.data
            return serviceStandard && JSON.parse(serviceStandard)
        }
    },

    created() {
        this.initData()
    },

    mounted() {
        this.init()
    },

    activated() {
        // this.initData() // 网络出错点击刷新页面
    },

    beforeDestroy() {
        clearTimeout(this.timer)
    },

    methods: {
        async initData() {
            this.showloading = true
            this.isShowMLoading = true
            const { memberId } = this.$route.query
            this.memberId = memberId

           await getAdviserInfoById({memberId})
            .then((res) => {
                const { success, data } = res.data
                if (success) {
                    this.data = data
                    this.hideErrorTip()
                }  else {
                    this.showErrorTip(res)
                }
                this.showloading = false
            })
        
            this.$axios.all([
                getAdviserCountComment({memberId}),
                getAdviserNewComment({memberId})
            ])
            .then(this.$axios.spread((res1,res2) => {
                const { success, data } = res1.data
                if (success) {
                    this.pjTotal = data
                    this.pjList = res2.data.data
                    this.isShowMLoading = false
                } 
            }))
        },

        clickInfo() {
            if (!this.isUp) {
                this.btnTitle = '收起'
            } else {
                this.btnTitle = '展开详情'
            }
            this.isAuto = !this.isAuto
            this.isUp = !this.isUp
        },

        clickInfoZx() {
            if (this.isInfoUp) {
                this.isShowInfo = false
                this.btnInfoTitle = '展开详情'
            } else {
                this.isShowInfo = true
                this.btnInfoTitle = '收起'
            } 
            this.isInfoUp = !this.isInfoUp
        },

        init() {
            const conHeight = this.$refs.perCon.offsetHeight
            const boxHeight = this.$refs.perBox.offsetHeight
            
            conHeight > boxHeight ? this.isShow = true : this.isShow = false
        },

        btnTouchAfter(bool) {
            this.changeLoading()
            judgeByCustomerId()
            .then((res) => {
                const { success, data } = res.data
                this.loading = bool
                if (!data && success) {
                    this.$router.push({
                        path: '/identity',
                        query: {
                            memberId: this.memberId
                        }
                    })
                } else if (data && success) {
                    this.$router.push('/purchase')
                }
            })
        }
    }
}
</script>

<style lang="stylus">
.personalInfo-box {
    background #f5f5f5
}

.personalInfo-con-info {
    height 100%
}

.personalInfo-top {
  padding-top 60px
  background url('../../assets/images/banner/ry-bg01.png') no-repeat
  background-size 100%
}

.personalInfo-head {
  position relative
  top 0
  left 50%
  transform translateX(-50%)
  padding 54px 30px 30px
  width 670px
  box-shadow 0px 6px 12px rgba(0,0,0,0.16)
  border-radius 16px
  background #fff
  z-index 1
  overflow hidden
  box-sizing border-box
  img {
    display block
    width 100%
    height 100%
  }
}

.per-list-head {
    display flex
    h2 {
        margin-right 20px
        width 100px
        height 100px
        border-radius 50%
        border 2px solid #707070
        background-size 100% 100%
        box-sizing border-box
        overflow hidden
        img {
            display block
            width 100%
            height 98px
        }
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
                flex 1
                overflow hidden
                white-space nowrap
                text-overflow ellipsis
                height 24px
                line-height 24px
                font-size 22px
                color #000
                padding-right 0
                span {
                    margin-left 20px
                }
            }
            .per-icon-arrow {
                position relative
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
    margin-bottom 20px
    height 90px
    color #000
    overflow hidden
    p {
        font-size 24px
        line-height 30px
    }
    span {
        margin-right 10px
    }

}

/* iphone5 */
@media screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2){
    .per-pri-head {
        .per-pri-zwei {
            height 26px !important
            line-height 26px !important
        }
    }

    .per-info-taste {
        p {
            font-size 24px
            line-height 32px
        }
    }
}

.personalInfo-info-btn {
    display flex
    align-items center
    justify-content center
    padding-top 20px
    span {
        height 20px
        line-height 20px
        font-size 20px
        color #5A5A5A
        i {
            display inline-block
            content ''
            width 0
            height 0
            margin-left 10px
            border-top 12px solid #C5C5C5
            border-left 16px solid transparent
            border-right 16px solid transparent
            border-bottom 0
            &.up {
                border-top 0
                border-bottom 12px solid #C5C5C5
            }
        }
    }
}

.personalInfo-zx {
    padding 40px 40px 70px
    h3 {
        margin-bottom 30px
        height 36px
        line-height 36px
        font-size 36px
        color #000
    }
}

.personalInfo-js {
    padding 30px 0
    background rgba(255,255,255,1)
    box-shadow 0px 6px 12px rgba(0,0,0,0.16)
    border-radius 20px
    box-sizing border-box
    .personalInfo-js-top {
        display flex
        padding 0 30px 30px
    }
    h2 {
        margin-right 20px
        width 100px
        height 100px
        border-radius 50%
        box-shadow:0px 2px 12px rgba(0,0,0,0.16);
        background url('../../assets/images/ry_logo@2x.png') no-repeat
        background-size 100%
    }
    .personalInfo-pri {
        flex 1
        .personalInfo-priHead {
            padding-top 6px
            display flex
            align-items center
            justify-content space-between
            .personalInfo-priName {
                height 32px 
                line-height 32px
                font-size 32px
                color #000
            }
            .personalInfo-xx {
                display flex
                align-items flex-end
                font-size 28px
                height 28px
                line-height 28px
                color #FF5700
                font-weight bold
                span {
                    display inline-block
                    font-size 20px
                    line-height 20px
                    height 20px
                }
                .personalInfo-icon {
                    font-weight bold
                }
            }
        }
    }
    .personalInfo-priMiddle {
        padding-top 30px
        font-size 24px
        font-weight 400
        color #000
    }
}

.personalInfo-js-middle {
    padding 0 30px
    ul {
        li {
            margin-bottom 20px
            display flex
            color #575757
            align-item flex-end
            span {
                display inline-block
            }
            span,p {
                height 24px
                line-height 24px
                font-size 24px
            }
            i {
                margin 0 6px 0 4px
                display block
                flex 1
                background url('../../assets/images/common/ry-dotted.png') left 80% repeat-x
                background-size 10px
            }
        }
    }
}

.personalInfo-js-img {
    padding 30px
    img {
        display block
        width 100%
    }
}

.personalInfo-js-bottom {
    .personalInfo-js-lc,
    .personalInfo-js-ts {
        h4 {
            width 100%
            height 58px
            padding 18px 0  16px 30px
            font-size 24px
            line-height 24px
            letter-spacing 1px
            color #000
            background #D8E9F5
            box-sizing border-box 
        }
    } 
    .personalInfo-js-lc {
        .personalInfo-js-ul {
            padding 30px
        }
        ul {
            display flex
            align-items center
            justify-content center
            padding-bottom 20px
            border-bottom 2px solid rgba(241,241,241,1)
        }
        li {
            display flex
            justify-content center
            align-items center
            flex-direction column
            .personalInfo-js-icon {
                display flex
                align-items center
                justify-content center
                margin-bottom 10px
                width 92px
                height 92px
                border-radius 50%
                background #D8E9F5
                box-sizing border-box
                img {
                    display block
                    &.personalInfo-js-img1 {
                        width 52px
                        height 52px
                    }
                    &.personalInfo-js-img2 {
                        width 40px
                        height 48px
                    }
                    &.personalInfo-js-img3 {
                        width 68px
                        height 50px
                    }
                    &.personalInfo-js-img4 {
                        width 46px
                        height 46px
                    }
                }
            }
            p {
                height 20px
                text-align center
                line-height 20px
                font-size 20px
                color #6A94B2
            }
            .ry-personalInfo-arrow {
                padding 0 15px
                position relative
                top -10px
                font-size 34px
                font-weight bold
                color #D1E5F3
            }
        }
    }
    .personalInfo-js-ts {
        .personalInfo-js-priInfo {
            padding 40px 30px 20px
            box-sizing border-box
            p {
                display flex
                margin-bottom 18px
                line-height 30px
                font-size 24px
                color #5A5A5A
                &:last-child {
                    margin-bottom 0
                }
                span {
                    display block
                    flex 1
                    margin-left 4px
                }
            }
        }
    }
}

.personalInfo-pj {
    padding 0 40px 150px
    .personalInfo-pj-title {
        margin-bottom 30px
        display flex
        justify-content space-between
        h2 {
            display flex
            align-items flex-end
            font-size 36px
            color #000
            span {
            }
        }
        p {
            display flex
            align-items center
            height 28px
            line-height 28px
            font-size 28px
            color #575757
            .personalInfo-pj-arrow {
                display block
                color #575757
                height 28px
                line-height 28px
                font-size 28px
                font-weight 500
            }
        }
    }
}

.personalInfo-payment {
    position fixed
    bottom 0
    left 0
    z-index 1
    width 100%
    padding 18px 90px
    background #fff
    box-sizing border-box
}
</style>