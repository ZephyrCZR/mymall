import axios from 'axios'

export function request(config) {
  //创建axios的实例
  const instance = axios.create({
    // baseURL: 'http://123.207.32.32:8000/api/hy', //王红元老师的服务器
    baseURL: 'http://106.54.54.237:8000/api/hy',
    timeout: 5000
  })

  //请求拦截器
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    err;
  })

  //响应拦截器
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    err;
  })

  // 发送网络请求
  return instance(config)
}
