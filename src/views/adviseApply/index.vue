<template>
  <div class="adviseApply-box">
        <ry-perfect
            :Loading="loading"
            @touchafter="touchafter"
        >
            <div class="adviseApply-info">
                <div class="adviseApply-tx">
                    <van-uploader 
                        :after-read="afterRead"
                    >
                        <div class="adviseApply-btn">
                            <van-image
                                v-if="isshowImg"
                                :src="txImg"
                                fit="cover"
                                class="adviseApply-img"
                            />
                            <div 
                                v-else
                                class="adviseApply-head"
                            >
                                <md-icon
                                    name="camera"
                                    size="lg"
                                    class="adviseApply-icon"
                                />
                                <span>头像上传</span>
                            </div>
                        </div>
                    </van-uploader>
                </div>
                <div class="perfectApply-form-list">
                    <div class="perfectApply-form-div">
                        <span>申请人姓名：</span>
                        <p class="perfectApply-input"><input type="text" v-model="form.name" readonly/></p>
                    </div>
                    <div class="perfectApply-form-div">
                        <span>申请人花名：</span>
                        <p class="perfectApply-input"><input type="text" v-model="form.fname"/></p>
                    </div>
                    <div class="perfectApply-form-div">
                        <span>身份证号码：</span>
                        <p class="perfectApply-input"><input type="text" v-model="form.card" readonly/></p>
                    </div>
                    <div class="perfectApply-form-div">
                        <span><i>手</i><i>机</i><i>号</i>码：</span>
                        <p class="perfectApply-input"><input type="text" v-model="form.phone" readonly/></p>
                    </div>
                    <div class="perfectApply-form-div">
                        <span>微<i>信</i>号：</span>
                        <p class="perfectApply-input"><input type="text" v-model="form.weixin" @focus="showTips" @blur="hideTips"/></p>
                        <p class="perfectApply-brook" v-show="showtip">请填写本人真实微信号,以免影响售后服务</p>
                    </div>
                    <div 
                        class="perfectApply-form-div"
                        @click="showSelect(0)"
                     >
                        <span><i>服</i><i>务</i><i>类</i>型：</span>
                        <p class="perfectApply-input">
                            <span
                                :class="{'active': form.fwLeix}"
                            >
                                {{form.fwLeix ? form.fwLeix : '请选择服务类型'}}
                            </span>
                            <van-icon 
                                name="arrow"
                                class="adviseApply-arrow"
                            />
                        </p>
                    </div>
                    <div 
                        class="perfectApply-form-div"
                        @click="showSelect(1)"
                     >
                        <span><i>职</i>称：</span>
                        <p class="perfectApply-input">
                            <span
                                :class="{'active': form.Professional}"
                            >
                                {{form.Professional ? form.Professional : '请选择职称类型'}}
                            </span>
                            <van-icon 
                                name="arrow"
                                class="adviseApply-arrow"
                            />
                        </p>
                    </div>
                    <div 
                        class="perfectApply-form-div"
                        @click="showSelect(2)"
                     >
                        <span><i>专</i>业：</span>
                        <p class="perfectApply-input">
                            <span
                                :class="{'active': form.major}"
                            >
                                {{form.major ? form.major : '请选择专业类型'}}
                            </span>
                            <van-icon 
                                name="arrow"
                                class="adviseApply-arrow"
                            />
                        </p>
                    </div>
                    <div 
                        class="perfectApply-form-div"
                        @click="showSelect(2)"
                     >
                        <span><i>擅</i>长：</span>
                        <p class="perfectApply-input">
                            <van-icon 
                                name="arrow"
                                class="adviseApply-arrow"
                            />
                        </p>
                    </div>
                </div>
            </div>
        </ry-perfect>
        <div class="adviseApply-select">
            <van-popup 
                v-model="showPicker"
                position="bottom"
            >
                <van-picker 
                    show-toolbar
                    :columns="actions"
                    :title="title"
                    @cancel="showPicker = false" 
                    @confirm="onConfirm"
                />
            </van-popup>
        </div>
  </div>
</template>

<script>
import RyPerfect from '@/components/PerfectInfo'
import { weiXin } from '@/libs/validate'
import mixins from '@/libs/mixins'
import { Uploader, Image, Icon, ActionSheet, Picker } from 'vant'

export default {
    name: 'ry-adviseApply',

    mixins: [mixins],

    components: {
        [RyPerfect.name]: RyPerfect,
        [Uploader.name]: Uploader,
        [Image.name]: Image,
        [Icon.name]: Icon,
        [ActionSheet.name]: ActionSheet,
        [Picker.name]: Picker
    },

    data() {
        return {
            txImg: '',
            title: '',
            isshowImg: false,
            showtip: false,
            form: {
                name: '彭元帅',
                fname: '彭大将军',
                card: '431024199004102434',
                phone: '17773191626',
                weixin: '',
                fwLeix: '',
                Professional: '',
                major: ''
            },
            showPicker: false,
            status: 0,
            actions: [],
            fwList: ['信用卡', '信贷', '融资规划', '征信服务'],
            zcList: ['技师', '嫩模', '韩国小姐', 'AV小姐'],
            zyList: ['篮球', '足球', '台球', '保龄球']
        }
    },

    methods: {
        touchafter() {
            if(!this.validateWeixin()) {
                this.$toast({
                    message: this.message,
                    position: 'bottom'
                })
                return
            }

            this.changeLoading() // 防止点击按钮连续请求

            setTimeout(() => {
                this.loading = false
            }, 1000)
        },
        
        afterRead(file) {
            this.txImg = file.content
            this.isshowImg = true
            console.log(file.content)
        },

        showTips() {
            this.showtip = true
        },

        hideTips() {
            this.showtip = false
            this.onBlur()
        },

        // 验证微信
        validateWeixin() {
            if (this.form.weixin == '') {
                this.message = '微信号不能为空'
                return false
            } else {
                const { success, message } = weiXin(this.form.weixin)
                if (!success) {
                    this.message = message
                    return false
                }
            }
            return true
        },

        onConfirm(value) {
            switch(this.status) {
                case 0:
                    this.form.fwLeix = value
                    break
                case 1:
                    this.form.Professional = value
                    break
                default:
                    this.form.major = value  
            }
            this.showPicker = false
        },

        showSelect(status) {
            switch(status) {
                case 0:
                    this.actions = this.fwList
                    this.title = '服务类型'
                    break
                case 1:
                    this.actions = this.zcList
                    this.title = '职称类型'
                    break
                default:
                    this.actions = this.zyList
                    this.title = '专业类型'
            }
            this.showPicker = true
            this.status = status
        }
    }
}
</script>

<style lang="stylus" scoped>
.adviseApply-box {
    background #f5f5f5
}

.adviseApply-info {
    .adviseApply-tx {
        margin-top 44px
        display flex
        justify-content center
        .adviseApply-btn {
            width 118px
            height 118px
            border 2px solid #DBDBDB
            border-radius 50%
            overflow hidden
            .adviseApply-img {
                width 100%
                height 100%
            }
            .adviseApply-head {
                display flex
                align-items center
                justify-content center
                flex-direction column
                width 100%
                height 100%
                .adviseApply-icon {
                    color #ccc
                }
                span {
                    display block
                    margin-top 4px
                    height 20px
                    line-height 20px
                    font-size 20px
                    color #ccc
                }
            }
        }
    }
}

.perfectApply-form-list  {
    margin-top 80px
    .perfectApply-form-div {
        position relative
        padding-bottom 66px
        display flex
        align-items baseline
        height 40px
        i {
            display inline-block
            font-style normal
        }
        &:nth-child(4),
        &:nth-child(6) {
            i {
                padding-right 8px
            }
        }
        &:nth-child(5) {
            i {
                padding 0 25px
            }
        }
        &:nth-child(7),
        &:nth-child(8) {
            i {
                padding-right 90px
            }
        }
        span {
            display block
            height 32px
            font-size 32px
            color #707070
            
        }
        .perfectApply-input {
            display flex
            align-items center
            flex 1
            height 32px
            padding-bottom 3px
            border-bottom 1px solid #ddd
            input {
                flex 1
                font-size 32px
                color #707070
                caret-color #FF6F00
            }
            span {
                flex 1
                display block
                font-size 32px
                color #ccc
                &.active {
                    color #707070
                }
            }
            .adviseApply-arrow {
                position relative
                right -4px
                padding-right 0
                margin-left 16px
                font-size 32px
                font-weight bold
                color #aaa
            }
        }
        .perfectApply-brook {
            position absolute
            left 180px
            top 45px
            color #f00
            font-size 22px
        }
    }
}
</style>