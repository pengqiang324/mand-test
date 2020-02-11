<template>
  <div class="applyCard-box">
    <ry-scroll-view 
        :bounce="false"
    >
        <div class="applyCard-top"> 
            <h2>本人申请信息</h2>
            <van-cell-group class="applyCard-cell">
                <van-field 
                    v-model="form.name"
                    placeholder="请输入申请人姓名"
                    readonly
                >
                    <span slot="label" class="name">姓<i></i>名</span>
                </van-field>
                <van-field 
                    v-model="form.card" 
                    placeholder="请输入申请人身份证"
                    readonly
                >
                    <span slot="label" class="card">身<i>份</i>证</span>
                </van-field>
                <van-field 
                    v-model="form.tel" 
                    type="tel" 
                    placeholder="请输入申请人手机号"
                    :error-message="errorMessage" 
                    clearable 
                    :error="error"
                >
                    <span slot="label" class="card">手<i>机</i>号</span>
                </van-field>
                <van-field 
                    v-model="form.indenty" 
                    type="tel" 
                    label="手机验证码" 
                    placeholder="请输入验证码"
                    :error-message="errorIndentyMessage" 
                    clearable 
                    :error="errorIndenty"
                >
                    <span slot="button" class="indenty">发送验证码</span>
                </van-field>
                <van-field 
                    v-model="form.yqm" 
                    type="Number" 
                    label="推荐邀请码" 
                    readonly
                />
            </van-cell-group>
            <p>个人信息将影响审核及收入现金，请确保信息真实有效</p>
        </div>
        <div class="applyCard-btn">
            <ry-button
                btn-title="提交"
                :loading="loading"
                @touchafter="confirm"
            />
        </div>
    </ry-scroll-view>
  </div>
</template>

<script>
import { Field } from 'vant'
import mixins from '@/libs/mixins'

export default {
    name: 'ry-applyCard',

    mixins: [mixins],

    components: {
        [Field.name]: Field
    },

    data() {
        return {
            form: {
                name: '彭元帅',
                card: '431024199104152014',
                tel: '',
                indenty: '',
                yqm: '333333'
            },
            errorMessage: '',
            errorIndentyMessage: '',
            error: false,
            errorIndenty: false
        }
    },

    methods: {
        confirm() {
            this.changeLoading()
            setTimeout(() => {
                this.loading = false
            },2000)
        }
    }
}
</script>

<style lang="stylus">
.applyCard-box {
    background #f5f5f5
    .applyCard-top {
        margin 40px 0 120px
        background #fff
        h2 {
            padding 70px 0 50px
            font-size 36px
            height 36px
            line-height 36px
            text-align center
        }
        .applyCard-cell {
            padding 0 0 0 20px
            input {
                caret-color #FF8324
            }
        }
        p {
            padding 20px 0 90px
            height 24px
            line-height 24px
            text-align center
            font-size 24px
            color #f00
        }
    }
    .applyCard-btn {
        padding 0 90px
    }
    .name {
        i {
            display inline-block
            padding 0 42px
        }
    }
    .card {
        i {
            font-style normal
            padding 0 29px
        }
    }
    .indenty {
        display flex
        align-items center
        justify-content center
        padding 0 15px
        height 50px
        color #b5b5b5
        font-size 24px
        border 1px solid #dcdcdc
        border-radius 20*2px
        box-sizing border-box
        &:active {
            background #b5b5b5
            color #fff
        }
    }
}

</style>