<template>
    <div class="addBank">
        <ry-scroll-view
            :bounce="false"
        >
            <div class="addBank-box">
                <div class="addBank-head">
                    <h2>请绑定持卡人本人的银行卡</h2>
                    <div class="addBank-cell">
                        <van-field 
                            v-model="form.cardholder" 
                            label="持卡人" 
                            label-width="70px"
                            placeholder="请输入持卡人姓名"
                            readonly
                            class="cardholder-field" 
                        />
                        <van-field 
                            v-model="form.cardNum" 
                            type="number"
                            label="卡号" 
                            label-width="70px"
                            placeholder="请输入持卡人银行卡号"
                            :clearable="true"
                            :error="error"
                            :error-message="errorMessage"
                            @input="checkCard"
                            class="cardholder-field" 
                        />
                        <van-field 
                            v-model="form.cardId"
                            type="number" 
                            label="身份证" 
                            label-width="70px"
                            placeholder="请输入持卡人身份证号"
                            :clearable="true"
                            readonly
                            class="cardholder-field" 
                        />
                    </div>
                </div>
                <div class="addBank-btn">
                    <ry-button
                        :loading="loading"
                        btn-title="提交"
                        @touchafter="submit"
                    />
                </div>
            </div>
        </ry-scroll-view>
    </div>
</template>

<script>
import { Field } from 'vant'
import mixins from '@/libs/mixins'
import { bankCard } from '@/libs/validate'
import { saveBank } from '@/api/bankCash/bankCash'

export default {
    name: 'ry-addBank',

    mixins: [mixins],

    components: {
        [Field.name]: Field
    },

    data() {
        return {
            error: false,
            errorMessage: '',
            form: {
                cardholder: '',
                cardNum: '',
                cardId: ''
            }
        }
    },

    created() {
        this.getUserData()
    },

    methods: {
        getUserData() {
            const userData = JSON.parse(localStorage.getItem('userdetailInfo'))
            this.form.cardholder = userData.name
            this.form.cardId = userData.cardNo
            
        },

        /* 校验银行卡号 */ 
        isClick() {
            let resultData = {}
            if(!this.form.cardNum) {
                resultData = {
                    isClick: false,
                    message: '请输入银行卡号'
                }
                return resultData
            } else {
                resultData = {
                    isClick: true,
                    message: ''
                }
                return resultData
            }
        },

        /* 输入银行卡号 */ 
        checkCard(value) {
            if (!value) {
                this.error = false
                this.errorMessage = ''
                return
            }

            const { success, message } = bankCard(value)
            if (!success) {
                this.error = true
                this.errorMessage = message
                return
            }

            /* 执行银行卡回显信息 */
            this.error = false
            this.errorMessage = ''
        },

        submit() {
            const { isClick, message } = this.isClick()
            if (!isClick) {
                this.$toast({
                   message,
                   duration: 3000,
                   position: 'bottom'
               })
               return
            }
            this.changeLoading()
            const data = {
                bankNumber: this.form.cardNum,
                cardNo: this.form.cardId,
                name: this.form.cardholder
            }
         
            saveBank(data)
            .then((res) => {
                const { success } = res.data
                if (success) {
                    this.$router.push({
                        path: '/cashWithdrawal'
                    })
                }
                this.loading = false
            })
        }
    }
}
</script>

<style lang="stylus">
.addBank {
    height 100%
    background #f5f5f5
}

.addBank-box {
    .addBank-head {
        h2 {
            padding 32px 40px 20px
            height 32px
            line-height 32px
            color #a5a5a5
            font-weight 400
            font-size 32px
        }
    }

    .addBank-cell {
        .cardholder-field {
            padding 30px 40px
            input {
                caret-color #FF6F00
            }
        }
    }

    .addBank-btn {
        padding 130px 90px 0
    }
}
</style>