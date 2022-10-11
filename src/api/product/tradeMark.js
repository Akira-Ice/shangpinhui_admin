/* 
** admin/product/baseTrademark/{page}/{limit} get
*/

import request from '@/utils/request'

export function reqTradeMark(page, limit) {
  return request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get',
  })
}

// add or update
// /admin/product/baseTrademark/save
// /admin/product/baseTrademark/update
export function reqAddOrUpdateTradeMark(tradeMark) {
  if (tradeMark.id) {
    return request({
      url: '/admin/product/baseTrademark/update',
      method: 'put',
      data: tradeMark
    })
  } else {
    return request({
      url: '/admin/product/baseTrademark/save',
      method: 'post',
      data: tradeMark
    })
  }
}

//remove
// /admin/product/baseTrademark/remove/{id}
export function reqRemoveTradeMark(id) {
  return request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: 'delete',
  })
}