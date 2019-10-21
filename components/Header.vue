<template>
  <el-row type="flex" justify="space-between">
    <div>
      <LinkBtn to="/" text="三聯單"></LinkBtn>
      <LinkBtn to="/duplicate" text="二聯單"></LinkBtn>
      <LinkBtn to="/codeSearch" text="統一編號查詢"></LinkBtn>
      <!-- <LinkBtn to="/history" text="歷程記錄"></LinkBtn> -->
    </div>
    <el-button type="danger" @click="showLogin = true">登入/註冊</el-button>
    <el-dialog title="登入 / 註冊" :visible.sync="showLogin" center width="400px">
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="60px">
        <el-form-item label="賬號" prop="account">
          <el-input v-model="loginForm.account" placeholder="請輸入帳號/郵箱"></el-input>
        </el-form-item>

        <el-form-item label="密碼" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            auto-complete="off"
            placeholder="請輸入密碼"
          ></el-input>
        </el-form-item>
      </el-form>

      <el-row type="flex" justify="center">
        <el-button class="w100 mr-4" type="primary" @click="showLogin = false;">登入</el-button>
        <el-button class="w100" type="danger" @click="showLogin = false;">註冊</el-button>
      </el-row>

      <br />

      <div class="google-login btn">
        <i class="iconfont icon-google"></i> 使用google帳號登入
      </div>
      <div class="facebook-login btn">
        <i class="iconfont icon-facebook"></i> 使用facebook帳號登入
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
import LinkBtn from '../components/LinkBtn'

export default {
  name: 'Header',
  components: {
    LinkBtn
  },
  data() {
    return {
      showLogin: false,
      loginForm: {
        account: '',
        password: ''
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.btn {
  margin: 10px auto;
  width: 300px;
  color: #fff;
  text-indent: 44px;
  border-radius: 4px;
  height: 44px;
  line-height: 44px;
  i {
    margin-right: 6px;
  }
  &.google-login {
    background: rgb(234, 73, 53);
  }
  &.facebook-login {
    background: rgb(61, 88, 157);
  }
}
</style>