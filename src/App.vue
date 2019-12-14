<template>
  <div id="app">
    <transition
      :name="transitionName" 
    > 
        <vue-page-stack v-if="!$route.meta.keepAlive && isRouterAlive">
          <ry-loading v-if="showLoading"/>
          <router-view class="router-view"/>
        </vue-page-stack>
        <keep-alive v-if="$route.meta.keepAlive && isRouterAlive">
          <ry-loading v-if="showLoading"/>
          <router-view class="router-view"/>
        </keep-alive>
    </transition>
    <ry-tabbar v-show="$route.meta.hasFooter"/>
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
      'showLoading'
    ])
  },

  watch: {
    $route(to, from) {
      // 刷新页面动画
      if(!from.meta.index) return
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index == from.meta.index) {
        this.transitionName = ''
      } else if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = 'push'
      } else {
        this.transitionName = 'pop'
      }
    }
  },

  methods: {
    reload () { // 刷新页面
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style lang="stylus">
  html,
  body,
  #app {
    height: 100%;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: relative;
    display flex
    align-items center
    justify-content center
  }
  .push-enter-active,
  .push-leave-active, 
  .pop-enter-active,
  .pop-leave-active {
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
 
  .router-view {
    width: 100%;
    height: 100%;
    position: absolute;
    -webkit-transform-style preserve-3d
    -webkit-backface-visibility: hidden;
    --webkit-overflow-scrolling: touch;
  }
 
</style>
