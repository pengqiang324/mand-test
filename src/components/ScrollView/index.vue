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
      :auto-reflow="autoReflow"
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
        v-show="showMore && data.length > 0"
        slot="more"
        :is-finished="isFinished"
        loading-text="玩命加载中..."
        finished-text="已显示全部内容"
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

        data: {
            type: [Array,Object],
            default: () => {
                return [] 
            }
        },

        bounce: {
            type: Boolean,
            default: true
        },

        total: {
            type: Number,
            default: 10
        }
    },

    data() {
        return {
            isFinished: false,
            autoReflow: false
        }
    },

    watch: {
        data() {
            if (this.showRefresh || this.showMore) {
                if(this.data.length >= this.total) {
                    this.isFinished = true
                    this.$refs.scrollView.reflowScroller() // 数据改变时刷新内容高度
                } else {
                    this.isFinished = false
                    this.$_onFinishLoadMore()
                }
            } else {
                this.$refs.scrollView.reflowScroller() // 初始化滚轮高度
            }
        }
    },

    methods: {
        $_onRefresh() {
            // async data
            if (!this.showRefresh) return
            this.$emit('onRefresh')
        },

        $_onEndReached() {
            if (!this.showMore) return
            if (this.isFinished) {
                return
            }

            this.$emit('onEndReached')
        },

        $_onFinishRefresh() {
            this.$refs.scrollView.finishRefresh()
        },

        $_onFinishLoadMore() {
            this.$refs.scrollView.reflowScroller() // 数据改变时刷新内容高度
            this.$refs.scrollView.finishLoadMore()
        },

        $_onScroll(payload) {
            this.$emit('scroll', payload)
        },

        reflowScroller() {
            this.$refs.scrollView.reflowScroller() // 刷新内容高度
        }
    }
}
</script>

<style lang="stylus">

</style>