// 登录相关的接口请求
// 获取图形验证码
import request from '@/utils/request'

export const getPicCode = () => {
  return request.get('/captcha/image')
}

export const getSmsCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

export const codeLogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      smsCode,
      mobile,
      isParty: false,
      partyData: {}
    }
  })
}
