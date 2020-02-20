<template>
  <div id="app">
    <transition
      :name="transitionName" 
    >
      <keep-alive :include="keepAlive" v-if="isRouterAlive">
        <router-view 
          class="router-view"
          v-wechat-title='$route.meta.title'
        />
      </keep-alive>
    </transition>
    <ry-loading v-if="hideAppLoading" class="ry-loading"></ry-loading>
    <ry-tabbar v-show="$route.meta.hasFooter"/>
    <ry-error-prompt :visible="showErrorInfo"/>
    <ry-perfect-dialog :show="showDiaLog"/>
    <ry-error-info v-if="showErrorLogin"></ry-error-info>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Tabbar from './components/Tabbar'

export default {
  name: 'app',

  components: {
    [Tabbar.name]: Tabbar
  },

  provide () {
    return {
      reload: this.reload
    }
  },

  data(){
    return {
      active: 0,
      isRouterAlive: true,
      transitionName: '',
    }
  },

  computed: {
    ...mapState([
      'showDiaLog',
      'showErrorInfo',
      'hideAppLoading',
      'showErrorLogin'
    ]),
    keepAlive () {
      return this.$store.getters.keepAlive
    }
  },

  watch: {
    $route(to, from) {
      // 动态缓存组件
      if (to.meta.keepAlive && this.$store.getters.keepAlive.indexOf(to.name) == -1) this.$store.commit('SET_KEEP_ALIVE', to.name)

      // 刷新页面动画、首次进入注册页面
      if(!from.meta.index) {
        if (to.path === '/register') {
          this.transitionName = 'slideup'
          return
        }
        return
      }
    
      // 进入完成开通交互
      if (to.path === '/openSuccess' || (to.path === '/waitResult' && from.path === '/cashOut')) {
        this.transitionName = 'slideup'
        return
      }

      // 离开完成开通交互
      if (from.path === '/openSuccess' || from.path === '/waitResult' && to.path === '/mine') {
        this.transitionName = 'slidedown'
        return
      }

      // 进入学习页面
      if (to.path === '/learnCourse') {
        switch(from.path) {
          case '/shopOwner':
            this.transitionName = 'pop'
            return
          default:
            this.transitionName = 'push'
            return
        }
      }

      if (from.path === '/learnCourse') {
        switch(to.path) {
          case '/courseList':
            this.transitionName = 'pop'
            return
        }
      }

      // 如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index == from.meta.index) {
        if (from.path === '/register') {
          this.transitionName = 'slidedown'
          return
        } 
        this.transitionName = ''
      } else if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = 'push'
      } else {
        this.transitionName = 'pop'
      }
    }
  },

  beforeCreate(){
    let count = 0
    this.$store.dispatch('hideAppLoading', true)
    
    let imgs = [
        require('./assets/images/common/img-loading.gif'),
        require('./assets/images/default_bg01.png'),
        require('./assets/images/emptyInfo@2x.png'),
        require('./assets/images/ry_logo@2x.png'),
        require('./assets/images/banner/ry-bg01.png'),
        require('./assets/images/tabbar/ry-icon01.png'),
        require('./assets/images/tabbar/ry-icon02.png'),
        require('./assets/images/tabbar/ry-icon03.png'),
        require('./assets/images/tabbar/ry-icon04.png'),
        require('./assets/images/tabbar/ry-icon01-active.png'),
        require('./assets/images/tabbar/ry-icon02-active.png'),
        require('./assets/images/tabbar/ry-icon03-active.png'),
        require('./assets/images/tabbar/ry-icon04-active.png')
    ]
    for (let img of imgs) {
        let image = new Image();
        image.src = img;
        image.onload = () => {
            count++;
            if (count === 13) {
              this.$store.dispatch('hideAppLoading', false)
            }
        }
    }
},

  methods: {
    reload () { // 刷新页面
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.transitionName = '' // 无需任何动画效果
        this.isRouterAlive = true
      })
    },
  }
}
</script>

<style lang="stylus">
  html,
  body,
  #app {
    height: 100%;
    overflow hidden
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: relative;
  }
  .push-enter-active,
  .push-leave-active, 
  .pop-enter-active,
  .pop-leave-active,
  .slidedown-enter-active,
  .slidedown-leave-active,
  .slideup-enter-active,
  .slideup-leave-active {
    transition: transform 0.4s;
    backface-visibility: hidden;
    perspective: 1000;
  }
  .push-leave-to{
    transform: translate3d(-20%,0,0);
  }
  .push-enter {
    transform: translate3d(100%, 0,0);
  }
  .push-enter-active {
    z-index: 10;
  }
  .push-leave-active {
    z-index: 0;
  }
  .pop-leave {
    z-index: 10;
  }
  .pop-leave-active {
    transform: translate3d(100%, 0,0);
    z-index: 11;
  }
  .pop-enter{
    transform: translate3d(-20%,0,0);
  }
  .slidedown-enter {
    opacity 0
    z-index 0
  }
  .slidedown-leave,
  .slidedown-leave-active,
  .slideup-enter-active {
    z-index 1
  }
  .slidedown-leave-active {
    transform translate3d(0, 100%, 0)
  }
  .slideup-enter {
    transform translate3d(0, 100%, 0)
  }
  .slideup-leave-active {
    z-index 0
  }
  .slideup-leave-to {
    opcity 0
  }
  .router-view {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow-x hidden
    -webkit-transform-style preserve-3d
    -webkit-backface-visibility hidden
    -webkit-overflow-scrolling touch
  }

  .ry-loading {
    width 100%
    position absolute
    top 0
    left 0
    z-index 1111
    background #fff
  }

</style>
