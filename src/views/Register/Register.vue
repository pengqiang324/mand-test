<template>
  <div class="register-box">
      <div class="logo-header">
          <img src="../../assets/images/ry_logo@2x.png" alt="">
      </div>
      <div class="user-info">
          <div class="user-name border-1px">
              <input 
                type="text" 
                placeholder="请输入手机号码" 
                readonly="readonly"
                v-model="phoneNumber"
                ref="input0"
                @focus="toggleKeyboard(0)"
              />
          </div>
          <div class="user-number border-1px">
              <input 
                type="text" 
                placeholder="请输入6位验证码"
                readonly="readonly"
                v-model="indtyCode"
                ref="input1"
                @focus="toggleKeyboard(1)"
              />
              <button 
                class="getcode" 
                :disabled="disabled"
                @click="getCode"
              >
                {{btnTitle}}
              </button>
          </div>
          <p class="register-tips">若您未注册，验证后自动注册并登陆</p>
          <div class="register-agree">
            <van-checkbox 
            class="register-checkbox"
            v-model="checked" 
            checked-color="#ff4300"
            shape="square"
            icon-size="15px"
            :label-disabled="true"
            >
                <span class="login-agree" @click="onCheck">登录即同意</span>
                <span class="register-span" @click="onReAgree">《用户注册协议》</span>
                <span class="register-span register-icon" @click="onReProtocol">《用户隐私保护协议》</span>
            </van-checkbox>
        </div>
      </div>
      <div class="register-login">
           <span class="login-button" @click="onLogin">登录</span>
      </div>
      <!-- 数字键盘start -->
      <div class="keyboard">
          <md-number-keyboard
            v-model="isKeyBoardShow[0]"
            hide-dot
            @enter="onNumberEnter"
            @delete="onNumberDelete"
            ></md-number-keyboard>
            <md-number-keyboard
            v-model="isKeyBoardShow[1]"
            hide-dot
            @enter="onNumberEnter"
            @delete="onNumberDelete"
            ></md-number-keyboard>
      </div>
      <!-- 数字键盘end -->
      <!-- 完善信息窗口start -->
      <van-overlay :show="show" @click="show = false">
        <div class="perfect" @click.stop>
            <div class="perfect-info">
                <h1>完善申请人信息</h1>
                <p class="perfect-ms">本平台需实名认证，请<span>完善以下本人信息</span></p>
                <p class="perfect-input">
                    <span>*</span>
                    <input 
                        type="text" 
                        placeholder="请输入本人姓名" 
                        v-model="userName"
                        @blur="onInput1"
                    />
                    <span class="tips" v-show="tips_show">姓名不能为空</span>
                </p>
                <p class="perfect-input">
                    <span>*</span>
                    <input 
                        type="text" 
                        placeholder="请输入身份证号码"
                        v-model="idCard" 
                        @blur="onInput2"
                    />
                    <span class="tips" v-show="tips_idCard">{{idcardMessage}}</span>
                </p>
                <p class="perfect-input">
                    <input 
                        type="number" 
                        placeholder="请输入邀请码" 
                        v-model="invidCode"
                        @blur="onBlur"
                    />
                </p>
                <div class="perfect-btn">
                    <p class="perfect-confirm" @touchstart="onComfirm" @touchend="onTouchend">确认</p>
                    <p class="btn-smark" v-show="btnShow"></p>
                </div>
            </div>
        </div>
      </van-overlay>
      <!-- 完善信息窗口end -->
  </div>
</template>

<script>
import { Checkbox } from 'vant'
import { validatePhone, idCard } from '@/libs/validate'
import mixins from '@/libs/mixins'

export default {
    name: 'ry-register',

    mixins: [mixins],

    components: {
        [Checkbox.name]: Checkbox
    },

    data() {
        return {
            checked: false,
            disabled: false,
            show: true,
            btnShow: false,
            tips_show: false,
            tips_idCard: false,
            changeColor: false,
            isKeyBoardShow: [],
            userName: '',
            idCard: '',
            invidCode: '',  // 邀请码
            phoneNumber: '',
            indtyCode: '', // 验证码
            idcardMessage: '',
            btnTitle: '获取验证码',
            index: 0
        }
    },

    computed: {
        isClick() {
            let resultData = {}
            if(!this.phoneNumber || !this.indtyCode) {
                resultData = {
                    isClick: false,
                    message: '手机号或验证码不能为空'
                }
                return resultData
            } else if (!this.checked) {
                resultData = {
                    isClick: false,
                    message: '请同意用户注册、隐私保护协议'
                }
                return resultData
            } else {
                resultData = {
                    isClick: true,
                    message: ''
                }
                return resultData
            }
        }
    },

    methods: {
        onCheck() {
            this.checked = !this.checked
        },

        toggleKeyboard(index) {
            this.index = index
            document.activeElement.blur() //禁止默认键盘 IOS
            switch (index) {
                case 0:
                    if (this.isKeyBoardShow[1]) this.isKeyBoardShow[1] = false
                    break
                default:
                    if (this.isKeyBoardShow[0]) this.isKeyBoardShow[0] = false
            }

            this.$set(this.isKeyBoardShow, index, !this.isKeyBoardShow[index])
        },

        onNumberEnter(val) {
            switch (this.index) {
                case 0:
                    this.phoneNumber += val
                    break
                default:
                    this.indtyCode += val
            }
        },

        onNumberDelete() {
            switch (this.index) {
                case 0:
                    if (this.phoneNumber === '') return
                    this.phoneNumber = this.phoneNumber.substr(0, this.phoneNumber.length - 1)
                    break
                default:
                    if (this.indtyCode === '') return
                    this.indtyCode = this.indtyCode.substr(0, this.indtyCode.length - 1)
            }
            
        },

        getCode() {
            const { success, message } = validatePhone(this.phoneNumber)
            if (!success) {
                this.$toast({
                    message,
                    duration: 3000,
                    position: 'bottom'
                })
            } else {
                const content = `验证码已发送至 ${this.phoneNumber.substr(0, 3)}****${this.phoneNumber.substr(7, 4)}`
                this.$notify({
                    message: content,
                    color: '#fff',
                    background: 'rgba(0,0,0,.7)'
                })
                //打开数字键盘
                this.isKeyBoardShow[1] = true
                this.index = 1
                this.validateBtn()
            }
        },

        validateBtn(){
            //倒计时
            let time = 60;
            let timer = setInterval(() => {
                if(time == 0) {
                    clearInterval(timer);
                    this.disabled = false;
                    this.btnTitle = "获取验证码";
                } else {
                    this.btnTitle =time + '秒后重试';
                    this.disabled = true;
                    time--
                }
            },1000)
        },

        onLogin() {
           const { isClick, message } = this.isClick
           if (!isClick) {
               this.$toast({
                   message,
                   duration: 3000,
                   position: 'bottom'
               })
               return
           }
           console.log('登录成功')
        },

        onReAgree() {
            this.$router.push('/reagree')
        },

        onReProtocol() {
            this.$router.push('/reprotocol')
        },

        onInput1() {
            this.onBlur()
            this.validateName()
        },

        onInput2() {
            this.onBlur() // 解决ios系统键盘回弹遮罩层样式出现空白
            this.validateIdCard()
        },

        onComfirm() {
            this.btnShow = true

            const nameSuccess = this.validateName() // 校验姓名是否为空
            const idCardSuccess = this.validateIdCard() //校验身份证是否为空、是否身份证符合规范

            if (!nameSuccess || !idCardSuccess) return
            
        },

        onTouchend() {
            this.btnShow = false
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
.register-box {
    background #F5F5F5
    .logo-header {
        display flex
        justify-content center
        align-items center
        padding 198px 0 68*2px
        img {
            display block
            width 150px
        }
    }
    .user-info {
        padding 0 38*2px
        input {
            display block
            width 100%
            padding 6*2px 0
            font-size 14*2px
            line-height 23*2px
            color #666
            background none
            &::-webkit-input-placeholder {
                color #b4b4b4
            }
        }
        .user-number {
            position: relative
            margin-top 37*2px
            .getcode {
                position absolute
                right 0
                bottom 6*2px
                padding 5*2px 8*2px
                line-height 30px
                font-size 12*2px
                color #b5b5b5
                background none
                border 1px solid #dcdcdc
                border-radius 20*2px
            }
        }
        .register-tips {
            padding 10*2px 0 15*2px
            color #292929
            font-size 12*2px
        }
        .register-agree {
        .register-checkbox {
            display flex
            justify-content center
            font-size 12*2px
            color #707070
            line-height 23*2px
            .register-span {
                color #FF4400
                .register-icon {
                    position relative
                    display inline
                    font-style normal
                    left -10px
                }
            }
            .van-icon {
                border-radius 4px
            }
        }
    }
    }
    .register-login {
        padding-top 60*2px
        text-align center
        .login-button {
            display inline-block
            width 290*2px
            height 42*2px
            line-height 42*2px
            font-size 18*2px
            color #fff
            background: linear-gradient(left, #ff6f00, #ff3d00)
            border-radius 42*2px
        }
    }
}
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
  .perfect-btn {
      position relative
      margin 46px 0 60px
      .perfect-confirm {
        width 510px
        height 84px
        line-height 84px
        text-align center
        font-size 36px
        color #fff
        border-radius 50px
        background linear-gradient(left, #FF6F00, #FF3D00)
    }
    .btn-smark {
        position absolute
        top 0
        left 0
        width 510px
        height 84px
        background rgba(0,0,0,.2)
        border-radius 50px
    }
  }
}
</style>