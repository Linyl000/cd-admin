import request from '@/utils/request'

// 查询代币流水列表
export function listFlow(query) {
  return request({
    url: '/cd/flow/list',
    method: 'get',
    params: query
  })
}

// 查询代币流水详细
export function getFlow(id) {
  return request({
    url: '/cd/flow/' + id,
    method: 'get'
  })
}

// 新增代币流水
export function addFlow(data) {
  return request({
    url: '/cd/flow',
    method: 'post',
    data: data
  })
}

// 修改代币流水
export function updateFlow(data) {
  return request({
    url: '/cd/flow',
    method: 'put',
    data: data
  })
}

// 删除代币流水
export function delFlow(id) {
  return request({
    url: '/cd/flow/' + id,
    method: 'delete'
  })
}
