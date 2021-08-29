import axios from 'axios'
import { message } from 'antd'

axios.interceptors.request.use(config => {
  return config
})

axios.interceptors.response.use(response => {
  const { data, config = {} } = response
  const { notify = true } = config
  if (data.success === true || data.code === 200) {
    return data
  }
  if ((data.msg || data.message || data.errorMsg) && notify) {
    message.error(data.msg || data.message || data.errorMsg)
  }
  // 无权限
  if ([100, 403, 500, 602].includes(data.code)) {
    // 跳转登录页
    return Promise.reject()
  }
  return Promise.reject()
}, error => {
  message.error('接口请求异常')
  return Promise.reject(error)
})

export default {
  get(url, params = {}, extra = {}) {
    return axios.get(url, { params, ...extra })
  },
  post(url, params = {}, extra = {}) {
    return axios.post(url, params, extra)
  },
}

