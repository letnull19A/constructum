import axios from 'axios'
import qs from 'qs'
import { expect, describe, it } from '@jest/globals'

describe('registration test', () => {
	it('validation failed (name) throwing Error', async () => {
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

		await expect(axios.request(config)).rejects.toThrow()
	})

	it('validation failed (name) status not 200', async () => {
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

		await expect(axios.request(config).status).not.toEqual(200)
	})

	it('validation failed (name) status not 500', async () => {
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

		await expect(axios.request(config).status).not.toEqual(500)
	})

	it('validation failed (name) having status text', async () => {
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

		await expect(axios.request(config).statusText).toEqual('field name is empty or undefined')
	})

	it('validation failed (surname)', async () => {
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

		expect(response).rejects.toThrow('AxiosError: Request failed with status code 400')
		expect(response).not.toThrow('AxiosError: Request failed with status code 500')
		expect(response).not.toThrow('AxiosError: Request failed with status code 404')
		expect(response.status).toBe(400)
		expect(response.status).not.toBe(404)
		expect(response.status).not.toBe(500)
		expect(response.statusText).toBe('field surname is empty or undefined')
	})

	it('success registration', async () => {
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
	})
})
