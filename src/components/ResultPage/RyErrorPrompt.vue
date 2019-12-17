/*
** 统一错误反馈信息组件
** @props {Boolean} visible 是否显示组件
** @events {Function} close 关闭组件回调函数
*/ 
<template>
    <div class="error-box">
      <transition name="ry-slide-up">
        <div class="error-info" v-show="visible">{{errorMessage}}</div>
      </transition>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'ry-error-prompt',

    computed: {
      ...mapState(['errorMessage'])
    },

    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },

    watch: {
      visible(newVal) {
        if (newVal) {
          console.log(1234)
          let timer = setTimeout(() => {
              this.$store.commit('updateErrorInfo', {
                showErrorInfo: false
              })
          }, 3000)

          this.$once('hook:deactivated', () => {
            console.log(1)
            clearTimeout(timer)
            timer = null
          })
        }
      }
    },
}
</script>

<style lang="stylus">
.error-box {
  display flex
  justify-content center
  .error-info {
    padding 8px 40px
    border-radius 12px
    background rgba(50, 50, 51, 0.88)
    opcity 80
    color #fff
    font-size 24px
    text-align center
    line-height 40px
    position absolute
    bottom 110px
    z-index 1000
  }
}

.ry-slide-up-enter,
.ry-slide-up-leave-to {
  transform translateY(200px) 
}

.ry-slide-up-enter-active,
.ry-slide-up-leave-active {
  transition transform .6s ease
}
</style>