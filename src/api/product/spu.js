import request from '@/utils/request';

// /admin/product/{page}/{limit} get
export function reqGetSpuInfo(page,limit,category3Id) {
  return request({
    url: `/admin/product/${page}/${limit}`,
    method: 'get',
    params: {category3Id}
  })
}

// spuForm_getTradeMarkList
// /admin/product/baseTrademark/getTrademarkList
export function reqGetTradeMarkList(){
  return request({
    url: `/admin/product/baseTrademark/getTrademarkList`,
    method: 'get'
  })
}

// spuForm_getSpu
// /admin/product/getSpuById/{spuId}
export function reqGetSpu(spuId){
  return request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: 'get'
  })
}

// spuForm_getImgList
// /admin/product/spuImageList/{spuId}
export function reqGetImgList(spuId){
  return request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get'
  })
}

// spuForm_selectAttrList
// /admin/product/baseSaleAttrList
export function reqGetbaseSaleAttrList(){
  return request({
    url: `/admin/product/baseSaleAttrList`,
    method: 'get'
  })
}

// spuForm_saveInfo
// /admin/product/saveSpuInfo post
export function reqSaveSpuInfo(data){
  return request({
    url: `/admin/product/saveSpuInfo`,
    method: 'post',
    data
  })
}

// spuForm_updateInfo
// /admin/product/updateSpuInfo  post
export function reqUpdateSpuInfo(data){
  return request({
    url: `/admin/product/updateSpuInfo`,
    method: 'post',
    data
  })
}

// spu_deleteSpu
// /admin/product/deleteSpu/{spuId}  delete
export function reqDeleteSpu(spuId){
  return request({
    url: `/admin/product/deleteSpu/${spuId}`,
    method: 'delete',
  })
}

// spu_findBySpuId
// /admin/product/findBySpuId/{spuId} get
export function reqFindBySpuId(spuId){
  return request({
    url: `/admin/product/findBySpuId/${spuId}`,
    method: 'get',
  })
}