import request from '@/utils/request'

// 查询注册码列表
export function listRegisterCode(query) {
  return request({
    url: '/system/registerCode/list',
    method: 'get',
    params: query
  })
}

// 查询注册码详细
export function getRegisterCode(code) {
  return request({
    url: '/system/registerCode/' + code,
    method: 'get'
  })
}

// 新增注册码
export function addRegisterCode(data) {
  return request({
    url: '/system/registerCode',
    method: 'post',
    data: data
  })
}

// 修改注册码
export function updateRegisterCode(data) {
  return request({
    url: '/system/registerCode',
    method: 'put',
    data: data
  })
}

// 删除注册码
export function delRegisterCode(code) {
  return request({
    url: '/system/registerCode/' + code,
    method: 'delete'
  })
}
