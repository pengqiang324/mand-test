<template>
  <div class="video-box">
        <div class="businessInfo-video">
            <img src="../../assets/images/business/business-play.png"/>
            <p class="business-video-read">
                <md-icon
                    name="visible"
                    size="md"
                    class="video-icon"
                />
                <span>观看人数:&nbsp;248</span>
            </p>
        </div>

        <div class="businessInfo-con">
            <ry-scroll-view
                class="video-scroll"
            >
                <slot></slot>
            </ry-scroll-view>
        </div>
  </div>
</template>

<script>
export default {
    name: 'ry-video-info'
}
</script>

<style lang="stylus">
.video-scroll {
    .scroll-view-container {
        height auto !important
    }
}
</style>

<style lang="stylus" scoped>

.businessInfo-video {
    position relative
    display flex
    align-items center
    justify-content center
    width 100%
    height 320px
    background #AAA
    img {
        width 80px
        display block
    }
}

.business-video-read {
    position absolute
    top 8px
    left 8px
    display flex
    align-items center
    justify-content flex-end
    padding 8px 12px
    height 24px
    border-radius 30px
    font-size 20px
    color #fff
    background rgba(0,0,0,.5)
    .video-icon,
    span {
        display block
        height 24px
        line-height 24px
    }
    .video-icon {
        font-size 24px
    }
    span {
        margin-left 4px
    }
}

.businessInfo-con {
    position absolute
    top 320px
    
    height calc(100% - 320px)
    width 100%
    background #fff
    box-shadow 0 10px 18px rgba(0,0,0,0.05)
    .video-scroll {
        padding-top 40px
        box-sizing border-box
    }
}
</style>