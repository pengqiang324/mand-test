<template>
  <div class="learnCourse-box">
        <ry-scroll-view
            :bounce="false"
            class="learnCourse-scroll"
        >
            <div class="learnCourse-head">
                <img v-lazy="headImg" alt="">
            </div>
            <div class="learnCourse-info">
                <div class="learnCourse-list">
                    <div 
                        v-for="(item,index) in data"
                        :key="index"
                        class="learnCourse-list-info"
                    >
                        <div
                            :style="{height: item.isUp ? 'auto': ''}" 
                            ref="learnCourseList"
                            class="learnCourse-list-top"
                        >
                            <ul class="learnCourseTop">
                                <li
                                    v-for="(value,key) in item.list"
                                    :key="key"
                                ><span v-if="key > 0">{{key}}.</span>{{value}}</li>
                            </ul>
                        </div>
                        <div  
                            @click="changeDown(index)"
                            class="downIcon"
                        >
                            <p :class="['down',{'up': item.isUp}]"></p>
                        </div>
                    </div>
                    <div class="learnCourse-btn">
                        <ry-button  
                            btn-title="立即购买"
                            @touchafter="touchafter"
                        />
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
        const headImg = require('../../assets/images/learnCourse/learnHeadBg.jpg')
        return {
            headImg,
            data: [
                {
                    isUp: false,
                    list: [
                        '100万信用额度大咖是怎样练成的？',
                        '申卡前有哪些致命的注意事项？',
                        '填写办卡正确姿势，看完小白变大神，线上申卡秒批！',
                        '信用卡也有三六九等，你是神级别？',
                        '怎样选卡?你不能不知道的选卡秘籍（一）',
                        '有原则的选，才能选到合适的',
                        '怎样选卡?你不能不知道的选卡秘籍（二）',
                        '按难易程度选，才是明智之选',
                        '怎样选卡?你不能不知道的选卡秘籍（三）',
                        '基于消费倾向，快速选择信用卡',
                        '各银行5-100万大额信用卡任你选',
                        '你的信用卡撑得起你要的额度吗？',
                        '大额信用卡表格，你真的会填吗？',
                        '这些大额信用卡申请技巧，你get到了吗？（一）',
                        '这些大额信用卡申请技巧，你get到了吗？（二）',
                        '这些大额信用卡申请技巧，你get到了吗？（三）',
                        '如何避免申请失效，这些误区要躲开！',
                        '信用卡1-100万的提额重心在哪？',
                        '提额原则，资金安全有利可图',
                        '信用卡1-100万的提额重心在哪？',
                        '提额核心，频繁刷卡适当分期',
                        '怎样用信用卡消费，让额度提升？（一）',
                        '怎样用信用卡消费，让额度提升？（二）',
                        '怎样用信用卡消费，让额度提升？（三）',
                        '还款，提额不可忽视的重要环节！',
                        '其他提额方式，让提额变得多元化！（一）',
                        '其他提额方式，让提额变得多元化！（二）',
                        '不同银行的提额技巧，一招致胜！',
                        '临时额度，信用卡提额的一条捷径！（一）',
                        '临时额度，信用卡提额的一条捷径！（二）',
                        '临时额度，信用卡提额的一条捷径！（三）',
                        '临时额度，信用卡提额的一条捷径！（四）',
                        '申请临时额度，三大法则要记牢！',
                        '注意事项，临时额度真的万无一失吗？',
                        '其他提额方式，助力信用额度飞升！',
                        '更多......'
                    ]
                },
                {
                    isUp: false,
                    list:[
                        '轻松掌握个人贷款打造百万信用资产',
                        '从1000元到10万元逐步突破蚂蚁花呗（一）',
                        '从1000元到10万元逐步突破蚂蚁花呗（二）',
                        '从1000元到10万元逐步突破蚂蚁花呗（三）',
                        '这样用蚂蚁花呗，你的额度只会跌，不会涨！',
                        '蚂蚁借呗提额，与蚂蚁花呗有异曲同工之妙！',
                        '京东白条提额，让网络虚拟信用额度蹭蹭蹭！',
                        '京东金条提额，这7大技巧你需要全面掌握！',
                        '要想提升京东白条额度，这些事千万不能碰！',
                        '买房申请信用贷款一步到位！（一）',
                        '买房申请信用贷款一步到位！（二）',
                        '装修，5大方法轻松获得信用贷款！',
                        '买车，3大途径搞定信用贷款问题！',
                        '个人征信，1万，10万，100万的共同核心指标！(一)',
                        '个人征信，1万，10万，100万的共同核心指标！(二)',
                        '不良记录，让你的信用价值从100万跌至为0！(一)',
                        '不良记录，让你的信用价值从100万跌至为0！(二)',
                        '不良记录，让你的信用价值从100万跌至为0！(三)',
                        '善用征信，让你的信用值一步步迈向1000万！(一)',
                        '善用征信，让你的信用值一步步迈向1000万！(二)',
                        '善用征信，让你的信用值一步步迈向1000万！(三)',
                        '善用征信，让你的信用值一步步迈向1000万！(四)',
                        '更多......'
                    ]
                }
            ]
        }
    },

    mounted() {
        this.initHeight() // 初始化每列高度
    },

    methods: {
        initHeight() {
            if (this.isUp) return
            const UL = document.querySelector('.learnCourseTop')
            const LI = UL.children
            const borderHeight = parseFloat(getComputedStyle(LI[0], null).borderBottomWidth)
            let eHeight = 0
            LI.forEach((element, i) => {
                if (i<=7) {
                    eHeight += element.getBoundingClientRect().height
                } 
            })
            document.styleSheets[0].addRule('.learnCourse-list-top', 'height:' + (eHeight + borderHeight)  + 'px')
        },

        changeDown(index) {
            this.data[index].isUp = !this.data[index].isUp
        },

        touchafter() {
            this.$router.replace('/perfectApply')
        }
    }
}
</script>

<style lang="stylus">
.learnCourse-scroll {
    .scroll-view-container {
        min-height 100%
        background #e6f4ff
    }
}
</style>

<style lang="stylus" scoped>
.learnCourse-box {
    background #f5f5f5
}

.learnCourse-head {
    width 100%
    height 167px
    img {
        width 100%
        height 100%
        display block
    }
}

.learnCourse-list {
    padding 40px 40px 0
    box-sizing border-box
    .learnCourse-list-info {
        .downIcon {
            padding-top 10px
            width 100px
            height 60px
            margin auto
        }
        .down {
            margin  auto 
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
        overflow hidden
        ul {
            border 1Px solid #000
        }
        li {
            padding 18px 0
            height 21px
            line-height 21px
            font-size 21px
            font-weight bold
            color #000
            letter-spacing 3px
            border-bottom 1Px solid #000
            box-shadow 0px 6px 14px rgba(146,146,146,0.25)
            &:nth-child(1) {
                padding 26px 0
                height 32px
                line-height 32px
                text-align center
                color #FE9103
                font-weight bold
                font-size 32px
            }
            &:last-child {
                border none
            }
            &:nth-child(2n) {
                background #F2F2F2
            }
            span {
                margin 0 20px 0 20px
            }
        }
    }
    .learnCourse-btn {
        padding 0 50px 120px
    }
}
</style>