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
      <el-form-item label="提交时间" prop="createTime">
        <el-date-picker
          clearable
          v-model="queryParams.createTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择提交时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Token" prop="token">
        <el-input v-model="queryParams.token" />
      </el-form-item>
      <el-form-item label="结算状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择结算状态"
          clearable
        >
          <el-option
            v-for="dict in dict.type.cd_order_settlement_status"
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
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['cd:ordersettlement:add']"
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
          v-hasPermi="['cd:ordersettlement:edit']"
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
          v-hasPermi="['cd:ordersettlement:remove']"
          >删除</el-button
        >
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['cd:ordersettlement:export']"
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
      :data="ordersettlementList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="id" align="center" prop="id" />-->
      <el-table-column label="用户id" align="center" prop="userId" />
      <el-table-column
        label="提交时间"
        align="center"
        prop="createTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Token"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleLooks1(scope.row)"
            >查看</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="结算状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.cd_order_settlement_status"
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
            v-hasPermi="['cd:ordersettlement:edit']"
            >修改</el-button
          >
          <!--   <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['cd:ordersettlement:remove']"
            >删除</el-button
          > -->
          <el-button
            size="mini"
            v-if="scope.row.status === '1'"
            type="text"
            @click="handleLooks2(scope.row)"
            >查看</el-button
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
    <!-- 查看token -->
    <el-dialog
      title="Token"
      :visible.sync="showToken"
      width="500px"
      append-to-body
    >
      <el-table :data="tokenList" max-height="550">
        <el-table-column label="Token" align="center" prop="token" />
      </el-table>
    </el-dialog>
    <!-- 查看详情 -->
    <el-dialog
      title="查看"
      :visible.sync="showDetails"
      width="500px"
      append-to-body
      label-width="180px"
    >
      <el-form
        :model="queryParams"
        ref="queryForm"
        size="small"
        v-show="showSearch"
        label-width="68px"
      >
        <el-form-item label=" ">
          <el-button-group>
            <el-button type="primary" plain size="mini"
              >赔付总金额：{{ detailsForm.pfzje }}</el-button
            >
            <el-button type="primary" plain size="mini"
              >风控总额：{{ detailsForm.fkze }}</el-button
            >
            <el-button type="primary" plain size="mini"
              >bx_佣金:{{ detailsForm.bxYj }}</el-button
            >
            <el-button type="primary" plain size="mini"
              >保险已转账:{{ detailsForm.bxyzz }}</el-button
            >
          </el-button-group>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" plain size="mini"
            >订单总数：{{ detailsForm.ddzs }}</el-button
          >
        </el-form-item>
        <el-form-item label=" ">
          <el-button-group>
            <el-button type="primary" plain size="mini"
              >风控订单数：{{ detailsForm.fkdds }}</el-button
            >
            <el-button type="primary" plain size="mini"
              >风控已退款订单数:{{ detailsForm.fkytkdds }}</el-button
            >
            <el-button type="primary" plain size="mini"
              >风控提前订单数:{{ detailsForm.fktqdds }}</el-button
            >
          </el-button-group>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" plain size="mini"
            >提前退款订单数：{{ detailsForm.tqtkdds }}</el-button
          >
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" plain size="mini"
            >可结算订单数：{{ detailsForm.kjsdds }}</el-button
          >
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" plain size="mini"
            >赔付金额：{{ detailsForm.pfje }}</el-button
          >
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" plain size="mini"
            >赔付10块的订单数：{{ detailsForm.pf10 }}</el-button
          >
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" plain size="mini"
            >赔付11块的订单数：{{ detailsForm.pf11 }}</el-button
          >
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" plain size="mini"
            >赔付12块的订单数：{{ detailsForm.pf12 }}</el-button
          >
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" plain size="mini"
            >赔付13块的订单数：{{ detailsForm.pf13 }}</el-button
          >
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" plain size="mini"
            >赔付14块的订单数：{{ detailsForm.pf14 }}</el-button
          >
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" plain size="mini"
            >赔付15块的订单数：{{ detailsForm.pf15 }}</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 添加或修改订单结算对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
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
  listOrdersettlement,
  getOrdersettlement,
  delOrdersettlement,
  addOrdersettlement,
  updateOrdersettlement,
  tokenSettlement
} from '@/api/cd/settlement'

export default {
  name: 'Ordersettlement',
  dicts: ['cd_order_settlement_status'],
  data() {
    return {
      // 遮罩层
      loading: true,
      showToken: false,
      showDetails: false,
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
      // 订单结算表格数据
      ordersettlementList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        token: '',
        pageNum: 1,
        pageSize: 50,
        status: null,
        createTime: null
      },
      // 表单参数
      form: {},
      detailsForm: {},
      // 表单校验
      rules: {},
      tokenList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询订单结算列表 */
    getList() {
      this.loading = true
      listOrdersettlement(this.queryParams).then((response) => {
        this.ordersettlementList = response.rows
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
        userId: null,
        pfzje: null,
        bxYj: null,
        bxyzz: null,
        ddzs: null,
        fkdds: null,
        fkytkdds: null,
        fktqdds: null,
        tqtkdds: null,
        kjsdds: null,
        pf10: null,
        pf11: null,
        pf12: null,
        pf13: null,
        pf14: null,
        pf15: null,
        status: null,
        createTime: null,
        updateTime: null,
        remark: null
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
      this.title = '添加订单结算'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getOrdersettlement(id).then((response) => {
        this.form = response.data
        this.open = true
        this.title = '修改订单结算'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateOrdersettlement(this.form).then((response) => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addOrdersettlement(this.form).then((response) => {
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
        .confirm('是否确认删除订单结算编号为"' + ids + '"的数据项？')
        .then(function () {
          return delOrdersettlement(ids)
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
        'cd/ordersettlement/export',
        {
          ...this.queryParams
        },
        `ordersettlement_${new Date().getTime()}.xlsx`
      )
    },
    //查看token
    handleLooks1(row) {
      tokenSettlement(row.id).then((res) => {
        this.tokenList = res.data
        this.showToken = true
      })
    },
    //查看详情
    handleLooks2(row) {
      getOrdersettlement(row.id).then((response) => {
        this.detailsForm = response.data
        this.showDetails = true
      })
    }
  }
}
</script>
