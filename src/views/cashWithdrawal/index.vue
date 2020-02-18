<template>
  <div class="cashWithdrawal-box">
      <template v-if="showNetWork">
        <ry-result-network class="ry-network"/>
      </template>
      <template v-if="!showNetWork">
          <ry-error-info v-if="showErrorIn"/>
          <div class="cashWithdrawal-content" v-if="!showErrorIn">
              <ry-loading v-if="showloading"/>
              <ry-scroll-view
                  v-show="!showloading"
                  :bounce="false"
                  :data="data"
              >
                <div class="cashWithdrawal-list">
                    <ul>
                        <li
                            v-for="(item,index) in 3"
                            :key="index"
                            :style="{'background': (index%2 == 1) ? '#E88F36': '#CE5050'}"
                        >
                            <h2>招商银行</h2>
                            <h3>储蓄银行</h3>
                            <p>
                                <span>****</span>
                                <span>****</span>
                                <span>****</span>
                                <span>{{ '6222600260001072568' | bankNum }}</span>
                            </p>
                        </li>
                    </ul>
                    <div class="cashWithdrawal-addBank">
                        <van-icon 
                            name="plus"
                            class="addBank-plus" 
                        />
                        <span>添加银行卡</span>
                    </div>
                </div>
              </ry-scroll-view>
          </div>
      </template>
  </div>
</template>

<script>
import { Icon } from 'vant'
import mixins from '@/libs/mixins'

export default {
    name: 'ry-cashWithdrawal',

    mixins: [mixins],

    components: {
        [Icon.name]: Icon
    },

    data() {
        return {
            data: []
        }
    },

    filters: {
        bankNum: (num) => {
            const BANK_NUM = num.substr(-4,4)
            return BANK_NUM
        }
    }
}
</script>

<style lang="stylus">
.cashWithdrawal-box {
    height 100%
    background #f5f5f5
}

.cashWithdrawal-content {
    height 100%
}

.cashWithdrawal-list {
    ul {
        padding 40px 30px 10px
        li {
            margin-bottom 20px
            padding 34px 100px 0
            width 100%
            height 192px
            box-shadow 0px 6px 14px rgba(0,0,0,0.25)
            border-radius 10px
            box-sizing border-box
            &:active {
                box-shadow 0px 6px 14px rgba(0,0,0,0.4)
            }
            h2 {
                padding-bottom 10px
                height 32px
                line-height 32px
                font-size 32px
                letter-spacing 2px
                color #fff
            }
            h3 {
                padding-bottom 10px
                height 26px
                line-height 26px
                font-size 26px
                font-weight 400
                color #fff
                opacity 0.51
                letter-spacing 2px
            }
            p {
                display flex
                align-items center
                span {
                    display inline-block
                    position relative
                    top 12px
                    margin-right 16px
                    letter-spacing 1px
                    color #fff
                    font-size 46px
                    height auto
                    font-weight 400
                    font-family:Noto Sans S Chinese
                    &:last-child {
                        top 0
                        margin-right 0
                        height 48px
                        font-size 48px
                        font-weight 700
                    }
                }
            }
        }
    }
    .cashWithdrawal-addBank {
        margin 0 30px
        display flex
        align-items center
        justify-content center
        padding 32px 0
        color #FF6600
        border-radius 10px
        background #fff
        box-shadow 0px 4px 8px rgba(0,0,0,0.15)
        &:active {
            background #eee
        }
        .addBank-plus {
            font-size 60px
            font-weight bold
        }
        span {
            margin-left 40px
            font-size 36px
        }
    }
}
</style>