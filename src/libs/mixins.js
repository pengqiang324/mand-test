import { IsIOS } from '@/libs/lib'
import { mapState } from 'vuex'

export default {
    data() {
        return {
            scrollTop: 0,
            showNetWork: false, // 显示网络连接出错组件
            showErrorIn: false, // 显示不知出错在哪组件
            isActive: false, // 点击显示按钮遮罩层
            loading: false // 按钮加载图标控制
        }
    },

    computed: {
        ...mapState([
          'showNetwork',
          'showError'
        ])
    },

    mounted() {
        this.bindScroll()
    },

    activated() {
        this.bindScroll()
        this.$refs.scroll && this.$refs.scroll.$_scrollTo(this.scrollTop)  // 滚动元素需绑定ref=scroll
    },

    deactivated() {
        this.$off('scrolled')
    },

    methods: {
        onBlur() {
            if (IsIOS()) { // IOS系统
                let currentPosition, timer;
                let speed = 1;
                timer = setInterval(function () {
                currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
                currentPosition -= speed;

                window.scrollTo(0, currentPosition); //页面向上滚动
                currentPosition += speed;
                window.scrollTo(0, currentPosition); //页面向下滚动

                clearInterval(timer);
                }, 100);
            }
        },

        // 是否显示完善信息弹窗
        showDiaLog() {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'))
            const isCert = userInfo ? userInfo.isCert : null
            if (isCert === 0) {
                this.$store.dispatch('showDiaLog', true)
            }
        },

        scroll({ scrollTop }) {
            this.$emit('scrolled', scrollTop)
        },
    
        bindScroll() {
            this.$on('scrolled', (top) => {
                this.scrollTop = top
            })
        },
        
        hideErrorTip() {
            if (this.showNetWork) this.showNetWork = false
            if (this.showErrorIn) this.showErrorIn = false
        },

        showErrorTip(res) {
            if (res.code == -404 && res.message.indexOf('401') == -1) {
                this.showNetWork = true
            } else {
                this.showErrorIn = true
            }
        },

        publishStart() {
            this.isActive = true
        },

        publishEnd() {
            this.isActive = false
        },

        btnTouchBefore(bool) { // 按钮加载图标
            if (this.loading) return
            this.loading = bool
        },
    }
}