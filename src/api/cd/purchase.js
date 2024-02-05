import request from '@/utils/request'

// 手动下单
export function SDorder(data) {
  return request({
    url: '/cd/order/manualOrder',
    method: 'post',
    data: data
  })
}

// 自动下单
export function ZDorder(data) {
  return request({
    url: '/cd/order/AutoOrder',
    method: 'post',
    data: data
  })
}
// 订单列表`
export function listOrder(query) {
  return request({
    url: '/cd/order/oderList',
    method: 'get',
    params: query
  })
}
//获取下单价格区间最小值
export function min(query) {
  return request({
    url: '/system/config/configKey/cd_order_jgqj_min',
    method: 'get',
    params: query
  })
}
//获取下单价格区间最大值
export function max(query) {
  return request({
    url: '/system/config/configKey/cd_order_jgqj_max',
    method: 'get',
    params: query
  })
}
