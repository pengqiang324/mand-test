<template>
  <div class="pj-list">
      <ul class="personalInfo-pj-list">
            <li 
                v-for="(item, index) in data" 
                :key="index"
            >
                <h2 v-lazy:background-image="item.customerHeadImage">
                    <img v-if="!item.customerHeadImage" src="../../assets/images/common/ry-ts.png" alt="">
                </h2>
                <div class="personalInfo-pj-info">
                    <div class="personalInfo-pj-head">
                        <h4>{{ item.customerName | formatName }}</h4>
                        <p class="personalInfo-pj-start">
                            <van-rate 
                                v-model="item.evaluateLevel" 
                                size="14px"
                                color="#ff7800"
                                readonly 
                            />
                        </p>
                    </div>
                    <div class="personalInfo-pj-content">{{item.evaluateDescription}}</div>
                    <div class="personalInfo-pj-time">
                        <span>咨询服务：{{item.majorName}}</span>
                    </div>
                    <div class="personalInfo-pj-day">
                        <i>{{item.commentTime}}</i>
                    </div>
                </div>
            </li>
        </ul>
  </div>
</template>

<script>
import { Rate } from 'vant'
export default {
    name: 'ry-pj-list',

    props: {
        data: {
            type: Array,
            default: () => {
                return []
            }
        }
    },

    components: {
        [Rate.name]: Rate,
    },

    filters: {
        formatName: (name) => {
            const xName = name.substr(0,1)
            const lName = name.substr(1)
            let str = ''
            for (let i=0; i< lName.length; i++) {
                str += '*'
            }
            return xName + str
        }
    }
}
</script>

<style lang="stylus">
.personalInfo-pj-list {
    li {
        display flex
        margin-bottom 30px
        padding-bottom 20px
        border-bottom 2px solid #dcdcdc
        &:last-child {
            margin-bottom 0
        }
        &[lazy="loading"] {
            background-image url('../../assets/images/common/ry-ts.png')
            background-repeat no-repeat
            background-size cover
        }
    }

    h2 {
        margin-right 20px
        width 50px
        height 50px
        background-size cover
        box-shadow 0px 2px 12px rgba(0,0,0,0.16)
        border-radius 50%
        img {
            display block
            width 100%
            height 100%
        }
    }

    .personalInfo-pj-info {
        flex 1
        .personalInfo-pj-head {
            display flex
            align-items center
            justify-content space-between
            height 30px
            padding 10px 0 20px
        }
        h4 {
            line-height 28px
            font-size 28px
            color #000
        }
        .personalInfo-pj-start {
            font-size 28px
        }
        .personalInfo-pj-content {
            padding-bottom 36px
            line-height 40px
            font-size 24px
            color #989898
        }
        .personalInfo-pj-time {
            display flex
            align-items center
            justify-content flex-start
            padding-bottom 30px
            color #989898
            height 24px
            line-height 24px
            font-size 24px
            span {
                
            }
        }
        .personalInfo-pj-day {
            display flex
            align-items center
            justify-content flex-end
            color #989898
            height 26px
            line-height 26px
            font-size 26px
            i {
                font-style normal
            }
        }
    }
}
</style>