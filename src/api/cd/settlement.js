import request from '@/utils/request'

// 查询订单结算列表
export function listOrdersettlement(query) {
  return request({
    url: '/cd/order/oderSettlementList',
    method: 'get',
    params: query
  })
}
// 查询token集合
export function tokenSettlement(id) {
  return request({
    url: '/cd/tokensettlement/' + id,
    method: 'get'
  })
}

// 查询订单结算详细
export function getOrdersettlement(id) {
  return request({
    url: '/cd/ordersettlement/' + id,
    method: 'get'
  })
}

// 新增订单结算
export function addOrdersettlement(data) {
  return request({
    url: '/cd/ordersettlement',
    method: 'post',
    data: data
  })
}
// 一键提交
export function submit(data) {
  return request({
    url: '/cd/ordersettlement/submit',
    method: 'post',
    data: data
  })
}
// 修改订单结算
export function updateOrdersettlement(data) {
  return request({
    url: '/cd/ordersettlement',
    method: 'put',
    data: data
  })
}

// 删除订单结算
export function delOrdersettlement(id) {
  return request({
    url: '/cd/ordersettlement/' + id,
    method: 'delete'
  })
}
