<template>
  <el-row :gutter="20" style="margin: 20px">
    <el-col :xs="24" :sm="12" :md="8" :span="6"
      ><el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>累计订单数</span>
        </div>
        <div>
          <span style="color: #666666; font-size: 30px; margin-right: 6px"
            >2222</span
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
          <span style="color: #666666; font-size: 30px; margin-right: 6px"
            >2222</span
          >单
        </div>
      </el-card></el-col
    >
  </el-row>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.box-card {
  margin-bottom: 10px;
}
</style>
