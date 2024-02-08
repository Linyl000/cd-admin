<template>
  <div>
    <el-row style="margin: 20px" :gutter="20">
      <el-col :span="7"
        ><!--<div class="btn">
           <el-button
            type="primary"
            size="mini"
            @click="handleImport1"
            icon="el-icon-download"
            v-hasPermi="['cd:order:importByUser']"
            >导入Token</el-button
          >
        </div> -->
        <!--   accept=".xlsx, .xls" drag   -->
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
        <el-table
          highlight-current-row
          @current-change="handleCurrentChange"
          v-loading="loading"
          :data="orderList"
          @selection-change="handleSelectionChange"
          style="width: 100%"
          height="80vh"
        >
          <el-table-column label="ID" width="80">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="token" label="Token">
            <template slot-scope="scope">
              <div
                v-if="scope.row.tokenOrderCount !== '0'"
                style="color: #67c23a"
              >
                {{ scope.row.token }}
              </div>
              <div v-else>{{ scope.row.token }}</div>
            </template>
          </el-table-column>
        </el-table>
        <!-- <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
          :page-sizes="[50, 100]"
        /> -->
      </el-col>
      <el-col :span="10">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px"
          ><el-alert title="下单配置" type="info" close-text="代付通道：正常">
          </el-alert>
          <el-form-item :show-message="false" label="Token" prop="token">
            {{
              form.token
                ? form.token + '，已下' + tokenOrderCount + '单'
                : '未选择，已下0单'
            }}
          </el-form-item>
          <el-form-item :show-message="false" label="宝贝类型" prop="bblx">
            <el-checkbox-group v-model="form.bblx">
              <el-checkbox label="退货包邮" name="bblx"></el-checkbox>
              <el-checkbox label="刷新黑名单" name="bblx"></el-checkbox>
              <el-checkbox label="7天无理由退货" name="bblx"></el-checkbox>
              <el-checkbox label="屏蔽同省商家" name="bblx"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-row style="display: flex"
            ><el-form-item :show-message="false" label="浏览宝贝" prop="looks1">
              <el-input-number
                v-model="form.looks1"
                :step="1"
                :step-strictly="true"
                :min="1"
                :controls="false"
              ></el-input-number>
            </el-form-item>
            <el-form-item :show-message="false" prop="looks2" label-width="4px">
              -
              <el-input-number
                v-model="form.looks2"
                :step="1"
                :step-strictly="true"
                :min="1"
                :controls="false"
              ></el-input-number>
              秒
            </el-form-item></el-row
          >
          <el-row style="display: flex">
            <el-form-item :show-message="false" label="浏览店铺" prop="lldp1">
              <el-input-number
                v-model="form.lldp1"
                :step="1"
                :step-strictly="true"
                :min="1"
                :controls="false"
              ></el-input-number>
            </el-form-item>
            <el-form-item :show-message="false" prop="lldp2" label-width="4px">
              -
              <el-input-number
                v-model="form.lldp2"
                :step="1"
                :step-strictly="true"
                :min="1"
                :controls="false"
              ></el-input-number>
              秒
            </el-form-item></el-row
          >
          <el-row style="display: flex">
            <el-form-item :show-message="false" label="货比几家" prop="hbNum">
              <el-input-number
                :step="1"
                :step-strictly="true"
                :min="1"
                :controls="false"
                v-model="form.hbNum"
              >
              </el-input-number>
            </el-form-item>
            <el-form-item :show-message="false" prop="hb1" label-width="4px">
              家，间隔
              <el-input-number
                v-model="form.hb1"
                :step="1"
                :step-strictly="true"
                :min="1"
                :controls="false"
              ></el-input-number>
            </el-form-item>
            <el-form-item :show-message="false" prop="hb2" label-width="4px">
              -
              <el-input-number
                v-model="form.hb2"
                :step="1"
                :step-strictly="true"
                :min="1"
                :controls="false"
              ></el-input-number>
              秒
            </el-form-item>
          </el-row>
          <el-form-item :show-message="false" label="销量优先" prop="xlNum">
            <el-input-number
              v-model="form.xlNum"
              :step="1"
              :step-strictly="true"
              :min="1"
              :controls="false"
            ></el-input-number
            >单以上
          </el-form-item>

          <el-row style="display: flex">
            <el-form-item :show-message="false" label="价格区间" prop="jgqjMin">
              <el-input-number
                v-model="form.jgqjMin"
                :step="1"
                :step-strictly="true"
                :min="pmin"
                :max="pmax"
                :controls="false"
              ></el-input-number>
            </el-form-item>
            <el-form-item
              :show-message="false"
              prop="jgqjMax"
              label-width="4px"
            >
              -
              <el-input-number
                v-model="form.jgqjMax"
                :step="1"
                :step-strictly="true"
                :min="pmin"
                :max="pmax"
                :controls="false"
              ></el-input-number>
              元
            </el-form-item></el-row
          >
          <el-alert title="下单方案" type="info" :closable="false"></el-alert>
          <el-form-item :show-message="false" label="下单选择" prop="resource">
            <el-radio-group v-model="form.resource">
              <el-radio label="开团"></el-radio>
              <el-radio label="拼单"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item :show-message="false" label="宝贝类型" prop="bblx2">
            <el-checkbox-group v-model="form.bblx2">
              <el-checkbox label="收藏店铺" name="bblx2"></el-checkbox>
              <el-checkbox label="收藏宝贝" name="bblx2"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item :show-message="false" label="规格分类" prop="ggfl">
            <el-checkbox-group v-model="form.ggfl">
              <el-checkbox label="自动选择" name="ggfl"></el-checkbox>
              <el-checkbox label="随机修改昵称" name="ggfl"></el-checkbox>
              <el-checkbox label="随机收货信息" name="ggfl"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item :show-message="false" label="下单数量" prop="oderNum">
            <el-input-number
              v-model="form.oderNum"
              :step="1"
              :step-strictly="true"
              :min="1"
              :max="2"
              :controls="false"
            ></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :disabled="!form.token || isAutoing"
              @click="manualOrder"
              >手动下单</el-button
            >
            <el-button :disabled="isAutoing" type="primary" @click="AutoOrder"
              >自动下单</el-button
            >
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
// import { listOrder } from '@/api/cd/order'
import {
  SDorder,
  ZDorder,
  listOrder,
  min,
  max,
  getAutoOrderResult
} from '@/api/cd/purchase'
import { getToken } from '@/utils/auth'
import service from '@/utils/request.js'
export default {
  data() {
    return {
      //自动下单中
      isAutoing: false,
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
        pageSize: 50
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
      tokenOrderCount: 0,
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
        xlNum: 500,
        jgqjMin: 1,
        jgqjMax: 100,
        resource: '拼单',
        bblx2: ['收藏店铺', '收藏宝贝'],
        ggfl: ['自动选择', '随机修改昵称', '随机收货信息'],
        oderNum: 2
      },
      rules: {
        token: [{ required: true, message: 'Token不能为空', trigger: 'blur' }],
        bblx: [
          {
            required: true,
            type: 'array',
            min: 1,
            message: '宝贝类型不能为空',
            trigger: 'change'
          }
        ],
        looks1: [
          {
            required: true,
            type: 'number',
            message: '浏览宝贝起始时间不能为空',
            trigger: 'blur'
          },
          { validator: this.validateLooksStartTime, trigger: 'blur' }
        ],
        looks2: [
          {
            required: true,
            type: 'number',
            message: '浏览宝贝结束时间不能为空',
            trigger: 'blur'
          },
          { validator: this.validateLooksEndTime, trigger: 'blur' }
        ],
        lldp1: [
          {
            required: true,
            type: 'number',
            message: '浏览店铺起始时间不能为空',
            trigger: 'blur'
          },
          { validator: this.validateLldpStartTime, trigger: 'blur' }
        ],
        lldp2: [
          {
            required: true,
            type: 'number',
            message: '浏览店铺结束时间不能为空',
            trigger: 'blur'
          },
          { validator: this.validateLldpEndTime, trigger: 'blur' }
        ],
        hbNum: [
          {
            required: true,
            type: 'number',
            message: '货比几家不能为空',
            trigger: 'blur'
          }
        ],
        hb1: [
          {
            required: true,
            type: 'number',
            message: '货比间隔起始时间不能为空',
            trigger: 'blur'
          },
          { validator: this.validateHbStartTime, trigger: 'blur' }
        ],
        hb2: [
          {
            required: true,
            type: 'number',
            message: '货比间隔结束时间不能为空',
            trigger: 'blur'
          },
          { validator: this.validateHbEndTime, trigger: 'blur' }
        ],
        xlNum: [
          {
            required: true,
            type: 'number',
            message: '销量优先不能为空',
            trigger: 'blur'
          }
        ],
        jgqjMin: [
          {
            required: true,
            type: 'number',
            message: '价格区间起始值不能为空',
            trigger: 'blur'
          },
          { validator: this.validateJgqjStartTime, trigger: 'blur' }
        ],
        jgqjMax: [
          {
            required: true,
            type: 'number',
            message: '价格区间结束值不能为空',
            trigger: 'blur'
          },
          { validator: this.validateJgqjEndTime, trigger: 'blur' }
        ],
        resource: [
          { required: true, message: '下单选择不能为空', trigger: 'change' }
        ],
        bblx2: [
          {
            required: true,
            type: 'array',
            min: 1,
            message: '宝贝类型不能为空',
            trigger: 'change'
          }
        ],
        ggfl: [
          {
            required: true,
            type: 'array',
            min: 1,
            message: '规格分类不能为空',
            trigger: 'change'
          }
        ],
        oderNum: [
          {
            required: true,
            type: 'number',
            message: '下单数量不能为空',
            trigger: 'blur'
          }
        ]
      },
      rightList: [],
      rloading: false,
      pmin: 1,
      pmax: 1
    }
  },
  created() {
    this.getList()
    this.min()
    this.max()
    let says = false
    if (localStorage.getItem('autodata') === null) {
      says = false // 不存在就为false
    } else {
      says = localStorage.getItem('autodata') === '0' ? true : false // 存在则根据数值判断
    }
    if (says) {
      this.getAutoOrderResult()
    }
  },
  methods: {
    /** 查询token */
    getList() {
      this.loading = true
      this.orderList = []
      listOrder(this.queryParams).then((response) => {
        this.orderList = response.data
        this.loading = false
      })
    },
    min() {
      min().then((res) => {
        this.pmin = parseInt(res.msg)
        this.$set(this.form, 'jgqjMin', this.pmin)
      })
    },
    max() {
      max().then((res) => {
        this.pmax = parseInt(res.msg)
        this.$set(this.form, 'jgqjMax', this.pmax)
      })
    },
    manualOrder() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.tokenOrderCount === '2') {
            this.$message.error('一个token最多只允许下两个订单！')
            return
          }
          if (this.tokenOrderCount === '1' && this.form.oderNum !== 1) {
            this.$message.error('该token已下过一单，只能再下一个订单！')
            return
          }
          const { token, oderNum, hbNum, jgqjMin, jgqjMax } = this.form
          SDorder({ token, oderNum, hbNum, jgqjMin, jgqjMax }).then(
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
        } else {
          this.$message.error('请认真检查表单参数填写')
        }
      })
    },
    AutoOrder() {
      this.$set(this.form, 'token', '全部token自动下单')
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const { oderNum, hbNum, jgqjMin, jgqjMax } = this.form
          ZDorder({ oderNum, hbNum, jgqjMin, jgqjMax }).then((response) => {
            this.$alert(
              '后台已自动下单，默认跳过失效token，请勿离开页面，离开页面将暂停自动下单！',
              '提示',
              {
                confirmButtonText: '确定',
                showClose: false,
                callback: (action) => {
                  this.getAutoOrderResult()
                }
              }
            )
          })
        } else {
          this.$message.error('请认真检查表单参数填写')
        }
      })
    },
    getAutoOrderResult() {
      getAutoOrderResult()
        .then((res) => {
          this.isAutoing = true
          // localStorage.setItem('autodata', res.isEnd)
          const list = res.msg
          this.rloading = true
          const that = this
          const token = res.token
          const count = res.count
          function addChunk(start, end) {
            if (start < list.length) {
              setTimeout(() => {
                that.rightList.push(...list.slice(start, end))
                that.$nextTick(() => {
                  const container = that.$refs.rightBox
                  container.scrollTop = container.scrollHeight || 0
                  if (end < list.length) {
                    addChunk(end, Math.min(end + 3, list.length))
                  } else {
                    that.rloading = false
                    that.getList()
                    that.$set(that.form, 'token', token)
                    that.tokenOrderCount = count
                    console.log(that.form)
                    if (res.isEnd === '0') {
                      that.getAutoOrderResult()
                      return
                    }
                  }
                })
              }, 2000)
            }
          }
          addChunk(0, Math.min(3, list.length))
        })
        .catch((res) => {
          // localStorage.removeItem('autodata')
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
      this.tokenOrderCount = val.tokenOrderCount
    },
    // 自定义校验函数
    validateLooksStartTime(rule, value, callback) {
      const looksEndTime = this.form.looks2
      if (value > looksEndTime) {
        callback(new Error('浏览宝贝起始时间不能大于结束时间'))
      } else {
        callback()
      }
    },
    validateLooksEndTime(rule, value, callback) {
      const looksStartTime = this.form.looks1
      if (value < looksStartTime) {
        callback(new Error('浏览宝贝结束时间不能小于起始时间'))
      } else {
        callback()
      }
    },
    validateLldpEndTime(rule, value, callback) {
      const lldpStartTime = this.form.lldp1
      if (value < lldpStartTime) {
        callback(new Error('浏览店铺结束时间不能小于起始时间'))
      } else {
        callback()
      }
    },

    validateHbEndTime(rule, value, callback) {
      const hbStartTime = this.form.hb1
      if (value < hbStartTime) {
        callback(new Error('货比间隔结束时间不能小于起始时间'))
      } else {
        callback()
      }
    },

    validateJgqjEndTime(rule, value, callback) {
      const jgqjStartTime = this.form.jgqjMin
      if (value < jgqjStartTime) {
        callback(new Error('价格区间结束值不能小于起始值'))
      } else {
        callback()
      }
    },
    validateJgqjStartTime(rule, value, callback) {
      const jgqjEndTime = this.form.jgqjMax
      if (value > jgqjEndTime) {
        callback(new Error('价格区间起始值不能大于结束值'))
      } else {
        callback()
      }
    },
    validateLldpStartTime(rule, value, callback) {
      const lldpEndTime = this.form.lldp2
      if (value > lldpEndTime) {
        callback(new Error('浏览店铺起始时间不能大于结束时间'))
      } else {
        callback()
      }
    },
    validateHbStartTime(rule, value, callback) {
      const hbEndTime = this.form.hb2
      if (value > hbEndTime) {
        callback(new Error('货比间隔起始时间不能大于结束时间'))
      } else {
        callback()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  margin-bottom: 5px;
}
::v-deep .el-input-number--medium {
  width: 50px;
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
