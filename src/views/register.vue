<template>
  <div class="register">
    <div class="box">
      <el-form
        ref="registerForm"
        :model="registerForm"
        :rules="registerRules"
        class="register-form"
      >
        <div class="title">注 册</div>
        <el-form-item prop="registerCode">
          <el-input
            v-model="registerForm.registerCode"
            type="text"
            auto-complete="off"
            placeholder="注册码"
          >
            <svg-icon
              slot="prefix"
              icon-class="edit"
              class="el-input__icon input-icon"
            />
          </el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="registerForm.username"
            type="text"
            auto-complete="off"
            placeholder="账号"
          >
            <svg-icon
              slot="prefix"
              icon-class="user"
              class="el-input__icon input-icon"
            />
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="registerForm.password"
            type="password"
            auto-complete="off"
            placeholder="密码"
            @keyup.enter.native="handleRegister"
          >
            <svg-icon
              slot="prefix"
              icon-class="password"
              class="el-input__icon input-icon"
            />
          </el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
            auto-complete="off"
            placeholder="确认密码"
            @keyup.enter.native="handleRegister"
          >
            <svg-icon
              slot="prefix"
              icon-class="password"
              class="el-input__icon input-icon"
            />
          </el-input>
        </el-form-item>
        <el-form-item prop="code" v-if="captchaEnabled">
          <el-input
            v-model="registerForm.code"
            auto-complete="off"
            placeholder="验证码"
            style="width: 63%"
            @keyup.enter.native="handleRegister"
          >
            <svg-icon
              slot="prefix"
              icon-class="validCode"
              class="el-input__icon input-icon"
            />
          </el-input>
          <div class="register-code">
            <img :src="codeUrl" @click="getCode" class="register-code-img" />
          </div>
        </el-form-item>
        <div style="margin: 0px 0px 50px 0px"></div>
        <el-form-item style="width: 100%">
          <el-button
            :loading="loading"
            size="medium"
            type="primary"
            style="width: 100%"
            @click.native.prevent="handleRegister"
          >
            <span v-if="!loading">注 册</span>
            <span v-else>注 册 中...</span>
          </el-button>
          <div style="float: left; margin-top: 10px">
            <router-link class="link-type" :to="'/login'"
              >已有账号登录</router-link
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">CD助手2022 © caiduoduo.com</div>
  </div>
</template>

<script>
import { getCodeImg, register } from '@/api/login'

export default {
  name: 'Register',
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.registerForm.password !== value) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      codeUrl: '',
      registerForm: {
        registerCode: '',
        username: '',
        password: '',
        confirmPassword: '',
        code: '',
        uuid: ''
      },
      registerRules: {
        registerCode: [
          { required: true, trigger: 'blur', message: '请输入您的注册码' }
        ],
        username: [
          { required: true, trigger: 'blur', message: '请输入您的账号' },
          {
            min: 2,
            max: 20,
            message: '用户账号长度必须介于 2 和 20 之间',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入您的密码' },
          {
            min: 5,
            max: 20,
            message: '用户密码长度必须介于 5 和 20 之间',
            trigger: 'blur'
          }
        ],
        confirmPassword: [
          { required: true, trigger: 'blur', message: '请再次输入您的密码' },
          { required: true, validator: equalToPassword, trigger: 'blur' }
        ],
        code: [{ required: true, trigger: 'change', message: '请输入验证码' }]
      },
      loading: false,
      captchaEnabled: true
    }
  },
  created() {
    this.getCode()
  },
  methods: {
    getCode() {
      getCodeImg().then((res) => {
        this.captchaEnabled =
          res.captchaEnabled === undefined ? true : res.captchaEnabled
        if (this.captchaEnabled) {
          this.codeUrl = 'data:image/gif;base64,' + res.img
          this.registerForm.uuid = res.uuid
        }
      })
    },
    handleRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.loading = true
          register(this.registerForm)
            .then((res) => {
              const username = this.registerForm.username
              this.$alert(
                "<font color='red'>恭喜你，您的账号 " +
                  username +
                  ' 注册成功！</font>',
                '系统提示',
                {
                  dangerouslyUseHTMLString: true,
                  type: 'success'
                }
              )
                .then(() => {
                  this.$router.push('/login')
                })
                .catch(() => {})
            })
            .catch(() => {
              this.loading = false
              if (this.captchaEnabled) {
                this.getCode()
              }
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #019ec4;
}
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 615px;
  height: 620px;
  box-shadow: -3px 3px 15px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  margin: 20px;
  background-color: #fff;
  border-radius: 6px;
}
.title {
  margin: 0 auto 40px auto;
  text-align: center;
  color: #333;
  font-size: 28px;
}

.register-form {
  width: 100%;
  height: 100%;
  padding: 50px 110px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.register-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.register-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 25px;
  width: 100%;
  text-align: center;
  color: #99d8e5;
  font-family: Arial;
  font-size: 18px;
  letter-spacing: 1px;
}
.register-code-img {
  height: 38px;
}
</style>
