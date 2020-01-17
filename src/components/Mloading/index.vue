<template>
  <van-loading 
    type="spinner" 
    :size="size" 
    :color="color"
    vertical
  >载入中...
  </van-loading>
</template>

<script>
export default {
    name: 'ry-m-loading',

    props: {
        size: {
            type: String,
            default: '24px'
        },
        color: {
            type: String,
            default: '#c9c9c9'
        }
    }
}
</script>

<style>

</style>