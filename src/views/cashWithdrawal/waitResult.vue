<template>
    <div class="waitResult">
        <ry-scroll-view
            :bounce="false"
        >
            <div class="waitResult-box">
                <!-- 提现进度步骤条 start -->
                <div class="waitResult-proccess">
                    <ul>
                        <li class="activeSuccess">
                            <h2>发起提现申请</h2>
                            <h4>提交请求已经提交</h4>
                            <p>{{data.createTime}}</p>
                        </li>
                        <li 
                            :class="[
                                { 'activeExamine': data.status == '10' ? true : false },
                                { 'activeFail': data.status == '30' ? true : false },
                                { 'activeSize': data.status == '10' ? true : false },
                                {'activeSuccess': data.status == '20' ? true : false}
                            ]"
                        >
                            <h2>审核中</h2>
                            <h4>将在1-3个工作日内返回处理结果</h4>
                            <p>{{data.createTime}}</p>
                        </li>
                        <li 
                            :class="[
                                {'activeFail': data.status == '30' ? true : false},
                                {'activeSuccess': data.status == '20' ? true : false}
                            ]"
                        >
                            <h2 v-if="data.status == '20' || data.status == '10'">提现成功</h2>
                            <h2 v-if="data.status == '30'">提现失败</h2>
                            <p v-if="data.approveTime">2019-12-26  18:20</p>
                        </li>
                    </ul>
                </div>
                <!-- 提现进度步骤条 end -->
                <div class="waitResult-info">
                    <div class="waitResult-info-descri">
                        <h4>提现金额</h4>
                        <p>
                            <md-icon name="rmb" class="waitResult-info-icon"/>
                            <span>{{data.expensesAmount}}</span>
                        </p>
                    </div>
                    <div class="waitResult-info-descri">
                        <h4>到账银行卡</h4>
                        <p>
                            <span>{{data.expensesBankName}}<i>尾号{{data.expensesBankNo | bankSlice}}</i></span>
                        </p>
                    </div>
                </div>
                <div class="waitResult-btn">
                    <div 
                        @click="toMine"
                        class="waitResult-btn-complete"
                    >
                        完成
                    </div>
                </div>
            </div>
        </ry-scroll-view>
    </div>
</template>

<script>

export default {
    name: 'ry-waitResult',

    filters: {
        bankSlice(value) {
            if (!value) return
            const BANK_NUM = value.slice(-4)
            return BANK_NUM
        }
    },

    data() {
        return {
            bankNum: '',
            data: {}
        }
    },

    created() {
        this.initData()
    },

    methods: {
        initData() {
            const data = JSON.parse(sessionStorage.getItem('cashBankInfo'))
            this.data = data
        },

        toMine() {
            this.$router.replace('/mine')
        }
    }
}
</script>

<style lang="stylus">
.waitResult {
    background #f5f5f5
    height 100%
}

..waitResult-box {
    padding 0 40px
}

.waitResult-proccess {
    padding 100px 170px 0
    border-bottom 2px solid #E6E6E6
    li {
        position relative
        padding-bottom 100px
        &:last-child {
            &:before {
                border none
            }
        }
        &.activeExamine {
            &:after {
                width 72px
                height 72px
                top -14px
                left -94px
                background url('../../assets/images/cashWithdrawal/waitExamine.png') center no-repeat !important
                background-size 100% 100%
            }
            &.activeFail {
                &:before {
                    border-color #f00
                }
            }
        }
        &.activeSuccess {
            &:before {
                border-color #00CC3D
            }
            &:after {
                background #00B737
            }
        }
        &.activeFail {
            &:after {
                background #f00
            }
        }
        &.activeSize {
            h2 {
                font-size 40px
                color #000
            }
            h4, p {
                color #000
            }
        }
        &:before {
            content ''
            position absolute 
            left -61px
            top 36px
            height 81%
            width 0px
            border-left 4px dotted #D2D2D2
        }
        &:after {
            content ''
            position absolute 
            top 4px
            left -72px
            width 26px
            height 26px
            border-radius 100%
            background #D2D2D2
        }
        h2 {
            padding-bottom 10px
            height 32px
            line-height 32px
            color #a5a5a5
            font-size 32px
            font-weight 100
        }
        h4,p {
            height 24px
            line-height 24px
            color #a5a5a5
            font-size 24px
        }
        h4 {
            padding-bottom 8px
            font-weight 100
        }
        p {}
    }
}

.waitResult-info {
    padding 30px 40px 0
    .waitResult-info-descri {
        display flex 
        justify-content space-between
        align-items center
        padding-bottom 30px
        &:last-child {
            padding 0
        }
        h4 {
            height 28px
            font-size 28px
            color #A5A5A5
            font-weight 400
        }
        p {
            display flex
            align-items center
            font-size 28px
            .waitResult-info-icon {
                font-size 26px
            }
            span {
                i {
                    margin-left 20px
                    font-style normal
                }
            }
        }
    }
}

.waitResult-btn {
    padding 180px 0 196px
    .waitResult-btn-complete {
        display flex
        justify-content center
        align-items center
        margin auto
        width 356px
        height 64px
        font-size 32px
        color #FD7A36
        border 2px solid #ff5800
        border-radius 32px
        box-sizing border-box
        &:active {
            background #ff5800
            color #fff
        }
    }
}
</style>