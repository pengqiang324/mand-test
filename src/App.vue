<template>
  <div id="app">
    <transition
      :name="transitionName" 
    > 
      <vue-page-stack>
        <router-view class="router-view"/>
      </vue-page-stack>
    </transition>
    <ry-tabbar v-show="$route.meta.hasFooter"/>
  </div>
</template>

<script>
import Tabbar from './components/Tabbar'

export default {
  name: 'app',

  components: {
    [Tabbar.name]: Tabbar
  },

  data(){
    return {
      active: 0,
      transitionName: '',
      mode: 'out-in'
    }
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
  }
}
</script>

<style lang="stylus">
  html,body,#app {
    height: 100%;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: relative;
  }
  .push-enter-active,.push-leave-active
  , .pop-enter-active,.pop-leave-active{
    transition: all 0.4s;
  }
  .push-leave-to{
    transform: translate(-20%,0);
  }
  .push-enter {
    transform: translate(100%, 0);
  }
  .push-enter-active {
    z-index: 10;
  }
  .push-leave-active {
    z-index: 0;
  }
  .pop-leave-active {
    transform: translate(100%, 0);
    z-index: 11;
  }
  .pop-enter{
    transform: translate(-20%,0);
  }
  .router-view {
    width: 100%;
    position: absolute;
  }
</style>
