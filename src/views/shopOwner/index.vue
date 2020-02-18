<template>
  <div class="shopOwner-box">
        <ry-scroll-view
            ref="scroll"
            :bounce="false"
        >
            <div class="shopOwner-info">
                <div class="shopOwner-info-top">
                    <h2>推荐人</h2>
                    <div class="shopOwner-info-detail">
                        <h4><img v-lazy="userInfo.headImage" alt=""></h4>
                        <div class="shopOwner-detail-right">
                            <div class="shopOwner-right-top"><h3>推荐人：<span>{{userInfo.name}}</span></h3><i>邀请您成为店主</i></div>
                            <p>邀请码：<span>{{userInfo.inviteCode}}</span></p>
                        </div>
                    </div>
                </div>

                <div class="shopOwner-info-middle">
                    <div class="shopOwner-middle-top" v-lazy:background-image="bgImg">
                        <h2>融溢·会员权益卡</h2>
                        <h4><span>开通融溢店主</span>一起轻松省赚</h4>
                        <p><span>自用花的少</span>分享赚的多</p>
                    </div>
                    <div class="shopOwner-middle-bottom">
                        <h2 v-show="isUp"><img v-lazy="tImg" alt=""></h2>
                        <div 
                            class="shopOwner-bottom-list"
                            :style="{height: isUp ? 'auto' : ''}"
                        >
                            <ul>
                                <li 
                                    v-for="(item, index) in iconList"
                                    :key="index"
                                >
                                    <h4><img v-lazy="item.imgUrl" alt=""></h4>
                                    <h3>{{item.title}}</h3>
                                    <p>{{item.pri}}</p>
                                </li>
                            </ul>
                        </div>
                        <p 
                            class="shopOwner-down"
                            @click="changeUp"
                        >
                            <span 
                                :class="{'active': isUp}"
                            ></span>
                        </p>
                    </div>
                </div>

                <!-- 选择支付通道 start -->
                <ry-payselect/>
                <!-- 选择支付通道 end -->

                <div class="shopOwner-info-bottom">
                    <ry-button
                        btn-title="立即付款"
                        :loading="loading"
                        @touchafter="paymentNext"
                    />
                </div>
            </div>
        </ry-scroll-view>
  </div>
</template>

<script>
import mixins from '@/libs/mixins'
import RyPayselect from '@/components/PaySelect'
import { addOrder, getRecommenderInfo, byOrderId } from '@/api/perfectApply/perfectApply'

export default {
    name: 'ry-shopOwner',

    mixins: [mixins],

    components: {
        [RyPayselect.name]: RyPayselect
    },

    data() {
        const txImg = require('../../assets/images/ry_logo@2x.png')
        const bgImg = require('../../assets/images/shopOwner/bg01.png')
        const tImg = require('../../assets/images/shopOwner/bg02.png')
        return {
            txImg,
            bgImg,
            tImg,
            userInfo: {},
            iconList: [
                {
                    imgUrl: require('../../assets/images/shopOwner/icon01.png'),
                    title: '自用省钱',
                    pri: '自用产品赚佣金'
                },
                {
                    imgUrl: require('../../assets/images/shopOwner/icon02.png'),
                    title: '分享赚钱',
                    pri: '分享产品赚佣金'
                },
                {
                    imgUrl: require('../../assets/images/shopOwner/icon03.png'),
                    title: '代理特权',
                    pri: '品牌代理权'
                },
                {
                    imgUrl: require('../../assets/images/shopOwner/icon04.png'),
                    title: '一键开店',
                    pri: '开店不囤货'
                },
                {
                    imgUrl: require('../../assets/images/shopOwner/icon05.png'),
                    title: '宣传素材',
                    pri: '共享海量素材'
                },
                {
                    imgUrl: require('../../assets/images/shopOwner/icon06.png'),
                    title: '管家服务',
                    pri: '全天金牌客服'
                },
                {
                    imgUrl: require('../../assets/images/shopOwner/icon07.png'),
                    title: '智能后台',
                    pri: '轻松管理店铺'
                },
                {
                    imgUrl: require('../../assets/images/shopOwner/icon08.png'),
                    title: '专属售后',
                    pri: '售后更无忧'
                },
                {
                    imgUrl: require('../../assets/images/shopOwner/icon09.png'),
                    title: '活动奖励',
                    pri: '每月福利活动'
                }
            ],
            data: {},
            isUp: false,
            orderId: ''
        }
    },

    created() {
        this.initData()
    },

    beforeDestroy() {
        if (document.addEventListener) {
            document.removeEventListener('WeixinJSBridgeReady', this.onBridgeReady, false)
        }
        
        if (document.attachEvent) {
            document.detachEvent('WeixinJSBridgeReady', this.onBridgeReady)
            document.detachEvent('onWeixinJSBridgeReady', this.onBridgeReady)
        }
    },

    methods: {
        initData() {
            getRecommenderInfo()
            .then((res) => {
                const { success, data } = res.data
                if (success) {
                    this.userInfo = data
                }
            })
        },

        changeUp() {
            this.isUp = !this.isUp
            this.refreshflower()
        },

        paymentNext() {
            this.changeLoading()
            const data = {
                orderType: 0,
                payType: 0
            }
            addOrder(data)
            .then((res) => {
                const { success, data } = res.data
                if (success) {
                    this.orderId = data.orderId
                    this.$toast.loading({
                        message: '请稍后...',
                        forbidClick: true
                    })
                    // 微信预下单
                    byOrderId({
                        orderId: this.orderId
                    })
                    .then((res) => {
                        // 微信返回参数 调用微信支付窗口
                        if (res.data.success) {
                            this.$toast.clear()
                            this.data = res.data.data
                            if (typeof WeixinJSBridge == "undefined"){
                                if( document.addEventListener ){
                                    document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false)
                                }else if (document.attachEvent){
                                    document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady)
                                    document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady)
                                }
                            }else{
                                this.onBridgeReady()
                            }
                        }
                    })
                }
                
                this.loading = false
            })
        },

        // 调起微信支付
        onBridgeReady() {
            const that = this
            window.WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    appId: this.data.appId,     //公众号名称，由商户传入     
                    timeStamp: this.data.timeStamp,         //时间戳，自1970年以来的秒数     
                    nonceStr: this.data.nonceStr, //随机串     
                    package: this.data.packageValue,     
                    signType: this.data.signType,         //微信签名方式：     
                    paySign: this.data.paySign //微信签名 
                },
                function(res){
                    if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                        // 店主开通成功
                        window.localStorage.setItem('userStatus', 1) // 设置状态为店主，防止用户不点完成开通确认按钮，直接返回至付款学习页面
                        that.$store.dispatch('shopOwner/updateStatus', 1) 
                        // 解决在用户更新客户，店主时我的数据不更新问题
                        that.$store.commit('shopOwner/REFRESH_USER_INFO', true)
                        that.$store.commit('shopOwner/REFRESH_USER_STATUS', true)
                        that.$router.replace('/openSuccess')
                    } 
                }
            )
        }
    }
}
</script>

<style lang="stylus">
.shopOwner-box {
    background #f5f5f5
}

.shopOwner-info {
    padding 40px 40px 166px
    box-sizing border-box
}

.shopOwner-info-top {
    h2 {
        padding-bottom 10px
        height 36px
        line-height 36px
        font-size 36px
        color #000
    }
    .shopOwner-info-detail {
        display flex
        align-items center
        margin-bottom 50px
        padding 28px 40px
        box-sizing border-box
        background #fff
        border-radius 20px
        box-shadow 0 10px 18px rgba(0,0,0,0.05)
        h4 {
            margin-right 30px
            width 108px
            height 108px
            box-shadow 0 10px 18px rgba(0,0,0,0.05)
            border-radius 100%
            overflow hidden
            display block
            img {
                width 108px
                height 108px
                display block
                border-radius 100%
            }
        }
        .shopOwner-detail-right {
            flex 1
        }
        .shopOwner-right-top {
            flex 1
            display flex
            align-items center
            justify-content space-between
            padding 0 0 30px
            height 28px
            h3 {
                height 28px
                line-height 28px
                font-size 28px
                span {
                    font-weight 100
                }
            }
            i {
                height 28px
                line-height 28px
                font-size 28px
                color #FF8700
                font-style normal
            }
        }
        p {
            height 28px
            line-height 28px
            font-size 28px
            font-weight bold
            span {
                font-weight 100
            }
        }
    }
}

.shopOwner-info-middle {
    position relative
    width 100%
    margin-bottom 50px
    padding 266px 0 0
    box-shadow 0 8px 14px rgba(0,0,0,0.23)
    border-radius 20px
    box-sizing border-box
    .shopOwner-middle-top {
        position absolute
        top -22px
        width 630px
        height 256px
        left 50%
        transform translateX(-50%)
        padding 0 130px
        background-size 100% 100%
        background-repeat no-repeat
        box-shadow 0 12px 10px rgba(0,0,0,1)
        border-radius 20px 20px 0 0
        box-sizing border-box
        &[lazy='loading'] {
            background-color #eee
        }
        h2 {
            padding 60px 0 34px
            height 36px
            line-height 36px
            text-align center
            letter-spacing 1px
            font-size 36px
            color #FFCE48
            border-bottom 2px solid #FFCE48
        }
        h4 {
            padding 28px 0 18px
            height  28px
            line-height 28px
            text-align center
            font-size 28px
            color #FFCE48
            span {
                margin-right 20px
            }
        }
        p {
            height 20px
            line-height 20px
            text-align center
            font-size 20px
            color #FFCE48
            span {
                margin-right 20px
            }
        }
    }
    .shopOwner-middle-bottom {
        h2 {
            padding 20px 0 14px
            img {
                width 50%
                height 44px
                display block
                margin 0 auto
            }
        }
        .shopOwner-bottom-list {
            height 95*2px
            overflow hidden
            ul {
                &:after {
                    content ''
                    display block
                    clear both
                }
                li {
                    width 25%
                    float left
                    padding 16px 0
                    margin-bottom 16px
                }
                h4 {
                    padding-bottom 6px
                    img {
                        margin auto
                        display block
                        width 80px
                        height 80px
                    }
                }
                h3 {
                    padding-bottom 8px
                    height 28px
                    line-height 28px
                    text-align center
                    font-size 28px
                    color #000
                }
                p {
                    height 20px
                    line-height 20px
                    text-align center
                    font-size 20px
                    color #C2C2C2
                }
            }
        }
    }

    .shopOwner-down {
        width 80px
        margin auto
        padding-bottom 20px
        span {
            margin auto
            display block
            width 0
            height 0
            border-top 16px solid #CACACA
            border-left 16px solid transparent
            border-right 16px solid transparent
            border-bottom none
            &.active {
                border-top none 
                border-bottom 16px solid #CACACA
            }
        }
    }
}

.shopOwner-info-bottom {
    padding 60px 50px 0
    box-sizing border-box
}
</style>