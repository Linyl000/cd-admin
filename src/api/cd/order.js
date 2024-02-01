import request from '@/utils/request'

// 查询商品订单列表
export function listOrder(query) {
  return request({
    url: '/cd/order/list',
    method: 'get',
    params: query
  })
}

// 查询商品订单详细
export function getOrder(id) {
  return request({
    url: '/cd/order/' + id,
    method: 'get'
  })
}

// 新增商品订单
export function addOrder(data) {
  return request({
    url: '/cd/order',
    method: 'post',
    data: data
  })
}

// 修改商品订单
export function updateOrder(data) {
  return request({
    url: '/cd/order',
    method: 'put',
    data: data
  })
}

// 删除商品订单
export function delOrder(id) {
  return request({
    url: '/cd/order/' + id,
    method: 'delete'
  })
}
//一键退货退款
export function returnsOrder(id) {
  return request({
    url: '/cd/order/returns',
    method: 'post'
  })
}
//一键上传
export function upsOrder(id) {
  return request({
    url: '/cd/order/upload',
    method: 'post'
  })
}
//查询上传进度
export function importResult(code) {
  return request({
    url: '/importResult/' + code,
    method: 'get'
  })
}
