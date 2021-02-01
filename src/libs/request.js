// import Vue from 'vue'
// import store from '@/store'
import notification from 'ant-design-vue/es/notification'
import axios from 'axios'
import {
  VueAxios
} from './axios'
// import { ACCESS_TOKEN } from '@/store/mutation-types'
// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api base_url
  timeout: 30000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})
const err = (error) => {
  if (error.response) {
    const data = error.response.data
    // const token = Vue.ls.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: '禁止',
        description: data.message
      })
    }
    
    /* if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: '未经授权',
        description: '授权验证失败'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    } */
  } else {
    notification.error({
      message: '请求超时',
      description: error.config.url
    })
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  /* const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers.Authorization = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  } */
  return config
}, err)

// response interceptor
service.interceptors.response.use(response => {
  return response.data
}, err)

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}

