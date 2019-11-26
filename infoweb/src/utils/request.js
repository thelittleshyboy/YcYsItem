import axios from 'axios'
import qs from 'qs'
// import { Message } from 'element-ui'
// import store from '@/store'
// import router from '@/router'

const service = axios.create({
  baseURL: process.env.API_HOST, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 300000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
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
    const res = response
    return res
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
