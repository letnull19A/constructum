import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { useState } from 'react'

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface IHttpQuery {
  url: string
  params?: any
  data?: any
  method: Method
  headers?: any
}

export interface IInterceptors {
  onResponse: (response: AxiosResponse) => AxiosResponse
  onRequest: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  onError: (error: AxiosError) => Promise<AxiosError>
}

export function setupInterceptorsTo(axiosInstance: AxiosInstance, interceptors?: IInterceptors): AxiosInstance {
  axiosInstance.interceptors.request.use(interceptors?.onRequest, interceptors?.onError)
  axiosInstance.interceptors.response.use(interceptors?.onResponse, interceptors?.onError)
  return axiosInstance
}

export const useHttp = () => {
  const [response, setResponse] = useState(null)
  const [statusCode, setStatusCode] = useState<number | null>(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState<boolean>(false)

  const request = async (data: IHttpQuery) => {
    axios
      .create()
      .request({ ...data })
      .then((res) => {
        setStatusCode(res.status)
        setResponse(res.data)
        setLoading(false)
        setError(null)
      })
      .catch((error) => {
        setError(error.response.data)
        setStatusCode(error.response.status)
      })
  }

  const requestWithInterceptors = async (data: IHttpQuery, interceptors: IInterceptors) => {
    let axiosInstance: AxiosInstance = axios.create()

    axiosInstance = setupInterceptorsTo(axiosInstance)

    axiosInstance(data)
      .then((res) => {
        setStatusCode(res.status)
        setResponse(res.data)
        setLoading(false)
        setError(null)
        interceptors?.onRequest(res.request)
        interceptors?.onResponse(res)
      })
      .catch((error) => {
        setError(error.response.data)
        setStatusCode(error.response.status)

        if (error instanceof AxiosError) {
          interceptors?.onError(error)
        }
      })
  }

  return { request, requestWithInterceptors, response, error, statusCode, loading }
}
