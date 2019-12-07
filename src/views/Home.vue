<template>
  <div class="home">
    <md-action-bar :actions="data"/>
  </div>
</template>

<script>
import {ActionBar, Toast} from 'mand-mobile'
export default {
  name: "home",

  components: {
    [ActionBar.name]: ActionBar,
  },

  data() {
    return {
       data: [
        {
          text: '主要按钮',
          onClick: this.handleClick,
        },
      ],
    }
  },

  methods: {
    handleClick() {
      Toast.succeed('Click')
    },
  },
};
</script>
<style lang="less">
.home {
  font-size: 16Px;
}
</style>
