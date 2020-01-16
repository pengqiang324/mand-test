/*
* 底部导航组件
*/
<template>
  <div class="tabbar-box">
      <van-tabbar
        v-model="active"
        active-color="#FF8324"
      >
        <van-tabbar-item 
          v-for="(item, index) in tabbarIcon" 
          :key="index" 
          :to="item.url"
          :info="item.info ? item.info: ''"
          class="needsclick"
        >
          <span>{{item.title}}</span>
          <img
            slot="icon"
            slot-scope="props"
            :src="props.active ? item.active : item.inactive"
          >
        </van-tabbar-item>
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
            active: 0,
            tabbarIcon: [],
            tabbarIcon1: [
              {
                title: '信用卡',
                info: 0,
                url: '/',
                active: require('@/assets/images/tabbar/ry-icon01-active.png'),
                inactive: require('@/assets/images/tabbar/ry-icon01.png')
              },
              {
                title: '信贷',
                info: 0,
                url: '/credit',
                active: require('@/assets/images/tabbar/ry-icon02-active.png'),
                inactive: require('@/assets/images/tabbar/ry-icon02.png')
              },
              {
                title: '私人定制',
                info: 0,
                url: '/personalTailor',
                active: require('@/assets/images/tabbar/ry-icon03-active.png'),
                inactive: require('@/assets/images/tabbar/ry-icon03.png')
              },
              {
                title: '我的',
                info: 2,
                url: '/mine',
                active: require('@/assets/images/tabbar/ry-icon04-active.png'),
                inactive: require('@/assets/images/tabbar/ry-icon04.png')
              }
            ],
            tabbarIcon2: [
              {
                title: '客户',
                info: 2,
                url: '/customer',
                active: require('@/assets/images/adviser/icon01-active.png'),
                inactive: require('@/assets/images/adviser/icon01.png')
              },
              {
                title: '我的',
                info: 2,
                url: '/mine',
                active: require('@/assets/images/adviser/icon02-active.png'),
                inactive: require('@/assets/images/adviser/icon02.png')
              },
            ]
        }
    },

    watch: {
      $route(to){
        const { navIndex } = to.meta
        if (navIndex == undefined) return
        this.active = navIndex
      }
    },

    created() {
      this.tabbarIcon = this.tabbarIcon1
      // this.tabbarIcon = this.tabbarIcon2
    },
}
</script>

<style lang="stylus">

</style>