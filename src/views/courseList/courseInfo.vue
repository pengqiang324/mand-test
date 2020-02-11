<template>
  <div class="businessInfo-box">
        <ry-scroll-view
            :bounce="false"
            class="businessInfo-scroll"
        >
            <ry-toast-loading :show="showloading"/>
            <ry-video-info
                v-if="showVideo"
                :vid="videoData.videoId"
                :cover="videoData.imageUrl"
                :play-auth="playAuth"
                :view="videoData.view"
            >
                <div class="template-info" v-html="videoData.introduction"></div>
            </ry-video-info>
        </ry-scroll-view>
  </div>
</template>

<script>
import RyVideoInfo from '@/components/VideoInfo'
import { getVideoId, getPlayauth } from '@/api/business/business'
import mixins from '@/libs/mixins'

export default {
    name: 'ry-courseInfo',

    mixins: [mixins],

    components: {
        [RyVideoInfo.name]: RyVideoInfo
    },

    data() {
        return {
            page: 1,
            size: 1,
            view: 0,
            videoData: {},
            playAuth: '',
            showVideo: false
        }
    },

    created() {
        this.initData()
    },

    methods: {
        async initData() {
            const { id } = this.$route.query
            this.showloading = true
            const res = await getVideoId({id})
            const { success, data } = res.data
            if (success) {
                this.videoData = data
            }
            this.getPlayAuth()
        },

        getPlayAuth() {
            getPlayauth({
                videoId: this.videoData.videoId
            })
            .then((res) => {
                const { success, data } = res.data
                if (success) {
                    this.playAuth = data.playAuth
                    this.showVideo = true
                }
                this.showloading = false
            })
        }
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

.template-info {
   padding 0 40px
   font-size 30px
   box-sizing border-box
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
            &:last-child {
                padding-bottom 40px
            }
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