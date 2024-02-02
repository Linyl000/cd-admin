<template>
  <div>
    <el-row style="margin: 20px">
      <el-col :span="8"
        ><div class="btn">
          <el-button
            type="primary"
            size="mini"
            @click="handleImport1"
            icon="el-icon-download"
            v-hasPermi="['cd:order:importByUser']"
            >导入Token</el-button
          >
          <el-button
            type="warning"
            size="mini"
            @click="handlesubmit1"
            icon="el-icon-download"
            >一键提交</el-button
          >
        </div>
        <el-table
          v-loading="loading"
          :data="orderList"
          @selection-change="handleSelectionChange"
          style="width: 100%"
        >
          <el-table-column label="ID" width="80">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
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
      <el-col :span="16"><settleTable ref="child" /></el-col>
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
import { submit } from '@/api/cd/settlement'
import { getToken } from '@/utils/auth'
import service from '@/utils/request.js'
import settleTable from './settleTable'
export default {
  components: { settleTable },
  data() {
    return {
      // 遮罩层
      loading: true,
      tableData: {},
      orderList: [], // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
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
        url1: service.ip + '/cd/order/importByOrderUser'
      }
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
    handleImport1() {
      this.upload.title = 'Token导入'
      this.upload.open1 = true
    },
    handlesubmit1() {
      submit().then((res) => {
        this.getList()
        this.$refs.child.getList()
      })
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
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  margin-bottom: 5px;
}
</style>
