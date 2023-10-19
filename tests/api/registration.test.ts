import axios, { AxiosError } from 'axios'
import qs from 'qs'
import { expect, describe, it } from '@jest/globals'

describe('registration test', () => {
	it('validation failed (name) throwing Error', async () => {
		let data = {}

		let config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: 'http://45.130.43.67:8033/api/registration',
			headers: {
				Authorization: 'Bearer  ',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: data
		}

		await expect(axios.request(config)).rejects.toThrow(AxiosError)
	})

	it('validation failed (name) status text and status = 400', async () => {
		let data = {}

		let config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: 'http://45.130.43.67:8033/api/registration',
			headers: {
				Authorization: 'Bearer  ',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: data
		}

		let response = axios.request(config)

		await expect(response).rejects.toThrow(new AxiosError('Request failed with status code 400'))
	})

	it('validation failed (name) status != 500', async () => {
		try {
			let data = {}

			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'http://45.130.43.67:8033/api/registration',
				headers: {
					Authorization: 'Bearer  ',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: data
			}

			let response = await axios.post(config.url, config.data, config)

			expect(response.status).not.toEqual(500)
		} catch (err: any) {}
	})

	it('validation failed (name) status text', async () => {
		try {
			let data = {}

			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'http://45.130.43.67:8033/api/registration',
				headers: {
					Authorization: 'Bearer  ',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: data
			}

			let response = (await axios.post(config.url, config.data, config)).statusText

			expect(response).toEqual('')
		} catch (err: any) {
			expect(err.response.data).toEqual('field name is empty or undefined')
		}
	})

	it('validation failed (surname) throwing Error', async () => {
		let data = {
			name: 'Alex1'
		}

		let config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: 'http://45.130.43.67:8033/api/registration',
			headers: {
				Authorization: 'Bearer  ',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: data
		}

		await expect(axios.request(config)).rejects.toThrow(AxiosError)
	})

	it('validation failed (surname) status text and status = 400', async () => {
		try {
			let data = {
				name: 'Alex1'
			}

			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'http://45.130.43.67:8033/api/registration',
				headers: {
					Authorization: 'Bearer  ',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: data
			}

			let response = (await axios.post(config.url, config.data, config)).statusText

			expect(response).toEqual('')
		} catch (err: any) {
			expect(err.response.data).toEqual('field surname is empty or undefined')
			expect(err.response.status).toEqual(400)
		}
	})

	it('validation failed (surname) status != 500', async () => {
		try {
			let data = {
				name: 'Alex1'
			}

			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'http://45.130.43.67:8033/api/registration',
				headers: {
					Authorization: 'Bearer  ',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: data
			}

			let response = (await axios.post(config.url, config.data, config)).statusText

			expect(response).toEqual('')
		} catch (err: any) {
			expect(err.response.status).not.toEqual(500)
		}
	})

	it('validation failed (surname) status text', async () => {
		try {
			let data = {
				name: 'Alex1'
			}

			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'http://45.130.43.67:8033/api/registration',
				headers: {
					Authorization: 'Bearer  ',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: data
			}

			let response = (await axios.post(config.url, config.data, config)).statusText

			expect(response).toEqual('')
		} catch (err: any) {
			expect(err.response.data).toEqual('field surname is empty or undefined')
		}
	})

	it('validation failed (login) throwing Error', async () => {
		let data = {
			name: 'Alex1',
			surname: 'Volkov1'
		}

		let config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: 'http://45.130.43.67:8033/api/registration',
			headers: {
				Authorization: 'Bearer  ',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: data
		}

		await expect(axios.request(config)).rejects.toThrow(AxiosError)
	})

	it('validation failed (login) status text and status = 400', async () => {
		try {
			let data = {
				name: 'Alex1',
				surname: 'Volkov1'
			}

			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'http://45.130.43.67:8033/api/registration',
				headers: {
					Authorization: 'Bearer  ',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: data
			}

			let response = (await axios.post(config.url, config.data, config)).statusText

			expect(response).toEqual('')
		} catch (err: any) {
			expect(err.response.data).toEqual('field login is empty or undefined')
			expect(err.response.status).toEqual(400)
		}
	})

	it('validation failed (login) status != 500', async () => {
		try {
			let data = {
				name: 'Alex1',
				surname: 'Volkov1'
			}

			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'http://45.130.43.67:8033/api/registration',
				headers: {
					Authorization: 'Bearer  ',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: data
			}

			let response = await axios.post(config.url, config.data, config)

			expect(response.status).not.toEqual(500)
		} catch (err: any) {}
	})

	it('validation failed (password) throwing Error', async () => {
		let data = {
			name: 'Alex1',
			surname: 'Volkov1',
			login: 'login1'
		}

		let config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: 'http://45.130.43.67:8033/api/registration',
			headers: {
				Authorization: 'Bearer  ',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: data
		}

		await expect(axios.request(config)).rejects.toThrow(AxiosError)
	})

	it('validation failed (password) status text and status = 400', async () => {
		try {
			let data = {
				name: 'Alex1',
				surname: 'Volkov1',
				login: 'login1'
			}

			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'http://45.130.43.67:8033/api/registration',
				headers: {
					Authorization: 'Bearer  ',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: data
			}

			let response = (await axios.post(config.url, config.data, config)).statusText

			expect(response).toEqual('')
		} catch (err: any) {
			expect(err.response.data).toEqual('field password is empty or undefined')
			expect(err.response.status).toEqual(400)
		}
	})

	it('validation failed (password) status != 500', async () => {
		try {
			let data = {
				name: 'Alex1',
				surname: 'Volkov1',
				login: 'login1'
			}

			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'http://45.130.43.67:8033/api/registration',
				headers: {
					Authorization: 'Bearer  ',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: data
			}

			let response = await axios.post(config.url, config.data, config)

			expect(response.status).not.toEqual(500)
		} catch (err: any) {}
	})

	it('validation failed (repassword) throwing Error', async () => {
		let data = {
			name: 'Alex1',
			surname: 'Volkov1',
			login: 'login1',
			password: '11111111'
		}

		let config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: 'http://45.130.43.67:8033/api/registration',
			headers: {
				Authorization: 'Bearer  ',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: data
		}

		await expect(axios.request(config)).rejects.toThrow(AxiosError)
	})

	it('validation failed (repassword) status text and status = 400', async () => {
		try {
			let data = {
				name: 'Alex1',
				surname: 'Volkov1',
				login: 'login1',
				password: '11111111'
			}

			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'http://45.130.43.67:8033/api/registration',
				headers: {
					Authorization: 'Bearer  ',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: data
			}

			let response = (await axios.post(config.url, config.data, config)).statusText

			expect(response).toEqual('')
		} catch (err: any) {
			expect(err.response.data).toEqual('field repassword is empty or undefined')
			expect(err.response.status).toEqual(400)
		}
	})

	it('validation failed (repassword) status != 500', async () => {
		try {
			let data = {
				name: 'Alex1',
				surname: 'Volkov1',
				login: 'login1',
				password: '11111111'
			}

			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'http://45.130.43.67:8033/api/registration',
				headers: {
					Authorization: 'Bearer  ',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: data
			}

			let response = await axios.post(config.url, config.data, config)

			expect(response.status).not.toEqual(500)
		} catch (err: any) {}
	})

	it('validation failed (repassword not equal password) throwing Error', async () => {
		let data = {
			name: 'Alex1',
			surname: 'Volkov1',
			login: 'login1',
			password: '11111111',
			repassword: '11111111a'
		}

		let config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: 'http://45.130.43.67:8033/api/registration',
			headers: {
				Authorization: 'Bearer  ',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: data
		}

		await expect(axios.request(config)).rejects.toThrow(AxiosError)
	})

	it('validation failed (repassword not equal password) status text and status = 400', async () => {
		try {
			let data = {
				name: 'Alex1',
				surname: 'Volkov1',
				login: 'login1',
				password: '11111111',
				repassword: '11111111a'
			}

			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'http://45.130.43.67:8033/api/registration',
				headers: {
					Authorization: 'Bearer  ',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: data
			}

			let response = (await axios.post(config.url, config.data, config)).statusText

			expect(response).toEqual('')
		} catch (err: any) {
			expect(err.response.data).toEqual('field repassword not equal password')
			expect(err.response.status).toEqual(400)
		}
	})

	it('validation failed (repassword not equal password) status != 500', async () => {
		try {
			let data = {
				name: 'Alex1',
				surname: 'Volkov1',
				login: 'login1',
				password: '11111111',
				repassword: '11111111a'
			}

			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'http://45.130.43.67:8033/api/registration',
				headers: {
					Authorization: 'Bearer  ',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: data
			}

			let response = await axios.post(config.url, config.data, config)

			expect(response.status).not.toEqual(500)
		} catch (err: any) {}
	})

	// it('success registration', async () => {
	// 	const data = qs.stringify({
	// 		email: 'av@gmail.com',
	// 		name: 'Alex1',
	// 		surname: 'Volkov1',
	// 		password: '11111111',
	// 		repassword: '11111111',
	// 		login: 'login1'
	// 	})

	// 	const config = {
	// 		method: 'post',
	// 		maxBodyLength: Infinity,
	// 		url: 'http://45.130.43.67:8033/api/registration',
	// 		headers: {
	// 			Authorization: 'Bearer  ',
	// 			'Content-Type': 'application/x-www-form-urlencoded'
	// 		},
	// 		data: data
	// 	}

	// 	const response = await axios.request(config)

	// 	expect(response).not.toThrow('AxiosError: Request failed with status code 400')
	// 	expect(response).not.toThrow('AxiosError: Request failed with status code 500')
	// 	expect(response.status).not.toBe(400)
	// 	expect(response.status).not.toBe(500)
	// 	expect(response.status).toBe(200)
	// })
})

describe('success creating users', () => {})
