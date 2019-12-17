<template>
  <div class="about wrapper">
    <h1 class="van-hairline--bottom">This is an about page</h1>
    <ry-result-empty class="about-empty" v-if="isEmpty"/>
    <ry-scroll-view
      class="scroll-view"
      v-if="!isEmpty"
      :show-refresh="true"
      :show-more="true"
      :is-finished="isFinished"
      @onRefresh="onRefresh"
      @onEndReached="onEndReached"
    >
      <ul>
        <li 
          class="border-1px"
          v-for="(item, index) in list" 
          :key="index"
        >{{item}}</li>
      </ul>
    </ry-scroll-view>
  </div>
</template>

<script>
export default {
  name: 'ry-about',

  data() {
    return {
      isEmpty: false,
      isFinished: false,
      list: [1, 2, 3, 4, 5]
    }
  },

  created(){
    console.log('about触发了')
  },

  methods: {
    onRefresh({ finishRefresh }) {
      setTimeout(() => {
        this.list.unshift('新添加了一条数据')
        finishRefresh()
      }, 2000)
    },

    onEndReached({ finishLoadMore }) {
      const List = this.list
      setTimeout(() => {
        List.push('从后面添加了条数据')
        if (List.length > 20) {
          this.isFinished = true
        }
        finishLoadMore()
      }, 2000)
    }
  }
}
</script>

<style lang="stylus">
@import '../assets/styles/setting.styl'

.about {
  setPadding()
  h1 {
    font-size 20px
    height 100px
    line-height 100px
    text-align center
  }
  .about-empty {
    setPadding()
  }
  .scroll-view {
    .scroll-view-container {
      setScrollPadding()
    }
  }
  ul {
    li {
      text-align center
      font-size 58px
      line-height 120px
    }
  }
}
</style>
