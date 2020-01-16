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
                            <span v-if="index === 0">{{item}}&nbsp;{{pjTotal.count > 999 ? 999 : pjTotal.count}}<i v-if="pjTotal.count > 999" class="tabbar-icon">+</i></span>
                            <span v-if="index === 1">{{item}}&nbsp;{{pjTotal.good > 999 ? 999 : pjTotal.good}}<i v-if="pjTotal.good > 999" class="tabbar-icon">+</i></span>
                            <span v-if="index === 2">{{item}}&nbsp;{{pjTotal.middle > 999 ? 999 : pjTotal.middle}}<i v-if="pjTotal.middle > 999" class="tabbar-icon">+</i></span>
                        </p>
                    </div>
                    <template v-if="showNetWork">
                        <ry-result-network class="ry-network"/>
                    </template>
                    <template v-if="!showNetWork">
                        <ry-error-info v-show="showErrorIn" class="pj-errorIn"/>
                        <div class="pj-list-scroll"  v-show="!showErrorIn">
                            <ry-loading v-show="showloading" class="evaluateInfo-loading"/>
                            <ry-scroll
                                v-show="!showloading"
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
import { getAdviserCommentByMemberId } from '@/api/personalTailor/personalTailor'

export default {
    name: 'ry-evaluate',

    mixins: [mixins],

    components: {
        [List.name]: List,
        [RyPjList.name]: RyPjList
    },
    
    data() {
        return {
            title: ['全部', '好评', '中评'],
            page: 1,   // 请求页数
            size: 10,  // 显示多少条数据
            total: 30,
            active: 0,
            query: '', // 查询参数
            memberId: '',
            isActive: false,
            showloading: false,
            bounce: {
                top: false,
                bottom: false,
                left: false,
                right: false
            },
            pjTotal: {},
            data: []
        }
    },

    created() {
        const { memberId, pjTotal } = this.$route.query
        this.memberId = memberId
        this.pjTotal = JSON.parse(pjTotal)
        this.initData()
    },

    methods: {
        initData() {
            if (this.page === 1) this.showloading = true
            getAdviserCommentByMemberId({
                memberId: this.memberId,
                evaluateLevel: this.evaluateLevel,
                page: this.page,
                size: this.size
            })
            .then((res) => {
                const { success, queryResult } = res.data
                if (success) {
                    this.data = this.data.concat(queryResult.list)
                    this.total = queryResult.total
                    this.hideErrorTip()
                } else {
                    this.showErrorTip(res)
                }
                if(this.showloading) this.showloading = false
            })
        },

        pullUpLoad() {
            this.page ++
            // 异步更新数据
            this.initData()
        },

        changeActive(index) {
            this.active = index // 激活按钮高亮状态
            this.page = 1
            this.data = []
            if (index) {
                this.evaluateLevel = index - 1
            }
            this.initData()
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