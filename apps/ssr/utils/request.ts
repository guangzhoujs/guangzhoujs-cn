import Axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import { message } from 'antd'
// import qs from 'qs'

export interface BaseResponse<T = any> {
  code: number
  data: T
  message: string
}

const service = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
})

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // config.data = qs.stringify(config.data) // 转为 formdata 数据格式
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

    if (code !== 0) {
      data.msg && message.error(data.msg)
      return Promise.reject(new Error(msg || 'Error'))
    }
    if (!data) {
      return Promise.reject(data)
    }

    return Promise.resolve(data)
  },
  (error: { message: string }) => {
    message.destroy()
    message.error('网络异常')

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
  const url = (id?.length && typeof id !== 'undefined') ? `/${api}/${id}` : `/${api}`

  return request({
    method: type,
    url,
    ...data,
  })
}
