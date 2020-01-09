<template>
  <div class="evaluate-box">
        <ry-scroll-view
        :bounce="false"
        class="evaluate-scroll"
        >
            <div class="evaluate-info">
                    <div class="tabbar">
                        <p 
                            v-for="(item,index) in title"
                            :key="index"
                            :class="{'active': active === index}" 
                            @click="changeActive(index)"
                        >
                    {{ number[index].length}}
                            <span>{{item}}&nbsp;{{number[index] > 999 ? 999 : number[index]}}<i v-if="number[index] > 999" class="tabbar-icon">+</i></span>
                        </p>
                    </div>
                    <template v-if="showNetWork">
                        <ry-result-network class="ry-network"/>
                    </template>
                    <template v-if="!showNetWork">
                        <ry-error-info v-show="showErrorIn" class="pj-errorIn"/>
                        <div class="pj-list-scroll"  v-show="!showErrorIn">
                            <ry-loading v-show="showLoading" class="evaluateInfo-loading"/>
                            <ry-scroll
                                v-show="!showLoading"
                                :total="total"
                                :bounce="bounce"
                                :data="data"
                                :pullUpLoad="true"
                                :scrollbar="true"
                                @pullingUp="pullUpLoad"
                                class="scroll-list" 
                            >
                                <ry-pj-list
                                    :data="data"
                                    :star-value="5"
                                />
                            </ry-scroll>
                        </div>
                    </template>
            </div>
        </ry-scroll-view>
  </div>
</template>

<script>
import mixins from '@/libs/mixins'
import RyPjList from '@/components/PjList'
import { List } from 'vant'

export default {
    name: 'ry-evaluate',

    mixins: [mixins],

    components: {
        [List.name]: List,
        [RyPjList.name]: RyPjList
    },
    
    data() {
        return {
            bounce: {
                top: false,
                bottom: false,
                left: false,
                right: false
            },
            data: [1,2,3,4,5,6,5,7,8,9,10],
            title: ['全部', '好评', '中评'],
            number: {
                '0': 1000,
                '1': 258,
                '2': 369
            },
            page: 1,   // 请求页数
            size: 5,  // 显示多少条数据
            total: 30,
            active: 0,
            isActive: false,
            showLoading: false
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
                // 加载状态结束
                this.loading = false

                // 数据全部加载完成
                if (this.data.length >= 40) {
                    this.finished = true
                }
            }, 500)
        },

        changeActive(index) {
            this.active = index // 激活按钮高亮状态
            this.showLoading = true
            setTimeout(() => {
                this.showLoading = false
            }, 2000)
        }
    }
}
</script>

<style lang="stylus">
.evaluate-scroll {
    .scroll-view-container {
        height 100%
    }
}
.evaluateInfo-loading {
    img {
        width 150px !important
    }
}
</style>

<style lang="stylus" scoped>
.evaluate-box {
  position absolute
  left 0
  right 0
  bottom 0
  top 0 
}

.pj-errorIn,
.ry-network {
   height calc(100% - 120px) !important 
}

.pj-errorIn {
    background #f5f5f5
}

.tabbar {
    display flex
    align-items center
    padding 40px 40px 32px 
    p {
        display flex
        align-items center
        justify-content center
        margin-right 10px
        width 148px
        height 48px
        font-size 28px
        background #FFD9BC
        border-radius 24px
        &.last-child {
            margin-right 0
        }
        &.active {
            background #FF6F00
            span {
                color #fff
            }
        }
        span {
            display block
            height 28px
            line-height 28px
            color #434343
            .tabbar-icon {
                font-size 20px
                position relative
                top -6px
                left 2px
                font-style normal
            }
        }
    }
}

.pj-list-scroll {
    position absolute
    top 120px
    width 100%
    height calc(100% - 120px)
}

.scroll-list {
    height 100%
}

.pj-list {
    padding-top 5px
}

.evaluate-info {
    height 100%
    overflow hidden
    background #f5f5f5
    box-sizing border-box
}

.evaluate-list {
    height 100%
    overflow hidden
}
</style>