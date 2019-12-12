/*
* 底部导航组件
*/
<template>
  <div class="tabbar-box">
      <van-tabbar
        v-model="active"
        active-color="#FF8324"
      >
        <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="search" to="/about">关于</van-tabbar-item>
        <van-tabbar-item icon="cart-o" to="/card">信用卡</van-tabbar-item>
        <van-tabbar-item icon="setting-o" to="/mine">我的</van-tabbar-item>
      </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
    name: 'ry-tabbar',

    components: {
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem,
    },

    data(){
        return {
            active: 0
        }
    },

    watch: {
      $route(to){
        const { navIndex } = to.meta
        if (navIndex == undefined) return
        this.active = navIndex
      }
    }
}
</script>

<style lang="stylus">

</style>