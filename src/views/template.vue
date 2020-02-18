<template>
  <div class="box">
      <template v-if="showNetWork">
        <ry-result-network class="ry-network"/>
      </template>
      <template v-if="!showNetWork">
          <ry-error-info v-if="showErrorIn"/>
          <div class="home-box" v-if="!showErrorIn">
              <ry-loading v-if="showloading" class="courseList-loading"/>
              <ry-scroll-view
                  v-show="!showloading"
                  :bounce="false"
                  :data="data"
              >
                <div class=""></div>
              </ry-scroll-view>
          </div>
      </template>
  </div>
</template>

<script>
import mixins from '@/libs/mixins'

export default {
    name: 'ry-##',

    mixins: [mixins],

    data() {
      return {
        bounce: {
            top: false,
            bottom: false,
            left: false,
            right: false
        },
        data: [1,2,3,4,5,6,5,7,8,9,10],
        page: 1,   // 请求页数
        size: 5,  // 显示多少条数据
        total: 40,
      }
    },

    methods: {
      pullUpLoad() {
            this.page ++
            // 异步更新数据
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    this.data.push(this.data.length + 1)
                }
            }, 500)
        },
    }
}
</script>

<style lang="stylus">
.home-box {
  position absolute
  left 0
  right 0
  bottom 0
  top 0 
}
</style>