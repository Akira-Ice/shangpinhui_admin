import request from '@/utils/request';

// sku_getSkuList
// /admin/product/list/{page}/{limit} get
export function reqGetSkuList(page,limit){
  return request({
    url: `/admin/product/list/${page}/${limit}`,
    method: 'get'
  });
}

// sku_cancelSale
// /admin/product/cancelSale/{skuId} get
export function reqCancelSale(skuId){
  return request({
    url: `/admin/product/cancelSale/${skuId}`,
    method: 'get'
  });
}

// sku_OnSale
// /admin/product/onSale/{skuId} get
export function reqOnSale(skuId){
  return request({
    url: `/admin/product/onSale/${skuId}`,
    method: 'get'
  });
}

// sku_DeleteSku
// /admin/product/deleteSku/{skuId} delete
export function reqDeleteSku(skuId){
  return request({
    url: `/admin/product/deleteSku/${skuId}`,
    method: 'delete'
  });
}
