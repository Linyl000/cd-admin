<template>
  <div class="app-container">
    <el-card style="height: calc(100vh - 130px)">
      <h3 style="font-weight: 700">用户基本信息</h3>
      <el-row :gutter="0" class="user-box-one">
        <el-col :span="5"><div class="say-left content">用户名</div></el-col>
        <el-col :span="11"
          ><div class="content">{{ user.userName }}</div></el-col
        >
        <el-col :span="8">
          <el-button
            @click="showChangeLoginMima = true"
            type="primary"
            plain
            icon="el-icon-edit"
            size="mini"
            >修改登录密码</el-button
          >
        </el-col>
      </el-row>
      <el-row :gutter="0" class="user-box-one">
        <el-col :span="5"><div class="say-left content">交易密码</div></el-col>
        <el-col :span="11"><div class="content">******</div></el-col>
        <el-col :span="8">
          <el-button
            @click="showChangeJyMima = true"
            type="primary"
            plain
            icon="el-icon-edit"
            size="mini"
            >修改交易密码</el-button
          >
        </el-col>
      </el-row>
      <el-row :gutter="0" class="user-box-one">
        <el-col :span="5"><div class="say-left content">邮箱</div></el-col>
        <el-col :span="11"
          ><div class="content">
            {{ user.email ? user.email : '-' }}
          </div></el-col
        >
        <el-col :span="8">
          <el-button
            @click="showChangeEmail = true"
            type="primary"
            plain
            icon="el-icon-edit"
            size="mini"
            >绑定邮箱</el-button
          >
        </el-col>
      </el-row>
      <el-row :gutter="0" class="user-box-one">
        <el-col :span="5"><div class="say-left content">钱包地址</div></el-col>
        <el-col :span="11"
          ><div class="content">
            {{ user.walletAddress ? user.walletAddress : '-' }}
          </div></el-col
        >
        <el-col :span="8">
          <el-button
            @click="showChangeWallet = true"
            type="primary"
            plain
            icon="el-icon-wallet"
            size="mini"
            >绑定钱包地址</el-button
          >
        </el-col>
      </el-row>
      <el-row :gutter="0" class="user-box-one">
        <el-col :span="5"><div class="say-left content">代币</div></el-col>
        <el-col :span="11"
          ><div class="content">
            {{ user.amount ? user.amount : '-' }}
          </div></el-col
        >
        <el-col :span="8">
          <el-button-group>
            <el-button
              @click="showInMoney = true"
              type="primary"
              plain
              icon="el-icon-postcard"
              size="mini"
              >充值</el-button
            >
            <el-button
              @click="showOutMoney = true"
              type="primary"
              plain
              icon="el-icon-money"
              size="mini"
              >提现</el-button
            >
            <el-button
              @click="showGiveMoney = true"
              type="primary"
              plain
              icon="el-icon-sort"
              size="mini"
              >转账</el-button
            >
          </el-button-group>
        </el-col>
      </el-row>
      <el-row :gutter="0" class="user-box-one">
        <el-col :span="5"><div class="say-left content">到期时间</div></el-col>
        <el-col :span="11"
          ><div class="content">
            {{ user.expireTime ? user.expireTime : '-' }}
          </div></el-col
        >
        <el-col :span="8">
          <el-button
            @click="showRenew = true"
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            >续费</el-button
          >
        </el-col>
      </el-row>
      <el-row :gutter="0" class="user-box-one">
        <el-col :span="5"><div class="say-left content">自动下单</div></el-col>
        <el-col :span="11"
          ><div class="content">
            {{ user.autoTime ? user.autoTime : '-' }}
          </div></el-col
        >
        <el-col :span="8">
          <el-button
            @click="showAutomatic = true"
            type="primary"
            plain
            icon="el-icon-edit"
            size="mini"
            >申请自动下单</el-button
          >
        </el-col>
      </el-row>
    </el-card>
    <!-- 1 -->
    <el-dialog
      title="修改登录密码"
      :visible.sync="showChangeLoginMima"
      width="600px"
      append-to-body
    >
      <resetPwd :userName="userName" :ok="true" ref="child" />
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm1">确 定</el-button>
        <el-button @click="showChangeLoginMima = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 2 -->
    <el-dialog
      title="修改交易密码"
      :visible.sync="showChangeJyMima"
      width="600px"
      append-to-body
      :close-on-click-modal="!needSet"
      :close-on-press-escape="!needSet"
      :show-close="!needSet"
    >
      <resetJyPwd v-if="!needSet" ref="child2" />
      <el-form
        v-else
        ref="form2"
        :model="form2"
        :rules="rules2"
        label-width="160px"
      >
        <el-form-item label="设置交易密码" prop="newTransactionCode">
          <el-input v-model="form2.newTransactionCode" placeholder="" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm2">确 定</el-button>
        <el-button v-if="!needSet" @click="showChangeJyMima = false"
          >取 消</el-button
        >
      </div>
    </el-dialog>
    <!-- 3 -->
    <el-dialog
      title="绑定邮箱"
      :visible.sync="showChangeEmail"
      width="600px"
      append-to-body
    >
      <el-form ref="form3" :model="form3" :rules="rules3" label-width="80px">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form3.email" placeholder="" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm3">确 定</el-button>
        <el-button
          @click="
            showChangeEmail = false
            form3 = {}
          "
          >取 消</el-button
        >
      </div>
    </el-dialog>
    <!-- 4 -->
    <el-dialog
      title="绑定钱包地址"
      :visible.sync="showChangeWallet"
      width="600px"
      append-to-body
    >
      <el-form ref="form4" :model="form4" :rules="rules4" label-width="160px">
        <el-form-item label="BSC链USDT钱包地址" prop="walletAddress">
          <el-input v-model="form4.walletAddress" placeholder="" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm4">确 定</el-button>
        <el-button
          @click="
            showChangeWallet = false
            form4 = {}
          "
          >取 消</el-button
        >
      </div>
    </el-dialog>
    <!-- 5 -->
    <el-dialog
      title="充值"
      :visible.sync="showInMoney"
      width="600px"
      append-to-body
    >
      <el-form ref="form5" :model="form5" :rules="rules5" label-width="80px">
        <el-alert
          title="温馨提示：客户充值金额建议不要整数充值，为保证系统尽快确认到账，请确认转出后点击已充值。 充值地址请以当前地址为准，如转错地址导致货币丢失，责任自负。"
          type="error"
          :closable="false"
        >
        </el-alert>
        <el-row>
          <el-col :span="12">
            <el-form-item label="收款地址">
              <div>{{ walletaddress }}</div>
            </el-form-item>
            <el-form-item label="充值数量" prop="num">
              <el-input-number
                v-model="form5.num"
                :min="1"
                :step="1"
                :step-strictly="true"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="当前汇率">
              <div>{{ exchangerate }}</div>
            </el-form-item>
            <el-form-item label="预估到账">
              <div>{{ parseFloat((form5.num * exchangerate).toFixed(2)) }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12"
            ><div class="erweima">
              <img
                :src="walletqr"
                style="
                  max-width: 100%;
                  height: auto;
                  display: block;
                  margin: 0 auto;
                "
              /></div
          ></el-col>
        </el-row>
      </el-form>
      <el-alert
        title="例如：充值数量1000U输入1000.03，输入金额和转账金额一致，转账进行充值，修改到账金额不予到账！"
        type="info"
        :closable="false"
      ></el-alert>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm5">确 定</el-button>
        <el-button
          @click="
            showInMoney = false
            form5 = { num: 1 }
          "
          >取 消</el-button
        >
      </div>
    </el-dialog>
    <!-- 6 -->
    <el-dialog
      title="提现"
      :visible.sync="showOutMoney"
      width="600px"
      append-to-body
    >
      <el-form ref="form6" :model="form6" :rules="rules6" label-width="80px">
        <el-form-item label="提币地址">
          <div>{{ user.walletAddress }}</div>
        </el-form-item>
        <el-form-item label="代币数量" prop="num">
          <el-input-number
            v-model="form6.num"
            :min="1"
            :step="1"
            :step-strictly="true"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="汇率">
          <div>{{ withdrawalrate }}</div>
        </el-form-item>
        <el-form-item label="预估到账">
          <div>{{ parseFloat((form6.num / withdrawalrate).toFixed(2)) }}</div>
        </el-form-item>
        <el-form-item label="交易密码" prop="transactionCode">
          <el-input v-model="form6.transactionCode" placeholder="" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm6">确 定</el-button>
        <el-button
          @click="
            showOutMoney = false
            form6 = { num: 1 }
          "
          >取 消</el-button
        >
      </div>
    </el-dialog>
    <!-- 7 -->
    <el-dialog
      title="转账"
      :visible.sync="showGiveMoney"
      width="600px"
      append-to-body
    >
      <el-form ref="form7" :model="form7" :rules="rules7" label-width="80px">
        <el-form-item label="对方账号" prop="username">
          <el-input v-model="form7.username" placeholder="" />
        </el-form-item>
        <el-form-item label="数量" prop="num">
          <el-input-number
            v-model="form7.num"
            :min="1"
            :step="1"
            :step-strictly="true"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="交易密码" prop="transactionCode">
          <el-input v-model="form7.transactionCode" placeholder="" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm7">确 定</el-button>
        <el-button
          @click="
            showGiveMoney = false
            form7 = { num: 1 }
          "
          >取 消</el-button
        >
      </div>
    </el-dialog>
    <!-- 8 -->
    <el-dialog
      title="账号续费"
      :visible.sync="showRenew"
      width="600px"
      append-to-body
    >
      <el-form ref="form8" :model="form8" :rules="rules8" label-width="80px">
        <el-form-item label="续费价格">
          <div>{{ renewalfee }}</div>
        </el-form-item>
        <el-form-item label="交易密码" prop="transactionCode">
          <el-input v-model="form8.transactionCode" placeholder="" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm8">确 定</el-button>
        <el-button
          @click="
            showRenew = false
            form8 = {}
          "
          >取 消</el-button
        >
      </div>
    </el-dialog>
    <!-- 9 -->
    <el-dialog
      title="申请开通自动下单"
      :visible.sync="showAutomatic"
      width="600px"
      append-to-body
    >
      <el-form ref="form9" :model="form9" :rules="rules9" label-width="160px">
        <el-form-item label="开通自动下单价格">
          <div>{{ autoorderprice }}</div>
        </el-form-item>
        <el-form-item label="交易密码" prop="transactionCode">
          <el-input v-model="form9.transactionCode" placeholder="" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm9">确 定</el-button>
        <el-button
          @click="
            showAutomatic = false
            form9 = {}
          "
          >取 消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import userAvatar from './userAvatar'
import userInfo from './userInfo'
import resetPwd from './resetPwd'
import resetJyPwd from './resetJyPwd'
import {
  getUserProfile,
  updateUserProfile,
  setTtc,
  exchangeRate,
  renewalFee,
  renew,
  autoOrderPrice,
  autoOrderRecharge,
  walletAddress,
  walletQR,
  withdrawalRate,
  amountWithdraw,
  amountRecharge,
  amountTransfer
} from '@/api/system/user'

export default {
  name: 'Profile',
  components: { userAvatar, userInfo, resetPwd, resetJyPwd },
  data() {
    return {
      user: {},
      userName: '',
      roleGroup: {},
      postGroup: {},
      activeTab: 'userinfo',
      showChangeLoginMima: false,
      showChangeJyMima: false,
      showChangeEmail: false,
      showChangeWallet: false,
      showInMoney: false,
      showOutMoney: false,
      showGiveMoney: false,
      showRenew: false,
      showAutomatic: false,
      needSet: false,
      form2: {},
      rules2: {
        newTransactionCode: [
          { required: true, message: '交易密码不能为空', trigger: 'blur' }
        ]
      },
      form3: {},
      rules3: {
        email: [
          {
            type: 'email',
            required: true,
            message: 'email不能为空',
            trigger: 'blur'
          }
        ]
      },
      form4: {},
      rules4: {
        walletAddress: [
          { required: true, message: '钱包地址不能为空', trigger: 'blur' }
        ]
      },
      form5: { num: 1 },
      rules5: {
        num: [{ required: true, message: '充值数量不能为空', trigger: 'blur' }]
      },
      form6: { num: 1 },
      rules6: {
        num: [{ required: true, message: '代币数量不能为空', trigger: 'blur' }],
        transactionCode: [
          { required: true, message: '交易密码不能为空', trigger: 'blur' }
        ]
      },
      form7: { num: 1 },
      rules7: {
        username: [
          { required: true, message: '对方账号不能为空', trigger: 'blur' }
        ],
        num: [{ required: true, message: '数量不能为空', trigger: 'blur' }],
        transactionCode: [
          { required: true, message: '交易密码不能为空', trigger: 'blur' }
        ]
      },
      form8: {},
      rules8: {
        transactionCode: [
          { required: true, message: '交易密码不能为空', trigger: 'blur' }
        ]
      },
      form9: {},
      rules9: {
        transactionCode: [
          { required: true, message: '交易密码不能为空', trigger: 'blur' }
        ]
      },
      autoorderprice: '',
      renewalfee: '',
      withdrawalrate: '',
      exchangerate: '',
      walletaddress: '',
      walletqr: ''
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      getUserProfile().then((response) => {
        this.user = response.data
        console.log(this.user)
        if (!this.user.transactionCode) {
          this.needSet = true
          this.showChangeJyMima = true
        }
        this.userName = this.user.userName
        this.roleGroup = response.roleGroup
        this.postGroup = response.postGroup
      })
      exchangeRate().then((res) => {
        this.exchangerate = res.msg
      })
      renewalFee().then((res) => {
        this.renewalfee = res.msg
      })
      autoOrderPrice().then((res) => {
        this.autoorderprice = res.msg
      })
      walletAddress().then((res) => {
        this.walletaddress = res.msg
      })
      walletQR().then((res) => {
        this.walletqr = res.msg
      })
      withdrawalRate().then((res) => {
        this.withdrawalrate = res.msg
      })
    },
    submitForm1() {
      this.$refs.child.submit()
    },
    submitForm2() {
      if (this.needSet) {
        setTtc(this.form2).then((response) => {
          this.$modal.msgSuccess('设置交易密码成功')
          this.showChangeJyMima = false
          this.needSet = false
        })
      } else {
        this.$refs.child2.submit()
      }
    },
    submitForm3() {
      this.$refs['form3'].validate((valid) => {
        if (valid) {
          updateUserProfile(this.form3).then((response) => {
            this.$modal.msgSuccess('修改成功')
            // this.$set(this.user, 'email', this.form3.email)
            this.getUser()
            this.form3 = {}
          })
          this.showChangeEmail = false
        }
      })
    },
    submitForm4() {
      this.$refs['form4'].validate((valid) => {
        if (valid) {
          updateUserProfile(this.form4).then((response) => {
            this.$modal.msgSuccess('修改成功')
            // this.$set(this.user, 'walletAddress', this.form4.walletAddress)
            this.getUser()
            this.form4 = {}
          })
          this.showChangeWallet = false
        }
      })
    },
    submitForm5() {
      this.$refs['form5'].validate((valid) => {
        if (valid) {
          amountRecharge(this.form5).then((response) => {
            this.$modal.msgSuccess('充值成功')
            this.getUser()
          })
          this.showInMoney = false
        }
      })
    },
    submitForm6() {
      this.$refs['form6'].validate((valid) => {
        if (valid) {
          amountWithdraw(this.form6).then((response) => {
            this.$modal.msgSuccess('提现成功')
            this.getUser()
          })
          this.showOutMoney = false
        }
      })
    },
    submitForm7() {
      this.$refs['form7'].validate((valid) => {
        if (valid) {
          amountTransfer(this.form7).then((response) => {
            this.$modal.msgSuccess('转账成功')
          })
          this.showGiveMoney = false
        }
      })
    },
    submitForm8() {
      this.$refs['form8'].validate((valid) => {
        if (valid) {
          renew(this.form8).then((response) => {
            this.$modal.msgSuccess('续费成功')
            this.getUser()
          })
          this.showRenew = false
        }
      })
    },
    submitForm9() {
      this.$refs['form9'].validate((valid) => {
        if (valid) {
          autoOrderRecharge(this.form9).then((response) => {
            this.$modal.msgSuccess('自动下单功能续费成功')
            this.getUser()
          })
          this.showAutomatic = false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.user-box-one {
  border: 1px solid #ebeef5;
  border-bottom-width: 0px;
  height: 60px;
  line-height: 60px;
  overflow: hidden;
  .say-left {
    padding-left: 15px;
    font-weight: 700;
    color: #606266;
    background-color: #f5f7fa;
    border-right: 2px solid #ebeef5;
  }
  .content {
    padding-left: 15px;
  }
}

.user-box-one:last-child {
  border-bottom-width: 1px;
}
.erweima {
  width: 220px;
  height: 300px;
  text-align: center;
  margin-left: 40px;
}
</style>
