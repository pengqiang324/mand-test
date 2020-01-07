<template>
    <div class="card">
        <template v-if="showNetWork">
            <ry-result-network class="ry-network"/>
        </template>
        <template v-if="!showNetWork">
            <ry-error-info v-show="showErrorIn"/>
            <div class="card-scroll-list" v-show="!showErrorIn">
                <ry-loading v-if="showLoading" class="per-loading"/>
                <ry-scroll 
                    v-else
                    :total="total"
                    :bounce="bounce"
                    :data="list"
                    :pullUpLoad="true"
                    @pullingUp="pullUpLoad"
                    class="scroll-list" 
                >
                    <div class="per-scroll">
                        <div
                            v-for="(item, index) in list" 
                            :key="index"
                            class="per-list" 
                        >
                            <router-link
                                :to="{path: '/personalInfo', query: {memberId: item.memberId}}"
                                tag="div"
                            >
                                <div class="per-list-head">
                                    <h2 class="lazyload" v-lazy:background-image="item.headImage">
                                        <img v-if="item.headImage == null" src="../../assets/images/common/ry-ts.png" alt="">
                                    </h2>
                                    <div class="per-lhead-pri">
                                        <div class="per-pri-head">
                                            <span class="per-pri-name">{{item.name}}</span>
                                            <span class="per-pri-lname">花名:&nbsp;{{item.flowerName}}</span>
                                            <span class="per-pri-zwei">{{item.levelName}}</span>
                                            <van-icon name="arrow" class="per-icon-arrow" />
                                        </div>
                                        <p class="per-pri-middle">专业：{{item.majorName}}</p>
                                        <p class="per-pri-bottom">回复时间：周一至周六<span>9:00 — 18:00</span></p>
                                    </div>
                                </div>
                                <div class="per-info-pri">
                                    <p>回复率<span>{{item.recoveryRate}}%</span></p>
                                    <p class="per-info-fuwu">服务人数<span>{{item.totalService}}</span></p>
                                    <p class="per-info-pj">好评率<span>{{item.favorableRate}}%</span></p>
                                </div>
                                <div class="per-info-taste">
                                    <p><span>擅长:</span>{{item.expert}}</p>
                                </div>
                            </router-link>
                            <div class="per-info-jg">
                                <span class="per-jg-active">
                                    <md-icon
                                        name="rmb"
                                        size="sm"
                                        class="per-jg-icon"
                                    ></md-icon>{{item.price}}
                                </span>
                                <span class="per-jg-inatice">
                                    <md-icon
                                        name="rmb"
                                        size="xs"
                                    ></md-icon>299
                                </span>
                            </div>
                            <p :class="['per-hold', {'per-hold-active': item.status}]">名师咨询</p>
                            <p :class="['per-online', {'per-online-active': item.status}]">可指导</p>
                        </div>
                    </div>
                </ry-scroll>
            </div>
        </template>
    </div>
</template>

<script>
import { Icon } from 'vant'
import mixins from '@/libs/mixins'
import { getHomeAdviserByServiceType } from '@/api/personalTailor/personalTailor'

export default {
    name: 'ry-card',

    mixins: [mixins],

    components: {
        [Icon.name]: Icon,
    },

    data() {
        return {
            bounce: {
                top: true,
                bottom: false,
                left: false,
                right: false
            },
            list: [],
            page: 1,   // 请求页数
            size: 5,  // 显示多少条数据
            total: 20,
            showLoading: false
        }
    },

    created() {
        this.getList()
    },

    mounted() {
    },

    methods: {
        pullUpLoad() {
            this.page ++
            this.getList()
        },

        getList() {
            if (this.page === 1) this.showLoading = true
            const data = {
                serviceType: 0, // 类别：信用卡
                page: this.page,
                size: this.size
            }
            getHomeAdviserByServiceType(data)
            .then((res) => {
                const { success, queryResult } = res.data
                if(this.page === 1) this.showLoading = false
                if (success) {
                    this.total = queryResult.total
                    this.list = this.list.concat(queryResult.list)
                
                    this.hideErrorTip()
                } else {
                    this.showErrorTip(res)
                }
            })
        }
    }
}
</script>

<style lang="stylus">
.card,
.card-scroll-list {
    height 100%
}

.scroll-list {
    padding 0 40px 0
    line-height 60px
}


.per-list {
    position relative
    margin-bottom 30px
    padding 54px 30px 0
    width 100%
    height 428px
    border-radius 20px
    background #fff
    box-sizing border-box
    box-shadow 0px 6px 12px rgba(0,0,0,0.16)
    &:last-child {
        margin-bottom 0
    }
    .per-list-head {
        display flex
        h2 {
            margin-right 20px
            width 100px
            height 100px
            border-radius 50%
            border 2px solid #707070
            background-image url('../../assets/images/default_bg01.png')
            background-size 100% 100%
            box-sizing border-box
            overflow hidden
            img {
                display block
                width 100%
                height 98px
            }
        }
        .per-lhead-pri {
            flex 1
            .per-pri-head {
                position relative
                display flex
                align-items flex-end
                padding-bottom 10px
                height 32px
                span {
                    display block
                    padding-right 20px
                    letter-spacing 2px
                    font-weight 600
                }
                .per-pri-name {
                    height 32px
                    font-size 32px
                    font-weight bold
                    line-height 32px
                    color #000
                }
                .per-pri-lname {
                    color #999
                    height 24px
                    line-height 24px
                    font-size 24px
                    font-weight 500
                }
                .per-pri-zwei {
                    flex 1
                    overflow hidden
                    white-space nowrap
                    text-overflow ellipsis
                    height 25px
                    line-height 24px
                    font-size 22px
                    color #000
                    padding-right 0
                    span {
                        margin-left 20px
                    }
                }
                .per-icon-arrow {
                    position relative
                    right 0
                    top 1px
                    font-size 32px
                    font-weight bold
                }
            }
            .per-pri-middle {
                padding-bottom 14px
                line-height 24px
                font-size 24px
                font-weight 400
                color #FF5700
            }
            .per-pri-bottom {
                font-size 20px
                line-height 20px
                color #999
            }
        }

    }
    .per-info-pri {
        display flex
        padding 30px 0
        height 20px
        p {
            flex 1
            height 20px
            line-height 20px
            color #999
            font-size 24px
            &.per-info-fuwu {
                text-align center
            }
            &.per-info-pj {
                text-align right
            }
            span {
                margin-left 10px
                color #FF5700
            }
        }
    }
    .per-info-taste {
        width 100%
        padding-bottom 20px
        height 88px
        font-size 24px
        color #000
        line-height 30px
        border-bottom 1px solid rgba(112,112,112,.2)
        p {
            display -webkit-box
            -webkit-line-clamp 3
            overflow hidden
            text-overflow ellipsis
            /* autoprefixer: off */
            -webkit-box-orient: vertical
            word-wrap break-word
            word-break break-all
        }
        span {
            margin-right 10px
        }
    }
    .per-info-jg {
        display flex
        align-items flex-end
        padding-top 22px
        height 28px
        span {
            display block
            color #aeaeae
            font-size 22px
            line-height 22px
            height 22px
            &.per-jg-active {
                margin-right 20px
                font-size 28px
                height 28px
                line-height 28px
                font-weight bold
                color #FF5700
                .per-jg-icon {
                    font-weight bold
                }
            }
            &.per-jg-inatice {
                position relative
                &:after {
                    content ''
                    display block
                    width 100%
                    height 1px
                    background #aeaeae
                    position absolute
                    left 50%
                    top 45%
                    transform translate(-50%, -50%)
                }
            }
        }
    }
    .per-hold {
        position absolute
        bottom 30px
        right 28px
        width 120px
        height 24px
        line-height 24px
        text-align center
        padding 6px 0
        font-size 24px
        background #AEAEAE
        border-radius 4px
        color #000
        display flex
        align-items center
        justify-content center
        &.per-hold-active {
            color #5A0101
            background linear-gradient(left,#FFE3AE,#E17000)
        }
    }
    .per-online {
        position absolute
        top 0
        left 0
        padding 4px 0
        width 120px
        height 28px
        font-size 28px
        line-height 28px
        color #fff
        text-align center
        font-weight bold
        border-radius 10px 0px 20px 0px
        background #AEAEAE
        &.per-online-active {
            background linear-gradient(left, #FCB836, #FB671C)
        }
    }
}

.per-loading {
    img {
        width 130px !important
    }
}

.per-scroll {
}
</style>