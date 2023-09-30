import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import qs from 'qs'
import { useState } from 'react'
import configs from './../configs/server.config.json'

/**
 * @description Перечисление с методами отправки запросов
 */
export enum Method {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE'
}

/**
 * @description интерфейс http запроса на сервер
 * @member url - url сайта
 * @member params - параметры запроса
 * @member headers - заголовки запроса
 * @member data - отправляемые данные
 */
export interface IHttpQuery {
	url: string
	params?: any
	data?: any
	method: Method | string
	headers?: any
}

/**
 * @description интерфейс с данными интерсепторов
 * @member onResponse - выполняется при ответе
 * @member onRequest - выполняется при запросе
 * @member onError - выполняется при ошибке
 */
export interface IInterceptors {
	onResponse?: (response: AxiosResponse) => AxiosResponse
	onRequest?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
	onError?: (error: AxiosError) => Promise<AxiosError<unknown, any>>
}

export function setupInterceptorsTo(axiosInstance: AxiosInstance, interceptors?: IInterceptors): AxiosInstance {
	axiosInstance.interceptors.request.use(interceptors?.onRequest, interceptors?.onError)
	axiosInstance.interceptors.response.use(interceptors?.onResponse, interceptors?.onError)
	return axiosInstance
}

export const useHttp = <T>() => {
	const [response, setResponse] = useState<T | null>(null)
	const [statusCode, setStatusCode] = useState<number | undefined>()
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)

	const request = async (data: IHttpQuery): Promise<AxiosResponse<any, any> | undefined> => {
		try {
			const r = axios.create()
			const res = await r.request({ ...data })

			setStatusCode(res.status)
			setResponse(res.data as T)
			setLoading(false)
			setError(null)

			return res
		} catch (error) {
			if (error instanceof AxiosError) {
				setError(error.message)
				setStatusCode(error.status)
			}
		}
	}

	const requestWithInterceptors = async (data: IHttpQuery, interceptors?: IInterceptors) => {
		let axiosInstance: AxiosInstance = axios.create()

		const tokens = JSON.parse(localStorage.getItem('token') ?? '{}')

		if (tokens === undefined || tokens === null) {
			throw new Error('No token found')
		}

		axiosInstance = setupInterceptorsTo(axiosInstance)

		await axiosInstance(data)
			.then((res) => {
				setStatusCode(res.status)
				setResponse(res.data as T)
				setLoading(false)
				setError(null)

				if (interceptors?.onRequest !== undefined && interceptors?.onResponse !== undefined) {
					interceptors?.onRequest(res.request)
					interceptors?.onResponse(res)
				}
			})
			.catch(async (error) => {
				setError(error.response.data)
				setStatusCode(error.response.status)

				if (interceptors?.onError !== undefined) interceptors?.onError(error)

				if (error instanceof AxiosError && error.response?.status === 401 && error.config) {
					await request({
						url: `${configs.auth}/api/refresh`,
						method: Method.POST,
						data: qs.stringify({ refresh: tokens.refresh }),
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					})
						.then((res) => {
							if (res?.data !== undefined) {
								localStorage.setItem('token', JSON.stringify(res?.data))

								data.headers = {
									...data.headers,
									Authorization: `Bearer ${res.data.access}`
								}

								request(data)
									.then(async (res) => {
										setStatusCode(res?.status)
										setResponse(res?.data as T)
										setLoading(false)
										setError(null)
									})
									.catch((error) => {
										console.error(error)
										setError(error)
									})
							}
						})
						.catch((error) => {
							console.error(error)
							setError(error)
						})
				}
			})
	}

	return { request, requestWithInterceptors, response, error, statusCode, loading }
}
