<template>
  <div class="businessInfo-box">
        <ry-scroll-view
            :bounce="false"
            class="businessInfo-scroll"
        >
            <ry-video-info>
                <div>
                    <div class="businessInfo-js">
                        <h2>公司简介</h2>
                        <h4>周勇[交泰科技]创始人</h4>
                        <p>
                            融溢是湖南豚鱼科技有限公司旗下的一款互联网+全民信用O2O服务平台。
                            利用大数据搜索等技术让百家银行的金融产品可以直观的呈现在用户面前,提供贷款,信用卡,信用咨询,
                            贷款经纪等搜索比价及信用咨询,贷款申请,量身私人定制服务。</p>
                        <!-- <p>目前线上已覆盖PC端，融溢App，
                            融溢网手机版等终端，具备集贷款产品信息搜索，产品研发，大数据处理，服务标准建立为一体的综合型信用服务平台，
                            平台为贷款客户与银行，消费金融公司双方提供全面真实的信用相关信息及咨询服务，并满足用户资质审核，
                            信用额度评估，约带面签等个性化服务，旨在不断提高服务效率，提升服务体验，为用户提供更安全，更便捷，更高效，
                            更舒心，更合理的私人定制化综合信用服务。</p>
                        <p>湖南豚鱼科技以建设全民信用体系，打造信用城市，推进信用行业进步，
                            让“”个人和小微企业融资不在为难”为品牌使命！希望通过持之以恒的创新及技术的探索和运用，建立有效管理，
                            高质量，高标准的信用信息服务标准，推进行业进步…！</p>     -->
                    </div>

                    <div class="businessInfo-introduction">
                        <h2>业务介绍</h2>
                        <div class="businessInfo-introduction-info">
                            <div class="businessInfo-title">
                                <h4>一、信用卡私人定制</h4>
                                <p>1、5000-50000信用卡快速办理</p> 
                                <p>2、3万-50万大额信用卡办理</p>
                                <p>3、2000-20000学生办理</p>
                                <p>4、信用卡提额1-5倍</p>
                                <p>5、3万-30万信用卡卡贷</p>
                            </div>
                            <div class="businessInfo-title">
                                <h4>二、信贷私人定制</h4>
                                <p>1、3万-10万信贷快速办理</p> 
                                <p>2、5万-50万大额信贷办理</p>
                                <p>3、3-6个月长线融资100万规划指导</p>
                            </div>

                            <div class="businessInfo-title">
                                <h4>三、征信业务</h4>
                                <p>1、征信测评，报告解读</p> 
                                <p>2、征信异议申请</p>
                            </div>

                            <div class="businessInfo-title">
                                <h4>四、其他业务</h4>
                                <p>1、60+消费金融公司无抵押信用贷款官方快速申请通道</p> 
                                <p>2、30+银行信用卡官方快速申请通道</p>
                                <p>3、信用卡管家</p>
                                <p>4、积分兑换</p>
                                <p>5、商学院会员卡</p>
                                <p>6、大数据查询</p>
                            </div>
                        </div>
                    </div>
                </div>
            </ry-video-info>
        </ry-scroll-view>
  </div>
</template>

<script>
import RyVideoInfo from '@/components/VideoInfo'

export default {
    name: 'ry-businessInfo',

    components: {
        [RyVideoInfo.name]: RyVideoInfo
    }
}
</script>

<style lang="stylus">
.businessInfo-scroll {
    .scroll-view-container {
        height 100%
    }
}
</style>

<style lang="stylus" scoped>
.businessInfo-box {
    position absolute
    top 0
    right 0
    left 0
    bottom 0
    background #f5f5f5
}

.businessInfo-js {
    padding 20px 40px 0
    h2 {
        padding-bottom 20px
        height 32px
        line-height 32px
        font-size 32px
        color #3A3A3A
    }
    h4 {
        padding 0 0px 8px
        height 28px
        line-height 28px
        font-size 28px
        color #000
    }
    p {
        text-indent 2em
        padding-bottom 5px
        line-height 34px
        color #707070
        font-size 26px
    }
}

.businessInfo-introduction {
    padding 0 40px
    h2 {
        padding 30px 0 10px
        height 32px
        line-height 32px
        color #3A3A3A
        font-size 32px
        border-bottom 2px solid rgba(238,238,238,1)
    }
    .businessInfo-introduction-info {
        padding 0 0 38px
        .businessInfo-title {
            padding-top 20px
        }
        h4 {
            padding-bottom 16px
            font-size 28px
            height 28px
            line-height 28px
        }
        p {
            padding-bottom 10px
            height 26px
            line-height 26px
            font-size 26px
            text-indent 1em
            color #707070
        }
    }
}
</style>