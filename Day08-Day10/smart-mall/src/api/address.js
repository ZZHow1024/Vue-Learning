// 获取地址列表
import request from '@/utils/request'

export const getAddressList = () => {
  return request.get('/address/list')
}
