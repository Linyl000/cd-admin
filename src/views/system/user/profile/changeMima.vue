<template>
  <div class="app-container">
    <el-card style="height: calc(100vh - 130px)">
      <resetPwd :userName="userName" />
    </el-card>
  </div>
</template>

<script>
import userAvatar from './userAvatar'
import userInfo from './userInfo'
import resetPwd from './resetPwd'
import { getUserProfile } from '@/api/system/user'

export default {
  name: 'changeMima',
  components: { userAvatar, userInfo, resetPwd },
  data() {
    return {
      user: {},
      userName: '',
      roleGroup: {},
      postGroup: {},
      activeTab: 'resetPwd'
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      getUserProfile().then((response) => {
        this.user = response.data
        this.userName = this.user.userName
        this.roleGroup = response.roleGroup
        this.postGroup = response.postGroup
      })
    }
  }
}
</script>
