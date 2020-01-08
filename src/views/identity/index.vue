<template>
  <div class="identity-box">
        <ry-scroll-view
            :bounce="false"
            class="identity-scroll"
        >
            <div>
                <div class="steps-head">
                    <md-steps
                        :steps="steps"
                        :current="currentIndex"
                        :transition="true"
                    >
                        <template slot="icon" slot-scope="props">
                            <span 
                                :class="['steps-icon', {'steps-active': props.index <= props.currentIndex}]"
                            >
                                <i>{{ props.index+1 }}</i>
                            </span>
                        </template>
                    </md-steps>
                </div>
                <transition name="slide">
                    <!-- 身份情况信息完善 start -->
                    <div class="steps-box-info" v-if="currentIndex === 0" key="sf">
                        <ry-scroll-view
                            :bounce="false"
                            class="steps-scroll"
                        >
                            <div class="steps-scroll-box">
                                <div class="steps-box">
                                    <div class="steps-info">
                                        <div 
                                            v-for="(item,index) in selectList"
                                            :key="index"
                                            class="steps-info-select"
                                            @click="changeUser(index)"
                                        >
                                            <h2>
                                                <img v-show="activeIndex === index" :src="item.img" alt="">
                                                <img v-show="!(activeIndex === index)" :src="item.inImg" alt="">
                                            </h2>
                                            <p>{{item.name}}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div class="steps-pri">身份情况，请真实勾选，以免影响您的信用额度</div>

                                    <div class="steps-btn">
                                        <ry-button
                                            btn-title="下一步"
                                            @touchafter="next"
                                        />
                                    </div>
                                </div>
                            </div>
                        </ry-scroll-view>
                    </div>
                    <!-- 身份情况信息完善 end -->

                    <!-- 财力情况 start -->
                    <div class="steps-box-info"  v-if="currentIndex === 1" key="caic">
                        <ry-scroll-view
                            :bounce="false"
                            class="steps-scroll"
                        >
                            <div class="steps-scroll-box">
                                <!-- 财力信息完善start -->
                                <div class="steps-caili-info">
                                    <div class="steps-cl">
                                        <div 
                                            v-for="(item,index) in clList"
                                            :key="index"
                                            class="steps-list"
                                            v-show="item.show"
                                        >
                                            <h2>{{item.title}}</h2>
                                            <p>
                                                <span 
                                                    v-for="(value,key) in item.list"
                                                    :key="key"
                                                    :class="{'caili-active': item.value === key}"
                                                    @click="changeClActive(index, key, item.label)"
                                                >
                                                    <i>{{value}}</i>
                                                </span>
                                            </p>
                                            <div class="ry-step-line"></div>
                                            <div class="ry-step-circle"></div> 
                                        </div>
                                    </div>
                                </div>
                                <!-- 财力信息完善end -->

                                <div>
                                    <div class="steps-pri">财力情况，请真实勾选，以免影响您的信用额度</div>

                                    <div class="steps-btn">
                                        <ry-button
                                            btn-title="下一步"
                                            @touchafter="next"
                                        />
                                    </div>
                                </div>
                            </div>
                        </ry-scroll-view>
                    </div>
                    <!-- 财力情况 end -->

                    <!-- 信用卡信息 start -->
                    <div class="steps-box-info"   v-if="currentIndex === 2" key="xyk">
                        <ry-scroll-view
                            :bounce="false"
                            class="steps-scroll"
                        >
                            <div class="steps-scroll-box">
                                <!-- 信用卡信息完善start -->
                                <div class="steps-xinyk-info">
                                    <div class="steps-cl">
                                        <div 
                                            v-for="(item,index) in xList"
                                            :key="index"
                                            class="steps-list"
                                        >
                                            <h2>{{item.title}}</h2>
                                            <p>
                                                <span 
                                                    v-for="(value,key) in item.list"
                                                    :key="key"
                                                    :class="['xyk-box', {'caili-active': item.value === key}]"
                                                    @click="changeXActive(index, key, item.label)"
                                                >
                                                    <i>{{value}}</i>
                                                </span>
                                            </p>
                                            <div class="ry-step-line"></div>
                                            <div class="ry-step-circle"></div> 
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div class="steps-pri">信用卡情况，请真实勾选，以免影响您的信用额度</div>

                                    <div class="steps-btn">
                                        <ry-button
                                            btn-title="下一步"
                                            @touchafter="next"
                                        />
                                    </div>
                                </div>
                            </div>
                        </ry-scroll-view>
                    </div>
                    <!-- 信用卡信息 end -->

                    <!-- 征信信息 start -->
                    <div class="steps-box-info"   v-if="currentIndex === 3" key="zx">
                        <ry-scroll-view
                            :bounce="false"
                            class="steps-scroll"
                        >
                            <div class="steps-scroll-box">
                                <div class="steps-credit-info">
                                    <div 
                                        v-for="(item,index) in creditList"
                                        :key="index"
                                        :class="['credit-info-box', {'info-active': (creditStatus-1) === index}]"
                                        @click="changeCredit(index)"
                                    >
                                        <span>{{item}}</span>
                                    </div>
                                </div>

                                <div>
                                    <div class="steps-pri">征信情况，请真实勾选，以免影响您的信用额度</div>

                                    <div class="steps-btn">
                                        <ry-button
                                            btn-title="提交"
                                            :loading="loading"
                                            @touchbefore="btnTouchBefore"
                                            @touchafter="next"
                                        />
                                    </div>
                                </div>
                            </div>
                        </ry-scroll-view>
                    </div>
                    <!-- 征信信息 end -->
                 </transition>
            </div>
            <!-- 通过遮罩层 start -->
            <div class="mask-box" v-if="maskPassShow">
                <div class="mask-info">
                    <img :src="img"/>
                    <span 
                        @touchstart="passTouchstart"
                        @touchend="passTouchend"
                        :class="{'btn-active': isActive}"
                    >
                        <i>下一步</i>
                    </span>
                </div>
            </div>
            <!-- 通过遮罩层 end -->

            <!-- 不通过遮罩层 start -->
            <div class="mask-box noPass-box" v-if="maskNoPassShow">
                <div class="mask-info">
                    <img :src="img"/>
                    <span 
                        @touchstart="passTouchstart"
                        @touchend="passTouchend"
                        :class="{'btn-active': isActive}"
                    >
                        <i>下一步</i>
                    </span>
                </div>
            </div>
            <!-- 不通过遮罩层 end -->
        </ry-scroll-view>
  </div>
</template>

<script>
import { Steps } from 'mand-mobile'
import mixins from '@/libs/mixins'

export default {
    name: 'ry-identity',

    mixins: [mixins],

    components: {
        [Steps.name]: Steps
    },

    data() {
        const img1 = require('../../assets/images/identity/pass01.png')
        const img2 = require('../../assets/images/identity/pass02.png')
        const img3 = require('../../assets/images/identity/pass03.png')
        const img4 = require('../../assets/images/identity/noPass.png')
        return {
            activeIndex: 0,  // 身份信息头像高亮索引
            currentIndex: 0, // 步骤条进度
            creditStatus: 1, // 征信状态
            isShow: true,
            maskPassShow: false,
            maskNoPassShow: false,
            isPassShow: false,
            isNoPassShow: false,
            steps: [
                {
                    name: '选择身份'
                },
                {
                    name: '财力'
                },
                {
                    name: '信用卡'
                },
                {
                    name: '征信'
                }
            ],
            selectList: [
                {
                    name: '上班族',
                    img: require('../../assets/images/identity/ry-select01-active.png'),
                    inImg: require('../../assets/images/identity/ry-select01.png')
                },
                {
                    name: '上市公司',
                    img: require('../../assets/images/identity/ry-select02-active.png'),
                    inImg: require('../../assets/images/identity/ry-select02.png')
                },
                {
                    name: '事业单位（公务员）',
                    img: require('../../assets/images/identity/ry-select03-active.png'),
                    inImg: require('../../assets/images/identity/ry-select03.png')
                },
                {
                    name: '自由职业',
                    img: require('../../assets/images/identity/ry-select04-active.png'),
                    inImg: require('../../assets/images/identity/ry-select04.png')
                },
                {
                    name: '个体/企业法人',
                    img: require('../../assets/images/identity/ry-select05-active.png'),
                    inImg: require('../../assets/images/identity/ry-select05.png')
                },
                {
                    name: '学生',
                    img: require('../../assets/images/identity/ry-select06-active.png'),
                    inImg: require('../../assets/images/identity/ry-select06.png')
                }
            ],
            clList: [
                {
                    title: '房产',
                    list: ['无房','全款房','按揭房','抵押房'],
                    value: 0,
                    label: 'houseProperty',
                    show: true
                },
                {
                    title: '抵押期限',
                    list: ['小于6个月','6-12个月','大于12个月'],
                    value: 0,
                    label: 'houseMortgage',
                    show: false
                },
                {
                    title: '车',
                    list: ['无车','全款车','按揭车','抵押车'],
                    value: 0,
                    label: 'carProperty',
                    show: true
                },
                {
                    title: '抵押期限',
                    list: ['小于6个月','6-12个月','大于12个月'],
                    value: 0,
                    label: 'carMortgage',
                    show: false
                },
                {
                    title: '寿单保险',
                    list: ['无保单','月缴/季缴','年缴','一次缴清'],
                    value: 0,
                    label: 'lifeInsurance',
                    show: true,
                },
                {
                    title: '保险期限',
                    list: ['大于2年3次','大于3年4次'],
                    value: 0,
                    label: 'insurancePeriod',
                    show: false
                },
                {
                    title: '社保公积金',
                    list: ['现单位缴纳','第三方缴纳','无'],
                    value: 2,
                    label: 'accumulationFund',
                    show: true
                },
                {
                    title: '社保公期限',
                    list: ['小于6个月','6-12个月','大于12个月'],
                    value: 0,
                    label: 'accumulationFundTime',
                    show: false
                },
                {
                    title: '营业执照',
                    list: ['无','个体户','公司'],
                    value: 0,
                    label: 'businessLicense',
                    show: true
                },
                {
                    title: '执照类型',
                    list: ['法人','非法人'],
                    value: 0,
                    label: 'businessLicenseType',
                    show: false
                },
                {
                    title: '微粒贷',
                    list: ['未使用','已使用'],
                    value: 0,
                    label: 'particulateLoan',
                    show: true
                },
                {
                    title: '打卡工资',
                    list: ['有','无'],
                    value: 0,
                    label: 'payCard',
                    show: true
                },
                {
                    title: '学历',
                    list: ['小学','中学','大学'],
                    value: 0,
                    label: 'education',
                    show: true
                },
            ],
            xList: [
                {
                    title: '信用卡',
                    list: ['有信用卡','无信用卡'],
                    value: 0,
                    label: 'creditCard'
                },
                {
                    title: '信用卡额度',
                    list: ['信用卡额度3万以内','信用卡额度3万以上'],
                    value: 0,
                    label: 'creditCardLimit',
                },
                {
                    title: '信用卡数量',
                    list: ['他行信用卡4张以内','他行信用卡7张以上'],
                    value: 0,
                    label: 'creditCardNumber',
                },
                {
                    title: '持卡时间',
                    list: ['持卡时间6个月以内','持卡时间6个月以上'],
                    value: 0,
                    label: 'creditCardTime',
                },
            ],
            Imgs: [img1,img2,img3,img4],
            creditList: ['优秀','良好','一般','较差'],
            clData: {
                houseProperty: 1, // 房产
                houseMortgage: 1, // 房产抵押
                carProperty: 1, // 车
                carMortgage: 1, // 车抵押
                lifeInsurance: 1, // 寿险
                insurancePeriod: 1, // 保险期限
                accumulationFund: 3, // 社保公积金
                accumulationFundTime: 1, // 公积金期限
                businessLicense: 1, // 营业执照
                businessLicenseType: 1, //执照类型
                particulateLoan: 1, // 微粒贷
                payCard: 1, //工资卡
                education: 1, //学历

            },
            xData: {
                creditCard: 1, // 信用卡
                creditCardLimit: 1, // 信用卡额度
                creditCardNumber: 1, // 信用卡数量
                creditCardTime: 1, // 持卡时间
            },
            img: ''
        }
    },

    computed: {
         identity() {
             const INDEX = this.activeIndex + 1
             return INDEX
         }
    },

    methods: {
        changeUser(index) {
            this.activeIndex = index
        },

        changeClActive(index, key, label) {
            this.clList[index].value = key // 激活分类高亮状态
            const VALUE = key + 1
            switch(label) {
                case 'houseProperty':
                    this.clData['houseProperty'] = VALUE
                    this.changeStatus(index, key)  // 房产抵押期限
                    break
                case 'houseMortgage':
                    this.clData['houseMortgage'] = VALUE
                    break
                case 'carProperty':
                    this.clData['carProperty'] = VALUE
                    this.changeStatus(index, key)  // 车抵押期限
                    break
                case 'carMortgage':
                    this.clData['carMortgage'] = VALUE
                    break
                case 'lifeInsurance': 
                    this.clData['lifeInsurance'] = VALUE
                    this.changeStatus(index, key)  // 寿险保单期限
                    break
                case 'insurancePeriod':
                    this.clData['insurancePeriod'] = VALUE
                    break
                case 'accumulationFund':
                    this.clData['accumulationFund'] = VALUE
                    if (key < 2) { // 社保公积金期限
                        this.clList[index + 1].show = true
                    } else {
                        this.clList[index + 1].show = false
                    } 
                    break
                case 'accumulationFundTime':
                    this.clData['accumulationFundTime'] = VALUE
                    break
                case 'businessLicense':
                    this.clData['businessLicense'] = VALUE
                    if (key > 0) { // 执照类型
                        this.clList[index + 1].show = true
                    } else {
                        this.clList[index + 1].show = false
                    }
                    break
                case 'businessLicenseType':
                    this.clData['businessLicenseType'] = VALUE
                    break
                case 'particulateLoan':
                    this.clData['particulateLoan'] = VALUE
                    break
                case 'payCard':
                    this.clData['payCard'] = VALUE
                    break
                default:
                    this.clData['education'] = VALUE
            }
        },

        changeXActive(index, key, label) {
            this.xList[index].value = key // 激活分类高亮状态
            const VALUE = key + 1
            switch(label) {
                case 'creditCard':
                    this.xData['creditCard'] = VALUE
                    break
                case 'creditCardLimit':
                    this.xData['creditCardLimit'] = VALUE
                    break
                case 'creditCardNumber':
                    this.xData['creditCardNumber'] = VALUE
                    break
                default:
                    this.clData['creditCardTime'] = VALUE
            }
        },

        changeStatus(index, key) {
            if (key > 1) {
                this.clList[index + 1].show = true
            } else {
                this.clList[index + 1].show = false
            }
        },

        changeCredit(index) {
            this.creditStatus = index + 1
        },

        async next() {
            const LENGTH = this.steps.length
            
            if (this.currentIndex >= LENGTH -1) {
                
                if (this.creditStatus === 4) {
                   await new Promise((resolve) => {
                        setTimeout(() => {
                            this.loading = false
                            resolve(1)
                        }, 1000)
                    })
                    this.img = this.Imgs[3]  // 征信较差
                    this.maskNoPassShow = true
                    return
                } else {
                    await new Promise((resolve) => {
                        setTimeout(() => {
                            this.loading = false
                            resolve(1)
                        }, 1000)
                    })
                    switch(this.creditStatus) {
                        case 1: 
                            this.img = this.Imgs[2] // 征信优秀
                            break
                        case 2:
                            this.img = this.Imgs[1] // 征信良好
                            break
                        default:
                            this.img = this.Imgs[0] // 征信一般
                            break
                    }
                    this.maskPassShow = true
                }
            } else {
                this.currentIndex ++
            }
        },

        passTouchstart() {
            this.publishStart()
        },

        passTouchend() {
            this.publishEnd()
        },
    }
}
</script>

<style lang="stylus">
.md-steps.md-steps-horizontal {
    .text-wrapper {
        .name {
            color #E3E3E3
        }
    }
}
.identity-scroll {
    .scroll-view-container {
        height 100%
    }
}

.steps-scroll {
    .scroll-view-container {
        height auto
    }
}
</style>

<style lang="stylus" scoped>
.identity-box {
    height 100%
    background #f5f5f5
}

.mask-box {
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background rgba(0,0,0,.5)
    color #fff
    display flex
    align-items center
    justify-content center
    z-index 3000
    .mask-info {
        position relative
        width 512px
        height 736px
        img {
            display block
            width 100%
            height 100%
        }
        span {
            display flex
            align-items center
            justify-content center
            position absolute
            bottom 40px
            width 380px
            height 65px
            left 45%
            transform translateX(-50%)
            background url('../../assets/images/identity/pass-btn.png') center no-repeat
            background-size 100% 100%
            i {
                display block
                height 28px
                font-size 28px
                color #fff
                font-style normal
            }
        }
    }
    &.noPass-box {
        .mask-info {
            span {
                left 50%
                bottom 100px
                background url('../../assets/images/identity/noPass-btn.png') center no-repeat
                background-size 100% 100%
                i {
                    color #000
                }
            }
        }
    }
}

.steps-scroll-box {
    overflow-x hidden
}

.steps-box-info {
    position absolute
    top 198px
    width 100%
    height calc(100% - 198px)
    overflow hidden
}

.steps-head {
    position absolute
    top 0
    left 0
    width 100%
    z-index 3000
    padding-top 22px
    background #fff
    box-shadow 0px 6px 12px rgba(0,0,0,0.16)
    .steps-icon {
        display flex
        align-items center
        justify-content center
        width 36px
        height 36px
        text-align center
        border-radius 50%
        background #fff
        border 2px solid rgba(228,228,228,1)
        color #E4E4E4
        box-sizing border-box
        &.steps-active {
            background #FF6B00
            color #fff
            border none
        }
        i {
            display block
            height 20px
            font-size 20px
            font-style normal
        }
    }
}

.steps-box {
    padding 30px 40px 80px
    box-sizing border-box
    .steps-info {
        padding 49px 0 51px
        height 672px
        border-radius 20px
        background #fff
        box-shadow 0px 6px 12px rgba(0,0,0,0.16)
        box-sizing border-box
        &:after {
            display block
            content ''
            clear both
        }
        .steps-info-select {
            float left
            width 156px
            display flex
            flex-direction column
            align-items center
            justify-content center
            padding 41px 33px
            h2 {
                padding-bottom 20px
                width 156px
                height 156px
                overflow hidden
                img {
                    display block
                    width 100%
                    height 100%
                }
            }
            p {
                height 28px
                line-height 28px
                text-align center
                font-size 28px
                color #313030
            }
        }
    }
}

.steps-caili-info,
.steps-xinyk-info {
    padding 30px 20px 80px
}

.steps-credit-info {
    padding 140px 0 166px
    .credit-info-box {
        display flex
        align-items center
        justify-content center
        margin 0 auto 30px
        width 444px
        height 80px
        border 2px solid rgba(162,162,162,1)
        border-radius 40px
        box-sizing border-box
        span {
            display block
            height 40px
            font-size 40px
            color #A2A2A2
            font-weight bold
        }
        &.info-active {
            background #FF8324
            border none
            span {
                color #fff
            }
        }
    }
}

.xyk-box {
    width 276px !important
    margin-right 38px !important
    &:last-child {
        margin-right 0
    }
}

.steps-cl {
    padding 30px 28px 0 54px
    background #fff
    border-radius 20px
    box-shadow:0px 6px 12px rgba(0,0,0,0.16)
    box-sizing border-box
    .steps-list {
        position relative
        padding-bottom 40px
        h2 {
            height 28px
            line-height 28px
            font-size 28px
            color #000
        }
        p {
            display flex
            align-items center
            flex-wrap wrap
            span {
                display flex
                align-items center
                justify-content center
                margin-right 56px
                margin-top 20px
                width 172px
                height 66px
                border 2px solid rgba(162,162,162,1)
                box-sizing border-box
                border-radius 6px
                background #fff
                &:nth-child(3) {
                    margin-right 0
                }
                i {
                    display block
                    font-size 28px
                    font-style normal
                    color #A2A2A2
                }
                &.caili-active {
                    background #FF8324
                    border none
                    i {
                        color #fff
                    }
                }
            }
        }
        .ry-step-line {
            position absolute
            top: 12px
            left: -26px
            z-index 1
            width: 1px
            height: 100%
            background #DFDFDF
        }
        .ry-step-circle {
            position absolute
            left -32px
            top 4px
            z-index 2
            width 14px
            height 14px
            border-radius 100%
            background #DFDFDF
            box-sizing border-box
        }

        &:last-child {
            .ry-step-line {
                display none 
            }
        }
    }
}

.steps-pri {
    padding-bottom 30px
    height 20px
    line-height 20px
    text-align center
    font-size 20px
    color #000
}

.steps-btn {
    padding 0 90px 120px
}

.slide-enter {
    transform translate3d(100%, 0, 0)
}
.slide-enter-active,
.slide-leave-active {
    transition transform .5s ease
}

.slide-enter-to,
.slide-leave {
    transform translate3d(0, 0, 0)
}
.slide-leave-to {
    transform translate3d(-100%, 0, 0)
}
</style>