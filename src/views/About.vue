<template>
  <div class="about wrapper">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  name: 'ry-about',

  created(){
    console.log('about触发了')
  }
}
</script>

<style lang="stylus">
.about {
  h1 {
    font-size 20px
  }
}
</style>
