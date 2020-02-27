<template>
  <el-row type="flex" justify="space-between">
    <div>
      <LinkBtn to="/" text="三聯單"></LinkBtn>
      <LinkBtn to="/duplicate" text="二聯單"></LinkBtn>
      <LinkBtn to="/codeSearch" text="統一編號查詢"></LinkBtn>
      <LinkBtn v-if="$store.state.isLogin" to="/history" text="歷程記錄"></LinkBtn>
    </div>

    <el-dropdown v-if="$store.state.isLogin">
      <span class="el-dropdown-link">
        {{$store.state.userinfo.name}}
        <el-button type="info" icon="el-icon-user" circle size="small"></el-button>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <el-button type="danger" @click="logout">登出</el-button>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-button v-else type="danger" @click="showLogin = true">登入/註冊</el-button>

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
        <el-button class="w100 mr-4" type="primary" @click="normalLogin('loginForm')">登入</el-button>
        <el-button class="w100" type="danger" @click="showSignup = true;">註冊</el-button>
      </el-row>

      <br />

      <!-- <div class="google-login btn" @click="googleLogin">
        <i class="iconfont icon-google"></i> 使用google帳號登入
      </div>-->
      <div class="facebook-login btn" @click="fbLogin">
        <i class="iconfont icon-facebook"></i> 使用facebook帳號登入
      </div>
    </el-dialog>
    <el-dialog width="500px" title="新會員註冊" :visible.sync="showSignup" :close-on-click-modal="false">
      <div
        style="width:410px;margin:0 auto;"
        v-loading.fullscreen.lock="signuping"
        element-loading-text="註冊中"
      >
        <el-form
          ref="signupForm"
          :model="signupForm"
          label-width="100px"
          label-position="left"
          status-icon
          :rules="signupRules"
        >
          <el-form-item label="帳號(信箱)" prop="email">
            <el-input v-model="signupForm.email"></el-input>
          </el-form-item>
          <el-form-item label="密碼" prop="password">
            <el-input v-model="signupForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="確認密碼" prop="check_password">
            <el-input v-model="signupForm.check_password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="暱稱" prop="name">
            <el-input v-model="signupForm.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSignup('signupForm')">送出</el-button>
          </el-form-item>
        </el-form>
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
      showSignup: false,
      signuping: false,
      loginForm: {
        account: 'test1@gmail.com',
        password: 'taipei888'
      },
      rules: {
        account: [{ required: true, message: '請輸入帳號', trigger: 'blur' }],
        password: [{ required: true, message: '請輸入密碼', trigger: 'blur' }]
      },
      signupForm: {
        name: '',
        email: '',
        password: '',
        check_password: ''
      },
      signupRules: {
        name: [{ required: true, message: '請輸入暱稱', trigger: 'blur' }],
        email: [{ required: true, message: '請輸入帳號', trigger: 'blur' }],
        password: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('請輸入密碼'))
              } else if (!/^[a-zA-Z0-9]{8,12}$/.test(value)) {
                callback(new Error('請輸入8-12個字元，英數字混合'))
              } else {
                callback()
              }
            }
          }
        ],
        check_password: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('請再次輸入密碼'))
              } else if (value !== this.signupForm.password) {
                callback(new Error('兩次輸入密碼不一致'))
              } else {
                callback()
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    onSignup(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.signuping = true
          this.$api
            .signup(this.signupForm)
            .then(resp => {
              this.$message({
                message: '註冊成功',
                type: 'success'
              })
              this.signuping = false
              this.showSignup = false
            })
            .catch(err => {
              this.$message({
                message: '註冊失敗',
                type: 'error'
              })
              this.signuping = false
              this.showSignup = false
            })
          this.signupForm = {
            name: '',
            email: '',
            password: '',
            check_password: ''
          }
        } else {
          return false
        }
      })
    },
    normalLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api
            .login({
              email: this.loginForm.account,
              password: this.loginForm.password
            })
            .then(resp => {
              if (resp.data && resp.data.id) {
                this.$store.commit('LOGIN_SUCCESS', {
                  ...resp.data
                })
                this.showLogin = false
              }
            })
        } else {
          return false
        }
      })
    },
    fbLogin() {
      FB.login(resp => {
        if (resp.status === 'connected') {
          this.getUserFbInfo(resp)
        }
      })
    },
    googleLogin() {
      gapi.load('auth2', function() {
        gapi.auth2
          .init({
            client_id:
              '819775590311-3c3tb8j4ccap7h9a8h7b52io51p2c8ao.apps.googleusercontent.com'
          })
          .then(auth2 => {
            console.log('success', auth2)
          })
      })
    },
    logout() {
      this.$store.commit('LOGOUT_SUCCESS')
    },
    getUserFbInfo(resp) {
      FB.api('/me', 'GET', { fields: 'name,email' }, userInfo => {
        this.$store.commit('LOGIN_SUCCESS', {
          ...resp.authResponse,
          accountType: 'fb',
          id: userInfo.id,
          name: userInfo.name
        })
        this.showLogin = false
      })
    }
  },
  mounted() {
    if (window.sessionStorage['session']) {
      this.$store.commit(
        'LOGIN_SUCCESS',
        JSON.parse(window.sessionStorage['session'])
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  cursor: pointer;
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