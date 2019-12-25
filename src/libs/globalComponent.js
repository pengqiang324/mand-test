
import {
    Toast,
    Notify,
    Overlay
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
** @ComponentName RyScrollView 上拉加载下拉刷新组件
** @ComponentName RyButton 通用按钮组件
** @ComponentName RyPerfectDiaLog 完善信息组件
*/

import RyLoading from '../components/Loading'
import RyResultPage from '../components/ResultPage/404'
import RyResultNetwork from '../components/ResultPage/RyNetworkError'
import RyErrorPrompt from '../components/ResultPage/RyErrorPrompt'
import RyResultEmpty from '../components/ResultPage/RyEmptyInfo'
import RyScrollView from '../components/ScrollView'
import RyButton from '../components/Button'
import RyPerfectDiaLog from '../components/PerfectDiaLog'

export default {
    install(Vue) {
        Vue.component(Toast.name, Toast)
        Vue.component(Notify.name, Notify)
        Vue.component(Button.name, Button)
        Vue.component(Overlay.name, Overlay)
        Vue.component(NumberKeyboard.name, NumberKeyboard)
        Vue.component(RyLoading.name, RyLoading)
        Vue.component(RyResultPage.name, RyResultPage)
        Vue.component(RyResultNetwork.name, RyResultNetwork)
        Vue.component(RyScrollView.name, RyScrollView)
        Vue.component(RyErrorPrompt.name, RyErrorPrompt)
        Vue.component(RyResultEmpty.name, RyResultEmpty)
        Vue.component(RyButton.name, RyButton)
        Vue.component(RyPerfectDiaLog.name, RyPerfectDiaLog)
    }
}