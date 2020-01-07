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
                        :current="0"
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
                <div class="steps-box-info">
                    <ry-scroll-view
                        :bounce="false"
                        class="steps-scroll"
                    >
                        <div class="steps-scroll-box">
                            <!-- 身份信息完善start -->
                            <div class="steps-box" v-show="false">
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
                            <!-- 身份信息完善end -->

                            <!-- 财力信息完善start -->
                            <div class="steps-caili-info">
                                <div class="steps-cl">
                                    <div 
                                        v-for="(item,index) in clList"
                                        :key="index"
                                        class="steps-list"
                                    >
                                        <h2>{{item.title}}</h2>
                                        <p>
                                            <span 
                                                v-for="(value,key) in item.list"
                                                :key="key"
                                                :class="{'caili-active': item.value === key}"
                                                @click="changeClActive(index, key)"
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

                
                            <div class="steps-pri">{{stepsPri}}，请真实勾选，以免影响您的信用额度</div>

                            <div class="steps-btn">
                                <ry-button
                                    btn-title="下一步"
                                />
                            </div>
                        </div>
                    </ry-scroll-view>
                </div>
            </div>
        </ry-scroll-view>
  </div>
</template>

<script>
import { Steps } from 'mand-mobile'

export default {
    name: 'ry-identity',

    components: {
        [Steps.name]: Steps,
    },

    data() {
        return {
            isStepActive: 0,
            activeIndex: 0,
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
                },
                {
                    title: '抵押期限',
                    list: ['小于6个月','6-12个月','大于12个月'],
                    value: 0,
                },
                {
                    title: '车',
                    list: ['无车','全款车','按揭车','抵押车'],
                    value: 0
                },
                {
                    title: '抵押期限',
                    list: ['小于6个月','6-12个月','大于12个月'],
                    value: 0,
                },
                {
                    title: '寿单保险',
                    list: ['无保单','月缴/季缴','年缴','一次缴清'],
                    value: 0
                },
                {
                    title: '保险期限',
                    list: ['大于2年3次','大于3年4次'],
                    value: 0
                },
                {
                    title: '社保公积金',
                    list: ['现单位缴纳','第三方缴纳','无'],
                    value: 2
                },
                {
                    title: '社保公期限',
                    list: ['小于6个月','6-12个月','大于12个月'],
                    value: 0
                },
                {
                    title: '营业执照',
                    list: ['无','个体户','公司'],
                    value: 0
                },
                {
                    title: '执照类型',
                    list: ['法人','非法人'],
                    value: 0
                },
                {
                    title: '微粒贷',
                    list: ['未使用','已使用'],
                    value: 0
                },
                {
                    title: '打卡工资',
                    list: ['有','无'],
                    value: 0
                },
                {
                    title: '学历',
                    list: ['小学','中学','大学'],
                    value: 0
                },
            ],
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
            stepsPri: '身份情况'
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

        changeClActive(index, key) {
            this.clList[index].value = key // 激活分类高亮状态
            switch(index) {
                case 0:
                    break;
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    break;
                case 4:
                    break;
                case 5:
                    break;
                case 6:
                    break;
                default:
                    console.log(2)
            }
        }
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

.steps-caili-info {
    padding 30px 20px 80px
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
</style>