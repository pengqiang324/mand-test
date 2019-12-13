
import {
    Toast,
    Notify,
} from 'vant'

import RyLoading from '../components/Loading'
import RyResultPage from '../components/ResultPage/404'
import RyResultNetwork from '../components/ResultPage/networkError'
import RyResultEmpty from '../components/ResultPage/emptyInfo'
import RyScrollView from '../components/ScrollView'

export default {
    install(Vue) {
        Vue.component(Toast.name, Toast)
        Vue.component(Notify.name, Notify)
        Vue.component(RyLoading.name, RyLoading)
        Vue.component(RyResultPage.name, RyResultPage)
        Vue.component(RyResultNetwork.name, RyResultNetwork)
        Vue.component(RyResultEmpty.name, RyResultEmpty)
        Vue.component(RyScrollView.name, RyScrollView)
    }
}