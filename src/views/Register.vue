<template>
  <div class="register-box">
      <div class="logo-header">
          <img src="../assets/images/ry_logo@2x.png" alt="">
      </div>
      <div class="user-info">
          <div class="user-name border-1px">
              <input type="text" placeholder="请输入手机号码">
          </div>
          <div class="user-number border-1px">
              <input type="text" placeholder="请输入6位验证码">
              <button class="getcode ">获取验证码</button>
          </div>
          <p class="register-tips">若您未注册，验证后自动注册并登陆</p>
          <div class="register-agree">
            <van-checkbox 
            class="register-checkbox"
            v-model="checked" 
            checked-color="#ff4300"
            icon-size="10px"
            shape="square"
            >
            <span class="login-agree">登录即同意</span>
            <span class="register-span">《用户注册协议》《用户隐私保护协议》</span>
            </van-checkbox>
        </div>
      </div>
      <div class="register-login">
           <span class="login-button">登录</span>
      </div>
  </div>
</template>

<script>
import { Checkbox } from 'vant';
export default {
    name: 'ry-register',

    components: {
        [Checkbox.name]: Checkbox
    },

    data() {
        return {
            checked: true
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
        padding 0 50*2px
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
            }
        }
    }
    }
    .register-login {
        padding-top 60*2px
        text-align center
        .login-button {
            display inline-block
            width 275*2px
            height 42*2px
            line-height 42*2px
            font-size 18*2px
            color #fff
            background: linear-gradient(left, #ff6f00, #ff3d00)
            border-radius 42*2px
        }
    }
}
</style>