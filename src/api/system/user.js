import request from '@/utils/request'
import { parseStrEmpty } from '@/utils/ruoyi'

// 查询用户列表
export function listUser(query) {
  return request({
    url: '/system/user/list',
    method: 'get',
    params: query
  })
}

// 查询用户详细
export function getUser(userId) {
  return request({
    url: '/system/user/' + parseStrEmpty(userId),
    method: 'get'
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: '/system/user',
    method: 'post',
    data: data
  })
}

// 修改用户
export function updateUser(data) {
  return request({
    url: '/system/user',
    method: 'put',
    data: data
  })
}

// 删除用户
export function delUser(userId) {
  return request({
    url: '/system/user/' + userId,
    method: 'delete'
  })
}

// 用户密码重置
export function resetUserPwd(userId, password) {
  const data = {
    userId,
    password
  }
  return request({
    url: '/system/user/resetPwd',
    method: 'put',
    data: data
  })
}

// 用户状态修改
export function changeUserStatus(userId, status) {
  const data = {
    userId,
    status
  }
  return request({
    url: '/system/user/changeStatus',
    method: 'put',
    data: data
  })
}

// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: '/system/user/profile',
    method: 'get'
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: '/system/user/profile',
    method: 'put',
    data: data
  })
}

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
  const data = {
    oldPassword,
    newPassword
  }
  return request({
    url: '/system/user/profile/updatePwd',
    method: 'put',
    params: data
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return request({
    url: '/system/user/profile/avatar',
    method: 'post',
    data: data
  })
}

// 查询授权角色
export function getAuthRole(userId) {
  return request({
    url: '/system/user/authRole/' + userId,
    method: 'get'
  })
}

// 保存授权角色
export function updateAuthRole(data) {
  return request({
    url: '/system/user/authRole',
    method: 'put',
    params: data
  })
}

// 查询部门下拉树结构
export function deptTreeSelect() {
  return request({
    url: '/system/user/deptTree',
    method: 'get'
  })
}
//新用户设置交易密码
export function setTtc(data) {
  return request({
    url: '/system/user/profile/setTtc',
    method: 'put',
    params: data
  })
}
//用户设置交易密码
export function resetTtc(data) {
  return request({
    url: '/system/user/profile/resetTtc',
    method: 'put',
    params: data
  })
}
// 获取费率
export function exchangeRate() {
  return request({
    url: '/system/config/configKey/sys.exchangeRate',
    method: 'get'
  })
}

// 获取续费费用
export function renewalFee() {
  return request({
    url: '/system/config/configKey/sys.renewalFee',
    method: 'get'
  })
}
//续费
export function renew(data) {
  return request({
    url: '/system/user/profile/renew',
    method: 'put',
    params: data
  })
}
// 获取自动下单费用
export function autoOrderPrice() {
  return request({
    url: '/system/config/configKey/sys.autoOrderPrice',
    method: 'get'
  })
}
//自动下单功能
export function autoOrderRecharge(data) {
  return request({
    url: '/system/user/profile/autoOrderRecharge',
    method: 'put',
    params: data
  })
}
// 获取收款地址
export function walletAddress() {
  return request({
    url: '/system/config/configKey/sys.walletAddress',
    method: 'get'
  })
}
// 获取收款地址二维码
export function walletQR() {
  return request({
    url: '/system/config/configKey/sys.walletQR',
    method: 'get'
  })
}
// 获取提现费率
export function withdrawalRate() {
  return request({
    url: '/system/config/configKey/sys.withdrawalRate',
    method: 'get'
  })
}
