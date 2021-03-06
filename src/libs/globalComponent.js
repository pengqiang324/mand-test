
import {
    Toast,
    Notify,
    Overlay,
    Loading
} from 'vant'

import { 
    Button,
    NumberKeyboard
} from 'mand-mobile'

/*
** @ComponentName RyLoading 加载组件
** @ComponentName RyResultPage 404页组件
** @ComponentName RyResultNetwork 网络连接出错组件
** @ComponentName RyResultEmpty 空信息，暂无信息组件
** @ComponentName RyErrorInfo 后端错误信息反馈
** @ComponentName RyButton 通用按钮组件
** @ComponentName RyPerfectDiaLog 完善信息组件
** @ComponentName RySrcoll better-scroll组件
** @ComponentName RySlideScroll 轮播图组件
** @ComponentName RyMLoading 载入组件
*/

import RyLoading from '../components/Loading'
import RyResultPage from '../components/ResultPage/404'
import RyResultNetwork from '../components/ResultPage/RyNetworkError'
import RyErrorPrompt from '../components/ResultPage/RyErrorPrompt'
import RyErrorInfo from '../components/ResultPage/RyErrorInfo'
import RyResultEmpty from '../components/ResultPage/RyEmptyInfo'
import RyButton from '../components/Button'
import RyPerfectDiaLog from '../components/PerfectDiaLog'
import RyScroll from '../components/BetterScroll'
import RySliderScroll from '../components/SliderScroll'
import RyMLoading from '../components/Mloading'

export default {
    install(Vue) {
        Vue.component(Toast.name, Toast)
        Vue.component(Loading.name, Loading)
        Vue.component(Notify.name, Notify)
        Vue.component(Button.name, Button)
        Vue.component(Overlay.name, Overlay)
        Vue.component(NumberKeyboard.name, NumberKeyboard)
        Vue.component(RyLoading.name, RyLoading)
        Vue.component(RyResultPage.name, RyResultPage)
        Vue.component(RyResultNetwork.name, RyResultNetwork)
        Vue.component(RyErrorPrompt.name, RyErrorPrompt)
        Vue.component(RyResultEmpty.name, RyResultEmpty)
        Vue.component(RyButton.name, RyButton)
        Vue.component(RyPerfectDiaLog.name, RyPerfectDiaLog)
        Vue.component(RyScroll.name, RyScroll)
        Vue.component(RySliderScroll.name, RySliderScroll)
        Vue.component(RyMLoading.name, RyMLoading)
        Vue.component(RyErrorInfo.name, RyErrorInfo)
    }
}