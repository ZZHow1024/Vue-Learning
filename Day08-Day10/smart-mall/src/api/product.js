import request from '@/utils/request'

// 获取搜索商品列表
export const getProducts = (obj) => {
  return request.get('/goods/list', {
    params: {
      sortType: obj.sortType,
      sortPrice: obj.sortPrice,
      categoryId: obj.categoryId,
      goodsName: obj.goodsName,
      page: obj.page
    }
  })
}

// 获取商品详情
export const getProductDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}

// 获取商品评价
export const getProductComments = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit
    }
  })
}
