<template>
  <div class="setting-box">
      <ry-scroll-view
        :bounce="false"
      >
          <div class="setting-info">
              <div class="setting-info-head">
                <van-cell title="隐私政策" is-link class="setting-cell"/>
                <van-cell title="关于" is-link class="setting-cell"/>
              </div>
              <div 
                role="button"
                class="setting-info-btn"
                @click="next"
              >
                {{identity}}
              </div>
          </div>
      </ry-scroll-view>
  </div>
</template>

<script>
export default {
  name: 'ry-setting',

  data() {
    return {
      identity: '顾问申请'
    }
  },

  methods: {
    next() {
      this.$router.push('/adviseApply')
    }
  }
}
</script>

<style lang="stylus" scoped>
.setting-box {
  background #f5f5f5
}

.setting-info {
  .setting-info-head {
    margin-bottom 30px
    .setting-cell {
      padding 40px
    }
  }
  .setting-info-btn {
    width 100%
    height 110px
    display flex
    align-items center
    justify-content center
    font-size 28px
    background #fff
    &:active {
      background #f2f3f5
    }
  }
}
</style>