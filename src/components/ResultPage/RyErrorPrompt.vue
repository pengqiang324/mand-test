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
          let timer = setTimeout(() => {
              this.$store.commit('updateErrorInfo', {
                showErrorInfo: false
              })
              clearTimeout(timer)
              timer = null
          }, 3000)
        }
      }
    },
}
</script>

<style lang="stylus">
.error-box {
  position absolute
  bottom 110px
  z-index 1000
  text-align center
  .error-info {
    display inline-block
    padding 8px 40px
    border-radius 12px
    background rgba(50, 50, 51, 0.88)
    opcity 80
    color #fff
    font-size 24px
    text-align center
    line-height 40px
  }
}

.ry-slide-up-enter,
.ry-slide-up-leave-to {
  transform translate3d(0, 200px, 0) 
}

.ry-slide-up-enter-active,
.ry-slide-up-leave-active {
  transition transform .6s ease
}
</style>