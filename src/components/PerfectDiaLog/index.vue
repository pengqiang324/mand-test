/*
** 完善信息组件
*/ 
<template>
    <div class="overlay-box">
    <!-- 完善信息窗口start -->
      <van-overlay :show="show">
        <div class="perfect">
            <div class="perfect-info">
                <h1>完善申请人信息</h1>
                <p class="perfect-ms">本平台需实名认证，请<span>完善以下本人信息</span></p>
                <p class="perfect-input">
                    <span>*</span>
                    <input 
                        type="text" 
                        placeholder="请输入本人姓名" 
                        v-model="userName"
                        @input="onInput1"
                        @blur="onBlur"
                    />
                    <span class="tips" v-show="tips_show">姓名不能为空</span>
                </p>
                <p class="perfect-input">
                    <span>*</span>
                    <input 
                        type="text" 
                        placeholder="请输入身份证号码"
                        v-model="idCard" 
                        @input="onInput2"
                        @blur="onBlur"
                    />
                    <span class="tips" v-show="tips_idCard">{{idcardMessage}}</span>
                </p>
                <p class="perfect-input" style="margin-bottom: 0">
                    <input 
                        type="number" 
                        placeholder="请输入邀请码" 
                        v-model="invidCode"
                        @blur="onBlur"
                    />
                </p>
                <ry-button
                    class="ry-button"
                    :btn-show="btnShow"
                    @touchbefore="touchbefore"
                    @touchafter="touchafter"
                />
            </div>
        </div>
      </van-overlay>
      <!-- 完善信息窗口end -->
    </div>
</template>

<script>
import { perfectUserInfo } from '@/api/user/user'
import { idCard } from '@/libs/validate'
import mixins from '@/libs/mixins'
import {
  USER_REFRESHUSERINFO
} from '@/actions/user'

export default {
    name: 'ry-perfect-dialog',

    mixins: [mixins],

    props: {
        show: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            idCard: '',
            userName: '',
            invidCode: '',  // 邀请码
            idcardMessage: '',
            btnShow: false,
            tips_show: false,
            tips_idCard: true,
            timer: null
        }
    },

    beforeDestroy() {
        clearTimeout(this.timer)
    },

    methods: {
        onInput1() {
            this.validateName()
        },

        onInput2() {
            this.validateIdCard()
        },

        touchbefore() {
            this.btnShow = true
        },

        touchafter() {
            this.btnShow = false

            const nameSuccess = this.validateName() // 校验姓名是否为空
            const idCardSuccess = this.validateIdCard() //校验身份证是否为空、是否身份证符合规范

            if (!nameSuccess || !idCardSuccess) return

            perfectUserInfo({
                cardNo: this.idCard,
                inviteCode: this.invidCode ? this.invidCode : '999999',
                name: this.userName
            })
            .then(async (res) => {
                if (res.data.success) {
                    await this.$store.dispatch(USER_REFRESHUSERINFO())  // 刷新用户信息
                    this.$store.dispatch('showDiaLog', false)
                    if (this.$route.path !== '/') {
                        this.timer = setTimeout(() => {
                            this.$router.push('/')
                        }, 300)
                    }
                }
            })
        },

        validateName() {
            if (this.userName == '') {
                this.tips_show = true
                return false
            }
            this.tips_show = false
            return true
        },

        validateIdCard() {
            if (this.idCard == '') {
                this.idcardMessage = '身份证号码不能为空'
                this.tips_idCard = true
                return false
            } else {
                const { success, message } = idCard(this.idCard)
                if (!success) {
                    this.idcardMessage = message
                    this.tips_idCard = true
                    return false
                }
                this.tips_idCard = false
            }
            return true
        }
    }
}
</script>

<style lang="stylus">
.perfect {
  display flex
  align-items center
  justify-content center
  height 100%
}

.perfect-info {
  padding 0 80px
  width 670px
  background-color #fff
  border-radius 20px
  box-sizing border-box
  user-select none
  h1 {
      padding 80px 0 40px
      line-height 28px
      text-align center
      font-size 44px
      color #000
      letter-spacing 5px
  }
  .perfect-ms {
      padding-bottom 32px
      line-height 40px
      letter-spacing 2px
      font-size 28px
      font-weight 600
      color #000
      span {
          color #f00
      }
  }
  .perfect-input {
      position relative
      margin-bottom 40px
      border-bottom 2px solid #dcdcdc
      input {
            display block
            width 100%
            padding 12px 0 12px 50px
            font-size 28px
            line-height 28px
            color #666
            background none
            &::-webkit-input-placeholder {
                color #b4b4b4
                letter-spacing 2px
                font-size 24px
            }
      }
      span {
          position absolute
          top 10px
          left 0px
          color #f00
          font-size 34px
      }
      .tips {
          position absolute
          left 50px
          top 70px
          color #f00
          font-size 24px
          height 24px
          line-height 24px
      }
  }
}
.ry-button {
    margin 86px 0 60px
}
</style>