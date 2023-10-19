import { describe, expect, it } from '@jest/globals'
import axios from 'axios'

describe('check not found case', () => {
	it('not found /api/reg', async () => {
		try {
			let data = {
				name: 'Alex1',
				surname: 'Volkov1'
			}

			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'http://45.130.43.67/api/reg',
				headers: {
					Authorization: 'Bearer  ',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: data
			}

			await axios.post(config.url, config.data, config)
		} catch (err: any) {
			expect(err.response.status).not.toEqual(500)
			expect(err.response.status).not.toEqual(502)
			expect(err.response.status).toEqual(404)
		}
	})
})

describe('check nginx reverse-proxy working', () => {
	it('check /api/registration', async () => {
		try {
			let data = {
				name: 'Alex1',
				surname: 'Volkov1'
			}

			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'http://45.130.43.67/api/registration',
				headers: {
					Authorization: 'Bearer  ',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: data
			}

			await axios.post(config.url, config.data, config)
		} catch (err: any) {
			expect(err.response.status).not.toEqual(404)
		}
	})

	it('check /api/auth', async () => {
		try {
			let data = {
				name: 'Alex1',
				surname: 'Volkov1'
			}

			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'http://45.130.43.67/api/auth',
				headers: {
					Authorization: 'Bearer  ',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: data
			}

			await axios.post(config.url, config.data, config)
		} catch (err: any) {
			expect(err.response.status).not.toEqual(404)
		}
	})

	it('check /api/refresh', async () => {
		try {
			let data = {
				name: 'Alex1',
				surname: 'Volkov1'
			}

			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'http://45.130.43.67/api/refresh',
				headers: {
					Authorization: 'Bearer  ',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: data
			}

			await axios.post(config.url, config.data, config)
		} catch (err: any) {
			expect(err.response.status).not.toEqual(404)
		}
	})

	it('check /api/project/create', async () => {
		try {
			let data = {
				name: 'Alex1',
				surname: 'Volkov1'
			}

			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'http://45.130.43.67/api/project/create',
				headers: {
					Authorization: 'Bearer  ',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: data
			}

			await axios.post(config.url, config.data, config)
		} catch (err: any) {
			expect(err.response.status).not.toEqual(404)
		}
	})

	it('check /api/project/:id', async () => {
		try {
			let data = {
				name: 'Alex1',
				surname: 'Volkov1'
			}

			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'http://45.130.43.67/api/project/0',
				headers: {
					Authorization: 'Bearer  ',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: data
			}

			await axios.post(config.url, config.data, config)
		} catch (err: any) {
			expect(err.response.status).toEqual(401)
		}
	})
})
