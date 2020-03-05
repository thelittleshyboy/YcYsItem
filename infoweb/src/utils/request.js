import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
// import store from '@/store'
// import router from '@/router'

const service = axios.create({
  baseURL: process.env.API_HOST, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 300000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
    if (config.headers['Content-Type'] === 'multipart/form-data') {
      return config
    }
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded' 
    if (config.method === 'post') { 
      config.data = qs.stringify({
        ...config.data
      })
    }
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    if(response.status !== 200) {
      Message.error('系统发生错误，请重试！')
      return
    } else if (response.data.status === 'failed') {
      Message.error(response.data.data)
      return
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
