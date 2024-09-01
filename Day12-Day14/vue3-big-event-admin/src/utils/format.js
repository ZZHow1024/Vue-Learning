import { dayjs } from 'element-plus'

export const formatTime = (time) => {
  return dayjs(time).format('YYYY年MM月DD日 HH:mm:ss')
}
