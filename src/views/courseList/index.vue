<template>
  <div class="courseList-box">
        <ry-scroll
            :bounce="bounce"
        >
            <div class="courseList-head">
                <img v-lazy="headImg" alt="">
            </div>

            <div class="courseList-con">
                <div class="courseList-con-box">
                    <h2>视频教学</h2>
                    <div class="courseList-list">
                        <template v-if="showNetWork">
                            <ry-result-network class="ry-network"/>
                        </template>
                        <template v-if="!showNetWork">
                            <ry-error-info v-show="showErrorIn"/>
                            <div v-show="!showErrorIn" class="loading">
                                <ry-loading v-show="showloading" class="courseList-loading"/>
                                <ry-scroll
                                    v-show="!showloading"
                                    :total="total"
                                    :bounce="bounce"
                                    :data="videoData"
                                    :scrollbar="true"
                                    :pullUpLoad="true"
                                    @pullingUp="pullUpLoad"
                                >
                                    <ul>
                                        <li 
                                            v-for="(item, index) in videoData"
                                            :key="index"
                                            class="needsclick"
                                        >
                                            <h4 
                                                v-lazy:background-image="item.imageUrl"
                                                @click="addView(item.id)"
                                            >
                                                <p><span>{{item.videoTime}}</span></p>
                                            </h4>
                                            <div class="courseList-list-right">
                                                <h3>{{item.title}}</h3>
                                                <p>观看次数：{{item.view}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                </ry-scroll>
                            </div>
                        </template>
                    </div>
                </div>
            </div>

            <div class="courseList-btn">
                <p 
                    @touchstart="publishStart"
                    @touchend="publishEnd"
                    :class="['courseList-btn-zf', {'btn-active': this.isActive}]"
                >
                    <span>仅需支付
                        <md-icon
                            name="rmb"
                            size="md"
                            class="courseList-btn-icon"
                        />399.00
                    </span>
                </p>
            </div>
        </ry-scroll>
  </div>
</template>

<script>
import { getAllByTypeId, addListView } from '@/api/business/business'
import mixins from '@/libs/mixins'

export default {
    name: 'ry-courseList',

    mixins: [mixins],
    
    data() {
        const headImg = require('../../assets/images/banner/ry-banner.png')
        return {
            headImg,
            bounce: {
                top: false,
                bottom: false,
                left: false,
                right: false
            },
            videoData: [],
            page: 1,   // 请求页数
            size: 5,  // 显示多少条数据
            total: 40,
        }
    },

    created() {
        this.initData()
    },

    methods: {
        async initData() {
            const { id } = this.$route.query
            this.id = id
            const params = {
                vtId: id,
                page: this.page,
                size: this.size
            }
            this.showloading = true
            const res = await getAllByTypeId(params)
            const { success, queryResult } = res.data
            if (success) {
                this.videoData = this.videoData.concat(queryResult.list)
                this.total = queryResult.total
                this.showloading = false
                this.hideErrorTip()
            } else {
                this.showErrorTip(res)
            }
        },

        async pullUpLoad() {
            this.page ++
            // 异步更新数据
            const params = {
                vtId: this.id,
                page: this.page,
                size: this.size
            }
            const res = await getAllByTypeId(params)
            const { success, queryResult } = res.data
            if (success) {
                this.videoData = this.videoData.concat(queryResult.list)
            }
        },

        async addView(id) {
            addListView({id})
            .then((res) => {
                const { success } = res.data
                console.log(success)
                if (success) {
                    this.$router.push({
                        path: '/courseInfo',
                        query: {
                            id
                        }
                    })
                }
            })
        }
    }
}
</script>

<style lang="stylus">
.loading {
    height 100%
    .courseList-loading {
        img {
            width 140px
        }
    }
}
</style>

<style lang="stylus" scoped>
.courseList-box {
    font-size 20px
    setBg()

    background #f5f5f5
}

.courseList-head {
    margin-bottom 50px
    width 100%
    height 320px
    img {
        width 100%
        height 100%
        display block
    }
}

.ry-network {
    position static
    padding 0
}

.courseList-con {
    padding 0 40px
    .courseList-con-box {
        padding 20px 0 10px
        width 100%
        height 830px
        overflow hidden
        background #fff
        border-radius 10px
        box-shadow 0px 10px 18px rgba(0,0,0,0.05)
        box-sizing border-box
        h2 {
            margin 0 20px
            padding-bottom 24px
            height 36px
            line-height 36px
            text-align center
            font-size 36px
            border-bottom 2px solid rgba(223,223,223,1)
        }
        .courseList-list {
            position relative
            padding 0 20px 0
            width 100%
            height calc(100% - 62px)
            overflow hidden
            box-sizing border-box
            li {
                display flex
                align-items center
                padding 30px 0
                border-bottom 2px solid rgba(223,223,223,1)
                &:last-child {
                    border-bottom 0
                }
                h4 {
                    position relative
                    margin-right 20px
                    width 200px
                    height 120px
                    background-color #eee
                    background-size cover
                    border-radius 10px
                    overflow hidden
                    &[lazy='loading'] {
                        background-image url('../../assets/images/business/business-play.png')
                        background-position center
                        background-repeat no-repeat
                        background-size 30px
                    }
                    img {
                        width 100%
                        height 100%
                    }
                    p {
                        position absolute
                        top 0
                        left 0
                        width 100%
                        height 100%
                        background rgba(0,0,0,.5)
                        span {
                            position absolute
                            bottom 10px
                            right 10px
                            height 20px
                            line-height 20px
                            text-align right
                            font-size 20px
                            color #fff
                        }
                    }
                }
                .courseList-list-right {
                    flex 1
                    h3 {
                        padding-top 6px
                        height 24px
                        line-height 24px
                        font-size 24px
                        color #000
                    }
                    p {
                        padding-top 68px
                        height 20px
                        line-height 20px
                        font-size 20px
                        color #D41C1C
                    }
                }
            }
        }
    }
}

.courseList-btn {
    padding 64px 104px
    .courseList-btn-zf {
        display flex
        align-items center
        justify-content center
        width 100%
        height 70px
        background #FF4400
        border-radius 34px
        span {
            height 32px
            color #fff
            font-weight 400
            font-size 32px
            .courseList-btn-icon {
                font-size 29px
            }
        }
    }
}
</style>