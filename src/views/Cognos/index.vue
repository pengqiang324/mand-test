<template>
  <div class="Cognos-box">
        <ry-operation
            :img-data="imgData"
            :data="data"
            :total="total"
            :head-title="headTitle"
            @pullUpLoad="pullUpLoad"
        />
  </div>
</template>

<script>
import mixins from '@/libs/mixins'
import RyOperation from '@/components/OperationInfo'
import { getBannerImg, getArticalList } from '@/api/article/article' 

export default {
    name: 'ry-Cognos',

    mixins: [mixins],

    components: {
        [RyOperation.name]: RyOperation
    },

    data() {
        return {
            data: [],
            imgData: [],
            page: 1,   // 请求页数
            size: 5,  // 显示多少条数据
            total: 40,
            id: '',
            headTitle: ''
        }
    },

    beforeRouteEnter(to, from, next) {
        const { name } = to.query
        to.meta.title = name
        next((vm) => {
            vm.headTitle = name
        })
    },

    created() {
        const { id } = this.$route.query
        this.id = id
        this.getBannerList()
        this.initData()
    },

    methods: {
        initData() {
            const params = {
                nbId: this.id,
                page: this.page,
                size: this.size
            }
            this.showloading = true
            getArticalList(params)
            .then((res) => {
                const { success, queryResult } = res.data
                if (success) {
                    this.data = this.data.concat(queryResult.list)
                    this.total = queryResult.total
                    this.hideErrorTip()
                } else {
                    this.showErrorTip(res)
                }
                this.showloading = false
            })
        },

        getBannerList() {
            getBannerImg({
                columnId: this.id
            })
            .then((res) => {
                const { success, data } = res.data
                if (success) {
                    this.imgData = data
                }
            })
        },

        pullUpLoad() {
            this.page ++
            // 异步更新数据
            this.initData()
        },
    }
}
</script>

<style lang="stylus" scoped>
.Cognos-box {
    background #f5f5f5
}

</style>