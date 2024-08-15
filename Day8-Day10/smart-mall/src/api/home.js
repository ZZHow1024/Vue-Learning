// 获取首页数据
import request from '@/utils/request'

export const getHomeData = () => {
  return request.get('/page/detail', {
    params: {
      pageId: 0
    }
  })
}
