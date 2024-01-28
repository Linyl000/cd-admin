<template>
  <el-row :gutter="20" style="margin: 20px">
    <el-col :xs="24" :sm="12" :md="8" :span="6"
      ><el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>累计订单数</span>
        </div>
        <div>
          <span style="color: #666666; font-size: 30px; margin-right: 6px">{{
            lj
          }}</span
          >单
        </div>
      </el-card></el-col
    >
    <el-col :xs="24" :sm="12" :md="8" :span="6"
      ><el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>当前订单数</span>
        </div>
        <div>
          <span style="color: #666666; font-size: 30px; margin-right: 6px">{{
            dq
          }}</span
          >单
        </div>
      </el-card></el-col
    >
  </el-row>
</template>

<script>
import { TJlist } from '@/api/cd/statistics'
export default {
  data() {
    return {
      lj: '',
      dq: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      TJlist().then((response) => {
        this.lj = response.data.allcs
        this.dq = response.data.csToday
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  margin-bottom: 10px;
}
</style>
