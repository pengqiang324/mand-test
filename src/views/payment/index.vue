<template>
    <div class="purchase-box">
        <ry-scroll-view
            :bounce="false"
            class="purchase-scroll"
        >
            <div class="pusrchase-info">
                <div class="pusrchase-head">
                    <div class="pusrchase-con" v-lazy:background-image="bgImg">
                        <h2>名师咨询</h2>
                        <p>专属顾问:<span>罗文</span></p>
                        <p>咨询业务:<span>5000-50000信用卡快速办理</span></p>
                        <div class="pusrchase-jg">
                            <span>
                                <md-icon
                                    name="rmb"
                                    size="lg"
                                    class="icon-rmb"
                                ></md-icon>
                                199/
                                <i>次</i>
                            </span>
                        </div>
                        <div class="pusrchase-pri">
                            <span>订单号码：201912189101</span>
                            <span>订单日期：2019-12-18</span>
                        </div>
                    </div>
                </div>
                <div class="pusrchase-select">
                    <h4 class=border-bottom>请选择支付方式</h4>
                    <div class="pusrchase-select-list">
                        <ul>
                            <li 
                                v-for="(item, index) in zfList"
                                :key="index"
                                class="border-bottom"
                            >
                                <div class="pusrchase-left">
                                    <img class="custom-img" v-lazy="zfImg" alt="">
                                    <span class="custom-title">微信支付</span>
                                </div>
                                <div class="pusrchase-right">
                                    <img  
                                        :src="radio === index ? selectIcon.selectImgActive : selectIcon.selectImg" 
                                        alt=""
                                    />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <p class="purchase-zf">
                    <ry-button
                        btn-title="立即付款"
                        :loading="loading"
                        @touchbefore="btnTouchBefore"
                        @touchafter="paymentNext"
                    />
                </p>
            </div>
        </ry-scroll-view>
  </div>
</template>

<script>
import mixins from '@/libs/mixins'
import { RadioGroup, Radio } from 'vant'

export default {
    name: 'ry-purchase',

    mixins: [mixins],

    components: {
        [RadioGroup.name]: RadioGroup,
        [Radio.name]: Radio
    },

    data() {
        const bgImg = require('../../assets/images/payment/ry-bg.png')
        const zfImg = require('../../assets/images/payment/ry-weixin.png')
        const selectImg = require('../../assets/images/payment/ry-selected.png')
        const selectImgActive = require('../../assets/images/payment/ry-selected-active.png')
        const btnImg = require('../../assets/images/payment/ry-weixin.png')
        
        return {
            radio: 0,
            bgImg,
            zfImg,
            selectIcon: {
                selectImg,
                selectImgActive
            },
            zfList: [
                {
                    title: '微信支付',
                    imgUrl: btnImg
                }
            ]
        }
    },

    methods: {
        paymentNext() {
            setTimeout(() => {
                this.loading = false
                this.$router.replace('/paySuccess')
            }, 2000)
        }
    }
}
</script>

<style lang="stylus" scoped>
.purchase-box {
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    background #f5f5f5
}

.pusrchase-info {
    padding 60px 40px 50px
    box-sizing border-box
}

.pusrchase-head {
    padding 0  20px
    box-sizing border-box
}

.pusrchase-con {
    width 100%
    height 169*2px
    padding 0 40px
    box-shadow 0 10px 6px rgba(0,0,0,0.4)
    border-radius 20px
    background-repeat no-repeat
    background-position center
    background-size 100% 100%
    overflow hidden
    box-sizing border-box
    &[lazy='loading'] {
        background-color #eee
    }
    h2 {
        padding 40px 0 30px
        height 40px
        line-height 40px
        font-size 40px
        text-align center
        color #FFCE48
        letter-spacing 5px
        text-align center
        font-weight bold
    }
    p {
        display flex
        align-items baseline
        padding-bottom 8px
        font-size 28px
        height 28px
        font-weight 400
        color #FFCE48
        span {
            display block
            margin-left 6px
            height 24px
            font-size 24px
        }
    }
    .pusrchase-jg {
        display flex
        justify-content flex-end
        margin-bottom 20px
        padding 32px 0 22px
        color #FFCE48
        border-bottom 2px solid rgba(255,206,72,1)
        span {
            display flex
            align-items baseline
            height 40px
            font-size 40px
            font-weight bold
            letter-spacing 1px
            .icon-rmb {
                height 32px
                font-size 32px
                font-weight bold
            }
            i {
                height 28px
                font-size 28px
                font-style normal
            }
        }
    }

    .pusrchase-pri {
        display flex
        justify-content space-between
        height 20px
        line-height 20px
        font-size 20px 
        color #FFCE48
        span {
            display block
        }
    }
}

.pusrchase-select {
    margin-top 54px
    padding 30px
    width 100%
    background #fff
    border-radius 10px
    box-shadow 0px 2px 14px rgba(0,0,0,0.05)
    box-sizing border-box
    h4 {
        padding-bottom 10px
        height 28px
        line-height 28px
        font-size 28px
        color #000
        border-color #e3e3e3
    }
    .pusrchase-select-list {
        li {
            display flex
            align-items center
            justify-content space-between
            padding 20px 0
            border-color #e3e3e3
            &:last-child {
                &:before {
                    border none !important
                }
            }
            .pusrchase-left,
            .pusrchase-right {
                display flex
                align-items center
            }

            .pusrchase-right {
                img {
                    display block
                    width 35px
                    height 35px
                }
            }

            .custom-img {
                width 70px
                height 70px
                margin-right 20px
            }
            .custom-title {
                display block
                height 28px
                font-size 28px
                color #000
            }
        }
    }
}

.purchase-zf {
    padding 120px 90px 0
}
</style>