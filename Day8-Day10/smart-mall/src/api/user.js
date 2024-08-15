import request from '@/utils/request'

export const getUserInfoDetail = () => {
  return request.get('/user/info')
}
