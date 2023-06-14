import axios from 'axios'
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

export const useHttp = () => {
  const [response, setResponse] = useState(null)
  const [statusCode, setStatusCode] = useState<number | null>(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState<boolean>(false)

  const request = (data: IHttpQuery) => {
    axios({
      method: data.method,
      url: data.url,
      params: data.params,
      headers: data.headers,
      data: data.data,
    })
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

  return { request, response, error, statusCode, loading }
}
