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
                                <div class="cashOut-head-next">
                                    <van-loading 
                                        v-if="bankLoading"
                                        color="#FF6F00"
                                        size="20px"
                                        class="cashOut-head-loading"
                                    />
                                    <van-icon 
                                        name="arrow" 
                                        class="cashOut-arrow"
                                    />
                                </div>
                            </h4>
                            <p>预计1-3个工作日内到账</p>
                        </div>
                    </div>  
                    <div class="cashOut-content">
                        <h4>
                            提现金额
                            <span>备注：满100元才可提现</span>
                        </h4>
                        <div class="cashOut-content-input">
                            <van-field 
                                ref="NumBorder"
                                readonly
                                :value="form.value"
                                @click="showNumBorder"
                            >
                                <img 
                                    slot="left-icon"
                                    src="../../assets/images/cashWithdrawal/rmbIcon.png"
                                    class="cashOut-content-icon"
                                />
                            </van-field>
                        </div>
                        <p v-show="isPass" style="color: #f00;">输入金额超过资金余额</p>
                        <p v-show="!isPass">
                            当前资金余额<i>{{fullBalance}}</i>元
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
                    <h4 class="sheet-content-time">请留意各银行到账时间</h4>
                    <ul class="cashOut-sheet-select">
                        <li 
                            v-show="bankLoading"
                            class="cashOut-sheet-loading"
                        >
                            <van-loading 
                                color="#FF6F00"
                                size="30px"
                            />
                        </li>
                        <li
                            v-show="!bankLoading"
                            v-for="(item,index) in bankList"
                            :key="index"
                            @click="selectBank(item,index)"
                        >
                            <div class="sheet-select-head">
                                <h2>{{item.bankName}}<span>（{{item.bankNumber | sliceBankData}}）</span></h2>
                                <h4>预计1-3个工作日内到账</h4>
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
        <!-- 提现信息提示框 start -->
        <van-dialog 
            v-model="showCashDialog" 
            show-cancel-button
            confirmButtonText="确认提现"
            :before-close="cashBefore"
            class="cash-dialog"
        >
            <div class="cash-dialog-box">
                <h2>您正在发起一笔提现</h2>
                <p>
                    提现金额
                    <span>{{form.value | filterMoney}}元</span>
                </p>
                <p>
                    提现到
                    <span>{{bankMessage}}</span>
                </p>
            </div>
        </van-dialog>
        <!-- 提现信息提示框 end -->
    </div>
</template>

<script>
import { Icon, Field, ActionSheet, NumberKeyboard, Dialog } from 'vant'
import mixins from '@/libs/mixins'
import { getByMemberId, saveExpenses } from '@/api/bankCash/bankCash'
import { isDotNum } from '@/libs/validate'
import { mapState } from 'vuex'
let that

export default {
    name: 'ry-cashOut',

    mixins: [mixins],

    components: {
        [Icon.name]: Icon,
        [Field.name]: Field,
        [Dialog.Component.name]: Dialog.Component,
        [ActionSheet.name]: ActionSheet,
        [NumberKeyboard.name]: NumberKeyboard
    },

    filters: {
        sliceBankData(value) {
            const BANK_NUM = value.slice(-4)
            return BANK_NUM
        },
        /* 过滤数字是否带小数点 */ 
        filterMoney(value) {
            if (!value) return
            const ISDOTNUM = isDotNum(value)
            let newVal = ''
            if (!ISDOTNUM) {
                newVal = value + '.00'
            } else {
                const dotVal = value.split('.')
                if (dotVal[1].length == 1 ) {
                    newVal = value + '0'
                } else if (!dotVal[1].length) {
                    newVal = value + '00'
                } else {
                    newVal = value
                }
            }
            that.form.bankMoney = newVal
            return newVal
        }
    },

    data() {
        const selectImg = require('../../assets/images/payment/ry-selected.png')
        const selectImgActive = require('../../assets/images/payment/ry-selected-active.png')
        return {
            selectImg,
            selectImgActive,
            bankMessage: '',
            fullBalance: '',
            showBankSheet: false,
            showKeyboard: false,
            bankLoading: false,
            showCashDialog: false,
            activeBtn: true,
            isPass: false,
            bankList: [],
            selectList: [],
            form: {
                value: '',
                bankMoney: '',
                bankName: '',
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
                const reg = /\./
                if (reg.test(value)) {
                    const DOTNUM = value.split('.')
                    if (DOTNUM[1].length > 2) {
                        const NEWVALUE = DOTNUM[1].substr(0, 2)
                        this.form.value = `${DOTNUM[0]}.${NEWVALUE}`
                    }
                }
            }
        },
        bankList(data) {
            if (!data.length) {
                this.form.bankName = ''
                this.form.bankNumber = ''
                this.bankMessage = '使用新卡提现'
            }
        }
    },
    
    computed: {
        ...mapState('cashBank', ['isTakeVuexState','bankInfo'])
    },

    beforeCreate() {
        that = this
    },

    created() {
        this.initData()
        this.getUserData()
    },

    methods: {
        getUserData() {
            const USERINFO = JSON.parse(localStorage.getItem('userdetailInfo'))
            this.fullBalance = USERINFO.usedAmount
        },

        initData() {
            this.bankLoading = true
            getByMemberId()
            .then((res) => {
                const { success, data } = res.data
                if (success) {
                    const BANK_NUMBER = this.bankInfo
                    this.bankList = data
                    this.bankList.forEach((item,index) => {
                        if (this.isTakeVuexState) {
                            /* 新增银行卡 */ 
                            if (item.bankNumber == BANK_NUMBER.bankNumber) {
                                this.selectList[index] = true
                                this.serBankMessage(item)
                            } else {
                                this.selectList[index] = false
                            }
                        } else {
                            if (index == 0) {
                                this.selectList[index] = true
                                this.serBankMessage(item)
                            } else {
                                this.selectList[index] = false
                            }
                        }
                    })
                }
                this.bankLoading = false
            })
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
            this.form.bankNum = item.bankNumber
            this.form.bankName = item.bankName
            this.bankMessage = `${item.bankName}（${item.bankNumber.slice(-4)}）`
        },

        showSelectSheet() {
            this.showBankSheet = true
        },

        showNumBorder() {
            this.showKeyboard = true
        },

        onNumberEnter(value) {
            this.form.value += value
            // 当前输入余额大于资金余额
            this.checkMoney()
        },

        onNumberDelete() {
            if (this.form.value === '') {
                return
            }
            this.form.value = this.form.value.substr(0, this.form.value.length - 1)
            this.checkMoney()
        },

        checkMoney() {
            if (parseFloat(this.form.value) > parseFloat(this.fullBalance)) {
                this.isPass = true
            } else {
                this.isPass = false
            }
        },

        /*全部提现*/
        fullCash() {
            this.form.value = this.fullBalance
        }, 

        addBankCard() {
            this.$router.push({
                path: '/addBank'
            })
        },

        cashBefore(action, done) {
            if (action === 'confirm') {
                const data = {
                    expensesAmount: this.form.bankMoney,
                    expensesBankName: this.form.bankName,
                    expensesBankNo: this.form.bankNum
                }

                saveExpenses(data)
                .then((res) => {
                    const { success, data } = res.data
                    if (success) {
                        console.log(data)
                        this.$store.commit('shopOwner/REFRESH_USER_INFO', true)
                        sessionStorage.setItem('cashBankInfo', JSON.stringify(data))
                        this.$router.replace('/waitResult')
                    }
                    done()
                })
            } else {
                done()
            }
        },

        submit() {
            if (!parseFloat(this.form.value)) return
            /* 输入金额超过资金金额 */ 
            if (this.isPass) {
                this.$toast({
                    message: '超出本次提现金额',
                    position: 'bottom'
                })
                return
            }
            if (this.form.value < 100) {
                this.$toast({
                    message: '提现金额少于100元',
                    position: 'bottom'
                })
                return
            }
            /* 银行卡号为空 使用新卡提现*/ 
            if (!this.form.bankNum) {
                this.$router.push({
                    path: '/addBank'
                })
                return
            }

            this.showCashDialog = true
        }
    }
}
</script>

<style lang="stylus">
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
            .cashOut-head-next {
                display flex
                align-items center
                .cashOut-head-loading {
                    margin-right 15px
                }
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
        display flex
        align-items flex-end
        padding-bottom 28px
        height 24px
        line-height 24px
        font-size 24px
        span {
            display block
            font-size 22px
            color #f00
            margin-left 20px
            font-weight 100
        }
    }
    .cashOut-content-input {
        padding-bottom 16px
        border-bottom 2px solid #E3E3E3
        .van-cell {
            position relative
            padding 0 0
            display: flex
            align-items: center
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
        i {
            margin-left 5px
            font-style normal
        }
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
            max-height 500px
            overflow-y scroll
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
                &.cashOut-sheet-loading {
                    display flex
                    justify-content center
                    padding 40px 0
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

.cash-dialog {
    .cash-dialog-box {
    }
    h2 {
        padding 50px 0 50px
        text-align center
        font-size 38px
    }
    p {
        padding 0 110px 40px
        display flex
        align-items flex-end
        height 30px
        font-size 26px
        color #A5A5A5
        letter-spacing 1px
        span {
            display flex
            align-items flex-end
            margin-left 30px
            font-size 30px
            font-family Noto Sans S Chinese
            font-weight bold
            color #000
        }
    }
}
</style>