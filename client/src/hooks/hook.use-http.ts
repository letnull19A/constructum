import axios, { AxiosError } from 'axios'
import { useState } from 'react'

export enum Method {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE'
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
	const [statusCode, setStatusCode] = useState<number | undefined>()
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)

	const request = async (data: IHttpQuery): Promise<void> => {
		await axios({ ...data })
			.then((res) => {
				setStatusCode(res.status)
				setResponse(res.data)
				setLoading(false)
				setError(null)
			})
			.catch((error: AxiosError) => {
				setError(error.message)
				setStatusCode(error.status)
			})
	}

	const requestWithInterspectors = (data: IHttpQuery) => {
		const instance = axios.create({ ...data })

		instance.interceptors.request.use((config) => {
			config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
			return config
		})

		instance.interceptors.response.use(
			(config) => config,
			async (error) => {
				const originalRequest = error.config

				if (error.response.status === 401 && error.config && error.config._isRetry) {
					originalRequest._isRetry = true
					try {
						request({
							url: 'http://localhost:7161/api/refresh',
							method: Method.GET,
							headers: {
								Authorization: `Bearer ${localStorage.getItem('token')}`,
								'Content-Type': 'application/x-www-form-urlencoded'
							}
						})

						return instance.request(originalRequest)
					} catch (e) {
						console.log(e)
					}
				}
			}
		)
	}

	return { requestWithInterspectors, request, response, error, statusCode, loading }
}
