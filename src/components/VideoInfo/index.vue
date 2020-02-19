<template>
  <div class="video-box">
        <div class="businessInfo-video">
            <ry-m-loading v-if="!playAuth"/>
            <div 
                v-else
                :id="playerId" 
                class="prism-player"
            >
            </div>
            <p class="business-video-read">
                <md-icon
                    name="visible"
                    size="md"
                    class="video-icon"
                />
                <span>观看次数:&nbsp;{{view}}</span>
            </p>
        </div>

        <div class="businessInfo-con">
            <ry-scroll-view
                :bounce="false"
                class="video-scroll"
            >
                <slot></slot>
            </ry-scroll-view>
        </div>
  </div>
</template>

<script>
export default {
    name: 'ry-video-info',

    props: {
        /*
        ** 媒体转码服务的媒体Id
        */ 
        vid: {
            type: String,
            default: ''
        },
        /*
        ** 视频封面
        */ 
        cover: {
            type: String,
            default: ''
        },
        /*
        ** 视频播放权证
        */ 
        playAuth: {
            type: String,
            default: ''
        },
        /*
        ** 视频观看次数
        */ 
        view: {
            type: Number,
            default: 0
        }
    },

    data() {
        return {
            playerId: "aliplayer_" + Math.random().toString(36).substr(2),
            playStyle: '',
            firstFullscreen: false,
            player: null
        }
    },

    mounted() {
        this.aliPlayer()
    },

    beforeRouteEnter() {
        this.player = null //销毁Aliplayer实例对象
    },

    methods: {
        aliPlayer() {
            const that = this
            const getTime = function (memoryVid) {
                /* return返回的是自定义起播时间  */
                const TIME = localStorage.getItem(`memory_time_${memoryVid}`)
                return TIME
            }

            this.player = new window.Aliplayer({
                    id: this.playerId,
                    cover: this.cover,
                    vid: this.vid,
                    playauth: this.playAuth,
                    height: '100%',
                    autoplay: false,
                    isLive: false,
                    rePlay: false,
                    playsinline: true,
                    preload: true,
                    useH5Prism: true,
                    format: 'mp4',
                    mediaType:'video',
                    qualitySort:'desc',
                    controlBarVisibility: 'click',
                    definition:'FD,LD,SD,HD,OD', // 清晰度 FD（流畅）LD（标清）SD（高清）HD（超清）OD（原画）
                    defaultDefinition: 'FD',
                    showBarTime: 5000,
                    skinLayout: [
                        {
                            "name": "bigPlayButton",
                            "align": "cc"
                        },
                        {
                            "name": "H5Loading",
                            "align": "cc"
                        },
                        {
                            "name": "errorDisplay",
                            "align": "tlabs",
                            "x": 0,
                            "y": 0
                        },
                        {
                            "name": "infoDisplay"
                        },
                        {
                            "name": "tooltip",
                            "align": "blabs",
                            "x": 0,
                            "y": 56
                        },
                        {
                            "name": "thumbnail"
                        },
                        {
                            "name": "controlBar",
                            "align": "blabs",
                            "x": 0,
                            "y": 0,
                            "children": [
                                {
                                    "name": "progress",
                                    "align": "blabs",
                                    "x": 0,
                                    "y": 44
                                },
                                {
                                    "name": "playButton",
                                    "align": "tl",
                                    "x": 15,
                                    "y": 12
                                },
                                {
                                    "name": "timeDisplay",
                                    "align": "tl",
                                    "x": 10,
                                    "y": 5
                                },
                                {
                                    "name": "fullScreenButton",
                                    "align": "tr",
                                    "x": 10,
                                    "y": 12
                                },
                                {
                                    name:"setting", 
                                    align:"tr",
                                    x:15, 
                                    y:12
                                },
                            ]
                        }
                    ],
                    components: [
                        {
                            /* 倍速播放 */ 
                            name: 'RateComponent',
                            type: window.AliPlayerComponent.RateComponent
                        },
                        {
                            /* 记忆播放 */ 
                            name: 'MemoryPlayComponent',
                            type: window.AliPlayerComponent.MemoryPlayComponent,
                            args: [false,getTime]
                        }
                    ]
                }, function (player) {

                    player.on('timeupdate', function () {
                        // 存储 记忆播放时间
                        localStorage.setItem(`memory_time_${that.vid}`, player.getCurrentTime())
                    })
                }
            )
        }
    }
}
</script>

<style lang="stylus">
.video-scroll {
    .scroll-view-container {
        height auto !important
    }
}
.prism-player .prism-big-play-btn {
    width 54Px
    height 54Px
    .outter {
        width 54Px
        height 54Px
    }
}
.prism-player .prism-progress {
    height 3Px
}
.prism-player .prism-progress .prism-progress-played {
    background #FF6F00
}

.prism-player .quality-components {
    top 2Px
    margin-right 10Px
}
.prism-player .rate-components  {
    top 1Px
    margin-right 10Px
}
.prism-player .prism-liveshift-progress .cursor-hover, 
.prism-player .prism-progress .cursor-hover {
    top -7Px !important
}
.prism-player.prism-fullscreen .prism-liveshift-progress .cursor-hover, 
.prism-player.prism-fullscreen .prism-progress .cursor-hover {
    top -7Px !important
}

.prism-player .current-quality {
    width auto
}

.prism-player .quality-list {
    left -9Px 
}

.prism-player.prism-fullscreen .quality-list {
    left -22Px !important
}

.prism-player .rate-list li.current
.prism-player .prism-setting-selector li.current {
    color #FF6F00 !important
}

.prism-player .prism-setting-selector li.current {
    &:before {
        border-left-color #FF6F00 !important
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
    height 500px
    background #eee
    font-size 24px
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
    top 500px
    height calc(100% - 500px)
    width 100%
    background #fff
    box-shadow 0 10px 18px rgba(0,0,0,0.05)
    .video-scroll {
        padding-top 40px
        box-sizing border-box
    }
}
</style>