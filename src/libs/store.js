import Vue from 'vue'

export let store =Vue.observable({
    scrollTop: 0,
})

export let mutations = {
    setScrollTop(scrollTop){
        store.scrollTop = scrollTop
    },
}