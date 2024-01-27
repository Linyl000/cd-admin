import request from '@/utils/request'

// 手动下单
export function SDorder(token, oderNum, hbNum) {
  return request({
    url: '/cd/order/manualOrder/' + token + '/' + oderNum + '/' + hbNum,
    method: 'post'
  })
}

// 自动下单
export function ZDorder(oderNum, hbNum) {
  return request({
    url: '/cd/order/AutoOrder/' + oderNum + '/' + hbNum,
    method: 'post'
  })
}
// 订单列表
export function listOrder(query) {
  return request({
    url: '/cd/order/oderList',
    method: 'get',
    params: query
  })
}
