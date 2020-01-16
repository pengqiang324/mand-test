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
                                :src="form.txImg"
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
                        @click="showSheet"
                     >
                        <span><i>擅</i>长：</span>
                        <p class="perfectApply-input">
                            <span class="active">{{form.begoodAt}}</span>
                            <van-icon 
                                name="arrow"
                                class="adviseApply-arrow"
                            />
                        </p>
                    </div>
                </div>
            </div>
        </ry-perfect>
        <!-- picker 选择器 start -->
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
        <!-- picker 选择器 end -->
        <!-- 擅长 start -->
        <div class="adviseApply-begoodAt">
            <van-action-sheet 
                v-model="showsheet" 
                title="顾问擅长"
                @close="onClosed"
            >
                <div class="adviseApply-bgAt-con">
                    <div class="adviseApply-bgAt-info">
                        <van-field
                            v-model="messageInfo"
                            :autosize="autosize"
                            type="textarea"
                            maxlength="400"
                            placeholder="顾问擅长内容在400字以内"
                            show-word-limit
                            class="adviseApply-bgAt-fied"
                        />
                        <div class="adviseApply-bgAt-tips" >
                            <span @click="changeTips">范例文本</span>
                            <van-icon 
                                name="question-o"
                                class="adviseApply-bgAt-question" 
                                @click="changeTips"
                            />
                            <div
                                v-show="showdialog" 
                                class="adviseApply-tips-box"
                            >
                                <p>擅长：大额信用卡办理、无抵押信用担保、资产抵押、征信解析。</p>
                                <p>从事金融行业六年，擅长高额信用卡办理、信用资产打造，解析个人征信上万份；多家金融公司风控特邀顾问。专业无抵押信用贷款、抵押担保类贷款知识。</p>
                            </div>
                        </div>
                        <div role="button" class="adviseApply-bgAt-btn">
                            <ry-button
                                btn-title="确定"
                                @touchafter="bgAtTouchAfter"
                            />
                        </div>
                    </div>
                </div>
            </van-action-sheet>
        </div>
        <!-- 擅长 end -->
        <!-- 审核结果信息 start -->
        <ry-examine
            :show-overlay="showOverlay"
            :examine-status="examineStatus"
        />
        <!-- 审核结果信息 end -->
  </div>
</template>

<script>
import RyPerfect from '@/components/PerfectInfo'
import { weiXin } from '@/libs/validate'
import mixins from '@/libs/mixins'
import { Uploader, Image, Icon, ActionSheet, Picker, Field } from 'vant'
import RyExamine from '@/components/Examine'

export default {
    name: 'ry-adviseApply',

    mixins: [mixins],

    components: {
        [RyPerfect.name]: RyPerfect,
        [Uploader.name]: Uploader,
        [Image.name]: Image,
        [Icon.name]: Icon,
        [ActionSheet.name]: ActionSheet,
        [Picker.name]: Picker,
        [Field.name]: Field,
        [RyExamine.name]: RyExamine
    },

    data() {
        return {
            title: '',
            message: '',
            messageInfo: '',
            examineStatus: '',
            isshowImg: false,
            showtip: false,
            showsheet: false,
            showPicker: false,
            showdialog: false,
            showOverlay: false, // 审核状态
            form: {
                txImg: '',
                name: '彭元帅',
                fname: '彭大将军',
                card: '431024199004102434',
                phone: '17773191626',
                weixin: '',
                fwLeix: '',
                Professional: '',
                major: '',
                begoodAt: '',
            },
            autosize: {
                minHeight: 120,
                maxHeight: 120
            },
            status: 0,
            actions: [],
            fwList: ['信用卡', '信贷', '融资规划', '征信服务'],
            zcList: ['老师', '工程师', '厨师', '媒体'],
            zyList: ['篮球', '足球', '台球', '保龄球']
        }
    },

    methods: {
        touchafter() {
            if(!this.validate()) {
                this.$toast({
                    message: this.message,
                    position: 'bottom'
                })
                return
            }

            this.changeLoading() // 防止点击按钮连续请求

            setTimeout(() => {
                this.loading = false
                this.examineStatus = '已通过'
                this.showOverlay = true
            }, 1000)
        },
        
        afterRead(file) {
            this.form['txImg'] = file.content
            this.isshowImg = true
        },

        showTips() {
            this.showtip = true
        },

        hideTips() {
            this.showtip = false
            this.onBlur()
        },

        // 验证
        validate() {
            if (this.form.txImg == '') {
                this.message = '请上传头像'
                return false
            } else if (this.form.fname == '') {
                this.message = '请输入申请人花名'
                return false
            } else if(this.form.weixin == '') {
                this.message = '微信号不能为空'
                return false
            } else if(this.form.fwLeix == '') {
                this.message = '请选择服务类型'
                return false
            } else if (this.form.Professional == '') {
                this.message = '请选择职称类型'
                return false
            } else if (this.form.major == '') {
                this.message = '请选择专业类型'
                return false
            } else if (this.form.begoodAt == '') {
                this.message = '请输入顾问擅长信息'
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
        // 类型选择器
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
        },
        // 顾问擅长
        showSheet() {
            this.showsheet = true
        },

        bgAtTouchAfter() {
            this.form['begoodAt'] = this.messageInfo
            this.showsheet = false
        },

        changeTips() {
            this.showdialog = !this.showdialog
        },

        onClosed() {
            this.showdialog = false
        }
    }
}
</script>

<style lang="stylus">
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
        align-items center
        height 40px
        i {
            display inline-block
            font-style normal
        }
        &:nth-child(4),
        &:nth-child(6) {
            i {
                padding-right 10px
            }
        }
        &:nth-child(5) {
            i {
                padding 0 30px
            }
        }
        &:nth-child(7),
        &:nth-child(8) {
            i {
                padding-right 93px
            }
        }
        &:nth-child(9) {
            i {
                padding-right 90px
            }
            .perfectApply-input {
                justify-content flex-end
                span {
                    width 180px
                    overflow hidden
                    white-space nowrap
                    text-overflow ellipsis
                }
                .adviseApply-arrow {
                    
                }
            }
        }
        span {
            display block
            height 30px
            font-size 30px
            color #707070
        }
        .perfectApply-input {
            display flex
            align-items center
            flex 1
            height 35px
            padding-bottom 5px
            border-bottom 1px solid #ddd
            input {
                flex 1
                font-size 30px
                color #707070
                caret-color #FF6F00
            }
            span {
                flex 1
                display block
                font-size 30px
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
                font-size 30px
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

.adviseApply-bgAt-con {
    padding 0 28px
    box-sizing border-box
    .adviseApply-bgAt-info {
        padding-top 20px
        border-top 4px solid #848484
        .adviseApply-bgAt-fied {
            margin-bottom 20px
            border 2px solid #D1D1D1
            box-sizing border-box
            .van-field__control {
                caret-color #ff6f00
            }
        }
        .adviseApply-bgAt-tips {
            position relative
            display flex
            align-items center
            justify-content flex-end
            color #FF3D00
            span {
                margin-right 10px
                height 24px
                text-align right
                font-size 24px
            }
            .adviseApply-bgAt-question {
                font-size 32px
            }
            .adviseApply-tips-box {
                position absolute
                right 35px
                top 55px
                padding 20px 28px
                width 545px
                line-height 30px
                font-size 24px
                color #3a3a3a
                border-radius 20px 10px 20px 20px
                background #ebebeb
                z-index 3333
                box-sizing border-box
                &:after {
                    position absolute
                    top -27px
                    right -4px
                    display block
                    content ''
                    width 0
                    height 0
                    border-bottom 30px solid #ebebeb
                    border-left 12px solid transparent
                    border-right 12px solid transparent
                    border-top none
                    transform rotate(35deg)
                    transform-origin left bottom
                }
            }
        }
    }
}

.adviseApply-bgAt-btn {
    padding 72px 90px 120px
}
</style>