import request from '@/utils/request'

// 查询累计订单数
export function TJlist(query) {
  return request({
    url: 'cd/orderTj',
    method: 'get',
    params: query
  })
}
