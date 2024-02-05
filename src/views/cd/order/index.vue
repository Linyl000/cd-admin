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
      <!-- <el-form-item label="用户id" prop="userId">
          <el-input
            v-model="queryParams.userId"
            placeholder="请输入用户id"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>  -->
      <el-form-item label="token" prop="token">
        <el-input
          v-model="queryParams.token"
          placeholder="请输入token"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="商品名称" prop="tradeName">
        <el-input
          v-model="queryParams.tradeName"
          placeholder="请输入商品名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单价" prop="unitPrice">
        <el-input
          v-model="queryParams.unitPrice"
          placeholder="请输入单价"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手续费" prop="handlingCharge">
        <el-input
          v-model="queryParams.handlingCharge"
          placeholder="请输入手续费"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="交易金额" prop="transactionAmount">
        <el-input
          v-model="queryParams.transactionAmount"
          placeholder="请输入交易金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="预赔付" prop="advancePayment">
        <el-input
          v-model="queryParams.advancePayment"
          placeholder="请输入预赔付"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收货人" prop="deliveryPeople">
        <el-input
          v-model="queryParams.deliveryPeople"
          placeholder="请输入收货人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收货电话" prop="deliveryPhone">
        <el-input
          v-model="queryParams.deliveryPhone"
          placeholder="请输入收货电话"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收货地址" prop="deliveryAddress">
        <el-input
          v-model="queryParams.deliveryAddress"
          placeholder="请输入收货地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="订单状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择订单状态"
          clearable
        >
          <el-option
            v-for="dict in dict.type.cd_order_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="上传状态" prop="upStatus">
        <el-select
          v-model="queryParams.upStatus"
          placeholder="请选择上传状态"
          clearable
        >
          <el-option
            v-for="dict in dict.type.cd_order_upstatus"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="结算状态" prop="settlementStatus">
        <el-select
          v-model="queryParams.settlementStatus"
          placeholder="请选择结算状态"
          clearable
        >
          <el-option
            v-for="dict in dict.type.cd_settlement_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="运单号" prop="waybillNo">
        <el-input
          v-model="queryParams.waybillNo"
          placeholder="请输入运单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
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
          v-hasPermi="['cd:order:add']"
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
          v-hasPermi="['cd:order:edit']"
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
          v-hasPermi="['cd:order:remove']"
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
          v-hasPermi="['cd:order:export']"
          >导出</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          size="mini"
          icon="el-icon-download"
          @click="handleImport2"
          v-hasPermi="['cd:order:importByAdmin']"
          >导入商品信息</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          size="mini"
          icon="el-icon-download"
          @click="handleImport3"
          v-hasPermi="['cd:order:importByAdmin']"
          >导入运单号信息</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-upload
          ref="upload"
          :limit="1"
          :headers="upload.headers"
          :action="upload.url1 + '?updateSupport=' + upload.updateSupport"
          :disabled="upload.isUploading"
          :on-progress="handleFileUploadProgress"
          :on-success="handleFileSuccess"
          :auto-upload="true"
        >
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-download"
            v-hasPermi="['cd:order:importByUser']"
            >导入Token</el-button
          >
        </el-upload>
      </el-col>

      <el-col :span="1.5">
        <el-button
          type="warning"
          size="mini"
          @click="handleDeleteAndMoney"
          :loading="deleteAndMoneyLoading"
          >一键退货退款</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          size="mini"
          @click="handleUps"
          :loading="upsLoading"
          >一键上传</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" size="mini">解除代收发</el-button>
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="orderList"
      @selection-change="handleSelectionChange"
    >
      <!--  <el-table-column type="selection" width="55" align="center" />
     <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="用户id" align="center" prop="userId" /> -->
      <el-table-column
        label="token值"
        align="center"
        prop="token"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="商品名称"
        align="center"
        prop="tradeName"
        :show-overflow-tooltip="true"
      />

      <el-table-column label="单价" align="center" prop="unitPrice" />
      <el-table-column label="手续费" align="center" prop="handlingCharge" />
      <el-table-column
        label="交易金额"
        align="center"
        prop="transactionAmount"
      />
      <el-table-column label="预赔付" align="center" prop="advancePayment" />

      <el-table-column
        label="收货地址"
        align="center"
        prop="status"
        width="200"
      >
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="scope.row.deliveryAddress"
            placement="top"
          >
            <el-button size="mini" type="primary" plain
              >{{ scope.row.deliveryPeople }}/{{
                scope.row.deliveryPhone
              }}</el-button
            >
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="orderTime" />
      <el-table-column label="订单状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.cd_order_status"
            :value="scope.row.status"
          />
        </template>
      </el-table-column>
      <el-table-column label="上传状态" align="center" prop="upStatus">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.cd_order_upstatus"
            :value="scope.row.upStatus"
          />
        </template>
      </el-table-column>
      <el-table-column label="结算状态" align="center" prop="settlementStatus">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.cd_settlement_status"
            :value="scope.row.settlementStatus"
          />
        </template>
      </el-table-column>
      <!-- <el-table-column label="备注" align="center" prop="remark" /> -->
      <!-- <el-table-column label="运单号" align="center" prop="waybillNo" /> -->
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="
              lookDH = true
              dhData = scope.row.waybillNo
            "
            >查看物流</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['cd:order:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['cd:order:remove']"
            >删除</el-button
          >
          <div v-if="showRemark">
            <el-tag type="warning">{{ scope.row.remark }}</el-tag>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <el-dialog
      title="查看订单物流"
      :visible.sync="lookDH"
      width="500px"
      append-to-body
    >
      <el-form ref="form" label-width="80px">
        <el-form-item label="订单号" prop="token">
          <div>{{ dhData }}</div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 添加或修改商品订单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="token" prop="token">
          <el-input v-model="form.token" placeholder="请输入商品token" />
        </el-form-item>
        <el-form-item label="商品名称" prop="tradeName">
          <el-input v-model="form.tradeName" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="单价" prop="unitPrice">
          <el-input v-model="form.unitPrice" placeholder="请输入单价" />
        </el-form-item>
        <el-form-item label="手续费" prop="handlingCharge">
          <el-input v-model="form.handlingCharge" placeholder="请输入手续费" />
        </el-form-item>
        <el-form-item label="交易金额" prop="transactionAmount">
          <el-input
            v-model="form.transactionAmount"
            placeholder="请输入交易金额"
          />
        </el-form-item>
        <el-form-item label="预赔付" prop="advancePayment">
          <el-input v-model="form.advancePayment" placeholder="请输入预赔付" />
        </el-form-item>
        <el-form-item label="收货人" prop="deliveryPeople">
          <el-input v-model="form.deliveryPeople" placeholder="请输入收货人" />
        </el-form-item>
        <el-form-item label="收货电话" prop="deliveryPhone">
          <el-input v-model="form.deliveryPhone" placeholder="请输入收货电话" />
        </el-form-item>
        <el-form-item label="收货地址" prop="deliveryAddress">
          <el-input
            v-model="form.deliveryAddress"
            placeholder="请输入收货地址"
          />
        </el-form-item>
        <el-form-item label="订单状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择订单状态">
            <el-option
              v-for="dict in dict.type.cd_order_status"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传状态" prop="upStatus">
          <el-select v-model="form.upStatus" placeholder="请选择上传状态">
            <el-option
              v-for="dict in dict.type.cd_order_upstatus"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结算状态" prop="settlementStatus">
          <el-select
            v-model="form.settlementStatus"
            placeholder="请选择结算状态"
          >
            <el-option
              v-for="dict in dict.type.cd_settlement_status"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运单号" prop="waybillNo">
          <el-input v-model="form.waybillNo" placeholder="请输入运单号" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
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
    <!-- 商品导入对话框 -->
    <el-dialog
      :title="upload.title"
      :visible.sync="upload.open2"
      width="400px"
      append-to-body
    >
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url2 + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess2"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <div class="el-upload__tip" slot="tip">
            <el-checkbox v-model="upload.updateSupport" />
            是否更新已经存在的数据
          </div>
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
        <el-button @click="upload.open2 = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 运单号导入对话框 -->
    <el-dialog
      :title="upload.title"
      :visible.sync="upload.open3"
      width="400px"
      append-to-body
    >
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url3 + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess2"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <div class="el-upload__tip" slot="tip">
            <el-checkbox v-model="upload.updateSupport" />
            是否更新已经存在的数据
          </div>
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
        <el-button @click="upload.open2 = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 导入进度 -->
    <el-dialog
      :title="isPress ? '导入进度' : '导入结果'"
      :visible.sync="showPress"
      width="800px"
      append-to-body
      :close-on-click-modal="!isPress"
      :close-on-press-escape="!isPress"
      :show-close="!isPress"
    >
      <el-progress
        v-if="isPress"
        :text-inside="true"
        :stroke-width="26"
        :percentage="counter"
      ></el-progress>
      <div v-else>{{ counter }}</div>
      <div slot="footer" class="dialog-footer" v-if="!isPress">
        <el-button
          type="primary"
          @click="
            showPress = false
            getList
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listOrder,
  getOrder,
  delOrder,
  returnsOrder,
  upsOrder,
  addOrder,
  updateOrder,
  importResult
} from '@/api/cd/order'
import { getToken } from '@/utils/auth'
import service from '@/utils/request.js'

export default {
  name: 'Order',
  dicts: ['cd_order_status', 'cd_settlement_status', 'cd_order_upstatus'],
  data() {
    return {
      showRemark: false,
      lookDH: false,
      dhData: '',
      timer: null,
      isPress: true,
      counter: 0,
      showPress: false,
      //
      deleteAndMoneyLoading: false,
      upsLoading: false,
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
      // 商品订单表格数据
      orderList: [],
      idList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open1: false,
        open2: false,
        open3: false,
        // 弹出层标题（用户导入）
        title: '',
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 1,
        // 设置上传的请求头部
        headers: { Authorization: 'Bearer ' + getToken() },
        // 上传的地址
        url1: service.ip + '/cd/order/importDataByUser',
        url2: service.ip + '/cd/order/importDataByAdmin',
        url3: service.ip + '/cd/order/importByAdminToBillNo'
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        token: null,
        tradeName: null,
        unitPrice: null,
        handlingCharge: null,
        transactionAmount: null,
        advancePayment: null,
        deliveryPeople: null,
        deliveryPhone: null,
        deliveryAddress: null,
        status: null,
        upStatus: null,
        settlementStatus: null,
        waybillNo: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询商品订单列表 */
    getList() {
      this.loading = true
      listOrder(this.queryParams).then((response) => {
        this.orderList = response.rows
        this.idList = this.orderList.map((item) => item.id)
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
        token: null,
        tradeName: null,
        unitPrice: null,
        handlingCharge: null,
        transactionAmount: null,
        advancePayment: null,
        deliveryPeople: null,
        deliveryPhone: null,
        deliveryAddress: null,
        status: null,
        upStatus: null,
        settlementStatus: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        waybillNo: null
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
      this.title = '添加商品订单'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getOrder(id).then((response) => {
        this.form = response.data
        this.open = true
        this.title = '修改商品订单'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateOrder(this.form).then((response) => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addOrder(this.form).then((response) => {
              this.$modal.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 一键退货退款按钮操作 */
    handleDeleteAndMoney(row) {
      // const ids = row.id || this.ids
      this.$modal
        .confirm('是否确认一键退货退款？')
        .then(() => {
          this.deleteAndMoneyLoading = true
          return returnsOrder(this.idList)
        })
        .then(() => {
          this.deleteAndMoneyLoading = false
          this.showRemark = true
          this.getList()
          this.$modal.msgSuccess('一键退货退款成功')
        })
        .catch(() => {
          this.deleteAndMoneyLoading = false
        })
    },
    /** 一键上传按钮操作 */
    handleUps(row) {
      // const ids = row.id || this.ids
      this.$modal
        .confirm('是否确认一键上传？')
        .then(() => {
          this.upsLoading = true
          return upsOrder(this.idList)
        })
        .then(() => {
          this.upsLoading = false
          this.showRemark = true
          this.getList()
          this.$modal.msgSuccess('一键上传成功')
        })
        .catch(() => {
          this.upsLoading = false
        })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$modal
        .confirm('是否确认删除商品订单编号为"' + ids + '"的数据项？')
        .then(function () {
          return delOrder(ids)
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
        'cd/order/export',
        {
          ...this.queryParams
        },
        `order_${new Date().getTime()}.xlsx`
      )
    },
    /** 导入按钮操作 */
    handleImport1() {
      this.upload.title = 'Token导入'
      this.upload.open1 = true
    },
    handleImport2() {
      this.upload.title = '商品导入'
      this.upload.open2 = true
    },
    handleImport3() {
      this.upload.title = '运单号导入'
      this.upload.open3 = true
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download(
        'cd/order/importTemplate',
        {},
        `表_${new Date().getTime()}.xlsx`
      )
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
    // 文件上传成功处理2
    handleFileSuccess2(response, file, fileList) {
      this.upload.open1 = false
      this.upload.open2 = false
      this.upload.open3 = false
      this.upload.isUploading = false
      this.$refs.upload.clearFiles()
      this.startTimer(response.msg)
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit()
    },
    //开始定时器+清除定时器
    startTimer(code) {
      this.counter = 0
      this.isPress = true
      this.showPress = true
      this.timer = setInterval(() => {
        importResult(code)
          .then((res) => {
            this.counter = parseInt(res.jd)
            if (res.msg && res.jd) {
              this.isPress = false
              this.counter = res.msg
              clearInterval(this.timer)
            }
          })
          .catch((response) => {
            console.log('bug')
            this.showPress = false
            this.$message.error('导入失败！')
            clearInterval(this.timer)
          })
      }, 1000)
    }
  }
}
</script>
