import Axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import { message } from 'antd'
import { CodeMessage, TokenKey, CITY_CODE } from '@/config'
import { isBrowser } from '.'
import Router from 'next/router'
import { getToken } from './auth'

// import qs from 'qs'

export interface BaseResponse<T = any> {
  code: number
  data: T
  message: string
}

// 默认参数
const source = { city_code: CITY_CODE }

export const service = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/web/`,
  timeout: 10000,
})

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // config.data = qs.stringify(config.data) // 转为 formdata 数据格式
    if (isBrowser()) {
      const token = getToken()
      token && (config!.headers!.Authorization = `Bearer ${token}`)
    }

    if (['get', 'delete'].includes(config.method as string)) {
      config.params ? Object.assign(config.params, source) : (config.params = source)
    } else {
      config.data ? Object.assign(config.data, source) : (config.data = source)
    }

    return config
  },
  (error: { message: string }) => {
    message.error(error.message)
  },
)

service.interceptors.response.use(
  (response: AxiosResponse): Promise<any> => {
    const { data } = response
    const { code, msg } = data

    if (typeof code !== 'undefined' && code !== 0) {
      data?.msg && message.error(data.msg)
      return Promise.reject(msg || 'Error')
    }

    if (!data) {
      return Promise.reject(data)
    }

    return Promise.resolve(data)
  },
  (error: any) => {
    let txt = '系统异常，请稍候再试'
    const response: any = { ...error.response }
    const code = response?.data?.code

    // 处理500类型，自定义报错信息
    if (code) {
      txt = CodeMessage[code]
    }

    // 如果已经有错误信息
    if (response?.data?.msg) {
      txt = response?.data?.msg
    }

    if (isBrowser()) {
      message.destroy()
      message.error(txt)

      if (code === 20002) {
        setTimeout(() => {
          Router.push({ pathname: '/' })
          window.location.reload()
        }, 500)
      }
    }

    return Promise.reject(error)
  },
)

const request = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    service
      .request<BaseResponse<T>>(config)
      .then((res: AxiosResponse) => {
        return resolve(res.data)
      })
      .catch((err: { message: string }) => reject(err))
  })
}

request.get = <T = any>(url: string, params?: object, responseType?: any): Promise<T> => request({
  method: 'get',
  url,
  params,
  responseType,
})

request.post = <T = any>(url: string, params?: object): Promise<T> => request({
  method: 'post',
  url,
  data: params,
})

request.delete = <T = any>(url: string, params?: object): Promise<T> => request({
  method: 'delete',
  url,
  params,
})

request.put = <T = any>(url: string, params?: object): Promise<T> => request({
  method: 'put',
  url,
  data: params,
})

request.patch = <T = any>(url: string, params?: object): Promise<T> => request({
  method: 'patch',
  url,
  data: params,
})

export default request

export const fetchRequest = ({ api, id, type = 'get', params }: { api: string, id?: string, type?: Method, params?: any }) => {
  // if (api === 'ExamPlaces') {
  //   debugger
  // }

  const data = ['get', 'delete'].includes(type as string) ? { params } : { data: params }
  const url = (typeof id !== 'undefined' && id) ? `/${api}/${id}` : `/${api}`
  // console.log('url', url)

  return request({
    method: type,
    url,
    ...data,
  })
}

// 保存token到客户端
export const setServiceToken = (req: any) => {
  const token = req.cookies[TokenKey]
  service.defaults.headers.common.Authorization = `Bearer ${token}`
}

// 清空token
export const removeServiceToken = (res: any) => {
  res.setHeader('Set-Cookie', `${TokenKey}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/`)
}
