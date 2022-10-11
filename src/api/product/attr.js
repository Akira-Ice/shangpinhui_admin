import request from '@/utils/request'

// getCategory
// /admin/product/getCategory1 get
// /admin/product/getCategory2/{category1Id}
// /admin/product/getCategory3/{category2Id}
export function reqGetCategory1() {
  return request({
    url: `/admin/product/getCategory1`,
    method: 'get',
  })
}
export function reqGetCategory2(id) {
  return request({
    url: `/admin/product/getCategory2/${id}`,
    method: 'get',
  })
}
export function reqGetCategory3(id) {
  return request({
    url: `/admin/product/getCategory3/${id}`,
    method: 'get',
  })
}

// reqGetAttrInfoList
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export function reqGetAttrInfoList(category1Id,category2Id,category3Id) {
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get',
  })
}

// saveCategory3
// /admin/product/saveCategory3
export function reqSaveCategory3(data) {
  return request({
    url: `/admin/product/saveAttrInfo`,
    method: 'post',
    data
  })
}

// delete
// /admin/product/deleteAttr/{attrId}
export function reqDeleteAttr(attrId) {
  return request({
    url: `/admin/product/deleteAttr/${attrId}`,
    method: 'delete',
  })
}