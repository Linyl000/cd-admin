<template>
  <el-form ref="form" :model="user" :rules="rules" label-width="80px">
    <el-form-item label="原密码" prop="oldTransactionCode">
      <el-input
        v-model="user.oldTransactionCode"
        placeholder="请输入原密码"
        type="password"
        show-password
      />
    </el-form-item>
    <el-form-item label="新密码" prop="newTransactionCode">
      <el-input
        v-model="user.newTransactionCode"
        placeholder="请输入新密码"
        type="password"
        show-password
      />
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input
        v-model="user.confirmPassword"
        placeholder="请确认新密码"
        type="password"
        show-password
      />
    </el-form-item>
  </el-form>
</template>

<script>
import { resetTtc } from '@/api/system/user'

export default {
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.user.newTransactionCode !== value) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      user: {
        oldTransactionCode: undefined,
        newTransactionCode: undefined,
        confirmPassword: undefined
      },
      // 表单校验
      rules: {
        oldTransactionCode: [
          { required: true, message: '原密码不能为空', trigger: 'blur' }
        ],
        newTransactionCode: [
          { required: true, message: '新密码不能为空', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { required: true, validator: equalToPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          resetTtc(this.user).then((response) => {
            this.$modal.msgSuccess('重置交易密码成功')
          })
        }
      })
    },
    close() {
      this.$tab.closePage()
    }
  }
}
</script>
