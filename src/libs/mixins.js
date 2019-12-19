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
        }
    }
}