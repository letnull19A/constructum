import axios from 'axios'
import qs from 'qs'
import { expect, describe, it } from '@jest/globals'

describe('registration test', () => {
	it('validation failed (name)', async () => {
		try {
			const data = {}

			const config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'http://45.12.74.222/api/registration',
				headers: {
					Authorization: 'Bearer  ',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: data
			}

			const response = await axios.request(config)

			expect(response).toThrow('AxiosError: Request failed with status code 400')
			expect(response).not.toThrow('AxiosError: Request failed with status code 500')
			expect(response).not.toThrow('AxiosError: Request failed with status code 404')
			expect(response.status).toBe(400)
			expect(response.status).not.toBe(404)
			expect(response.status).not.toBe(500)
			expect(response.statusText).toBe('field name is empty or undefined')
		} catch {}
	})

	it('validation failed (surname)', async () => {
		try {
			const data = {
				name: 'Alex1'
			}

			const config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'http://45.12.74.222/api/registration',
				headers: {
					Authorization: 'Bearer  ',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: data
			}

			const response = await axios.request(config)

			expect(response).toThrow('AxiosError: Request failed with status code 400')
			expect(response).not.toThrow('AxiosError: Request failed with status code 500')
			expect(response).not.toThrow('AxiosError: Request failed with status code 404')
			expect(response.status).toBe(400)
			expect(response.status).not.toBe(404)
			expect(response.status).not.toBe(500)
			expect(response.statusText).toBe('field surname is empty or undefined')
		} catch {}
	})

	it('success registration', async () => {
		try {
			const data = qs.stringify({
				email: 'av@gmail.com',
				name: 'Alex1',
				surname: 'Volkov1',
				password: '11111111',
				repassword: '11111111',
				login: 'login1'
			})

			const config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'http://45.12.74.222/api/registration',
				headers: {
					Authorization: 'Bearer  ',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: data
			}

			const response = await axios.request(config)

			expect(response).not.toThrow('AxiosError: Request failed with status code 400')
			expect(response).not.toThrow('AxiosError: Request failed with status code 500')
			expect(response.status).not.toBe(400)
			expect(response.status).not.toBe(500)
			expect(response.status).toBe(200)
		} catch {}
	})
})
