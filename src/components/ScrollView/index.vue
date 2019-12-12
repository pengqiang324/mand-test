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
      @refreshing="$_onRefresh"
      @end-reached="$_onEndReached"
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
        loading-text="正在加载中..."
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
        }
    },

    methods: {
        $_onRefresh() {
            // async data
            this.$emit('onRefresh', {
               finishRefresh: this.$_onFinishRefresh
            })
        },

        $_onEndReached() {
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
            this.$refs.scrollView.finishLoadMore()
        }
    }
}
</script>

<style lang="stylus">

</style>