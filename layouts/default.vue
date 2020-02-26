<template>
  <el-row type="flex" justify="center" align="middle" class="fullscreen">
    <el-card :body-style="{ padding: '40px' }" id="main-container">
      <div slot="header">
        <AppHeader />
      </div>
      <nuxt />
    </el-card>
  </el-row>
</template>

<script>
import AppHeader from '../components/Header'

export default {
  components: {
    AppHeader
  }
}
</script>

<style lang="scss" scoped>
.fullscreen {
  min-width: 690px;
  width: 100vw;
  height: 100vh;
  // background: linear-gradient(
  //   rgb(255, 244, 200) 0%,
  //   rgb(255, 244, 200) 50%,
  //   rgb(255, 237, 163) 50%,
  //   rgb(255, 237, 163) 100%
  // );
}
#main-container {
  width: 100%;
  min-width: 800px;
  max-width: 980px;
  min-height: 768px;
  max-height: 768px;
}
</style>
