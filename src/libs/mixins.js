import { IsIOS } from '@/libs/lib'

export default {
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
    }
}