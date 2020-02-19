<template>
    <div class="cashOut">
        <ry-scroll-view
            :bounce="false"
        >
                <div class="cashOut-box">
                    <div class="cashOut-head">
                        <h2>到账银行卡</h2>
                        <div 
                            @click="showSelectSheet"
                            class="cashOut-head-bank"
                        >
                            <h4>
                                <p v-html="bankMessage"></p>
                                <van-icon 
                                    name="arrow" 
                                    class="cashOut-arrow"
                                />
                            </h4>
                            <p>预计1-3天内到账</p>
                        </div>
                    </div>  
                    <div class="cashOut-content">
                        <h4>提现金额</h4>
                        <div class="cashOut-content-input">
                            <van-field 
                                ref="NumBorder"
                                readonly
                                :value="form.value"
                                :formatter="formatter"
                                @click="showNumBorder"
                            >
                                <img 
                                    slot="left-icon"
                                    src="../../assets/images/cashWithdrawal/rmbIcon.png"
                                    class="cashOut-content-icon"
                                />
                            </van-field>
                        </div>
                        <p>
                            当前资金余额{{fullBalance}}元
                            <span 
                                @click="fullCash"
                            >
                                全部提现
                            </span>
                        </p>
                    </div>
                    <div class="cashOut-btn">
                        <ry-button
                            btn-title="提现"
                            :loading="loading"
                            :class="{'isDisabled': activeBtn}"
                            @touchafter="submit"
                        />
                    </div>        
                </div>
        </ry-scroll-view>
        <!-- 选择银行列表 start -->
        <div class="cashOut-sheet">
            <van-action-sheet v-model="showBankSheet">
                <div class="cashOut-sheet-content">
                    <h2 class="sheet-content-title">选择到账银行卡</h2>
                    <h4 class="sheet-content-time">请留意个银行到账时间</h4>
                    <ul class="cashOut-sheet-select">
                        <li
                            v-for="(item,index) in bankList"
                            :key="index"
                            @click="selectBank(item,index)"
                        >
                            <div class="sheet-select-head">
                                <h2>{{item.bankName}}<span>（{{item.bankNum | sliceBankData}}）</span></h2>
                                <h4>2小时内到账</h4>
                            </div>
                            <p>
                                <img v-show="!selectList[index]" :src="selectImg" alt="">
                                <img v-show="selectList[index]" :src="selectImgActive" alt="">
                            </p>
                        </li>
                        <li
                            @click="addBankCard"
                        >
                            <div class="sheet-select-head">
                                <h2>使用新卡提现</h2>
                            </div>
                            <p>
                                <img :src="selectImg" alt="">
                            </p>
                        </li>
                    </ul>
                </div>
            </van-action-sheet>
        </div>
        <!-- 选择银行列表 end -->
        <!-- 数字键盘 start -->
        <md-number-keyboard
            v-model="showKeyboard"
            @enter="onNumberEnter"
            @delete="onNumberDelete"
        />
        <!-- 数字键盘 end -->
    </div>
</template>

<script>
import { Icon, Field, ActionSheet, NumberKeyboard } from 'vant'
import mixins from '@/libs/mixins'

export default {
    name: 'ry-cashOut',

    mixins: [mixins],

    components: {
        [Icon.name]: Icon,
        [Field.name]: Field,
        [ActionSheet.name]: ActionSheet,
        [NumberKeyboard.name]: NumberKeyboard
    },

    filters: {
        sliceBankData(value) {
            const BANK_NUM = value.slice(-4)
            return BANK_NUM
        }
    },

    data() {
        const selectImg = require('../../assets/images/payment/ry-selected.png')
        const selectImgActive = require('../../assets/images/payment/ry-selected-active.png')
        return {
            selectImg,
            selectImgActive,
            bankMessage: '',
            fullBalance: '1000.20',
            showBankSheet: false,
            showKeyboard: false,
            activeBtn: true,
            bankList: [],
            selectList: [],
            form: {
                value: '',
                bankNum: ''  // 银行卡号
            }  
        }
    },

    watch: {
        'form.value'(value) {
            if (!value || value.substr(0,1) == 0) {
                this.activeBtn = true
            } else {
                this.activeBtn = false
            }
        },
        bankList(data) {
            if (!data.length) {
                this.bankMessage = '使用新卡提现'
            }
        }
    },

    created() {
        this.initData()
    },

    methods: {
        initData() {
            setTimeout(() => {
                this.bankList = [
                    // {
                    //     bankName: '招商银行储蓄卡',
                    //     bankNum: '210812470004250007'
                    // },
                    // {
                    //     bankName: '广发银行储蓄卡',
                    //     bankNum: '2108124700042500072589'
                    // }
                ]
                this.bankList.forEach((item,index) => {
                    if (index == 0) {
                        this.selectList[index] = true
                        this.serBankMessage(item)
                    } else {
                        this.selectList[index] = false
                    }
                })
            }, 1000)
        },
        
        selectBank(item,index) {
            this.selectList = this.selectList.map(() => {
                return false
            })
            this.selectList[index] = true
            this.serBankMessage(item)
            this.showBankSheet = false
        },

        serBankMessage(item) {
            this.form.bankNum = item.bankNum
            this.bankMessage = `${item.bankName}（${item.bankNum.slice(-4)}）`
        },

        showSelectSheet() {
            this.showBankSheet = true
        },

        showNumBorder() {
            this.showKeyboard = true
        },

        onNumberEnter(val) {
            this.form.value += val
        },

        onNumberDelete() {
            if (this.form.value === '') {
                return
            }
            this.form.value = this.form.value.substr(0, this.form.value.length - 1)
        },

        /*全部提现*/
        fullCash() {
            this.form.value = this.fullBalance
        }, 

        formatter(value) {
            // 过滤输入的数字
            return value.replace(/[\u4e00-\u9fa5]/g, '');
        },

        addBankCard() {
            this.$router.push({
                path: '/addBank'
            })
        },

        submit() {
            /* 银行卡号为空 使用新卡提现*/ 
            if (!parseInt(this.form.value)) return
            if (!this.form.bankNum) {
                this.$router.push({
                    path: '/addBank'
                })
                return
            }
            this.changeLoading()
            setTimeout(() => {
                this.loading = false
                this.$router.replace({
                    path: '/waitResult'
                })
            }, 1000)
        }
    }
}
</script>

<style lang="stylus">
@keyframes blink {
    0%, 100% {
        background-color: #ff6f00;
    }
    50% {
        background-color: transparent;
    } 
}
.cashOut .md-scroll-view .scroll-view-container {
    height 100%
}

.cashOut {
    padding 46px 40px 0
    height 100%
    background #f5f5f5
    box-sizing border-box
}

.cashOut-box {
    width 100%
    background #fff
    border-radius 10px
    box-shadow 0px 2px 14px rgba(0,0,0,0.05)
}

.cashOut-head {
    display flex
    margin-bottom 40px
    padding 40px 50px 34px
    h2 {
        margin-right 64px
        height 24px
        line-height 24px
        font-size 24px
        color #000
    }

    .cashOut-head-bank {
        flex 1
        h4 {
            display flex
            justify-content space-between
            align-items center
            padding-bottom 24px
            height 24px
            font-weight 400
            p {
                font-size 24px
                color #4469BF
            }
            .cashOut-arrow {
                color #757575
                font-size 26px
                font-weight bold
            }
        }
        p {
            height 24px
            line-height 24px
            font-size 24px
            color #C2C2C2
            font-weight 400
        }
    }
}

.cashOut-content {
    padding 0 50px 0
    h4 {
        padding-bottom 28px
        height 24px
        line-height 24px
        font-size 24px
    }
    .cashOut-content-input {
        padding-bottom 16px
        border-bottom 2px solid #E3E3E3
        .van-cell {
            position relative
            padding 0 0
            display: flex
            align-items: center
            /*.van-field__body {
                &:after {
                    position: absolute;
                    content: '';
                    display: inline-block;
                    width: 2px;
                    height: 30px;
                    top: 50%;
                    transform: translateY(-50%);
                    animation: blink 1.2s infinite steps(1, start);
                }
            }*/
            input {
                font-size 49px
                font-weight bold
                font-family Noto Sans S Chinese
                caret-color #FF6F00
            }
        }
        .van-field__left-icon {
            display flex
            align-item center
        }
        .cashOut-content-icon {
            width 50px
            height 50px
        }
    }
    p {
        padding 20px 0 0
        height 24px
        line-height 24px
        font-size 24px
        color #c2c2c2
        span {
            margin-left 10px
            color #4469BF
        }
    }
}

.cashOut-btn {
    padding 44px 50px 32px
    .isDisabled {
        .perfect-confirm {
            background #c8c9cca3
            color #969799a8
        }
    }
}

.cashOut-sheet {
    .cashOut-sheet-content {
        padding 42px 0 0
        .sheet-content-title {
            padding 0 40px 20px
            height 36px
            line-height 36px
            font-size 36px
        }
        .sheet-content-time {
            padding 0 40px 30px
            height 24px
            line-height 24px
            font-size 24px
            color #888
            font-weight 400
            border-bottom 2px solid #eee
        }
        .cashOut-sheet-select {
            li {
                display flex
                align-items center
                justify-content space-between
                padding 30px 40px
                border-bottom 2px solid #eee
                box-sizing border-box
                &:last-child {
                    padding 46px 40px
                }
                &:active {
                    background #ebebeb
                }
                .sheet-select-head {
                    h2 {
                        padding-bottom 10px
                        height 32px
                        line-height 32px
                        font-size 32px
                        font-weight 500
                        span {
                            color #f00
                        }
                    }
                    h4 {
                        height 24px
                        line-height 24px
                        font-size 24px
                        color #888
                        font-weight 200
                    } 
                }
                p {
                    width 32px
                    height 32px
                    img {
                       width 100%
                       height 100% 
                       display block
                    }
                }
            }
        }
    }
}
</style>