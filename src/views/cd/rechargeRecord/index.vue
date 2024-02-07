<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="充值地址" prop="usdtRechargeAddress">
        <el-input
          v-model="queryParams.usdtRechargeAddress"
          placeholder="请输入充值地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收款地址" prop="usdtCollectingAddress">
        <el-input
          v-model="queryParams.usdtCollectingAddress"
          placeholder="请输入收款地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="数量" prop="usdtQty">
        <el-input
          v-model="queryParams.usdtQty"
          placeholder="请输入数量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="汇率" prop="rate">
        <el-input
          v-model="queryParams.rate"
          placeholder="请输入汇率"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="代币数量" prop="amountQty">
        <el-input
          v-model="queryParams.amountQty"
          placeholder="请输入代币数量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审核状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择审核状态"
          clearable
        >
          <el-option
            v-for="dict in dict.type.cd_examine_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['cd:rechargeRecord:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['cd:rechargeRecord:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['cd:rechargeRecord:remove']"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['cd:rechargeRecord:export']"
          >导出</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="rechargeRecordList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="id" align="center" prop="id" /> -->
      <el-table-column label="编号" align="center" prop="number" />
      <el-table-column label="用户" align="center" prop="userName" />
      <el-table-column
        label="充值地址"
        align="center"
        prop="usdtRechargeAddress"
      />
      <el-table-column
        label="收款地址"
        align="center"
        prop="usdtCollectingAddress"
      />
      <el-table-column label="数量" align="center" prop="usdtQty" />
      <el-table-column label="汇率" align="center" prop="rate" />
      <el-table-column label="代币数量" align="center" prop="amountQty" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="审核状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.cd_examine_status"
            :value="scope.row.status"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['cd:rechargeRecord:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['cd:rechargeRecord:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
      :page-sizes="[50, 100]"
    />

    <!-- 添加或修改充值记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="充值地址" prop="usdtRechargeAddress">
          <el-input
            v-model="form.usdtRechargeAddress"
            placeholder="请输入充值地址"
          />
        </el-form-item>
        <el-form-item label="收款地址" prop="usdtCollectingAddress">
          <el-input
            v-model="form.usdtCollectingAddress"
            placeholder="请输入收款地址"
          />
        </el-form-item>
        <el-form-item label="数量" prop="usdtQty">
          <el-input v-model="form.usdtQty" placeholder="请输入数量" />
        </el-form-item>
        <el-form-item label="汇率" prop="rate">
          <el-input v-model="form.rate" placeholder="请输入汇率" />
        </el-form-item>
        <el-form-item label="代币数量" prop="amountQty">
          <el-input v-model="form.amountQty" placeholder="请输入代币数量" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="审核状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择审核状态">
            <el-option
              v-for="dict in dict.type.cd_examine_status"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listRechargeRecord,
  getRechargeRecord,
  delRechargeRecord,
  addRechargeRecord,
  updateRechargeRecord
} from '@/api/cd/rechargeRecord'

export default {
  name: 'RechargeRecord',
  dicts: ['cd_examine_status'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 充值记录表格数据
      rechargeRecordList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 50,
        usdtRechargeAddress: null,
        usdtCollectingAddress: null,
        usdtQty: null,
        rate: null,
        amountQty: null,
        status: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        usdtRechargeAddress: [
          { required: true, message: '充值地址不能为空', trigger: 'blur' }
        ],
        usdtCollectingAddress: [
          { required: true, message: '收款地址不能为空', trigger: 'blur' }
        ],
        usdtQty: [{ required: true, message: '数量不能为空', trigger: 'blur' }],
        rate: [{ required: true, message: '汇率不能为空', trigger: 'blur' }],
        amountQty: [
          { required: true, message: '代币数量不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询充值记录列表 */
    getList() {
      this.loading = true
      listRechargeRecord(this.queryParams).then((response) => {
        this.rechargeRecordList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        number: null,
        userId: null,
        userName: null,
        usdtRechargeAddress: null,
        usdtCollectingAddress: null,
        usdtQty: null,
        rate: null,
        amountQty: null,
        remark: null,
        status: null,
        createTime: null,
        createBy: null,
        updateBy: null,
        updateTime: null
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加充值记录'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getRechargeRecord(id).then((response) => {
        this.form = response.data
        this.open = true
        this.title = '修改充值记录'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateRechargeRecord(this.form).then((response) => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addRechargeRecord(this.form).then((response) => {
              this.$modal.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$modal
        .confirm('是否确认删除充值记录编号为"' + ids + '"的数据项？')
        .then(function () {
          return delRechargeRecord(ids)
        })
        .then(() => {
          this.getList()
          this.$modal.msgSuccess('删除成功')
        })
        .catch(() => {})
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        'cd/rechargeRecord/export',
        {
          ...this.queryParams
        },
        `rechargeRecord_${new Date().getTime()}.xlsx`
      )
    }
  }
}
</script>
