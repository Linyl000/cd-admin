import request from '@/utils/request'

// 查询转账记录列表
export function listTransferRecords(query) {
  return request({
    url: '/cd/transferRecords/list',
    method: 'get',
    params: query
  })
}

// 查询转账记录详细
export function getTransferRecords(id) {
  return request({
    url: '/cd/transferRecords/' + id,
    method: 'get'
  })
}

// 新增转账记录
export function addTransferRecords(data) {
  return request({
    url: '/cd/transferRecords',
    method: 'post',
    data: data
  })
}

// 修改转账记录
export function updateTransferRecords(data) {
  return request({
    url: '/cd/transferRecords',
    method: 'put',
    data: data
  })
}

// 删除转账记录
export function delTransferRecords(id) {
  return request({
    url: '/cd/transferRecords/' + id,
    method: 'delete'
  })
}
