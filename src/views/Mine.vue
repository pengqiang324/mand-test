<template>
  <div class="mine-box">
      <p class="mine-font">我的页面, 内容内容内容2222</p>
      <div class="ry-logout" @click="loginOut">清除缓存</div>
  </div>
</template>

<script>
import { logout } from '@/api/user/user'

export default {
    name: 'ry-mine',

    methods: {
      loginOut() {
        logout()
        .then((res) => {
          if (res.status == 200) {
            localStorage.removeItem('token'); // 清token
            this.$router.push({
              path: '/',
              query: {
                delCode: 1,
              },
            });
          }
        });
    },
    }
}
</script>

<style lang="stylus">
  .mine-box {
    width: 100%;
    height: 100%;
    font-size: 28px;
  }
  .mine-font {
    font-size 32px
  }
  .ry-logout {
    margin: 60px auto 0;
    width: 70%;
    height: 90px;
    line-height: 90px;
    text-align: center;
    border-radius: 45px;
    font-size: 32px;
    color: #fff;
    font-weight: 400;
    background: linear-gradient(to right, #ff6f00, #ff3d00);
  }
</style>