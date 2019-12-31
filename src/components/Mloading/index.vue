<template>
  <van-loading :size="size" type="spinner" vertical>载入中...</van-loading>
</template>

<script>
export default {
    name: 'ry-m-loading',

    props: {
        size: {
            type: String,
            default: '24px'
        }
    }
}
</script>

<style>

</style>