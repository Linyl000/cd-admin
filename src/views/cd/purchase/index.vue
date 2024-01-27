<template>
  <div>
    <el-row style="margin: 20px" :gutter="20">
      <el-col :span="7"
        ><div class="btn">
          <el-button
            type="primary"
            size="mini"
            @click="handleImport1"
            icon="el-icon-download"
            v-hasPermi="['cd:order:importByUser']"
            >导入Token</el-button
          >
        </div>
        <el-table
          highlight-current-row
          @current-change="handleCurrentChange"
          v-loading="loading"
          :data="orderList"
          @selection-change="handleSelectionChange"
          style="width: 100%"
        >
          <el-table-column prop="id" label="ID" width="80"> </el-table-column>
          <el-table-column prop="token" label="Token"> </el-table-column>
        </el-table>
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </el-col>
      <el-col :span="10">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px"
          ><el-alert title="下单配置" type="info" close-text="代付通道：正常">
          </el-alert>
          <el-form-item label="Token" prop="token">
            {{ form.token ? form.token : '未选择，已下0单' }}
          </el-form-item>
          <el-form-item label="宝贝类型" prop="bblx">
            <el-checkbox-group v-model="form.bblx">
              <el-checkbox label="退货包邮" name="bblx"></el-checkbox>
              <el-checkbox label="刷新黑名单" name="bblx"></el-checkbox>
              <el-checkbox label="7天无理由退货" name="bblx"></el-checkbox>
              <el-checkbox label="屏蔽同省商家" name="bblx"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="浏览宝贝" prop="looks">
            <el-input v-model="form.looks1" /> -
            <el-input v-model="form.looks2" /> 秒
          </el-form-item>
          <el-form-item label="浏览店铺" prop="lldp">
            <el-input v-model="form.lldp1" /> -
            <el-input v-model="form.llpd2" /> 秒
          </el-form-item>
          <el-form-item label="货比几家" prop="hb">
            <el-input v-model="form.hbNum" /> 家，间隔
            <el-input v-model="form.hb1" /> - <el-input v-model="form.hb2" /> 秒
          </el-form-item>
          <el-form-item label="销量优先" prop="xl">
            <el-input v-model="form.xlNum" /> 单以上
          </el-form-item>
          <el-form-item label="价格区间" prop="jgqj">
            <el-input v-model="form.jgqj1" /> -
            <el-input v-model="form.jgqj2" /> 元
          </el-form-item>

          <el-alert title="下单方案" type="info" :closable="false"></el-alert>
          <el-form-item label="下单选择" prop="resource">
            <el-radio-group v-model="form.resource">
              <el-radio label="开团"></el-radio>
              <el-radio label="拼单"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="宝贝类型" prop="bblx2">
            <el-checkbox-group v-model="form.bblx2">
              <el-checkbox label="收藏店铺" name="bblx2"></el-checkbox>
              <el-checkbox label="收藏宝贝" name="bblx2"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="规格分类" prop="ggfl">
            <el-checkbox-group v-model="form.ggfl">
              <el-checkbox label="自动选择" name="ggfl"></el-checkbox>
              <el-checkbox label="随机修改昵称" name="ggfl"></el-checkbox>
              <el-checkbox label="随机收货信息" name="ggfl"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="下单数量" prop="oderNum">
            <el-input v-model="form.oderNum" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :disabled="!form.token"
              @click="manualOrder"
              >手动下单</el-button
            >
            <el-button type="primary" @click="AutoOrder">自动下单</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="7"
        ><el-alert title="运行日志" type="info" :closable="false"> </el-alert>
        <div class="right-box" ref="rightBox">
          <div v-if="!rloading && !rightList.length" class="items">
            暂无数据
          </div>
          <div v-else v-for="i in rightList" class="items" :key="i">
            {{ i }}
          </div>
          <div v-if="rloading" class="items">
            <i class="el-icon-loading"></i>操作中...
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- token导入对话框 -->
    <el-dialog
      :title="upload.title"
      :visible.sync="upload.open1"
      width="400px"
      append-to-body
    >
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url1 + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <!-- <div class="el-upload__tip" slot="tip">
            <el-checkbox v-model="upload.updateSupport" />
            是否更新已经存在的数据
          </div> -->
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link
            type="primary"
            :underline="false"
            style="font-size: 12px; vertical-align: baseline"
            @click="importTemplate"
            >下载模板</el-link
          >
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open1 = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listOrder } from '@/api/cd/order'
import { SDorder, ZDorder } from '@/api/cd/purchase'
import { getToken } from '@/utils/auth'
import service from '@/utils/request.js'
export default {
  data() {
    return {
      currentRow: null,
      // 遮罩层
      loading: true, // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      orderList: [],
      // 总条数
      total: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open1: false,
        open2: false,
        // 弹出层标题（用户导入）
        title: '',
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 1,
        // 设置上传的请求头部
        headers: { Authorization: 'Bearer ' + getToken() },
        // 上传的地址
        url1: service.ip + '/cd/order/importByOrderUser',
        url2: service.ip + '/cd/order/importDataByAdmin'
      },
      form: {
        token: '',
        bblx: ['退货包邮', '刷新黑名单', '7天无理由退货', '屏蔽同省商家'],
        looks1: 1,
        looks2: 5,
        lldp1: 1,
        lldp2: 5,
        hbNum: 5,
        hb1: 1,
        hb2: 5,
        xlNum: 5,
        jgqj1: 1,
        jgqj2: 100,
        resource: '开团',
        bblx2: ['收藏店铺', '收藏宝贝'],
        ggfl: ['自动选择', '随机修改昵称', '随机收货信息'],
        oderNum: 5
      },
      rules: {},
      rightList: [],
      rloading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询token */
    getList() {
      this.loading = true
      listOrder(this.queryParams).then((response) => {
        this.orderList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    manualOrder() {
      if (!this.form.oderNum) {
        this.$message({
          showClose: true,
          message: '请填写下单数量',
          type: 'error'
        })
        return
      }
      if (!this.form.hbNum) {
        this.$message({
          showClose: true,
          message: '请填写货比几家数量',
          type: 'error'
        })
        return
      }
      SDorder(this.form.token, this.form.oderNum, this.form.hbNum).then(
        (response) => {
          const list = response.data
          this.rloading = true
          const that = this

          function addChunk(start, end) {
            if (start < list.length) {
              setTimeout(() => {
                that.rightList.push(...list.slice(start, end))
                that.$nextTick(() => {
                  const container = that.$refs.rightBox
                  container.scrollTop = container.scrollHeight
                  if (end < list.length) {
                    addChunk(end, Math.min(end + 3, list.length))
                  } else {
                    that.rloading = false
                  }
                })
              }, 2000)
            }
          }

          addChunk(0, Math.min(3, list.length))
        }
      )
    },
    AutoOrder() {
      if (!this.form.oderNum) {
        this.$message({
          showClose: true,
          message: '请填写下单数量',
          type: 'error'
        })
        return
      }
      if (!this.form.hbNum) {
        this.$message({
          showClose: true,
          message: '请填写货比几家数量',
          type: 'error'
        })
        return
      }
      ZDorder(this.form.oderNum, this.form.hbNum).then((response) => {
        const list = response.data
        this.rloading = true
        const that = this

        function addChunk(start, end) {
          if (start < list.length) {
            setTimeout(() => {
              that.rightList.push(...list.slice(start, end))
              that.$nextTick(() => {
                const container = that.$refs.rightBox
                container.scrollTop = container.scrollHeight
                if (end < list.length) {
                  addChunk(end, Math.min(end + 3, list.length))
                } else {
                  that.rloading = false
                }
              })
            }, 2000)
          }
        }

        addChunk(0, Math.min(3, list.length))
      })
    },
    handleImport1() {
      this.upload.title = 'Token导入'
      this.upload.open1 = true
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download(
        'cd/order/importTemplate',
        {},
        `表_${new Date().getTime()}.xlsx`
      )
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open1 = false
      this.upload.open2 = false
      this.upload.isUploading = false
      this.$refs.upload.clearFiles()
      this.$alert(
        "<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" +
          response.msg +
          '</div>',
        '导入结果',
        { dangerouslyUseHTMLString: true }
      )
      this.getList()
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit()
    },
    handleCurrentChange(val) {
      this.currentRow = val
      this.$set(this.form, 'token', val.token)
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  margin-bottom: 5px;
}
::v-deep .el-input {
  width: 40px;
  text-align: center;
}
::v-deep .el-input__inner {
  padding: 0 !important;
}
.items {
  width: auto;
  word-break: break-all;
  margin: 8px 4px;
  color: #666;
}
.right-box {
  overflow-y: auto;
  height: 80vh;
}
/* 自定义滚动条样式 */
.right-box::-webkit-scrollbar {
  width: 5px;
}

.right-box::-webkit-scrollbar-track {
  background-color: #ccc; /* 滚动条背景色 */
}

.right-box::-webkit-scrollbar-thumb {
  background-color: #999; /* 滚动条滑块颜色 */
}
</style>
