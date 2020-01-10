<template>
<div class="guide-box">
    <ry-scroll-view
        :bounce="false"
    >
        <div class="guide-box-info">
            <h2>常见问题</h2>
            <div class="guide-list">
                <template v-if="showNetWork">
                    <ry-result-network class="ry-network"/>
                </template>
                <template v-if="!showNetWork">
                    <ry-error-info v-show="showErrorIn" class="guide-errorIn"/>
                    <div v-show="!showErrorIn">
                        <ry-loading v-show="showloading" class="guide-loading"/>
                        <van-cell-group
                            v-show="!showloading"
                        >
                            <van-cell 
                                v-for="(item,index) in list"
                                :key="index"
                                :title="item.title" 
                                is-link 
                            />
                        </van-cell-group>
                    </div>
                </template>
            </div>
        </div>
    </ry-scroll-view>
</div>
</template>

<script>
import mixins from '@/libs/mixins'

export default {
    name: 'ry-guide',

    mixins: [mixins],

    data() {
        return {
            list: [
                {
                    url: '',
                    title: '1. 如何成为店主？'
                },
                {
                    url: '',
                    title: '2. 如何邀请新人成为店主？'
                },
                {
                    url: '',
                    title: '3. 如何分享销售？'
                },
                {
                    url: '',
                    title: '4. 如何咨询客服？'
                },
                {
                    url: '',
                    title: '5. 如何提现佣金？'
                },
                {
                    url: '',
                    title: '6. 如何查看我的收入记录？'
                },
                {
                    url: '',
                    title: '7. 如何联系团队里的客户？'
                },
            ]
        }
    }
}
</script>

<style lang="stylus">
.guide-box {
    .guide-loading {
        img {
            width 130px 
        }
    }
}
</style>

<style lang="stylus" scoped>
.ry-network {
    position static
    padding 120px 0 200px
}

.guide-errorIn {
    padding 120px 0
}

.guide-box {
    setBg()
    background #f5f5f5
}

.guide-box-info {
    padding 40px 40px 0
    box-sizing border-box
    h2 {
        margin-bottom 30px
        height 32px
        line-height 32px
        font-size 32px
        color #3A3A3A
    }
    .guide-list {
        width 100%
        background #fff
        border-radius 10px
        box-sizing border-box
    }
}
</style>