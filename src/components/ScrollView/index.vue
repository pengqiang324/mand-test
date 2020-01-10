/*
** 上拉加载下拉刷新
** @prop {Boolean} [showRefresh=false] 是否显示下拉刷新组件
** @prop {Boolean} [showMore=false] 是否显示上拉加载组件
** @prop {Boolean} [isFinished=false] 是否加载全部数据
** @event onRefresh 自定义事件-刷新中事件
** @event onEndReached  自定义事件-滚动触底事件
*/ 

<template>
  <md-scroll-view
      ref="scrollView"
      :scrolling-x="false"
      :auto-reflow="true"
      :bouncing="bounce"
      @refreshing="$_onRefresh"
      @end-reached="$_onEndReached"
      @scroll="$_onScroll"
    >
      <md-scroll-view-refresh
        v-if="showRefresh"
        slot="refresh"
        slot-scope="{ scrollTop, isRefreshActive, isRefreshing }"
        roller-color="#FF8324"
        :scroll-top="scrollTop"
        :is-refreshing="isRefreshing"
        :is-refresh-active="isRefreshActive"
      ></md-scroll-view-refresh>
      <slot></slot>
      <md-scroll-view-more
        v-if="showMore"
        slot="more"
        :is-finished="isFinished"
        loading-text="更多加载中..."
        finished-text="没有更多了"
      >
      </md-scroll-view-more>
    </md-scroll-view>
</template>

<script>
import {
    ScrollView, 
    ScrollViewRefresh, 
    ScrollViewMore
} from 'mand-mobile'
// import { store } from '@/libs/store'

export default {
    name: 'ry-scroll-view',

    components: {
        [ScrollView.name]: ScrollView,
        [ScrollViewRefresh.name]: ScrollViewRefresh,
        [ScrollViewMore.name]: ScrollViewMore
    },

    props: {
        showRefresh: {
            type: Boolean,
            default: false
        },

        showMore: {
            type: Boolean,
            default: false
        },

        isFinished: {
            type: Boolean,
            default: false
        },

        bounce: {
            type: Boolean,
            default: true
        }
    },

    methods: {
        $_onRefresh() {
            // async data
            if (!this.showRefresh) return
            this.$emit('onRefresh', {
               finishRefresh: this.$_onFinishRefresh
            })
        },

        $_onEndReached() {
            if (!this.showMore) return
            if (this.isFinished) {
                return
            }
            this.$emit('onEndReached', { 
                finishLoadMore: this.$_onFinishLoadMore 
            })
        },

        $_onFinishRefresh() {
            this.$refs.scrollView.finishRefresh()
        },

        $_onFinishLoadMore() {
            this.$refs.scrollView.reflowScroller() // 重置滚动内容
            this.$refs.scrollView.finishLoadMore()
        },

        $_onScroll(payload) {
            this.$emit('scroll', payload)
        },
        // 记录滚动条记录
        $_scrollTo(top) {
            setTimeout(() => {
                this.$refs.scrollView.scrollTo(0, top, true)
            }, 80)
        }
    }
}
</script>

<style lang="stylus">

</style>