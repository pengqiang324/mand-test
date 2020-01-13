<template>
  <div class="pusrchase-select">
        <h4 class=border-bottom>请选择支付方式</h4>
        <div class="pusrchase-select-list">
            <ul>
                <li 
                    v-for="(item, index) in zfList"
                    :key="index"
                    class="border-bottom"
                >
                    <div class="pusrchase-left">
                        <img class="custom-img" v-lazy="item.imgUrl" alt="">
                        <span class="custom-title">微信支付</span>
                    </div>
                    <div class="pusrchase-right">
                        <img  
                            :src="radio === index ? selectIcon.selectImgActive : selectIcon.selectImg" 
                            alt=""
                        />
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { RadioGroup, Radio } from 'vant'

export default {
    name: 'ry-payselect',

    components: {
        [RadioGroup.name]: RadioGroup,
        [Radio.name]: Radio
    },

    data() {
        const selectImg = require('../../assets/images/payment/ry-selected.png')
        const selectImgActive = require('../../assets/images/payment/ry-selected-active.png')
        const btnImg = require('../../assets/images/payment/ry-weixin.png')
        return {
            radio: 0,
            selectIcon: {
                selectImg,
                selectImgActive
            },
            zfList: [
                {
                    title: '微信支付',
                    imgUrl: btnImg
                }
            ]
        }
    }
}
</script>

<style lang="stylus">
.pusrchase-select {
    margin-top 54px
    padding 30px
    width 100%
    background #fff
    border-radius 10px
    box-shadow 0px 2px 14px rgba(0,0,0,0.05)
    box-sizing border-box
    h4 {
        padding-bottom 10px
        height 28px
        line-height 28px
        font-size 28px
        color #000
        border-color #e3e3e3
    }
    .pusrchase-select-list {
        li {
            display flex
            align-items center
            justify-content space-between
            padding 20px 0
            border-color #e3e3e3
            &:last-child {
                &:before {
                    border none !important
                }
            }
            .pusrchase-left,
            .pusrchase-right {
                display flex
                align-items center
            }

            .pusrchase-right {
                img {
                    display block
                    width 35px
                    height 35px
                }
            }

            .custom-img {
                width 70px
                height 70px
                margin-right 20px
            }
            .custom-title {
                display block
                height 28px
                font-size 28px
                color #000
            }
        }
    }
}
</style>