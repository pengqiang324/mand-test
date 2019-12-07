module.exports = {
    plugins: {
        'postcss-pxtorem': {
            rootValue: 100, //结果为: 设计稿元素尺寸/100，比如元素宽750px,最终页面会算成 7.5rem
            propList: ['*']
        }
    }
}